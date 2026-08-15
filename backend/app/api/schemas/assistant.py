"""Pydantic schemas for the AI assistant chatbot endpoint."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class RecommendedResource(BaseModel):
    """Resource recommendation attached to assistant response."""

    model_config = ConfigDict(extra="forbid")

    id: str = Field(..., description="Unique resource identifier")
    title: str = Field(..., description="Title of the educational material")
    category: str = Field(..., description="Category (lenguaje, motor, conducta, familiar)")
    url: str = Field(..., description="Access URL or path")


class ChatMessageRequest(BaseModel):
    """Request payload sent to the AI assistant."""

    model_config = ConfigDict(extra="forbid")

    user_message: str = Field(
        ..., min_length=2, max_length=1000, description="Consulta de la familia o personal de salud"
    )
    patient_id: str | None = Field(
        default=None, description="ID opcional del paciente para contextualización"
    )
    language: str = Field(
        default="es", description="Idioma preferido: 'es' (Español) o 'qu' (Quechua)"
    )


class ChatMessageResponse(BaseModel):
    """Response payload returned by the AI assistant."""

    model_config = ConfigDict(extra="forbid")

    reply: str = Field(..., description="Respuesta orientativa y empática del asistente")
    recommended_resources: list[RecommendedResource] = Field(
        default_factory=list, description="Lista de recursos educativos sugeridos"
    )
    suggested_actions: list[str] = Field(
        default_factory=list, description="Acciones recomendadas a seguir"
    )
