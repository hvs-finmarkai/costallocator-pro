import uuid
from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    domain = Column(String(255), unique=True, nullable=True)
    logo = Column(String(500), nullable=True)
    currency = Column(String(10), default="INR", nullable=False)
    fiscal_year_start = Column(Integer, default=4, nullable=False)

    users = relationship("User", back_populates="organization")
