import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base, TimestampMixin


class CostCenter(Base, TimestampMixin):
    __tablename__ = "cost_centers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    name = Column(String(200), nullable=False)
    code = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    parent_id = Column(UUID(as_uuid=True), ForeignKey("cost_centers.id"), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
