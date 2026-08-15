import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Warning, CaretRight } from "@phosphor-icons/react"

export function HealthWorkerDashboard() {
  return (
    <div className="space-y-4">
      {/* Banner Superior de Estado de Posta */}
      <Card className="border-primary/20 bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
              C.S. San Juan de Lurigancho
            </Badge>
            <span className="text-md text-muted-foreground font-medium">Turno Mañana</span>
          </div>
          <CardTitle className="text-lg font-bold font-heading text-foreground mt-1">
            Módulo de Tamizaje CRED
          </CardTitle>
          <CardDescription className="text-md">
            Evaluación rápida de hitos y señales de alarma en neurodesarrollo (0-5 años).
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-1">
          <Button className="w-full min-h-11 gap-2 font-semibold shadow-sm">
            <PlusCircle size={20} weight="bold" />
            <span>Nuevo Tamizaje a Paciente</span>
          </Button>
        </CardContent>
      </Card>

      {/* Métricas Rápidas del Día */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-xl bg-card border border-border text-center">
          <p className="text-xl font-bold text-foreground font-heading">12</p>
          <p className="text-md text-muted-foreground font-medium">Evaluados Hoy</p>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border text-center">
          <p className="text-xl font-bold text-amber-600 font-heading">2</p>
          <p className="text-md text-muted-foreground font-medium">Observación</p>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border text-center">
          <p className="text-xl font-bold text-destructive font-heading">1</p>
          <p className="text-md text-muted-foreground font-medium">Derivado INSN</p>
        </div>
      </div>

      {/* Lista de Casos Recientes */}
      <section className="space-y-2">
        <h3 className="text-md font-bold text-foreground flex items-center justify-between">
          <span>Evaluaciones Recientes</span>
          <span className="text-md text-muted-foreground">3 pendientes</span>
        </h3>

        <div className="space-y-2">
          <Card className="border-border">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-md font-bold text-foreground">Mateo Quispe R. (18 m)</p>
                <p className="text-md text-destructive font-semibold flex items-center gap-1 mt-0.5">
                  <Warning size={15} weight="fill" />
                  <span>Riesgo Alto · Derivación enviada a INSN-SB</span>
                </p>
              </div>
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                <CaretRight size={18} />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-md font-bold text-foreground">Sofía Mendoza P. (24 m)</p>
                <p className="text-md text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                  <span>Hitos de desarrollo normales</span>
                </p>
              </div>
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                <CaretRight size={18} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
