from sqlalchemy.orm import Session
from fastapi import Request
from app.models.audit_log import AuditLog
from uuid import UUID
from typing import Optional


def log_action(
    db: Session,
    action: str,
    resource: str,
    user_id: Optional[UUID] = None,
    organization_id: Optional[UUID] = None,
    resource_id: Optional[str] = None,
    details: Optional[dict] = None,
    request: Optional[Request] = None,
):
    ip_address = None
    user_agent = None
    if request:
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")

    entry = AuditLog(
        user_id=user_id,
        organization_id=organization_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        details=details,
        ip_address=ip_address,
        user_agent=user_agent,
    )
    db.add(entry)
    db.commit()
