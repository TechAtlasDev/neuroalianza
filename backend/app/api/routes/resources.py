"""Educational resources endpoint router."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Query

from app.api.schemas.resources import EducationalResourceItem, ResourcesListResponse

resources_router = APIRouter(prefix="/api/v1/resources", tags=["Recursos Educativos"])

MOCK_CATALOG = [
    EducationalResourceItem(
        id="res-pdf-1",
        title="Guía Práctica CRED: Hitos del Desarrollo Infantil (0 a 3 años)",
        type="pdf",
        category="familiar",
        min_age_months=0,
        max_age_months=36,
        summary="Documento ilustrado con actividades de estimulación temprana para padres.",
        url="/docs/guia_cred_hitos.pdf",
    ),
    EducationalResourceItem(
        id="res-vid-1",
        title="Video: Ejercicios de Imitación y Balbuceo en Casa",
        type="video",
        category="lenguaje",
        min_age_months=6,
        max_age_months=24,
        summary="Video instructivo de 3 minutos sobre cómo estimular el habla.",
        url="https://youtube.com/watch?v=demo_neuroalianza_1",
    ),
    EducationalResourceItem(
        id="res-img-1",
        title="Infografía: Señales de Alerta en la Interacción Social",
        type="image",
        category="conducta",
        min_age_months=12,
        max_age_months=60,
        summary="Infografía visual para reconocer señales tempranas del espectro autista.",
        url="/assets/infografia_alertas_social.png",
    ),
    EducationalResourceItem(
        id="res-md-1",
        title="Pautas para el Manejo de Berrinches y Autorregulación",
        type="markdown",
        category="conducta",
        min_age_months=18,
        max_age_months=60,
        summary="Estrategias de calma respetuosa sin uso de pantallas.",
        url="/resources/pautas_autorregulacion.md",
    ),
]


@resources_router.get(
    "",
    response_model=ResourcesListResponse,
    summary="Listar recursos educativos estandarizados",
)
def get_educational_resources(
    category: Annotated[str | None, Query(description="Filtrar por categoría")] = None,
    age_months: Annotated[int | None, Query(description="Filtrar por edad del niño en meses")] = None,
) -> ResourcesListResponse:
    """Returns educational resources filtered by category or child age."""
    filtered = MOCK_CATALOG
    if category:
        filtered = [r for r in filtered if r.category == category]
    if age_months is not None:
        filtered = [r for r in filtered if r.min_age_months <= age_months <= r.max_age_months]

    return ResourcesListResponse(total=len(filtered), items=filtered)
