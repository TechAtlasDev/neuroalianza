"""Ports layer containing abstract protocols and interfaces."""

from __future__ import annotations

from app.ports.clock import Clock
from app.ports.event_bus import EventBus, EventHandler
from app.ports.file_storage import FileStorage, ReferenciaArchivo
from app.ports.notifier import Notifier, ResultadoEnvio
from app.ports.repositories import (
    CasoRepository,
    CitaRepository,
    NotificacionRepository,
    PacienteRepository,
    QuerySpecification,
    Repository,
    TamizajeRepository,
    UsuarioRepository,
)
from app.ports.unit_of_work import UnitOfWork

__all__ = [
    "CasoRepository",
    "CitaRepository",
    "Clock",
    "EventBus",
    "EventHandler",
    "FileStorage",
    "NotificacionRepository",
    "Notifier",
    "PacienteRepository",
    "QuerySpecification",
    "ReferenciaArchivo",
    "Repository",
    "ResultadoEnvio",
    "TamizajeRepository",
    "UnitOfWork",
    "UsuarioRepository",
]
