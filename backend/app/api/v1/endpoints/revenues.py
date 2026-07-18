from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from uuid import UUID
from datetime import date
from app.db.session import get_db
from app.models.revenue import Revenue
from app.models.user import User
from app.schemas.revenue import RevenueCreate, RevenueUpdate, RevenueResponse, RevenueListResponse
from app.core.security import get_current_user, get_org_filter
from app.services.audit import log_action

router = APIRouter(prefix="/revenues", tags=["Revenue"])


@router.get("", response_model=RevenueListResponse)
async def list_revenues(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    client: str = Query(None),
    business_unit: str = Query(None),
    geography: str = Query(None),
    status_filter: str = Query(None, alias="status"),
    period_from: date = Query(None),
    period_to: date = Query(None),
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    query = db.query(Revenue).filter(Revenue.organization_id == org_id)

    if client:
        query = query.filter(Revenue.client_name.ilike(f"%{client}%"))
    if business_unit:
        query = query.filter(Revenue.business_unit == business_unit)
    if geography:
        query = query.filter(Revenue.geography == geography)
    if status_filter:
        query = query.filter(Revenue.status == status_filter)
    if period_from:
        query = query.filter(Revenue.period_start >= period_from)
    if period_to:
        query = query.filter(Revenue.period_start <= period_to)

    total = query.count()
    items = query.order_by(Revenue.period_start.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return RevenueListResponse(
        items=[RevenueResponse.model_validate(r) for r in items],
        total=total,
        page=page,
        page_size=page_size,
    )


@router.post("", response_model=RevenueResponse, status_code=status.HTTP_201_CREATED)
async def create_revenue(
    request_body: RevenueCreate,
    request: Request,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    revenue = Revenue(
        organization_id=org_id,
        **request_body.model_dump(),
    )
    if revenue.currency == "INR":
        revenue.amount_inr = revenue.amount

    db.add(revenue)
    db.commit()
    db.refresh(revenue)

    log_action(
        db, action="create", resource="revenue",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(revenue.id),
        details={"client": revenue.client_name, "amount": str(revenue.amount)},
        request=request,
    )

    return RevenueResponse.model_validate(revenue)


@router.get("/stats")
async def revenue_stats(
    period_from: date = Query(None),
    period_to: date = Query(None),
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    query = db.query(Revenue).filter(Revenue.organization_id == org_id)
    if period_from:
        query = query.filter(Revenue.period_start >= period_from)
    if period_to:
        query = query.filter(Revenue.period_start <= period_to)

    total = db.query(func.sum(Revenue.amount_inr)).filter(
        Revenue.organization_id == org_id
    ).scalar() or 0

    by_client = db.query(
        Revenue.client_name,
        func.sum(Revenue.amount_inr).label("total")
    ).filter(Revenue.organization_id == org_id).group_by(Revenue.client_name).order_by(
        func.sum(Revenue.amount_inr).desc()
    ).limit(10).all()

    by_geography = db.query(
        Revenue.geography,
        func.sum(Revenue.amount_inr).label("total")
    ).filter(
        Revenue.organization_id == org_id,
        Revenue.geography.isnot(None)
    ).group_by(Revenue.geography).all()

    by_bu = db.query(
        Revenue.business_unit,
        func.sum(Revenue.amount_inr).label("total")
    ).filter(
        Revenue.organization_id == org_id,
        Revenue.business_unit.isnot(None)
    ).group_by(Revenue.business_unit).all()

    monthly = db.query(
        extract("year", Revenue.period_start).label("year"),
        extract("month", Revenue.period_start).label("month"),
        func.sum(Revenue.amount_inr).label("total")
    ).filter(Revenue.organization_id == org_id).group_by("year", "month").order_by("year", "month").all()

    return {
        "total_revenue": float(total),
        "top_clients": [{"name": r[0], "amount": float(r[1])} for r in by_client],
        "by_geography": [{"name": r[0], "amount": float(r[1])} for r in by_geography],
        "by_business_unit": [{"name": r[0], "amount": float(r[1])} for r in by_bu],
        "monthly_trend": [{"year": int(r[0]), "month": int(r[1]), "amount": float(r[2])} for r in monthly],
    }


@router.get("/{revenue_id}", response_model=RevenueResponse)
async def get_revenue(
    revenue_id: UUID,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    revenue = db.query(Revenue).filter(Revenue.id == revenue_id, Revenue.organization_id == org_id).first()
    if not revenue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Revenue not found")
    return RevenueResponse.model_validate(revenue)


@router.patch("/{revenue_id}", response_model=RevenueResponse)
async def update_revenue(
    revenue_id: UUID,
    request_body: RevenueUpdate,
    request: Request,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    revenue = db.query(Revenue).filter(Revenue.id == revenue_id, Revenue.organization_id == org_id).first()
    if not revenue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Revenue not found")

    update_data = request_body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(revenue, field, value)

    db.commit()
    db.refresh(revenue)

    log_action(
        db, action="update", resource="revenue",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(revenue.id), details=update_data, request=request,
    )

    return RevenueResponse.model_validate(revenue)


@router.delete("/{revenue_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_revenue(
    revenue_id: UUID,
    request: Request,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    revenue = db.query(Revenue).filter(Revenue.id == revenue_id, Revenue.organization_id == org_id).first()
    if not revenue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Revenue not found")

    log_action(
        db, action="delete", resource="revenue",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(revenue.id), request=request,
    )

    db.delete(revenue)
    db.commit()
