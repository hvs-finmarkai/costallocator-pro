import uuid
from sqlalchemy import Column, String, Numeric, Date, ForeignKey, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base, TimestampMixin
import enum


class RevenueType(str, enum.Enum):
    RECURRING = "recurring"
    ONE_TIME = "one_time"
    PROJECT_BASED = "project_based"
    MILESTONE = "milestone"
    TIME_MATERIAL = "time_material"


class RevenueStatus(str, enum.Enum):
    DRAFT = "draft"
    RECOGNIZED = "recognized"
    DEFERRED = "deferred"
    INVOICED = "invoiced"
    COLLECTED = "collected"


class Revenue(Base, TimestampMixin):
    __tablename__ = "revenues"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    client_name = Column(String(255), nullable=False)
    project_name = Column(String(255), nullable=True)
    business_unit = Column(String(100), nullable=True)
    geography = Column(String(100), nullable=True)
    revenue_type = Column(Enum(RevenueType), default=RevenueType.PROJECT_BASED, nullable=False)
    status = Column(Enum(RevenueStatus), default=RevenueStatus.DRAFT, nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    currency = Column(String(10), default="INR", nullable=False)
    amount_inr = Column(Numeric(15, 2), nullable=True)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=True)
    invoice_number = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    source = Column(String(50), default="manual", nullable=False)
