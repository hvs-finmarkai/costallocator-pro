from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from uuid import UUID
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserResponse, UserListResponse
from app.core.security import hash_password, get_current_user, require_roles, get_org_filter
from app.services.audit import log_action

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=UserListResponse)
async def list_users(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: str = Query(None),
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    query = db.query(User).filter(User.organization_id == org_id)

    if search:
        query = query.filter(
            (User.first_name.ilike(f"%{search}%"))
            | (User.last_name.ilike(f"%{search}%"))
            | (User.email.ilike(f"%{search}%"))
        )

    total = query.count()
    users = query.offset((page - 1) * page_size).limit(page_size).all()

    return UserListResponse(
        users=[UserResponse.model_validate(u) for u in users],
        total=total,
        page=page,
        page_size=page_size,
    )


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    request_body: UserCreate,
    request: Request,
    current_user: User = Depends(require_roles("super_admin", "cfo")),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    existing = db.query(User).filter(User.email == request_body.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")

    user = User(
        email=request_body.email,
        hashed_password=hash_password(request_body.password),
        first_name=request_body.first_name,
        last_name=request_body.last_name,
        role=request_body.role,
        organization_id=org_id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    log_action(
        db, action="create", resource="user",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(user.id),
        details={"email": user.email, "role": request_body.role},
        request=request,
    )

    return UserResponse.model_validate(user)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    current_user: User = Depends(get_current_user),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id, User.organization_id == org_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserResponse.model_validate(user)


@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: UUID,
    request_body: UserUpdate,
    request: Request,
    current_user: User = Depends(require_roles("super_admin", "cfo")),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id, User.organization_id == org_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    update_data = request_body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)

    log_action(
        db, action="update", resource="user",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(user.id), details=update_data,
        request=request,
    )

    return UserResponse.model_validate(user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: UUID,
    request: Request,
    current_user: User = Depends(require_roles("super_admin")),
    org_id: UUID = Depends(get_org_filter),
    db: Session = Depends(get_db),
):
    if user_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot delete yourself")

    user = db.query(User).filter(User.id == user_id, User.organization_id == org_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    log_action(
        db, action="delete", resource="user",
        user_id=current_user.id, organization_id=org_id,
        resource_id=str(user.id), details={"email": user.email},
        request=request,
    )

    db.delete(user)
    db.commit()
