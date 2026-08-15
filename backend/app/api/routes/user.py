"""User profile and language configuration endpoint router."""

from __future__ import annotations

from fastapi import APIRouter

from app.api.schemas.user import (
    UpdateLanguageRequest,
    UpdateLanguageResponse,
    UserProfileResponse,
)

user_router = APIRouter(prefix="/api/v1/user", tags=["Perfil de Usuario"])

CURRENT_USER = UserProfileResponse(
    user_id="usr-101",
    full_name="Elena Ramos",
    role="familia",
    language="es",
    health_center="C.S. San Juan de Lurigancho",
    phone="+51 984 123 456",
)


@user_router.get(
    "/profile",
    response_model=UserProfileResponse,
    summary="Obtener perfil del usuario",
)
def get_user_profile() -> UserProfileResponse:
    """Returns current user profile."""
    return CURRENT_USER


@user_router.post(
    "/language",
    response_model=UpdateLanguageResponse,
    summary="Actualizar preferencia de idioma (Español / Quechua)",
)
def update_language(payload: UpdateLanguageRequest) -> UpdateLanguageResponse:
    """Updates user language preference."""
    CURRENT_USER.language = payload.language
    lang_name = "Quechua" if payload.language == "qu" else "Español"
    return UpdateLanguageResponse(
        success=True,
        language=payload.language,
        message=f"Preferencia de idioma actualizada a {lang_name}.",
    )
