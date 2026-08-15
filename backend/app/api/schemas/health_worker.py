"""Pydantic schemas for health worker / CRED screening endpoints."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class ScreeningSubmitRequest(BaseModel):
    """Payload to submit a screening questionnaire."""

    model_config = ConfigDict(extra="forbid")

    patient_id: str | None = Field(default=None, description="ID del paciente si ya está registrado")
    patient_name: str = Field(..., description="Nombre completo del niño")
    age_months: int = Field(..., ge=0, le=72, description="Edad en meses")
    dni: str = Field(..., description="DNI del niño")
    guardian_name: str = Field(..., description="Nombre del apoderado")
    guardian_phone: str = Field(..., description="Teléfono del apoderado")
    health_center_origin: str = Field(..., description="Centro de salud o posta de origen")
    answers: dict[int, bool] = Field(
        ..., description="Respuestas a las preguntas clínicas (pregunta_id: verdadero/falso)"
    )


class ScreeningSubmitResponse(BaseModel):
    """Result of a screening evaluation."""

    model_config = ConfigDict(extra="forbid")

    screening_id: str
    patient_id: str
    risk_level: str = Field(..., examples=["bajo", "moderado", "alto"])
    risk_label: str = Field(..., examples=["Alto Riesgo de Neurodesarrollo"])
    failures_count: int
    recommendation: str
    requires_referral: bool


class ReferralSubmitRequest(BaseModel):
    """Payload to submit a medical referral."""

    model_config = ConfigDict(extra="forbid")

    patient_id: str
    findings: list[str]
    priority: str = Field(default="alta", examples=["alta", "media", "ordinaria"])
    notes: str
    target_center: str = Field(default="INSN San Borja")


class ReferralSubmitResponse(BaseModel):
    """Response acknowledging referral submission."""

    model_config = ConfigDict(extra="forbid")

    referral_code: str
    status: str
    created_at: str
