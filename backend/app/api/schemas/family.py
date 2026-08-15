"""Pydantic schemas for family roadmap endpoints."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class RoadmapStep(BaseModel):
    """Step in family roadmap visual timeline."""

    model_config = ConfigDict(extra="forbid")

    step_number: int
    title: str
    description: str
    status: str = Field(..., examples=["completado", "en_curso", "pendiente"])
    date_display: str


class FamilySummaryResponse(BaseModel):
    """Summary of child progress for family home screen."""

    model_config = ConfigDict(extra="forbid")

    child_name: str
    age_display: str
    current_step_title: str
    next_appointment: str
    neuro_coins: int
    roadmap_steps: list[RoadmapStep]
