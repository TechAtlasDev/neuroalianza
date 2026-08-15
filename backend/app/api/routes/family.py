"""Family endpoints router."""

from __future__ import annotations

from fastapi import APIRouter

family_router = APIRouter(prefix="/api/v1/family", tags=["Familia"])
