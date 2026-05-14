"""SQLAlchemy engine, session factory, and declarative Base.

Phase 0 / T-003 scope: expose ``Base``, ``engine``, ``SessionLocal`` so the
rest of the app and Alembic can build on them. Models register against
``Base`` from T-005 onward.

SQLite is configured at connect time to enable WAL journaling and
foreign-key enforcement. Both are connection-scoped pragmas in SQLite,
so they must be re-issued for every new connection — hence the
``connect`` event listener.
"""
from __future__ import annotations

import sqlite3

from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, scoped_session, sessionmaker

from .config import Config


class Base(DeclarativeBase):
    """Shared declarative base. All models inherit from this."""


_cfg = Config.from_env()

_is_sqlite = _cfg.database_url.startswith("sqlite")

engine = create_engine(
    _cfg.database_url,
    future=True,
    connect_args={"check_same_thread": False} if _is_sqlite else {},
)

SessionLocal = scoped_session(
    sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
)


@event.listens_for(Engine, "connect")
def _set_sqlite_pragmas(dbapi_connection, connection_record) -> None:
    """Enable WAL journaling + foreign-key enforcement on every SQLite connect.

    Both pragmas are connection-scoped, so they have to be re-issued for
    every new connection. The dbapi check keeps this safe if DATABASE_URL
    is ever pointed at a non-SQLite backend in dev.
    """
    if not isinstance(dbapi_connection, sqlite3.Connection):
        return
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
