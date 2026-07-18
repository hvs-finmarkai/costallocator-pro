"""add pnl tables

Revision ID: 002
Revises: 001
Create Date: 2026-07-19

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "cost_centers",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("organization_id", UUID(as_uuid=True), sa.ForeignKey("organizations.id"), nullable=False),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("code", sa.String(50), nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("parent_id", UUID(as_uuid=True), sa.ForeignKey("cost_centers.id"), nullable=True),
        sa.Column("is_active", sa.Boolean, server_default="true", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_cost_centers_org_id", "cost_centers", ["organization_id"])

    op.create_table(
        "revenues",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("organization_id", UUID(as_uuid=True), sa.ForeignKey("organizations.id"), nullable=False),
        sa.Column("client_name", sa.String(255), nullable=False),
        sa.Column("project_name", sa.String(255), nullable=True),
        sa.Column("business_unit", sa.String(100), nullable=True),
        sa.Column("geography", sa.String(100), nullable=True),
        sa.Column("revenue_type", sa.String(50), server_default="project_based", nullable=False),
        sa.Column("status", sa.String(50), server_default="draft", nullable=False),
        sa.Column("amount", sa.Numeric(15, 2), nullable=False),
        sa.Column("currency", sa.String(10), server_default="INR", nullable=False),
        sa.Column("amount_inr", sa.Numeric(15, 2), nullable=True),
        sa.Column("period_start", sa.Date, nullable=False),
        sa.Column("period_end", sa.Date, nullable=True),
        sa.Column("invoice_number", sa.String(100), nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("source", sa.String(50), server_default="manual", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_revenues_org_id", "revenues", ["organization_id"])

    op.create_table(
        "expenses",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("organization_id", UUID(as_uuid=True), sa.ForeignKey("organizations.id"), nullable=False),
        sa.Column("cost_center_id", UUID(as_uuid=True), sa.ForeignKey("cost_centers.id"), nullable=True),
        sa.Column("client_name", sa.String(255), nullable=True),
        sa.Column("project_name", sa.String(255), nullable=True),
        sa.Column("business_unit", sa.String(100), nullable=True),
        sa.Column("category", sa.String(50), nullable=False),
        sa.Column("expense_type", sa.String(50), server_default="direct", nullable=False),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("amount", sa.Numeric(15, 2), nullable=False),
        sa.Column("currency", sa.String(10), server_default="INR", nullable=False),
        sa.Column("amount_inr", sa.Numeric(15, 2), nullable=True),
        sa.Column("period", sa.Date, nullable=False),
        sa.Column("vendor_name", sa.String(255), nullable=True),
        sa.Column("is_recurring", sa.Boolean, server_default="false", nullable=False),
        sa.Column("source", sa.String(50), server_default="manual", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_expenses_org_id", "expenses", ["organization_id"])

    op.create_table(
        "budgets",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("organization_id", UUID(as_uuid=True), sa.ForeignKey("organizations.id"), nullable=False),
        sa.Column("budget_type", sa.String(50), nullable=False),
        sa.Column("business_unit", sa.String(100), nullable=True),
        sa.Column("client_name", sa.String(255), nullable=True),
        sa.Column("category", sa.String(100), nullable=True),
        sa.Column("fiscal_year", sa.Integer, nullable=False),
        sa.Column("month", sa.Integer, nullable=False),
        sa.Column("amount", sa.Numeric(15, 2), nullable=False),
        sa.Column("currency", sa.String(10), server_default="INR", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_budgets_org_id", "budgets", ["organization_id"])

    op.create_table(
        "exchange_rates",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("base_currency", sa.String(10), nullable=False),
        sa.Column("target_currency", sa.String(10), nullable=False),
        sa.Column("rate", sa.Numeric(12, 6), nullable=False),
        sa.Column("rate_date", sa.Date, nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("base_currency", "target_currency", "rate_date", name="uq_exchange_rate"),
    )


def downgrade() -> None:
    op.drop_table("exchange_rates")
    op.drop_table("budgets")
    op.drop_table("expenses")
    op.drop_table("revenues")
    op.drop_table("cost_centers")
