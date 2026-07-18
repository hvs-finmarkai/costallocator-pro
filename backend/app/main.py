from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.v1 import api_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_db_initialized = False


@app.middleware("http")
async def ensure_db_tables(request: Request, call_next):
    global _db_initialized
    if not _db_initialized:
        try:
            from app.db.base import Base
            from app.db.session import get_engine
            from app.models import User, Organization, Role, Permission
            engine = get_engine()
            Base.metadata.create_all(bind=engine)
            _db_initialized = True
        except Exception:
            pass
    return await call_next(request)


app.include_router(api_router)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": settings.app_version}


@app.get("/")
async def root():
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/health",
    }
