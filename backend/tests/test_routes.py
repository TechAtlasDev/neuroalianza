"""Unit tests for newly added REST endpoints."""

from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_resources() -> None:
    """Test retrieving educational resources list."""
    res = client.get("/api/v1/resources")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] >= 4
    assert len(data["items"]) >= 4


def test_submit_screening() -> None:
    """Test CRED screening submission with high risk."""
    payload = {
        "patient_name": "Test Child",
        "age_months": 18,
        "dni": "70000000",
        "guardian_name": "Test Guardian",
        "guardian_phone": "+51 900000000",
        "health_center_origin": "C.S. San Juan",
        "answers": {1: False, 2: False, 3: False, 4: True, 5: True},
    }
    res = client.post("/api/v1/health-worker/screening", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_level"] == "alto"
    assert data["requires_referral"] is True


def test_submit_referral() -> None:
    """Test referral submission endpoint."""
    payload = {
        "patient_id": "pat-101",
        "findings": ["Sin lenguaje verbal"],
        "priority": "alta",
        "notes": "Derivación URGENTE",
    }
    res = client.post("/api/v1/health-worker/referral", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "REF-2026-" in data["referral_code"]


def test_get_specialist_case_360() -> None:
    """Test 360 casefile retrieval."""
    res = client.get("/api/v1/specialist/cases/case-101")
    assert res.status_code == 200
    data = res.json()
    assert data["case_id"] == "case-101"
    assert len(data["clinical_notes"]) >= 2


def test_get_appointments() -> None:
    """Test appointments listing."""
    res = client.get("/api/v1/appointments")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] >= 2


def test_user_profile_and_language() -> None:
    """Test user profile and language update."""
    res_prof = client.get("/api/v1/user/profile")
    assert res_prof.status_code == 200
    assert res_prof.json()["language"] == "es"

    res_lang = client.post("/api/v1/user/language", json={"language": "qu"})
    assert res_lang.status_code == 200
    assert res_lang.json()["language"] == "qu"
