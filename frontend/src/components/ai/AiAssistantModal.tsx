import { useState } from "react"
import {
  Sparkle,
  PaperPlaneTilt,
  X,
  Robot,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AiAssistantModal({ isOpen, onClose }: AiAssistantModalProps) {
  const [messages, setMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    {
      sender: "ai",
      text: "Hola, soy el Asistente Clínico IA de Neuroalianza. ¿En qué te puedo orientar hoy? Puedo asistirte en la interpretación del M-CHAT-R, criterios de derivación al INSN San Borja o pautas de estimulación temprana.",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  if (!isOpen) return null

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userText = inputValue.trim()
    setMessages((prev) => [...prev, { sender: "user", text: userText }])
    setInputValue("")

    // Simulación de respuesta clínica con IA
    setTimeout(() => {
      let aiReply = "Para ese caso, según el protocolo MINSA/INSN-SB, si el menor presenta 3 o más ítems de riesgo crítico (contacto visual, responder al nombre o señalar con el índice), se clasifica como Riesgo Alto y amerita tele-interconsulta prioritaria."
      if (userText.toLowerCase().includes("recursos") || userText.toLowerCase().includes("guia")) {
        aiReply = "Puedes encontrar las guías ilustradas de estimulación oportuna en la sección 'Recursos' de la barra inferior para compartir con la familia."
      } else if (userText.toLowerCase().includes("cita") || userText.toLowerCase().includes("insn")) {
        aiReply = "Las citas derivadas al INSN San Borja se visualizan en tiempo real en la pestaña 'Citas' con el número de consultorio y médico asignado."
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }])
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[600px] overflow-hidden">
        {/* Header del Asistente */}
        <div className="p-3.5 bg-gradient-to-r from-primary/20 via-primary/10 to-card border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <Sparkle size={20} weight="fill" className="text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold font-heading text-foreground">
                  Copiloto Clínico IA
                </h3>
                <Badge className="bg-amber-400 text-amber-950 text-[9px] font-bold px-1 py-0">
                  CRED-IA
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Asistencia en tiempo real basada en protocolos INSN-SB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar Asistente"
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-background/50 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Robot size={14} weight="fill" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border border-border/80 text-foreground rounded-bl-none shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Sugerencias Rápidas */}
        <div className="px-3 py-1.5 bg-card/80 border-t border-border/60 flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            "¿Cuándo derivar al INSN-SB?",
            "Ítems críticos M-CHAT-R",
            "Pautas para familias",
          ].map((quick, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInputValue(quick)
              }}
              className="text-[10px] text-muted-foreground hover:text-primary bg-muted/60 hover:bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap border border-border/50 transition-colors"
            >
              {quick}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="p-3 bg-card border-t border-border flex items-center gap-2">
          <Input
            placeholder="Pregunta sobre signos de alerta o protocolos..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="h-10 text-xs rounded-xl bg-background"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="h-10 w-10 p-0 rounded-xl shrink-0"
          >
            <PaperPlaneTilt size={18} weight="fill" />
          </Button>
        </div>
      </div>
    </div>
  )
}
