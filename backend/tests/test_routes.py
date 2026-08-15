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


def test_submit_screening_high_risk() -> None:
    """Test CRED screening submission with high risk (>= 2 failures)."""
    payload = {
        "patient_name": "Test Child High Risk",
        "age_months": 18,
        "dni": "70000000",
        "guardian_name": "Test Guardian",
        "guardian_phone": "+51 900000000",
        "health_center_origin": "C.S. San Juan",
        "answers": {1: False, 2: True, 3: False, 4: True, 5: False},
    }
    res = client.post("/api/v1/health-worker/screening", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_level"] == "alto"
    assert data["requires_referral"] is True


def test_submit_screening_moderate_risk() -> None:
    """Test CRED screening submission with moderate risk (1 failure)."""
    payload = {
        "patient_name": "Test Child Moderate Risk",
        "age_months": 24,
        "dni": "70000001",
        "guardian_name": "Test Guardian 2",
        "guardian_phone": "+51 900000001",
        "health_center_origin": "C.S. Huaycán",
        "answers": {1: True, 2: True, 3: True, 4: True, 5: False},
    }
    res = client.post("/api/v1/health-worker/screening", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_level"] == "moderado"
    assert data["requires_referral"] is False


def test_submit_screening_low_risk() -> None:
    """Test CRED screening submission with low risk (0 failures)."""
    payload = {
        "patient_name": "Test Child Low Risk",
        "age_months": 12,
        "dni": "70000002",
        "guardian_name": "Test Guardian 3",
        "guardian_phone": "+51 900000002",
        "health_center_origin": "C.S. Santa Anita",
        "answers": {1: True, 2: False, 3: True, 4: True, 5: False},
    }
    res = client.post("/api/v1/health-worker/screening", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_level"] == "bajo"
    assert data["requires_referral"] is False


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
