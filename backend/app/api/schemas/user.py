"""Pydantic schemas for user profile and language preferences."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class UserProfileResponse(BaseModel):
    """User profile data."""

    model_config = ConfigDict(extra="forbid")

    user_id: str
    full_name: str
    role: str = Field(..., examples=["familia", "personal_salud", "especialista"])
    language: str = Field(..., examples=["es", "qu"])
    health_center: str
    phone: str


class UpdateLanguageRequest(BaseModel):
    """Payload to update preferred language."""

    model_config = ConfigDict(extra="forbid")

    language: str = Field(..., examples=["es", "qu"], description="Español (es) o Quechua (qu)")


class UpdateLanguageResponse(BaseModel):
    """Response acknowledging language change."""

    model_config = ConfigDict(extra="forbid")

    success: bool
    language: str
    message: str
