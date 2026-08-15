import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Path,
  CalendarCheck,
  MapPin,
  Clock,
  CheckCircle,
  Circle,
  Hospital,
  PhoneCall,
} from "@phosphor-icons/react"

export function AppointmentsTrackingPage() {
  const roadmapSteps = [
    {
      id: 1,
      title: "Tamizaje y Detección Temprana",
      location: "Posta de Salud San Juan",
      date: "02 de Agosto, 2026",
      status: "completado",
      detail: "Riesgo moderado detectado en control CRED (M-CHAT-R 4/20). Ficha enviada.",
    },
    {
      id: 2,
      title: "Tele-Interconsulta y Derivación",
      location: "Red Integrada de Salud (RIS)",
      date: "05 de Agosto, 2026",
      status: "completado",
      detail: "Validación por médico de enlace. Cita priorizada en INSN San Borja generada.",
    },
    {
      id: 3,
      title: "Evaluación Especializada 360°",
      location: "INSN San Borja - Neuropediatría",
      date: "18 de Agosto, 2026 • 09:30 AM",
      status: "proxima",
      detail: "Consultorio 304 - Dra. Marcela Valdivia. Traer DNI y carné CRED del menor.",
    },
    {
      id: 4,
      title: "Plan de Intervención Temprana",
      location: "Terapia de Lenguaje y Ocupacional",
      date: "Pendiente post-evaluación",
      status: "pendiente",
      detail: "Inicio del programa de estimulación y pautas familiares.",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
          <Path size={24} weight="fill" className="text-primary" />
          <span>Seguimiento de Citas y Ruta</span>
        </h2>
        <p className="text-xs text-muted-foreground">
          Hoja de ruta viva del menor: desde el primer tamizaje hasta la atención en el INSN San Borja.
        </p>
      </div>

      {/* Tarjeta de Próxima Cita */}
      <Card className="border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground text-[10px] gap-1">
              <CalendarCheck size={13} weight="bold" />
              <span>Próxima Cita Confirmada</span>
            </Badge>
            <span className="text-[11px] font-bold text-primary">En 3 días</span>
          </div>
          <CardTitle className="text-base font-bold font-heading text-foreground mt-1">
            Neuropediatría Integral
          </CardTitle>
          <CardDescription className="text-xs">
            Instituto Nacional de Salud del Niño San Borja (INSN-SB)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-2.5">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={15} className="text-primary shrink-0" />
              <span>09:30 AM</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={15} className="text-primary shrink-0" />
              <span>Piso 3, Cons. 304</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button size="sm" className="flex-1 min-h-[38px] text-xs font-semibold gap-1.5">
              <PhoneCall size={15} weight="bold" />
              <span>Llamar al Módulo INSN</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline de la Hoja de Ruta */}
      <section className="space-y-3 pt-1">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
          Línea de Tiempo del Paciente
        </h3>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {roadmapSteps.map((step) => {
            const isCompleted = step.status === "completado"
            const isProxima = step.status === "proxima"

            return (
              <div key={step.id} className="relative group">
                {/* Marcador del timeline */}
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-background ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isProxima
                      ? "bg-primary text-primary-foreground animate-pulse"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={14} weight="bold" />
                  ) : isProxima ? (
                    <Clock size={13} weight="bold" />
                  ) : (
                    <Circle size={10} weight="fill" />
                  )}
                </div>

                <div
                  className={`p-3 rounded-xl border transition-all ${
                    isProxima
                      ? "bg-primary/5 border-primary/40 shadow-sm"
                      : "bg-card border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-foreground">{step.title}</h4>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {step.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-primary font-medium mb-1">
                    <Hospital size={13} weight="duotone" />
                    <span>{step.location}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {step.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
