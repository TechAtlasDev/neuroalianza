"""AI Assistant endpoint router."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.schemas.assistant import ChatMessageRequest, ChatMessageResponse
from app.services.assistant_service import AssistantService

assistant_router = APIRouter(prefix="/api/v1/assistant", tags=["Asistente IA"])


def get_assistant_service() -> AssistantService:
    """Dependency provider for AssistantService."""
    return AssistantService()


@assistant_router.post(
    "/chat",
    response_model=ChatMessageResponse,
    summary="Consultar al Asistente de IA (NeuroBot)",
)
def chat_with_assistant(
    payload: ChatMessageRequest,
    service: Annotated[AssistantService, Depends(get_assistant_service)],
) -> ChatMessageResponse:
    """Processes query with AI assistant and returns clinical guidance."""
    return service.process_message(payload)
