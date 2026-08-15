"""API routes package."""

from __future__ import annotations

from app.api.routes.admin import admin_router
from app.api.routes.appointments import appointments_router
from app.api.routes.assistant import assistant_router
from app.api.routes.family import family_router
from app.api.routes.health_worker import health_worker_router
from app.api.routes.resources import resources_router
from app.api.routes.specialist import specialist_router
from app.api.routes.system import system_router
from app.api.routes.user import user_router

__all__ = [
    "admin_router",
    "appointments_router",
    "assistant_router",
    "family_router",
    "health_worker_router",
    "resources_router",
    "specialist_router",
    "system_router",
    "user_router",
]


