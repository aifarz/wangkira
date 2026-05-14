"""Development entry point. Boots the Flask dev server on :5000.

Production deployment is out of scope for v1 — this app is localhost-only.
"""
from __future__ import annotations

from pathlib import Path

from dotenv import load_dotenv

# Load .env from the backend/ directory before importing the app, so
# Config.from_env() sees the values.
_BACKEND_DIR = Path(__file__).resolve().parent
load_dotenv(_BACKEND_DIR / ".env")

from app import create_app  # noqa: E402 — must run after load_dotenv


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=app.config["DEBUG"])
