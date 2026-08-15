import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Sparkle,
  CaretRight,
  Baby,
  PlusCircle,
  BookOpen,
  Path,
  User,
} from "@phosphor-icons/react"
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
              <Sparkle size={14} weight="fill" />
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
              <PlusCircle size={20} weight="bold" />
              <span>Iniciar Nuevo Tamizaje CRED</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Evaluación de Riesgo */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Baby size={20} weight="duotone" className="text-primary" />
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
          Accesos Rápidos
        </h2>

        <div className="grid grid-cols-1 gap-2.5">
          <Link to="/app/recursos" className="block group">
            <Card className="hover:border-primary/50 transition-all active:scale-[0.99] border-border/80">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <BookOpen size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Biblioteca de Recursos
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Guías de estimulación y materiales en casa
                    </p>
                  </div>
                </div>
                <CaretRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/app/citas" className="block group">
            <Card className="hover:border-primary/50 transition-all active:scale-[0.99] border-border/80">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Path size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Seguimiento de Citas & Ruta
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interconsultas INSN-SB y telemedicina
                    </p>
                  </div>
                </div>
                <CaretRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/app/perfil" className="block group">
            <Card className="hover:border-primary/50 transition-all active:scale-[0.99] border-border/80">
              <CardContent className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <User size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Perfil del Usuario
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Modo offline, colegiatura y ajustes
                    </p>
                  </div>
                </div>
                <CaretRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
