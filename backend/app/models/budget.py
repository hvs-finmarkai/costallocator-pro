import uuid
from sqlalchemy import Column, String, Numeric, Integer, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base, TimestampMixin
import enum


class BudgetType(str, enum.Enum):
    REVENUE = "revenue"
    EXPENSE = "expense"


class Budget(Base, TimestampMixin):
    __tablename__ = "budgets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    budget_type = Column(Enum(BudgetType), nullable=False)
    business_unit = Column(String(100), nullable=True)
    client_name = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    fiscal_year = Column(Integer, nullable=False)
    month = Column(Integer, nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    currency = Column(String(10), default="INR", nullable=False)
