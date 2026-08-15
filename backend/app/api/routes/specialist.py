"""Specialist endpoints router for 360 casefile and multidisciplinary notes."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Path

from app.api.deps import get_container_dep
from app.api.schemas.specialist import (
    AddClinicalNoteRequest,
    Casefile360Response,
    ClinicalNoteItem,
)
from app.container import Container

specialist_router = APIRouter(prefix="/api/v1/specialist", tags=["Especialistas Clínicos (Ficha 360°)"])

MOCK_CASE_360 = Casefile360Response(
    case_id="case-101",
    patient_id="pat-1",
    patient_name="Mateo Jiménez Ramos",
    age_display="18 meses",
    current_status="en_evaluacion",
    risk_level="alto",
    primary_diagnosis_working="Sospecha de Trastorno del Espectro Autista (TEA Nivel 1/2)",
    clinical_notes=[
        ClinicalNoteItem(
            specialty="Neurología Pediátrica",
            specialist_name="Dr. Arnaldo Silva (INSN SB)",
            date="2026-08-10",
            findings="Retraso en la adquisición de pautas del lenguaje expresivo. Ausencia de contacto visual sostenido.",
            plan="Solicitar evaluación neuropsicológica y perfil auditivo. Iniciar terapia de lenguaje 2v/semana.",
        ),
        ClinicalNoteItem(
            specialty="Psicología Infantil",
            specialist_name="Dra. Carmen Rosa Vargas",
            date="2026-08-12",
            findings="Dificultad en atención conjunta. Respuesta intermitente a su nombre.",
            plan="Pautas de interacción cara a cara en casa. Evaluación ADOS-2 programada.",
        ),
    ],
    multidisciplinary_goals=[
        "Incrementar contacto visual intencional durante el juego a > 5 segundos",
        "Lograr uso de 5 gestos comunicativos (señalar, decir adiós con la mano)",
        "Acompañamiento psicoeducativo familiar quincenal",
    ],
)


@specialist_router.get(
    "/cases/{case_id}",
    response_model=Casefile360Response,
    summary="Obtener Ficha Multidisciplinaria 360° del paciente",
)
def get_casefile_360(
    case_id: Annotated[str, Path(description="ID del caso expedicionado")],
    _container: Annotated[Container, Depends(get_container_dep)],
) -> Casefile360Response:
    """Returns multidisciplinary 360 casefile consolidating all specialty evaluations."""
    return MOCK_CASE_360


@specialist_router.post(
    "/cases/{case_id}/notes",
    response_model=Casefile360Response,
    summary="Agregar nota clínica de especialidad",
)
def add_clinical_note(
    case_id: Annotated[str, Path(description="ID del caso expedicionado")],
    payload: AddClinicalNoteRequest,
    _container: Annotated[Container, Depends(get_container_dep)],
) -> Casefile360Response:
    """Appends specialty clinical note to 360 casefile."""
    new_note = ClinicalNoteItem(
        specialty=payload.specialty,
        specialist_name=payload.specialist_name,
        date="2026-08-15",
        findings=payload.findings,
        plan=payload.plan,
    )
    MOCK_CASE_360.clinical_notes.append(new_note)
    return MOCK_CASE_360
