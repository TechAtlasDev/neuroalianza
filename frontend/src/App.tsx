import { useState } from "react"
import { MobileAppShell } from "@/components/layout/MobileAppShell"
import { SemaforoRiesgo } from "@/components/shared/SemaforoRiesgo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Baby, ArrowRight, Sparkles } from "lucide-react"

export default function App() {
  const [tamizajeEstado, setTamizajeEstado] = useState<"demo" | "completado">("demo")

  return (
    <MobileAppShell title="Neuroalianza CRED" role="C.S. San Juan de Lurigancho">
      <div className="space-y-4">
        {/* Banner de bienvenida */}
        <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-none">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ventana Crítica 0-5 años</span>
              </Badge>
              <span className="text-xs text-muted-foreground">Hoy</span>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight mt-1 text-foreground">
              Detección Oportuna en CRED
            </CardTitle>
            <CardDescription className="text-sm">
              Tamizaje estandarizado rápido de desarrollo y señales de alerta.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              className="w-full min-h-[44px] gap-2 font-medium"
              onClick={() => setTamizajeEstado(tamizajeEstado === "demo" ? "completado" : "demo")}
            >
              <PlusCircle className="w-5 h-5" />
              <span>{tamizajeEstado === "demo" ? "Iniciar Nuevo Tamizaje" : "Reiniciar Demostración"}</span>
            </Button>
          </CardContent>
        </Card>

        {/* Demostración de Semáforo de Riesgo */}
        <section className="space-y-2">
          <h2 className="text-md font-bold text-foreground flex items-center gap-2">
            <Baby className="w-5 h-5 text-primary" />
            <span>Última Evaluación Realizada</span>
          </h2>

          <SemaforoRiesgo
            nivel={tamizajeEstado === "demo" ? "ALTO" : "BAJO"}
            justificacion={
              tamizajeEstado === "demo"
                ? "Paciente Mateo R. (18 meses): 2 señales críticas observadas en interacción social y contacto visual."
                : "Paciente Lucía M. (12 meses): Hitos de motricidad y lenguaje acordes a su grupo de edad."
            }
          />
        </section>

        {/* Acciones Rápidas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-semibold">Flujo Asistencial Articulado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
              <div>
                <p className="text-sm font-medium">Derivación Especializada</p>
                <p className="text-xs text-muted-foreground">INSN San Borja (Neuropediatría)</p>
              </div>
              <Button size="sm" variant="outline" className="min-h-[44px] gap-1">
                <span>Gestionar</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileAppShell>
  )
}
