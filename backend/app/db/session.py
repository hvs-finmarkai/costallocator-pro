from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

_engine = None
_SessionLocal = None


def _get_db_url():
    from app.core.config import get_settings
    settings = get_settings()
    url = settings.database_url
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+pg8000://", 1)
    elif url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+pg8000://", 1)
    return url


def get_engine():
    global _engine
    if _engine is None:
        url = _get_db_url()
        connect_args = {}
        if "neon.tech" in url or "sslmode=require" in url:
            import ssl
            ssl_context = ssl.create_default_context()
            connect_args["ssl_context"] = ssl_context
            if "?sslmode=require" in url:
                url = url.replace("?sslmode=require", "")
            elif "&sslmode=require" in url:
                url = url.replace("&sslmode=require", "")
        _engine = create_engine(
            url,
            pool_pre_ping=True,
            pool_size=5,
            max_overflow=10,
            pool_recycle=300,
            connect_args=connect_args,
        )
    return _engine


def get_session_local():
    global _SessionLocal
    if _SessionLocal is None:
        _SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=get_engine())
    return _SessionLocal


def get_db() -> Generator[Session, None, None]:
    SessionLocal = get_session_local()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
