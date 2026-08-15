import { useState } from "react"
import { Link } from "react-router-dom"
import {
  CalendarCheck,
  MapPin,
  CheckCircle,
  CaretRight,
  Play,
  Hospital,
  PhoneCall,
  Heartbeat,
  ShieldCheck,
  Check,
} from "@phosphor-icons/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export function FamilyHomePage() {
  const [isAppointmentSheetOpen, setIsAppointmentSheetOpen] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [activityCompleted, setActivityCompleted] = useState(false)

  return (
    <div className="-mx-4 -mt-4 flex flex-col">
      {/* 1. Hero Superior Idéntico a las demás pantallas */}
      <section
        className="text-white px-4 pt-7 pb-12 relative overflow-hidden bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/de1xmnmeq/image/upload/v1786776308/paisaje-monta%C3%B1oso-low-poly-al-amanecer-con-degradados-pastel-en-los-picos-fondo-de-pantalla-para-m%C3%B3vil-experimenta-la-serena-378149134_pfiikg.webp')`,
        }}
      >
        {/* Capa Gradiente de arriba hacia abajo (Transparente a Negro 60%) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

        {/* Barra Superior Espaciadora */}
        <div className="flex items-center justify-between relative z-10 h-20" />

        {/* Sección Central Destacada (Texto centrado, tipografía uniforme) */}
        <div className="text-center py-14 space-y-2 relative z-10">
          <p className="text-lg font-normal text-white/90">
            Acompañamiento Familiar
          </p>
          <h1 className="text-3xl font-normal text-white tracking-tight">
            Familia Quispe
          </h1>
          <p className="text-sm font-normal text-white/80">
            Mateo Quispe · 18 meses
          </p>
        </div>
      </section>

      {/* 2. Contenido Inferior Solapado con Esquinas Redondeadas */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-6 pb-8 space-y-6 relative z-20 shadow-lg">
        {/* Banner Negro Interactivo de Próxima Atención */}
        <section>
          <button
            type="button"
            onClick={() => setIsAppointmentSheetOpen(true)}
            className="w-full p-4 rounded-3xl bg-black text-white flex items-center justify-between shadow-sm hover:bg-black/90 active:scale-[0.99] transition-all text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shrink-0">
                <CalendarCheck size={26} weight="regular" />
              </div>
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-white text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Cita Médica Confirmada</span>
                </div>
                <h2 className="text-base font-semibold text-white">
                  INSN San Borja · Neuropediatría
                </h2>
                <p className="text-sm text-zinc-300">
                  Martes 24 de Febrero, 2026 · 09:30 AM
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-0.5 transition-transform">
              <CaretRight size={18} weight="bold" />
            </div>
          </button>
        </section>

        {/* Guía de Estimulación en Casa (Día a Día) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Estimulación en Casa
            </h2>
            <span className="text-sm text-muted-foreground">
              Día 4 de 7
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Juego de atención con telas
                </h3>
                <p className="text-sm text-muted-foreground">
                  5 minutos · Fomenta contacto visual y sonrisa compartida
                </p>
              </div>
              {activityCompleted ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium border border-emerald-500/20 flex items-center gap-1 shrink-0">
                  <Check size={14} weight="bold" />
                  <span>Completado</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-muted text-foreground text-sm font-medium border border-border/70 shrink-0">
                  Pendiente
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Oculta tu rostro con una tela suave y destápate llamando a Mateo por su nombre con expresión alegre para incentivar la anticipación y reciprocidad.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsActivityModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-black text-white hover:bg-black/90 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
              >
                <Play size={16} weight="fill" />
                <span>{activityCompleted ? "Repetir Ejercicio" : "Comenzar Actividad"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Centro de Salud de Referencia */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Tu Red de Cuidado Local
          </h2>

          <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Heartbeat size={22} weight="regular" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  C.S. San Juan de Lurigancho
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enfermera responsable: Lic. Rosa Vega
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="tel:113"
                className="flex-1 py-2.5 px-4 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium text-sm flex items-center justify-center gap-2 border border-border/70 active:scale-[0.99] transition-all"
              >
                <PhoneCall size={16} weight="regular" />
                <span>Contactar Centro (113)</span>
              </a>

              <Link
                to="/app/recursos"
                className="flex-1 py-2.5 px-4 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium text-sm flex items-center justify-center gap-1.5 border border-border/70 active:scale-[0.99] transition-all text-center"
              >
                <span>Ver Más Guías</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Respaldo Comunitario */}
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/70 space-y-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} weight="regular" className="text-foreground" />
            <h3 className="text-sm font-semibold text-foreground">
              Acompañamiento Continuo
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las actividades realizadas en casa se sincronizan con la ficha clínica para tu próxima evaluación con el neuropediatra.
          </p>
        </div>
      </div>

      {/* Bottom Sheet de Detalle de Cita Médica */}
      <Sheet open={isAppointmentSheetOpen} onOpenChange={setIsAppointmentSheetOpen}>
        <SheetContent side="bottom" className="pb-8 pt-4 space-y-5 max-h-[90vh] overflow-y-auto">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto" />

          <SheetHeader className="text-left space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-sm font-medium">
                Confirmada
              </span>
              <span className="text-sm text-muted-foreground">
                #RIS-2026-891
              </span>
            </div>
            <SheetTitle className="text-lg font-bold text-foreground">
              Evaluación Especializada de Neuropediatría
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Instituto Nacional de Salud del Niño San Borja.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Hospital size={20} weight="regular" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    INSN San Borja · Piso 3
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dra. Carla Morales (Neuropediatra)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin size={20} weight="regular" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Consultorio 304
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Av. Javier Prado Este 3101, Lima
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/25 border border-border/70 space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Documentos a presentar:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>DNI físico de Mateo y del apoderado.</li>
                <li>Carné de control CRED actualizado.</li>
                <li>Hojas de tamizaje M-CHAT-R completadas.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/app/citas"
              onClick={() => setIsAppointmentSheetOpen(false)}
              className="w-full py-3.5 px-4 rounded-2xl bg-black text-white hover:bg-black/90 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all text-center shadow-sm"
            >
              <span>Ver en Mi Ruta de Atención</span>
              <CaretRight size={16} />
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Sheet de Guía de Actividad */}
      <Sheet open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <SheetContent side="bottom" className="pb-8 pt-4 space-y-5 max-h-[90vh] overflow-y-auto">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto" />

          <SheetHeader className="text-left space-y-1">
            <SheetTitle className="text-base font-semibold text-foreground">
              Juego de atención con telas
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Guía práctica de estimulación en casa recomendada por el equipo de terapias.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
              <p className="text-sm font-semibold text-foreground">Paso a paso:</p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                <li>Siéntate frente a Mateo a la altura de sus ojos en un lugar sin ruidos fuertes.</li>
                <li>Cubre tu rostro con una tela suave y di: "¿Dónde está mamá/papá?".</li>
                <li>Espera 3 segundos buscando su atención visual.</li>
                <li>Destápate con una sonrisa amplia diciendo "¡Aquí está!".</li>
              </ol>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setActivityCompleted(true)
              setIsActivityModalOpen(false)
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-black text-white hover:bg-black/90 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
          >
            <CheckCircle size={18} weight="bold" />
            <span>Marcar Actividad como Completada</span>
          </button>
        </SheetContent>
      </Sheet>
    </div>
  )
}
