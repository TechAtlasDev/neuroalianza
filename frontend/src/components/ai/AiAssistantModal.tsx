import { useState } from "react"
import {
  Sparkle,
  BookOpen,
  Hospital,
  ArrowRight,
  ShieldCheck,
  PaperPlaneRight,
  CaretLeft,
  User,
  Robot,
  ArrowSquareOut,
  Spinner,
} from "@phosphor-icons/react"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { sendAssistantMessage } from "@/services/apiClient"

export interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ChatMessage {
  id: string
  sender: "user" | "bot"
  text: string
  resources?: Array<{ id: string; title: string; category: string; url: string }>
  actions?: string[]
  timestamp: string
}

export function AiAssistantModal({ isOpen, onClose }: AiAssistantModalProps) {
  const [viewMode, setViewMode] = useState<"intro" | "chat">("intro")
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "¡Hola! Soy NeuroBot, tu asistente virtual para el acompañamiento en neurodesarrollo infantil y la ruta de atención médica del INSN San Borja. ¿En qué puedo orientarte hoy?",
      actions: [
        "¿Qué hago si mi niño de 18 meses no habla?",
        "¿Cómo mejoro el contacto visual?",
        "¿Cuándo es mi próxima cita?",
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage
    if (!text.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputMessage("")
    setIsLoading(true)

    try {
      const response = await sendAssistantMessage(text)
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        resources: response.recommended_resources,
        actions: response.suggested_actions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Gracias por tu consulta. Para el neurodesarrollo en el hogar, te sugerimos conversar mirando al niño fijamente y acudir a su control CRED regular.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setViewMode("intro")
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <SheetContent
        side="bottom"
        className="p-0 h-[92vh] max-h-[95vh] flex flex-col overflow-hidden rounded-t-3xl border-t border-border/80 shadow-2xl bg-background"
      >
        {viewMode === "intro" ? (
          <>
            {/* 1. Hero Superior con Imagen y Capa Gradiente */}
            <section
              className="text-white px-5 pt-4 pb-12 relative overflow-hidden bg-cover bg-center bg-no-repeat shrink-0"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/de1xmnmeq/image/upload/v1786776308/paisaje-monta%C3%B1oso-low-poly-al-amanecer-con-degradados-pastel-en-los-picos-fondo-de-pantalla-para-m%C3%B3vil-experimenta-la-serena-378149134_pfiikg.webp')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
              <div className="relative z-10 w-12 h-1 bg-white/40 rounded-full mx-auto mb-6" />

              <div className="relative z-10 text-center py-14 space-y-2.5">
                <h2 className="text-3xl font-normal text-white tracking-tight">
                  Asistente Neuroalianza
                </h2>
                <p className="text-sm font-normal text-white/85 max-w-xs mx-auto leading-relaxed">
                  Orientación experta y oportuna en neurodesarrollo infantil y rutas de atención médica.
                </p>
              </div>
            </section>

            {/* 2. Contenido Inferior Solapado con Información del Asistente */}
            <div className="bg-background rounded-t-3xl -mt-4 p-5 flex-1 flex flex-col justify-between overflow-y-auto space-y-5 relative z-20 shadow-lg">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    ¿En qué puede ayudarte el asistente?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Diseñado para acompañar a las familias y al personal de salud en cada etapa del desarrollo.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkle size={20} weight="regular" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">
                        Interpretación de Tamizajes CRED
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Explicación clara de resultados del M-CHAT-R y señales tempranas de alerta.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Hospital size={20} weight="regular" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">
                        Derivación al INSN San Borja
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Pautas sobre requisitos, consultorios y preparación para la tele-interconsulta.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen size={20} weight="regular" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">
                        Guías y Estimulación en Casa
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Actividades prácticas y rutinas sensoriales adaptadas a la edad del menor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode("chat")}
                  className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
                >
                  <span>Iniciar Conversación</span>
                  <ArrowRight size={18} weight="bold" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground text-center">
                  <ShieldCheck size={16} />
                  <span>Información confidencial y protegida · MINSA</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Vista de Chat Interactivo */
          <div className="flex flex-col h-full bg-background">
            {/* Header del Chat */}
            <div className="p-4 border-b border-border/80 bg-card flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode("intro")}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <CaretLeft size={20} />
                </button>
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
                  <Robot size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    NeuroBot IA
                  </h3>
                  <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En línea · INSN San Borja
                  </p>
                </div>
              </div>
            </div>

            {/* Cuerpo de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted/80 text-foreground rounded-tl-none border border-border/60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-xs opacity-75">
                      {msg.sender === "user" ? <User size={12} /> : <Robot size={12} />}
                      <span>{msg.sender === "user" ? "Tú" : "NeuroBot"}</span>
                      <span>· {msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Recursos Recomendados si existen */}
                    {msg.resources && msg.resources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-border/40 space-y-2">
                        <p className="text-xs font-semibold text-primary">Recursos recomendados:</p>
                        {msg.resources.map((res) => (
                          <a
                            key={res.id}
                            href={res.url}
                            className="block p-2 rounded-xl bg-background/90 text-foreground text-xs font-medium border border-border/80 flex items-center justify-between hover:border-primary transition-colors"
                          >
                            <span>{res.title}</span>
                            <ArrowSquareOut size={14} className="text-primary" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Acciones Sugeridas */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[85%]">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSend(act)}
                          className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-left"
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground p-2">
                  <Spinner size={16} className="animate-spin text-primary" />
                  <span>NeuroBot está procesando tu consulta...</span>
                </div>
              )}
            </div>

            {/* Input de Mensaje */}
            <div className="p-3 border-t border-border/80 bg-card flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe tu consulta aquí..."
                className="flex-1 h-10 px-3.5 text-sm rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-all cursor-pointer shrink-0"
              >
                <PaperPlaneRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
