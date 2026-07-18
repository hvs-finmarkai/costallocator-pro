from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional
from decimal import Decimal


class ExpenseCreate(BaseModel):
    cost_center_id: Optional[UUID] = None
    client_name: Optional[str] = None
    project_name: Optional[str] = None
    business_unit: Optional[str] = None
    category: str
    expense_type: str = "direct"
    description: Optional[str] = None
    amount: Decimal
    currency: str = "INR"
    period: date
    vendor_name: Optional[str] = None
    is_recurring: bool = False


class ExpenseUpdate(BaseModel):
    cost_center_id: Optional[UUID] = None
    client_name: Optional[str] = None
    project_name: Optional[str] = None
    business_unit: Optional[str] = None
    category: Optional[str] = None
    expense_type: Optional[str] = None
    description: Optional[str] = None
    amount: Optional[Decimal] = None
    currency: Optional[str] = None
    period: Optional[date] = None
    vendor_name: Optional[str] = None
    is_recurring: Optional[bool] = None


class ExpenseResponse(BaseModel):
    id: UUID
    organization_id: UUID
    cost_center_id: Optional[UUID]
    client_name: Optional[str]
    project_name: Optional[str]
    business_unit: Optional[str]
    category: str
    expense_type: str
    description: Optional[str]
    amount: Decimal
    currency: str
    amount_inr: Optional[Decimal]
    period: date
    vendor_name: Optional[str]
    is_recurring: bool
    source: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ExpenseListResponse(BaseModel):
    items: list[ExpenseResponse]
    total: int
    page: int
    page_size: int
