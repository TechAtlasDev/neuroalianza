import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, FastForward } from "lucide-react"

export function DemoControlPanelPage() {
  const [currentStage, setCurrentStage] = useState<number>(1)

  const stages = [
    { step: 1, title: "1. Tamizaje en Posta CRED", desc: "Enfermera detecta señales de alerta en niño de 18 meses", path: "/app/salud" },
    { step: 2, title: "2. Alerta Inmediata INSN-SB", desc: "Ficha 360° recibida por Neuropediatría del INSN-SB", path: "/app/clinico" },
    { step: 3, title: "3. Confirmación Familiar", desc: "La familia recibe la cita y guía de actividades en casa", path: "/app/familia" },
  ]

  return (
    <div className="space-y-4">
      {/* Panel de Control para Pitch */}
      <Card className="border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground text-xs gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Simulador del Flujo Clínico</span>
            </Badge>
            <span className="text-xs text-muted-foreground font-semibold">Pitch Demo</span>
          </div>
          <CardTitle className="text-lg font-bold font-heading text-foreground mt-1">
            Control de Demostración en Vivo
          </CardTitle>
          <CardDescription className="text-xs">
            Demuestra la articulación completa de 3 niveles en menos de 2 minutos.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStage(Math.min(currentStage + 1, 3))}
              className="flex-1 min-h-[40px] gap-1 text-xs font-semibold"
            >
              <FastForward className="w-4 h-4 text-primary" />
              <span>Avanzar Paso ({currentStage}/3)</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCurrentStage(1)}
              className="min-h-[40px] px-3 text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pasos del Flujo */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-foreground">Ruta del Caso Demostración</h3>

        <div className="space-y-2">
          {stages.map((stage) => {
            const isActive = currentStage === stage.step
            const isCompleted = currentStage > stage.step

            return (
              <Card
                key={stage.step}
                className={`transition-all ${
                  isActive
                    ? "border-primary shadow-md bg-primary/5"
                    : isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 opacity-80"
                    : "border-border opacity-60"
                }`}
              >
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
                          {stage.step}
                        </span>
                      )}
                      <p className="text-xs font-bold text-foreground">{stage.title}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground pl-5">{stage.desc}</p>
                  </div>

                  <Link to={stage.path}>
                    <Button size="sm" className="h-8 text-xs font-semibold px-2.5 gap-1">
                      <span>Ver</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
