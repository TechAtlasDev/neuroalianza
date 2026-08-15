"""Appointments and gamification coins endpoint router."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Query

from app.api.schemas.appointments import (
    AppointmentItem,
    AppointmentsListResponse,
    ClaimCoinsRequest,
    ClaimCoinsResponse,
)

appointments_router = APIRouter(prefix="/api/v1/appointments", tags=["Citas y Seguimiento"])

MOCK_APPOINTMENTS = [
    AppointmentItem(
        id="apt-1",
        patient_id="pat-1",
        specialty="Neurología Pediátrica",
        specialist="Dr. Arnaldo Silva",
        date_display="Jueves 20 de Agosto",
        time_display="10:30 AM",
        location="INSN San Borja - Consultorio 402",
        status="programada",
    ),
    AppointmentItem(
        id="apt-2",
        patient_id="pat-1",
        specialty="Terapia de Lenguaje",
        specialist="Lic. Carmen Huamán",
        date_display="Viernes 21 de Agosto",
        time_display="09:00 AM",
        location="INSN San Borja - Módulo Terapias B",
        status="programada",
    ),
]


@appointments_router.get(
    "",
    response_model=AppointmentsListResponse,
    summary="Listar citas agendadas del paciente",
)
def get_appointments(
    patient_id: Annotated[str | None, Query(description="Filtrar por ID del paciente")] = None,
) -> AppointmentsListResponse:
    """Returns scheduled appointments for a patient."""
    filtered = MOCK_APPOINTMENTS
    if patient_id:
        filtered = [a for a in filtered if a.patient_id == patient_id]
    return AppointmentsListResponse(total=len(filtered), appointments=filtered)


@appointments_router.post(
    "/claim-coins",
    response_model=ClaimCoinsResponse,
    summary="Reclamar coins por puntualidad o actividades en casa",
)
def claim_coins(payload: ClaimCoinsRequest) -> ClaimCoinsResponse:
    """Claims gamification coins for attendance and home activities."""
    awarded = 50 if payload.activity_type == "asistencia_cita" else 20
    return ClaimCoinsResponse(
        coins_awarded=awarded,
        total_coins=170,
        message=f"¡Has ganado {awarded} NeuroCoins! Gracias por comprometerte con el neurodesarrollo en el hogar.",
    )
