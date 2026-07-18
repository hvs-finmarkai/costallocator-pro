import uuid
from sqlalchemy import Column, String, Numeric, Date, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base, TimestampMixin


class ExchangeRate(Base, TimestampMixin):
    __tablename__ = "exchange_rates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    base_currency = Column(String(10), nullable=False)
    target_currency = Column(String(10), nullable=False)
    rate = Column(Numeric(12, 6), nullable=False)
    rate_date = Column(Date, nullable=False)

    __table_args__ = (
        UniqueConstraint("base_currency", "target_currency", "rate_date", name="uq_exchange_rate"),
    )
