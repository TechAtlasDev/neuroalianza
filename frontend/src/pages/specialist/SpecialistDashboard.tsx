import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Brain, AlertCircle, FileText, CheckCircle2, UserCheck, ArrowRight } from "lucide-react"

export function SpecialistDashboard() {
  return (
    <div className="space-y-4">
      {/* Resumen Clínico */}
      <Card className="border-indigo-500/20 bg-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-indigo-500/30 text-indigo-600 bg-indigo-500/5">
              INSN San Borja · Piso 4
            </Badge>
            <span className="text-xs text-muted-foreground font-semibold">Neuropediatría</span>
          </div>
          <CardTitle className="text-lg font-bold font-heading text-foreground mt-1">
            Ficha Multidisciplinaria 360°
          </CardTitle>
          <CardDescription className="text-xs">
            Bandeja de admisión prioritaria y coordinación con Psiquiatría y Terapias.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-muted/40 border border-border">
              <p className="text-lg font-bold text-foreground font-heading">5</p>
              <p className="text-[11px] text-muted-foreground">Derivaciones</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/40 border border-border">
              <p className="text-lg font-bold text-indigo-600 font-heading">3</p>
              <p className="text-[11px] text-muted-foreground">Admitidos</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/40 border border-border">
              <p className="text-lg font-bold text-emerald-600 font-heading">100%</p>
              <p className="text-[11px] text-muted-foreground">Articulación</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Casos Prioritarios */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Casos Prioritarios Entrantes</h3>
          <Badge variant="secondary" className="text-xs">Filtro CRED</Badge>
        </div>

        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-3.5 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="destructive" className="text-[10px] uppercase font-bold py-0">
                  Alto Riesgo (TEA / Lenguaje)
                </Badge>
                <h4 className="text-sm font-bold text-foreground mt-1">
                  Mateo Quispe Ramos (18 meses)
                </h4>
                <p className="text-xs text-muted-foreground">
                  Derivado por: Lic. Rosa Vega (C.S. San Juan de Lurigancho)
                </p>
              </div>
            </div>

            <p className="text-xs text-foreground/90 bg-background/80 p-2.5 rounded-lg border border-border">
              "Observadas conductas repetitivas de aleteo, falta de respuesta al nombre y regresión en primeras palabras a los 16 meses."
            </p>

            <div className="flex gap-2 pt-1">
              <Button size="sm" className="flex-1 min-h-[38px] gap-1.5 font-semibold text-xs">
                <UserCheck className="w-4 h-4" />
                <span>Admitir y Agendar Cita 360°</span>
              </Button>
              <Button size="sm" variant="outline" className="min-h-[38px] text-xs">
                Ver Video
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
