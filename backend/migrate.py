import sys
sys.path.insert(0, ".")

from app.core.config import get_settings
from app.db.base import Base
from app.models import *
from sqlalchemy import create_engine, text, inspect

settings = get_settings()
engine = create_engine(settings.database_url)

inspector = inspect(engine)
existing_tables = inspector.get_table_names()

print(f"Existing tables: {existing_tables}")

Base.metadata.create_all(bind=engine, checkfirst=True)

with engine.connect() as conn:
    result = inspector.get_table_names()
    print(f"Tables after migration: {result}")

print("Migration complete.")
