"""Family endpoints router for roadmap and child status overview."""

from __future__ import annotations

from fastapi import APIRouter

from app.api.schemas.family import FamilySummaryResponse, RoadmapStep

family_router = APIRouter(prefix="/api/v1/family", tags=["Familia"])

MOCK_FAMILY_SUMMARY = FamilySummaryResponse(
    child_name="Mateo Jiménez Ramos",
    age_display="18 meses",
    current_step_title="Paso 3: Evaluación Multidisciplinaria en INSN San Borja",
    next_appointment="Jueves 20 de Agosto - 10:30 AM (Neurología Pediátrica)",
    neuro_coins=120,
    roadmap_steps=[
        RoadmapStep(
            step_number=1,
            title="Detección Inicial en Control CRED",
            description="Tamizaje completado en C.S. San Juan de Lurigancho.",
            status="completado",
            date_display="15 Julio 2026",
        ),
        RoadmapStep(
            step_number=2,
            title="Referencia Asistencial Generada",
            description="Derivación enviada prioritariamente a INSN San Borja.",
            status="completado",
            date_display="20 Julio 2026",
        ),
        RoadmapStep(
            step_number=3,
            title="Evaluación Multidisciplinaria",
            description="Sesiones unificadas de Neurología, Psicología y Terapias.",
            status="en_curso",
            date_display="En progreso",
        ),
        RoadmapStep(
            step_number=4,
            title="Plan Terapéutico y Refuerzo en Casa",
            description="Seguimiento continuo y pautas de estimulación.",
            status="pendiente",
            date_display="Próximamente",
        ),
    ],
)


@family_router.get(
    "/summary",
    response_model=FamilySummaryResponse,
    summary="Resumen de proceso del niño para el hogar",
)
def get_family_summary() -> FamilySummaryResponse:
    """Returns child's roadmap summary for family home screen."""
    return MOCK_FAMILY_SUMMARY
