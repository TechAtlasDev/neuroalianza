"""Pydantic schemas for resources endpoints."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class EducationalResourceItem(BaseModel):
    """Educational resource metadata."""

    model_config = ConfigDict(extra="forbid")

    id: str = Field(..., examples=["res-1"])
    title: str = Field(..., examples=["Guía de Estimulación del Lenguaje"])
    type: str = Field(..., examples=["pdf", "video", "markdown", "image"])
    category: str = Field(..., examples=["lenguaje", "motor", "conducta", "familiar"])
    min_age_months: int = Field(default=0, ge=0)
    max_age_months: int = Field(default=60, le=72)
    summary: str = Field(..., description="Breve resumen en lenguaje sencillo")
    url: str = Field(..., description="Ruta o enlace de acceso")


class ResourcesListResponse(BaseModel):
    """List response for educational resources."""

    model_config = ConfigDict(extra="forbid")

    total: int
    items: list[EducationalResourceItem]
