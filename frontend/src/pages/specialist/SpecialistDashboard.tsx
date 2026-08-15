import { useState } from "react"
import {
  UserCheck,
  VideoCamera,
  CheckCircle,
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

interface CaseItem {
  id: string
  patient: string
  age: string
  origin: string
  nurse: string
  riskLevel: "alto" | "medio"
  riskLabel: string
  summary: string
  hasVideo: boolean
  status: "pendiente" | "admitido"
  date: string
}

const INITIAL_CASES: CaseItem[] = [
  {
    id: "case-1",
    patient: "Mateo Jimenez Ramos",
    age: "18 meses",
    origin: "C.S. San Juan de Lurigancho",
    nurse: "Lic. Rosa Vega",
    riskLevel: "alto",
    riskLabel: "Alto Riesgo",
    summary:
      "Conductas repetitivas de aleteo, falta de respuesta al nombre y regresión en primeras palabras a los 16 meses.",
    hasVideo: true,
    status: "pendiente",
    date: "Hoy · 08:45 AM",
  },
  {
    id: "case-2",
    patient: "Sofía Huamán Castro",
    age: "24 meses",
    origin: "Puesto de Salud Huaycán",
    nurse: "Lic. Carmen Mendoza",
    riskLevel: "medio",
    riskLabel: "Riesgo Moderado",
    summary:
      "Dificultad en marcha independiente, escaso contacto visual sostenido, lenguaje con ecolalia inmediata.",
    hasVideo: false,
    status: "pendiente",
    date: "Hoy · 10:15 AM",
  },
]

export function SpecialistDashboard() {
  const [cases, setCases] = useState<CaseItem[]>(INITIAL_CASES)
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null)
  const [admittedCount, setAdmittedCount] = useState(3)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const handleAdmit = (caseItem: CaseItem) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseItem.id ? { ...c, status: "admitido" } : c))
    )
    setAdmittedCount((prev) => prev + 1)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
    setSelectedCase(null)
  }

  return (
    <div className="-mx-4 -mt-4 flex flex-col">
      {/* 1. Hero Superior Idéntico a las demás pantallas: Espaciador h-20, py-14 centrado y sin chips extraños */}
      <section
        className="text-white px-4 pt-7 pb-12 relative overflow-hidden bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/de1xmnmeq/image/upload/v1786781319/212485521-color-azul-rojo-oscuro-degradado-para-fondos-de-pantalla-o-fondos-de-escritorio_kzf24q.jpg')`,
        }}
      >
        {/* Capa Gradiente de arriba hacia abajo (Transparente a Negro 60%) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

        {/* Barra Superior Espaciadora idéntica a Citas/Salud/Recursos */}
        <div className="flex items-center justify-between relative z-10 h-20" />

        {/* Sección Central Destacada (Texto centrado, tipografía uniforme) */}
        <div className="text-center py-14 space-y-2 relative z-10">
          <p className="text-lg font-normal text-white/90">
            INSN San Borja
          </p>
          <h1 className="text-3xl font-normal text-white tracking-tight">
            Tele-interconsulta 360°
          </h1>
          <p className="text-sm font-normal text-white/80">
            Admisión y coordinación con especialistas de neuropediatría
          </p>
        </div>
      </section>

      {/* 2. Contenido Inferior Solapado con Esquinas Redondeadas */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-6 pb-8 space-y-6 relative z-20 shadow-lg">
        {/* Notificación de admisión */}
        {showSuccessToast && (
          <div className="p-3.5 rounded-2xl bg-black text-white flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle size={22} weight="fill" className="text-emerald-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Paciente Admitido</p>
              <p className="text-sm text-zinc-300">Cita 360° coordinada con el centro de salud de origen.</p>
            </div>
          </div>
        )}

        {/* Resumen del Turno Clínico - Minimalista */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-card border border-border/80 space-y-0.5">
            <p className="text-xl font-bold text-foreground">{cases.length + 3}</p>
            <p className="text-sm text-muted-foreground">Derivados</p>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/80 space-y-0.5">
            <p className="text-xl font-bold text-foreground">{admittedCount}</p>
            <p className="text-sm text-muted-foreground">Admitidos</p>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/80 space-y-0.5">
            <p className="text-xl font-bold text-foreground">100%</p>
            <p className="text-sm text-muted-foreground">Articulación</p>
          </div>
        </div>

        {/* Casos Prioritarios Entrantes - Tarjetas Minimalistas */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Casos Entrantes
            </h2>
            <span className="text-sm text-muted-foreground">
              Filtro CRED
            </span>
          </div>

          <div className="space-y-3">
            {cases.map((item) => {
              const isAdmitted = item.status === "admitido"

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${isAdmitted
                      ? "bg-muted/20 border-border/50 opacity-70"
                      : "bg-card border-border/80"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {item.patient}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.age} · {item.origin}
                      </p>
                    </div>

                    {isAdmitted ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium border border-emerald-500/20 flex items-center gap-1 shrink-0">
                        <Check size={14} weight="bold" />
                        <span>Admitido</span>
                      </span>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${item.riskLevel === "alto"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}
                      >
                        {item.riskLabel}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>

                  {!isAdmitted && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAdmit(item)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-black text-white hover:bg-black/90 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
                      >
                        <UserCheck size={18} weight="bold" />
                        <span>Admitir</span>
                      </button>

                      {item.hasVideo && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCase(item)
                            setIsVideoModalOpen(true)
                          }}
                          className="py-2.5 px-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium text-sm flex items-center gap-1.5 border border-border/70 active:scale-[0.99] transition-all"
                        >
                          <VideoCamera size={18} weight="regular" />
                          <span>Video</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Nota simple minimalista de interoperabilidad */}
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/70 space-y-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} weight="regular" className="text-foreground" />
            <h3 className="text-sm font-semibold text-foreground">
              Red Integrada de Salud (RIS)
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La admisión notifica en tiempo real al centro de salud de origen para el seguimiento del carné CRED.
          </p>
        </div>
      </div>

      {/* Modal de visualización de evidencia de video */}
      <Sheet open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <SheetContent side="bottom" className="pb-8 pt-4 space-y-4 max-h-[90vh]">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto" />
          <SheetHeader className="text-left space-y-1">
            <SheetTitle className="text-base font-semibold text-foreground">
              Evidencia en Video CRED
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Grabación breve de conducta tomada durante el tamizaje presencial.
            </SheetDescription>
          </SheetHeader>

          <div className="p-6 rounded-2xl bg-black text-white flex flex-col items-center justify-center gap-3 text-center">
            <VideoCamera size={36} weight="light" className="text-white/70" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                Clip de Tamizaje: {selectedCase?.patient}
              </p>
              <p className="text-sm text-zinc-400">
                Duración: 00:45s · M-CHAT-R Item 5
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (selectedCase) handleAdmit(selectedCase)
              setIsVideoModalOpen(false)
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-black text-white hover:bg-black/90 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
          >
            <UserCheck size={18} weight="bold" />
            <span>Admitir Caso</span>
          </button>
        </SheetContent>
      </Sheet>
    </div>
  )
}
