import uuid
from sqlalchemy import Column, String, Numeric, Date, ForeignKey, Enum, Boolean, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base, TimestampMixin
import enum


class ExpenseCategory(str, enum.Enum):
    EMPLOYEE = "employee"
    VENDOR = "vendor"
    INFRASTRUCTURE = "infrastructure"
    TRAVEL = "travel"
    SOFTWARE = "software"
    MARKETING = "marketing"
    OPERATIONAL = "operational"
    OVERHEAD = "overhead"
    OTHER = "other"


class ExpenseType(str, enum.Enum):
    DIRECT = "direct"
    INDIRECT = "indirect"
    SHARED = "shared"


class Expense(Base, TimestampMixin):
    __tablename__ = "expenses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    cost_center_id = Column(UUID(as_uuid=True), ForeignKey("cost_centers.id"), nullable=True)
    client_name = Column(String(255), nullable=True)
    project_name = Column(String(255), nullable=True)
    business_unit = Column(String(100), nullable=True)
    category = Column(Enum(ExpenseCategory), nullable=False)
    expense_type = Column(Enum(ExpenseType), default=ExpenseType.DIRECT, nullable=False)
    description = Column(Text, nullable=True)
    amount = Column(Numeric(15, 2), nullable=False)
    currency = Column(String(10), default="INR", nullable=False)
    amount_inr = Column(Numeric(15, 2), nullable=True)
    period = Column(Date, nullable=False)
    vendor_name = Column(String(255), nullable=True)
    is_recurring = Column(Boolean, default=False, nullable=False)
    source = Column(String(50), default="manual", nullable=False)
