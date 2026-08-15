import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarCheck, Clock, MapPin, CheckCircle, Play } from "@phosphor-icons/react"

export function FamilyHomePage() {
  return (
    <div className="space-y-4">
      {/* Saludo y Paciente */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-foreground">Familia Quispe</h2>
          <p className="text-xs text-muted-foreground">Paciente: Mateo Quispe (18 meses)</p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
          En Atención
        </Badge>
      </div>

      {/* Próxima Cita en INSN San Borja */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
              Próxima Cita Médica
            </Badge>
            <span className="text-xs font-semibold text-primary">INSN San Borja</span>
          </div>
          <CardTitle className="text-base font-bold font-heading text-foreground mt-1">
            Evaluación Integral de Neuropediatría
          </CardTitle>
          <CardDescription className="text-xs">
            Dra. Carla Morales · Bloque Integrado de la Mañana
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0 text-sm">
          <div className="space-y-1.5 bg-background/80 p-3 rounded-xl border border-border">
            <div className="flex items-center gap-2 text-xs text-foreground font-medium">
              <CalendarCheck size={16} weight="bold" className="text-primary" />
              <span>Martes 24 de Febrero, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={16} weight="bold" className="text-primary" />
              <span>09:30 AM (Llegar 15 min antes)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin size={16} weight="bold" className="text-primary" />
              <span>Av. Javier Prado Este 3101, San Borja</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 min-h-[44px] gap-1.5 font-semibold">
              <CheckCircle size={16} weight="bold" />
              <span>Confirmar Asistencia</span>
            </Button>
            <Button variant="outline" className="min-h-[44px] px-3">
              Reprogramar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actividades Prácticas para el Hogar */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold font-heading text-foreground">
              Guía de Estimulación en Casa
            </CardTitle>
            <Badge variant="secondary" className="text-xs">Día 4 de 7</Badge>
          </div>
          <CardDescription className="text-xs">
            Ejercicios de contacto visual y juego interactivo para realizar con Mateo.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">Juego de las escondidas con telas</p>
              <p className="text-[11px] text-muted-foreground">5 minutos · Fomenta atención compartida</p>
            </div>
            <Button size="sm" className="gap-1 bg-primary text-primary-foreground h-9 px-3">
              <Play size={14} weight="fill" />
              <span>Ver Guía</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
