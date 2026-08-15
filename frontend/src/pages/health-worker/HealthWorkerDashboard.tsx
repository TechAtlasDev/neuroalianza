import { useState } from "react"
import {
  Plus,
  Baby,
  Sparkle,
  CheckCircle,
  WarningCircle,
  Hospital,
  Check,
  X,
  ArrowsCounterClockwise,
} from "@phosphor-icons/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

interface ScreeningQuestion {
  id: number
  question: string
  detail: string
  critical: boolean
}

const MCHAT_QUESTIONS: ScreeningQuestion[] = [
  {
    id: 1,
    question: "¿Si usted señala algo al otro lado de la habitación, su hijo/a lo mira?",
    detail: "Por ejemplo, si señala un juguete o un animal, ¿mira hacia el objeto señalado?",
    critical: true,
  },
  {
    id: 2,
    question: "¿Alguna vez se ha preguntado si su hijo/a es sordo/a?",
    detail: "Evalúa si responde adecuadamente a sonidos o a su nombre.",
    critical: false,
  },
  {
    id: 3,
    question: "¿Su hijo/a juega a simular o hacer como si...?",
    detail: "Por ejemplo, fingir que bebe de una taza vacía, hablar por un teléfono de juguete.",
    critical: true,
  },
  {
    id: 4,
    question: "¿A su hijo/a le gusta subirse a las cosas?",
    detail: "Por ejemplo, muebles, juegos del parque o escaleras.",
    critical: false,
  },
  {
    id: 5,
    question: "¿Hace su hijo/a movimientos inusuales con los dedos cerca de sus ojos?",
    detail: "Por ejemplo, mover o aletear los dedos cerca de los ojos de forma repetitiva.",
    critical: true,
  },
]

const RECENT_PATIENTS = [
  {
    id: "pat-1",
    name: "Mateo Quintanilla",
    age: "18 meses",
    dni: "78349201",
    score: "4/20",
    risk: "moderado",
    riskLabel: "Riesgo Moderado",
    time: "Hace 15 min",
    status: "Derivado a Tele-Interconsulta",
  },
  {
    id: "pat-2",
    name: "Sofía Alarcón",
    age: "24 meses",
    dni: "79102455",
    score: "1/20",
    risk: "bajo",
    riskLabel: "Bajo Riesgo",
    time: "Hace 45 min",
    status: "Desarrollo Típico",
  },
  {
    id: "pat-3",
    name: "Lucas Mendoza",
    age: "12 meses",
    dni: "77651209",
    score: "--",
    risk: "pendiente",
    riskLabel: "Pendiente",
    time: "En sala de espera",
    status: "Turno CRED programado",
  },
]

export function HealthWorkerDashboard() {
  const [isScreeningSheetOpen, setIsScreeningSheetOpen] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [screeningCompleted, setScreeningCompleted] = useState(false)

  const handleAnswer = (val: boolean) => {
    const nextAnswers = { ...answers, [MCHAT_QUESTIONS[currentQuestionIndex].id]: val }
    setAnswers(nextAnswers)

    if (currentQuestionIndex < MCHAT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setScreeningCompleted(true)
    }
  }

  const resetScreening = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setScreeningCompleted(false)
  }

  // Cálculo del resultado de tamizaje (Riesgo según fallas en preguntas críticas)
  const failedCount = Object.entries(answers).filter(([id, val]) => {
    const q = MCHAT_QUESTIONS.find((item) => item.id === Number(id))
    // En M-CHAT, no mirar al señalar (id 1 = false) o sospecha de sordera (id 2 = true) etc.
    if (q?.id === 2 || q?.id === 5) return val === true
    return val === false
  }).length

  const riskLevel = failedCount >= 3 ? "alto" : failedCount >= 1 ? "moderado" : "bajo"

  return (
    <div className="-mx-4 -mt-4 flex flex-col">
      {/* 1. Hero Superior con Imagen y Capa Gradiente */}
      <section
        className="text-white px-4 pt-7 pb-12 relative overflow-hidden bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/de1xmnmeq/image/upload/v1786779602/800w-ef9eLH9Ric4_baa0yk.webp')`,
        }}
      >
        {/* Capa Gradiente de arriba hacia abajo (Transparente a Negro 60%) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

        {/* Barra Superior Espaciadora */}
        <div className="flex items-center justify-between relative z-10 h-20" />

        {/* Sección Central del Hero */}
        <div className="text-center py-12 pb-10 space-y-2 relative z-10">
          <p className="text-lg font-normal text-white/90">
            C.S. San Juan de Miraflores
          </p>
          <h1 className="text-3xl font-normal text-white tracking-tight">
            Tamizaje CRED
          </h1>
          <p className="text-sm font-normal text-white/80">
            Detección temprana del neurodesarrollo en primera infancia
          </p>
        </div>
      </section>

      {/* 2. Contenido Inferior Solapado con Esquinas Redondeadas */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-6 pb-8 space-y-6 relative z-20 shadow-lg">
        {/* Banner de Acción Rápida: Iniciar Nuevo Tamizaje */}
        <section>
          <button
            type="button"
            onClick={() => {
              resetScreening()
              setIsScreeningSheetOpen(true)
            }}
            className="w-full p-4 rounded-3xl bg-primary text-primary-foreground flex items-center justify-between shadow-sm hover:bg-primary/95 active:scale-[0.99] transition-all text-left group"
          >
            <div className="space-y-1 pr-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-foreground/15 text-primary-foreground text-sm font-medium">
                <Sparkle size={14} weight="fill" />
                <span>M-CHAT-R Validado</span>
              </div>
              <h2 className="text-base font-semibold">
                Iniciar Nuevo Tamizaje Rápido
              </h2>
              <p className="text-sm font-normal text-primary-foreground/80 leading-snug">
                5 preguntas clave para identificar alertas en 3 minutos.
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-primary-foreground/20 flex items-center justify-center text-primary-foreground shrink-0 group-hover:scale-105 transition-transform">
              <Plus size={22} weight="bold" />
            </div>
          </button>
        </section>

        {/* Métricas Diarias Limpias */}
        <section className="space-y-2.5">
          <h2 className="text-base font-semibold text-foreground">
            Resumen del Turno
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-0.5">
              <p className="text-2xl font-semibold text-foreground">12</p>
              <p className="text-sm font-normal text-muted-foreground">Evaluados</p>
            </div>
            <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-0.5">
              <p className="text-2xl font-semibold text-primary">2</p>
              <p className="text-sm font-normal text-muted-foreground">En Alerta</p>
            </div>
            <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-0.5">
              <p className="text-2xl font-semibold text-foreground">1</p>
              <p className="text-sm font-normal text-muted-foreground">Derivado</p>
            </div>
          </div>
        </section>

        {/* Lista de Pacientes Evaluados Hoy */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Pacientes de Hoy
            </h2>
            <span className="text-sm text-muted-foreground">3 registros</span>
          </div>

          <div className="space-y-2">
            {RECENT_PATIENTS.map((patient) => (
              <div
                key={patient.id}
                className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-center justify-between gap-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Baby size={22} weight="regular" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {patient.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} · DNI {patient.dni}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium border ${
                      patient.risk === "moderado"
                        ? "bg-primary/10 text-primary border-primary/30"
                        : patient.risk === "bajo"
                        ? "bg-muted text-foreground border-border/70"
                        : "bg-muted/50 text-muted-foreground border-border/50"
                    }`}
                  >
                    {patient.risk === "moderado" && <WarningCircle size={14} weight="fill" />}
                    {patient.risk === "bajo" && <CheckCircle size={14} weight="fill" className="text-primary" />}
                    <span>{patient.riskLabel}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-0.5">{patient.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3. Bottom Sheet de Cuestionario Interactivo M-CHAT-R */}
      <Sheet open={isScreeningSheetOpen} onOpenChange={setIsScreeningSheetOpen}>
        <SheetContent
          side="bottom"
          className="pb-8 pt-4 space-y-5 max-h-[92vh] overflow-y-auto"
        >
          {/* Barra de agarre superior */}
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto" />

          {!screeningCompleted ? (
            <div className="space-y-5">
              {/* Encabezado y Progreso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Tamizaje Rápido CRED</span>
                  <span>Pregunta {currentQuestionIndex + 1} de {MCHAT_QUESTIONS.length}</span>
                </div>
                {/* Barra de progreso segmentada */}
                <div className="grid grid-cols-5 gap-1.5">
                  {MCHAT_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-colors ${
                        i <= currentQuestionIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Pregunta Actual */}
              <div className="p-5 rounded-3xl bg-muted/40 border border-border/80 space-y-2">
                <SheetHeader className="text-left space-y-1">
                  <SheetTitle className="text-lg font-semibold text-foreground leading-snug">
                    {MCHAT_QUESTIONS[currentQuestionIndex].question}
                  </SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {MCHAT_QUESTIONS[currentQuestionIndex].detail}
                  </SheetDescription>
                </SheetHeader>
              </div>

              {/* Botones Grandes de Respuesta SÍ / NO */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAnswer(true)}
                  className="h-14 rounded-2xl bg-card border-2 border-border/80 hover:border-primary text-foreground text-base font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Check size={20} weight="bold" className="text-primary" />
                  <span>SÍ</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer(false)}
                  className="h-14 rounded-2xl bg-card border-2 border-border/80 hover:border-primary text-foreground text-base font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <X size={20} weight="bold" className="text-muted-foreground" />
                  <span>NO</span>
                </button>
              </div>
            </div>
          ) : (
            /* Pantalla de Resultados del Tamizaje */
            <div className="space-y-5">
              <SheetHeader className="text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 w-fit">
                  <CheckCircle size={16} weight="fill" />
                  <span>Evaluación Completada</span>
                </div>
                <SheetTitle className="text-xl font-semibold text-foreground">
                  Resultado: {riskLevel === "alto" ? "Riesgo Alto" : riskLevel === "moderado" ? "Riesgo Moderado" : "Bajo Riesgo"}
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground leading-relaxed">
                  {riskLevel === "bajo"
                    ? "El menor cumple con los hitos esperados para su edad. Se recomienda control habitual en CRED."
                    : "Se detectaron ítems críticos que requieren validación por tele-interconsulta con Neuropediatría del INSN San Borja."}
                </SheetDescription>
              </SheetHeader>

              {/* Resumen Clínico */}
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Puntaje M-CHAT</span>
                  <span className="font-semibold text-foreground">{failedCount} / {MCHAT_QUESTIONS.length} alertas</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Conducta recomendada</span>
                  <span className="font-semibold text-primary">
                    {riskLevel === "bajo" ? "Seguimiento en Posta" : "Derivación Priorizada"}
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-2.5 pt-2">
                {riskLevel !== "bajo" && (
                  <button
                    type="button"
                    onClick={() => setIsScreeningSheetOpen(false)}
                    className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm"
                  >
                    <Hospital size={18} />
                    <span>Generar Tele-Interconsulta INSN-SB</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetScreening}
                  className="w-full h-12 rounded-2xl bg-card border border-border/80 text-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-muted active:scale-[0.99] transition-all"
                >
                  <ArrowsCounterClockwise size={18} />
                  <span>Realizar Nuevo Tamizaje</span>
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
