"""Pydantic schemas for appointments and gamification coins."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class AppointmentItem(BaseModel):
    """Appointment record."""

    model_config = ConfigDict(extra="forbid")

    id: str
    patient_id: str
    specialty: str
    specialist: str
    date_display: str
    time_display: str
    location: str
    status: str = Field(..., examples=["programada", "asistida", "reagendada", "cancelada"])


class AppointmentsListResponse(BaseModel):
    """List response for appointments."""

    model_config = ConfigDict(extra="forbid")

    total: int
    appointments: list[AppointmentItem]


class ClaimCoinsRequest(BaseModel):
    """Payload to claim reward coins for appointment attendance / home activity."""

    model_config = ConfigDict(extra="forbid")

    patient_id: str
    activity_type: str = Field(..., examples=["asistencia_cita", "ejercicio_hogar_completado"])


class ClaimCoinsResponse(BaseModel):
    """Response confirming coins awarded."""

    model_config = ConfigDict(extra="forbid")

    coins_awarded: int
    total_coins: int
    message: str
