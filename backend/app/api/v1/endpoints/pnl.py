from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from uuid import UUID
from datetime import date
from decimal import Decimal
from app.db.session import get_db
from app.models.revenue import Revenue
from app.models.expense import Expense
from app.models.budget import Budget
from app.models.user import User
from app.core.security import get_current_user, get_org_filter

router = APIRouter(prefix="/pnl", tags=["P&L"])


@router.get("/summary")
async def pnl_summary(
    period_from: date = Query(None),
    period_to: date = Query(None),
    business_unit: str = Query(None),
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    rev_query = db.query(func.coalesce(func.sum(Revenue.amount_inr), 0)).filter(
        Revenue.organization_id == org_id
    )
    direct_query = db.query(func.coalesce(func.sum(Expense.amount_inr), 0)).filter(
        Expense.organization_id == org_id,
        Expense.expense_type == "direct",
    )
    indirect_query = db.query(func.coalesce(func.sum(Expense.amount_inr), 0)).filter(
        Expense.organization_id == org_id,
        Expense.expense_type == "indirect",
    )
    shared_query = db.query(func.coalesce(func.sum(Expense.amount_inr), 0)).filter(
        Expense.organization_id == org_id,
        Expense.expense_type == "shared",
    )

    if period_from:
        rev_query = rev_query.filter(Revenue.period_start >= period_from)
        direct_query = direct_query.filter(Expense.period >= period_from)
        indirect_query = indirect_query.filter(Expense.period >= period_from)
        shared_query = shared_query.filter(Expense.period >= period_from)
    if period_to:
        rev_query = rev_query.filter(Revenue.period_start <= period_to)
        direct_query = direct_query.filter(Expense.period <= period_to)
        indirect_query = indirect_query.filter(Expense.period <= period_to)
        shared_query = shared_query.filter(Expense.period <= period_to)
    if business_unit:
        rev_query = rev_query.filter(Revenue.business_unit == business_unit)
        direct_query = direct_query.filter(Expense.business_unit == business_unit)
        indirect_query = indirect_query.filter(Expense.business_unit == business_unit)
        shared_query = shared_query.filter(Expense.business_unit == business_unit)

    total_revenue = Decimal(str(rev_query.scalar()))
    total_direct = Decimal(str(direct_query.scalar()))
    total_indirect = Decimal(str(indirect_query.scalar()))
    total_shared = Decimal(str(shared_query.scalar()))

    gross_profit = total_revenue - total_direct
    contribution_margin = gross_profit - total_indirect
    net_profit = contribution_margin - total_shared
    total_cost = total_direct + total_indirect + total_shared

    gross_margin_pct = (gross_profit / total_revenue * 100) if total_revenue > 0 else Decimal("0")
    contribution_margin_pct = (contribution_margin / total_revenue * 100) if total_revenue > 0 else Decimal("0")
    net_margin_pct = (net_profit / total_revenue * 100) if total_revenue > 0 else Decimal("0")

    return {
        "total_revenue": float(total_revenue),
        "total_direct_cost": float(total_direct),
        "total_indirect_cost": float(total_indirect),
        "total_shared_cost": float(total_shared),
        "total_cost": float(total_cost),
        "gross_profit": float(gross_profit),
        "gross_margin_pct": round(float(gross_margin_pct), 2),
        "contribution_margin": float(contribution_margin),
        "contribution_margin_pct": round(float(contribution_margin_pct), 2),
        "net_profit": float(net_profit),
        "net_margin_pct": round(float(net_margin_pct), 2),
    }


@router.get("/margin-trend")
async def margin_trend(
    months: int = Query(6, ge=1, le=24),
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    rev_monthly = db.query(
        extract("year", Revenue.period_start).label("year"),
        extract("month", Revenue.period_start).label("month"),
        func.sum(Revenue.amount_inr).label("revenue"),
    ).filter(Revenue.organization_id == org_id).group_by("year", "month").order_by("year", "month").all()

    exp_monthly = db.query(
        extract("year", Expense.period).label("year"),
        extract("month", Expense.period).label("month"),
        func.sum(Expense.amount_inr).label("cost"),
    ).filter(Expense.organization_id == org_id).group_by("year", "month").order_by("year", "month").all()

    rev_map = {(int(r[0]), int(r[1])): float(r[2]) for r in rev_monthly}
    exp_map = {(int(r[0]), int(r[1])): float(r[2]) for r in exp_monthly}

    all_periods = sorted(set(list(rev_map.keys()) + list(exp_map.keys())))[-months:]

    trend = []
    for year, month in all_periods:
        rev = rev_map.get((year, month), 0)
        cost = exp_map.get((year, month), 0)
        margin = ((rev - cost) / rev * 100) if rev > 0 else 0
        trend.append({
            "year": year,
            "month": month,
            "revenue": rev,
            "cost": cost,
            "profit": rev - cost,
            "margin_pct": round(margin, 2),
        })

    return {"trend": trend}
