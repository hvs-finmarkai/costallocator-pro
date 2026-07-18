import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin
import enum


class RoleEnum(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    CFO = "cfo"
    COO = "coo"
    FINANCE_CONTROLLER = "finance_controller"
    ACCOUNT_MANAGER = "account_manager"
    HR = "hr"
    OPERATIONS = "operations"
    VIEWER = "viewer"


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.VIEWER, nullable=False)
    avatar = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=True)

    organization = relationship("Organization", back_populates="users")
