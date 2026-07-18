from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID
from datetime import date
from app.db.session import get_db
from app.models.expense import Expense
from app.models.user import User
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseResponse, ExpenseListResponse
from app.core.security import get_current_user, get_org_filter
from app.services.audit import log_action

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.get("", response_model=ExpenseListResponse)
async def list_expenses(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    expense_type: str = Query(None),
    business_unit: str = Query(None),
    period_from: date = Query(None),
    period_to: date = Query(None),
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    query = db.query(Expense).filter(Expense.organization_id == org_id)

    if category:
        query = query.filter(Expense.category == category)
    if expense_type:
        query = query.filter(Expense.expense_type == expense_type)
    if business_unit:
        query = query.filter(Expense.business_unit == business_unit)
    if period_from:
        query = query.filter(Expense.period >= period_from)
    if period_to:
        query = query.filter(Expense.period <= period_to)

    total = query.count()
    items = query.order_by(Expense.period.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return ExpenseListResponse(
        items=[ExpenseResponse.model_validate(e) for e in items],
        total=total,
        page=page,
        page_size=page_size,
    )


@router.post("", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
async def create_expense(
    request_body: ExpenseCreate,
    request: Request,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    expense = Expense(
        organization_id=org_id,
        **request_body.model_dump(),
    )
    if expense.currency == "INR":
        expense.amount_inr = expense.amount

    db.add(expense)
    db.commit()
    db.refresh(expense)

    log_action(
        db, action="create", resource="expense",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(expense.id),
        details={"category": expense.category.value, "amount": str(expense.amount)},
        request=request,
    )

    return ExpenseResponse.model_validate(expense)


@router.get("/stats")
async def expense_stats(
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    total = db.query(func.sum(Expense.amount_inr)).filter(
        Expense.organization_id == org_id
    ).scalar() or 0

    by_category = db.query(
        Expense.category,
        func.sum(Expense.amount_inr).label("total")
    ).filter(Expense.organization_id == org_id).group_by(Expense.category).all()

    by_type = db.query(
        Expense.expense_type,
        func.sum(Expense.amount_inr).label("total")
    ).filter(Expense.organization_id == org_id).group_by(Expense.expense_type).all()

    return {
        "total_expenses": float(total),
        "by_category": [{"name": r[0].value, "amount": float(r[1])} for r in by_category],
        "by_type": [{"name": r[0].value, "amount": float(r[1])} for r in by_type],
    }


@router.get("/{expense_id}", response_model=ExpenseResponse)
async def get_expense(
    expense_id: UUID,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.organization_id == org_id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    return ExpenseResponse.model_validate(expense)


@router.patch("/{expense_id}", response_model=ExpenseResponse)
async def update_expense(
    expense_id: UUID,
    request_body: ExpenseUpdate,
    request: Request,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.organization_id == org_id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")

    update_data = request_body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(expense, field, value)

    db.commit()
    db.refresh(expense)

    log_action(
        db, action="update", resource="expense",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(expense.id), details=update_data, request=request,
    )

    return ExpenseResponse.model_validate(expense)


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense_id: UUID,
    request: Request,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.organization_id == org_id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")

    log_action(
        db, action="delete", resource="expense",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(expense.id), request=request,
    )

    db.delete(expense)
    db.commit()
