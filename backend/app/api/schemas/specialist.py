"""Pydantic schemas for specialist / 360 casefile endpoints."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class ClinicalNoteItem(BaseModel):
    """Clinical note entry in 360 casefile."""

    model_config = ConfigDict(extra="forbid")

    specialty: str = Field(..., examples=["Neurología Pediátrica", "Psiquiatría Infantil", "Psicología", "Genética"])
    specialist_name: str
    date: str
    findings: str
    plan: str


class Casefile360Response(BaseModel):
    """Unified multidisciplinary 360 casefile."""

    model_config = ConfigDict(extra="forbid")

    case_id: str
    patient_id: str
    patient_name: str
    age_display: str
    current_status: str
    risk_level: str
    primary_diagnosis_working: str
    clinical_notes: list[ClinicalNoteItem]
    multidisciplinary_goals: list[str]


class AddClinicalNoteRequest(BaseModel):
    """Payload to append a clinical note."""

    model_config = ConfigDict(extra="forbid")

    specialty: str = Field(..., examples=["Neurología Pediátrica", "Psicología"])
    specialist_name: str
    findings: str
    plan: str
