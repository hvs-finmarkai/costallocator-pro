from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.models.organization import Organization
from app.models.refresh_token import RefreshToken
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    ForgotPasswordRequest,
    AuthResponse,
    UserResponse,
    RefreshTokenRequest,
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    get_current_user,
    decode_token,
    hash_token,
)
from app.core.config import get_settings
from app.services.audit import log_action

router = APIRouter(prefix="/auth", tags=["Authentication"])


def _store_refresh_token(db: Session, user_id, token: str):
    settings = get_settings()
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)
    rt = RefreshToken(
        user_id=user_id,
        token_hash=hash_token(token),
        expires_at=expires_at,
    )
    db.add(rt)
    db.commit()


def _revoke_refresh_token(db: Session, token: str):
    token_hash = hash_token(token)
    rt = db.query(RefreshToken).filter(
        RefreshToken.token_hash == token_hash,
        RefreshToken.is_revoked == False,
    ).first()
    if rt:
        rt.is_revoked = True
        rt.revoked_at = datetime.now(timezone.utc)
        db.commit()


@router.post("/login", response_model=AuthResponse)
async def login(request_body: LoginRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_body.email).first()
    if not user or not verify_password(request_body.password, user.hashed_password):
        log_action(
            db, action="login_failed", resource="auth",
            details={"email": request_body.email}, request=request,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    _store_refresh_token(db, user.id, refresh_token)

    log_action(
        db, action="login", resource="auth",
        user_id=user.id, organization_id=user.organization_id,
        request=request,
    )

    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post("/register", response_model=AuthResponse)
async def register(request_body: RegisterRequest, request: Request, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == request_body.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    organization = Organization(name=request_body.organization_name)
    db.add(organization)
    db.flush()

    user = User(
        email=request_body.email,
        hashed_password=hash_password(request_body.password),
        first_name=request_body.first_name,
        last_name=request_body.last_name,
        role="super_admin",
        organization_id=organization.id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    _store_refresh_token(db, user.id, refresh_token)

    log_action(
        db, action="register", resource="auth",
        user_id=user.id, organization_id=organization.id,
        details={"organization_name": request_body.organization_name},
        request=request,
    )

    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)


@router.post("/refresh", response_model=AuthResponse)
async def refresh(request_body: RefreshTokenRequest, db: Session = Depends(get_db)):
    payload = decode_token(request_body.refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    token_hash = hash_token(request_body.refresh_token)
    stored_token = db.query(RefreshToken).filter(
        RefreshToken.token_hash == token_hash,
        RefreshToken.is_revoked == False,
    ).first()

    if not stored_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found or already revoked",
        )

    if stored_token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expired",
        )

    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id, User.is_active == True).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    _revoke_refresh_token(db, request_body.refresh_token)

    new_access_token = create_access_token(data={"sub": str(user.id)})
    new_refresh_token = create_refresh_token(data={"sub": str(user.id)})
    _store_refresh_token(db, user.id, new_refresh_token)

    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=new_access_token,
        refresh_token=new_refresh_token,
    )


@router.post("/logout")
async def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.query(RefreshToken).filter(
        RefreshToken.user_id == current_user.id,
        RefreshToken.is_revoked == False,
    ).update({"is_revoked": True, "revoked_at": datetime.now(timezone.utc)})
    db.commit()

    log_action(
        db, action="logout", resource="auth",
        user_id=current_user.id, organization_id=current_user.organization_id,
        request=request,
    )

    return {"message": "Logged out successfully, all sessions revoked"}


@router.post("/forgot-password")
async def forgot_password(request_body: ForgotPasswordRequest, db: Session = Depends(get_db)):
    return {"message": "If the email exists, a reset link has been sent"}
