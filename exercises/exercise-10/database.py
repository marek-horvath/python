import os

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from models import Base

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///notes.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)


def create_schema() -> None:
    Base.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
