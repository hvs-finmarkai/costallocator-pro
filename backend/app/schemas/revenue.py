from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional
from decimal import Decimal


class RevenueCreate(BaseModel):
    client_name: str
    project_name: Optional[str] = None
    business_unit: Optional[str] = None
    geography: Optional[str] = None
    revenue_type: str = "project_based"
    status: str = "draft"
    amount: Decimal
    currency: str = "INR"
    period_start: date
    period_end: Optional[date] = None
    invoice_number: Optional[str] = None
    description: Optional[str] = None


class RevenueUpdate(BaseModel):
    client_name: Optional[str] = None
    project_name: Optional[str] = None
    business_unit: Optional[str] = None
    geography: Optional[str] = None
    revenue_type: Optional[str] = None
    status: Optional[str] = None
    amount: Optional[Decimal] = None
    currency: Optional[str] = None
    period_start: Optional[date] = None
    period_end: Optional[date] = None
    invoice_number: Optional[str] = None
    description: Optional[str] = None


class RevenueResponse(BaseModel):
    id: UUID
    organization_id: UUID
    client_name: str
    project_name: Optional[str]
    business_unit: Optional[str]
    geography: Optional[str]
    revenue_type: str
    status: str
    amount: Decimal
    currency: str
    amount_inr: Optional[Decimal]
    period_start: date
    period_end: Optional[date]
    invoice_number: Optional[str]
    description: Optional[str]
    source: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RevenueListResponse(BaseModel):
    items: list[RevenueResponse]
    total: int
    page: int
    page_size: int
