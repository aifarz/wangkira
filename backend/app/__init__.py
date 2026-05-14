"""Flask application factory.

Phase 0 / T-002 scope: minimal app boot with /api/health.
The full blueprint structure lands in T-014; until then the health
endpoint is wired directly on the app.
"""
from __future__ import annotations

from flask import Flask, jsonify
from flask_cors import CORS

from .config import Config


def create_app(config: Config | None = None) -> Flask:
    app = Flask(__name__)
    cfg = config or Config.from_env()

    app.config["SECRET_KEY"] = cfg.secret_key
    app.config["DATABASE_URL"] = cfg.database_url
    app.config["TIMEZONE"] = cfg.timezone
    app.config["FRONTEND_ORIGIN"] = cfg.frontend_origin
    app.config["DEBUG"] = cfg.debug

    CORS(app, resources={r"/api/*": {"origins": cfg.frontend_origin}})

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "tz": app.config["TIMEZONE"]})

    return app
