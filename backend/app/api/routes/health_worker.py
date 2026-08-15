"""Health worker endpoints router for CRED screening and referrals."""

from __future__ import annotations

import time
from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.deps import get_container_dep
from app.api.schemas.health_worker import (
    ReferralSubmitRequest,
    ReferralSubmitResponse,
    ScreeningSubmitRequest,
    ScreeningSubmitResponse,
)
from app.container import Container

health_worker_router = APIRouter(prefix="/api/v1/health-worker", tags=["Personal de Salud (CRED)"])


@health_worker_router.post(
    "/screening",
    response_model=ScreeningSubmitResponse,
    summary="Registrar y evaluar tamizaje de neurodesarrollo",
)
def submit_screening(
    payload: ScreeningSubmitRequest,
    _container: Annotated[Container, Depends(get_container_dep)],
) -> ScreeningSubmitResponse:
    # Preguntas 1, 3, 4: responder "NO" (False) es falla
    # Preguntas 2, 5: responder "SÍ" (True) es señal de alerta (falla)
    failures_count = 0
    for qid, val in payload.answers.items():
        q_num = int(qid)
        if q_num in (2, 5):
            if val is True:
                failures_count += 1
        else:
            if val is False:
                failures_count += 1

    if failures_count >= 2:
        risk_level = "alto"
        risk_label = "Alto Riesgo de Neurodesarrollo"
        recommendation = "Derivar prioritariamente a evaluación multidisciplinaria en INSN San Borja."
        requires_referral = True
    elif failures_count >= 1:
        risk_level = "moderado"
        risk_label = "Riesgo Moderado / Observación"
        recommendation = "Reevaluar en 3 meses en control CRED y reforzar pautas de estimulación en casa."
        requires_referral = False
    else:
        risk_level = "bajo"
        risk_label = "Desarrollo Esperado"
        recommendation = "Continuar con controles CRED de rutina."
        requires_referral = False

    ts = int(time.time())
    patient_id = payload.patient_id or f"pat-{ts}"
    screening_id = f"scr-{ts}"

    return ScreeningSubmitResponse(
        screening_id=screening_id,
        patient_id=patient_id,
        risk_level=risk_level,
        risk_label=risk_label,
        failures_count=failures_count,
        recommendation=recommendation,
        requires_referral=requires_referral,
    )


@health_worker_router.post(
    "/referral",
    response_model=ReferralSubmitResponse,
    summary="Generar solicitud de derivación asistencial",
)
def submit_referral(
    payload: ReferralSubmitRequest,
    _container: Annotated[Container, Depends(get_container_dep)],
) -> ReferralSubmitResponse:
    """Submits a referral request for specialized evaluation."""
    code = f"REF-2026-{int(time.time()) % 10000:04d}"
    return ReferralSubmitResponse(
        referral_code=code,
        status="derivado",
        created_at=time.strftime("%Y-%m-%dT%H:%M:%SZ"),
    )
