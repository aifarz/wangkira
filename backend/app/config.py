"""Application configuration loaded from environment variables.

Values are pulled from the process environment (populated by python-dotenv
when run.py loads .env). Defaults are safe for local development only.
"""
from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Config:
    database_url: str
    timezone: str
    secret_key: str
    frontend_origin: str
    debug: bool

    @classmethod
    def from_env(cls) -> "Config":
        return cls(
            database_url=os.environ.get("DATABASE_URL", "sqlite:///wangkira.db"),
            timezone=os.environ.get("TIMEZONE", "Asia/Kuala_Lumpur"),
            secret_key=os.environ.get("SECRET_KEY", "dev-only-change-me"),
            frontend_origin=os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173"),
            debug=os.environ.get("FLASK_DEBUG", "0") in ("1", "true", "True"),
        )
