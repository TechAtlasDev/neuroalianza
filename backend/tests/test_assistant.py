"""Unit tests for the AI Assistant chatbot API endpoint."""

from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_assistant_chat_speech_query() -> None:
    """Test AI assistant response for speech development query."""
    response = client.post(
        "/api/v1/assistant/chat",
        json={"user_message": "Mi hijo no habla ni dice palabras a los 18 meses", "language": "es"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert len(data["reply"]) > 20
    assert len(data["recommended_resources"]) >= 1
    assert len(data["suggested_actions"]) >= 1


def test_assistant_chat_quechua_language() -> None:
    """Test AI assistant response when Quechua language is requested."""
    response = client.post(
        "/api/v1/assistant/chat",
        json={"user_message": "Allianllachu", "language": "qu"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "Allianllachu" in data["reply"] or "Wawachaykipa" in data["reply"]


def test_assistant_chat_invalid_payload() -> None:
    """Test AI assistant validation error for empty message."""
    response = client.post(
        "/api/v1/assistant/chat",
        json={"user_message": "a"},
    )
    assert response.status_code == 422  # Unprocessable Entity
