from pydantic import BaseModel
from decimal import Decimal
from typing import Optional


class PnLSummary(BaseModel):
    period: str
    total_revenue: Decimal
    total_direct_cost: Decimal
    total_indirect_cost: Decimal
    total_shared_cost: Decimal
    gross_profit: Decimal
    gross_margin_pct: Decimal
    contribution_margin: Decimal
    contribution_margin_pct: Decimal
    net_profit: Decimal
    net_margin_pct: Decimal


class BudgetVariance(BaseModel):
    category: str
    budget_amount: Decimal
    actual_amount: Decimal
    variance: Decimal
    variance_pct: Decimal


class PnLDashboardResponse(BaseModel):
    summary: PnLSummary
    revenue_by_client: list[dict]
    revenue_by_geography: list[dict]
    revenue_by_bu: list[dict]
    cost_by_category: list[dict]
    margin_trend: list[dict]
    budget_variances: list[BudgetVariance]


class RevenueStatsResponse(BaseModel):
    total_revenue: Decimal
    revenue_change_pct: Optional[Decimal]
    top_clients: list[dict]
    revenue_by_type: list[dict]
    monthly_trend: list[dict]
