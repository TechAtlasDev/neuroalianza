import {
  Sparkle,
  BookOpen,
  Hospital,
  ArrowRight,
  ShieldCheck,
} from "@phosphor-icons/react"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"

export interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AiAssistantModal({ isOpen, onClose }: AiAssistantModalProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="p-0 h-[92vh] max-h-[95vh] flex flex-col overflow-hidden rounded-t-3xl border-t border-border/80 shadow-2xl bg-background"
      >
        {/* 1. Hero Superior con Imagen y Capa Gradiente */}
        <section
          className="text-white px-5 pt-4 pb-12 relative overflow-hidden bg-cover bg-center bg-no-repeat shrink-0"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/de1xmnmeq/image/upload/v1786776308/paisaje-monta%C3%B1oso-low-poly-al-amanecer-con-degradados-pastel-en-los-picos-fondo-de-pantalla-para-m%C3%B3vil-experimenta-la-serena-378149134_pfiikg.webp')`,
          }}
        >
          {/* Capa Gradiente de arriba hacia abajo (Transparente a Negro 60%) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

          {/* Barra de agarre para arrastrar */}
          <div className="relative z-10 w-12 h-1 bg-white/40 rounded-full mx-auto mb-6" />

          {/* Contenido Central del Hero */}
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

            {/* Lista de Capacidades del Asistente */}
            <div className="space-y-2.5">
              {/* Capacidad 1 */}
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

              {/* Capacidad 2 */}
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

              {/* Capacidad 3 */}
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

          {/* Botón Inferior de Iniciar y Garantía de Privacidad */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.99] transition-all shadow-sm"
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
      </SheetContent>
    </Sheet>
  )
}
