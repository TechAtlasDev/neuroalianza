import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Sparkles,
  ClipboardCheck,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
  Baby,
  Activity,
  Calendar,
  AlertCircle,
  PlusCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SemaforoRiesgo } from "@/components/shared/SemaforoRiesgo"

export function AppIndexPage() {
  const [demoState, setDemoState] = useState<"alto" | "bajo">("alto")

  return (
    <div className="space-y-4">
      {/* Banner de Bienvenida PWA */}
      <Card className="bg-gradient-to-br from-primary/15 via-primary/5 to-background border-primary/25 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="gap-1.5 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PWA Mobile-First</span>
            </Badge>
            <span className="text-xs font-semibold text-muted-foreground">Posta CRED</span>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight mt-1 text-foreground font-heading">
            Detección Oportuna en CRED
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Ventana crítica de neurodesarrollo (0 a 5 años) articulada con INSN San Borja.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <Link to="/app/salud">
            <Button className="w-full min-h-[46px] gap-2 font-semibold shadow-md shadow-primary/20">
              <PlusCircle className="w-5 h-5" />
              <span>Iniciar Nuevo Tamizaje CRED</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Evaluación de Riesgo */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Baby className="w-5 h-5 text-primary" />
            <span>Última Evaluación Realizada</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDemoState(demoState === "alto" ? "bajo" : "alto")}
            className="text-xs h-8 text-primary font-medium"
          >
            Alternar Demo
          </Button>
        </div>

        <SemaforoRiesgo
          nivel={demoState === "alto" ? "ALTO" : "BAJO"}
          justificacion={
            demoState === "alto"
              ? "Paciente Mateo R. (18 meses): 2 señales críticas observadas en interacción social y contacto visual. Derivación prioritaria sugerida a Neuropediatría."
              : "Paciente Lucía M. (12 meses): Hitos motores y lingüísticos acordes a su grupo de edad. Control rutinario en 6 meses."
          }
        />
      </section>

      {/* Selector Rápido de Módulos */}
      <section className="space-y-2.5 pt-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Zonas de Atención
        </h2>

        <div className="grid grid-cols-1 gap-2.5">
          <Link to="/app/salud" className="block group">
            <Card className="hover:border-primary/50 transition-all active:scale-[0.99] border-border/80">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Personal de Salud CRED
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tamizaje rápido, postas y alertas
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/app/familia" className="block group">
            <Card className="hover:border-primary/50 transition-all active:scale-[0.99] border-border/80">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Portal Familiar & Citas
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ruta asistencial, actividades en casa
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/app/clinico" className="block group">
            <Card className="hover:border-primary/50 transition-all active:scale-[0.99] border-border/80">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Especialistas INSN San Borja
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ficha Multidisciplinaria 360°
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
