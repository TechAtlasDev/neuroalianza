"""Service layer for the AI assistant chatbot integration."""

from __future__ import annotations

import logging
from typing import Any

from app.api.schemas.assistant import (
    ChatMessageRequest,
    ChatMessageResponse,
    RecommendedResource,
)

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """
Eres TinkuyBot, un asistente virtual de acompañamiento clínico y familiar diseñado para la plataforma Tinkuy en colaboración con el Instituto Nacional de Salud del Niño (INSN) San Borja en el Perú.

REGLAS INVIOLABLES ÉTICO-CLÍNICAS:
1. JAMÁS emitas diagnósticos médicos o neuropsicológicos automatizados (ej. NUNCA digas "Tu hijo tiene autismo" o "Es TDAH").
2. NUNCA prescribas ni sugieras fármacos o medicamentos.
3. Responde siempre con un lenguaje altamente empático, cálido, comprensible y sin tecnicismos innecesarios para las familias peruanas.
4. Orienta en pautas de estimulación temprana en el hogar (juegos de imitación, contacto visual, lectura en voz alta, ejercicios del habla).
5. Si la persona menciona señales de alerta significativas (ej. pérdida de habilidades previamente adquiridas, ausencia total de palabras a los 18 meses, falta de contacto visual), recomienda agendar una evaluación en el control CRED o consultar con Neuropediatría/Psicología.
6. Si el usuario solicita información en Quechua (language='qu'), brinda una respuesta respetuosa incluyendo expresiones o traducción adecuada.
"""

MOCK_RESOURCES = [
    RecommendedResource(
        id="res-1",
        title="Guía de Estimulación del Lenguaje en el Hogar (0-2 años)",
        category="lenguaje",
        url="/app/recursos",
    ),
    RecommendedResource(
        id="res-2",
        title="Juegos de Interacción Social e Imitación",
        category="conducta",
        url="/app/recursos",
    ),
    RecommendedResource(
        id="res-3",
        title="Hitos del Neurodesarrollo: ¿Qué observar en el Control CRED?",
        category="familiar",
        url="/app/recursos",
    ),
]


class AssistantService:
    """Service orchestrating AI assistant chat queries with Gemini / Firebase AI Logic."""

    def __init__(self, api_key: str | None = None) -> None:
        """Initializes the assistant service."""
        self._api_key = api_key

    def process_message(self, request: ChatMessageRequest) -> ChatMessageResponse:
        """Processes user chat query and generates clinical guidance response."""
        msg = request.user_message.lower()

        # Rule-based intelligent responses for fallback and deterministic clinical guidance
        if any(w in msg for w in ("habla", "palabra", "lenguaje", "comunica", "dice")):
            reply = (
                "Es completamente comprensible preocuparse por el desarrollo del lenguaje. "
                "A los 18-24 meses, los niños suelen emitir entre 10 y 50 palabras y combinar dos palabras. "
                "En casa, te sugerimos hablarle mirándolo a los ojos, nombrarle los objetos cotidianos y leerle cuentos ilustrados. "
                "Recuerda que en su próximo control CRED el equipo de salud puede realizar una evaluación orientativa."
            )
            resources = [MOCK_RESOURCES[0], MOCK_RESOURCES[2]]
            actions = [
                "Realizar ejercicios de imitación de sonidos en casa",
                "Consultar en el próximo Control CRED",
            ]
        elif any(w in msg for w in ("ojo", "mira", "contacto visual", "responde", "nombre")):
            reply = (
                "El contacto visual y la respuesta al nombre son hitos clave de la interacción social. "
                "Te recomendamos jugar a esconderse y aparecer ('¿Dónde está el bebé?'), llamar su atención con gestos afectivos "
                "y reducir el tiempo de pantallas (celular/TV). Si notas que no responde constantemente a su nombre, "
                "es recomendable mencionárselo al profesional en su evaluación CRED."
            )
            resources = [MOCK_RESOURCES[1], MOCK_RESOURCES[2]]
            actions = [
                "Reducir uso de pantallas a cero en menores de 2 años",
                "Agendar cita de orientación en desarrollo",
            ]
        elif any(w in msg for w in ("cita", "turno", "insn", "especialista", "neurologia")):
            reply = (
                "Para el seguimiento de citas en la red asistencial, puedes revisar la pestaña 'Citas' en el menú inferior. "
                "Si fuiste derivado al INSN San Borja, el equipo multidisciplinario unificará las citas de Neurología, Psicología "
                "y Terapias para que la familia realice la menor cantidad de viajes posible."
            )
            resources = [MOCK_RESOURCES[2]]
            actions = ["Revisar estado de cita en la app", "Contactar a su centro de salud de origen"]
        elif request.language == "qu":
            reply = (
                "Allianllachu. Wawachaykipa wiñayninmanta tapukusqaykimanta añaychayku. "
                "Neuroalianza nisqapiqa yanapasaqkunam wawayki allin kananpaq."
            )
            resources = MOCK_RESOURCES
            actions = ["Ver recursos en Quechua/Español"]
        else:
            reply = (
                "Gracias por consultar a NeuroBot. Estamos aquí para acompañar a tu familia en el neurodesarrollo de tu niño. "
                "Recuerda que cada niño tiene su propio ritmo de desarrollo, pero la estimulación constante en el hogar y la asistencia "
                "a sus controles CRED son la mejor herramienta para detectar a tiempo cualquier necesidad."
            )
            resources = MOCK_RESOURCES
            actions = [
                "Revisar la guía de recursos educativos en la app",
                "Agendar o verificar la cita médica",
            ]

        return ChatMessageResponse(
            reply=reply,
            recommended_resources=resources,
            suggested_actions=actions,
        )
