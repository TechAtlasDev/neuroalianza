import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Translate,
  Check,
  CaretRight,
  Brain,
  Baby,
  Sparkle,
  Plus,
  ArrowRight,
  ArrowsClockwise,
  ListBullets,
  DotsThree,
  Heartbeat,
  Info,
  CalendarCheck,
} from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

// Idiomas disponibles en la red de salud
const LANGUAGES = [
  { id: "es", name: "Español", native: "Español (Perú)" },
  { id: "qu-ch", name: "Quechua Chanka", native: "Runasimi (Ayacucho / Apurímac)" },
  { id: "qu-cz", name: "Quechua Cusco", native: "Qhichwa (Cusco / Collao)" },
  { id: "ay", name: "Aymara", native: "Aymar aru (Puno / Altiplano)" },
  { id: "en", name: "English", native: "English (US)" },
]

// Recursos destacados en formato micro-card
const FEATURED_RESOURCES = [
  {
    id: "1",
    title: "Estimulación del lenguaje en casa",
    category: "12 - 24 meses",
    readTime: "3 min",
    icon: Brain,
  },
  {
    id: "2",
    title: "Hitos motores y señales de alerta",
    category: "0 - 18 meses",
    readTime: "4 min",
    icon: Baby,
  },
  {
    id: "3",
    title: "Guía de rutinas y juego sensorial",
    category: "2 - 5 años",
    readTime: "5 min",
    icon: Sparkle,
  },
]

export function AppIndexPage() {
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("es")

  return (
    <div className="-mx-4 -mt-4 flex flex-col">
      {/* 1. Hero Superior con Imagen de Fondo Limpia (Sin capas ni láminas) */}
      <section
        className="text-primary-foreground px-4 pt-7 pb-12 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/de1xmnmeq/image/upload/v1786776308/paisaje-monta%C3%B1oso-low-poly-al-amanecer-con-degradados-pastel-en-los-picos-fondo-de-pantalla-para-m%C3%B3vil-experimenta-la-serena-378149134_pfiikg.webp')`,
        }}
      >
        {/* Barra Superior con Logo y Selector de Idioma */}
        <div className="flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Heartbeat size={22} weight="bold" className="text-white" />
            </div>
            <span className="text-base font-normal text-white">
              Neuro<span className="font-semibold text-white/90">alianza</span>
            </span>
          </Link>

          {/* Botón de Idioma (Limpio y translúcido) */}
          <button
            type="button"
            onClick={() => setIsLanguageSheetOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white active:scale-95 transition-transform"
            aria-label="Seleccionar idioma"
          >
            <Translate size={22} weight="regular" />
          </button>
        </div>

        {/* Sección Central Destacada con Mayor Altura y Presencia */}
        <div className="text-center py-24 relative z-10">
          <p className="text-lg font-normal text-white/80">
            Bienvenido
          </p>
          <h1 className="text-3xl font-normal text-white">
            Giovanny Jimenez
          </h1>
        </div>

        {/* Fila de 4 Acciones Rápidas Circulares Más Amplias */}
        <div className="grid grid-cols-4 gap-3 pt-3 relative z-10 max-w-sm mx-auto">
          {/* Acción 1: Tamizaje */}
          <Link to="/app/salud" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/25 active:scale-95 backdrop-blur-md flex items-center justify-center text-white border border-white/25 transition-all shadow-sm">
              <Plus size={24} weight="bold" />
            </div>
            <span className="text-sm font-normal text-white/90 text-center leading-tight">
              Tamizaje
            </span>
          </Link>

          {/* Acción 2: Mi Ruta */}
          <Link to="/app/citas" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/25 active:scale-95 backdrop-blur-md flex items-center justify-center text-white border border-white/25 transition-all shadow-sm">
              <ArrowsClockwise size={24} weight="bold" />
            </div>
            <span className="text-sm font-normal text-white/90 text-center leading-tight">
              Mi Ruta
            </span>
          </Link>

          {/* Acción 3: Recursos */}
          <Link to="/app/recursos" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/25 active:scale-95 backdrop-blur-md flex items-center justify-center text-white border border-white/25 transition-all shadow-sm">
              <ListBullets size={24} weight="bold" />
            </div>
            <span className="text-sm font-normal text-white/90 text-center leading-tight">
              Recursos
            </span>
          </Link>

          {/* Acción 4: Más */}
          <Link to="/app/perfil" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/25 active:scale-95 backdrop-blur-md flex items-center justify-center text-white border border-white/25 transition-all shadow-sm">
              <DotsThree size={26} weight="bold" />
            </div>
            <span className="text-sm font-normal text-white/90 text-center leading-tight">
              Más
            </span>
          </Link>
        </div>
      </section>

      {/* 2. Contenido Inferior Solapado con Esquinas Redondeadas */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-5 pb-8 space-y-5 relative z-20 shadow-lg">
        {/* Banner Informativo Sutil */}
        <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/70 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Info size={18} weight="regular" />
          </div>
          <div className="space-y-0.5 flex-1">
            <p className="text-sm font-normal text-foreground">
              Tu próxima atención está programada
            </p>
            <p className="text-sm font-normal text-muted-foreground leading-relaxed">
              Si surge alguna dificultad, cuéntanos para coordinar contigo.
            </p>
          </div>
        </div>

        {/* Sección: Resumen de Último Proceso */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Último Proceso
            </h2>
            <Link
              to="/app/citas"
              className="text-sm font-normal text-primary hover:underline flex items-center gap-0.5"
            >
              <span>Ver ruta</span>
              <CaretRight size={14} />
            </Link>
          </div>

          <Link to="/app/citas" className="block group">
            <Card className="bg-card border border-border/70 shadow-none hover:border-primary/40 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Mateo Quispe Ramos · 18 meses
                    </h3>
                    <p className="text-sm font-normal text-muted-foreground">
                      Tele-interconsulta INSN San Borja
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>En proceso</span>
                  </div>
                </div>

                {/* Barra de progreso delgada */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm font-normal text-muted-foreground">
                    <span>Paso 2 de 4: Revisión por Neuropediatría</span>
                    <span>50%</span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Sección: Recursos Recomendados (Carrusel Horizontal) */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Recursos Recomendados
            </h2>
            <Link
              to="/app/recursos"
              className="text-sm font-normal text-primary hover:underline flex items-center gap-0.5"
            >
              <span>Biblioteca</span>
              <CaretRight size={14} />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 snap-x">
            {FEATURED_RESOURCES.map((resource) => {
              const Icon = resource.icon

              return (
                <Link
                  key={resource.id}
                  to="/app/recursos"
                  className="shrink-0 w-44 snap-start block group"
                >
                  <Card className="h-full bg-card border border-border/70 shadow-none hover:border-primary/40 transition-colors">
                    <CardContent className="p-3.5 space-y-2.5 flex flex-col justify-between h-full">
                      <div className="w-9 h-9 rounded-xl bg-muted/60 text-primary flex items-center justify-center">
                        <Icon size={20} weight="regular" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-normal text-foreground leading-snug line-clamp-2">
                          {resource.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm font-normal text-muted-foreground pt-0.5">
                          <span>{resource.category}</span>
                          <span>{resource.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Sección: Agendamiento Rápido de Cita */}
        <section className="pt-1">
          <Link to="/app/salud" className="block group">
            <div className="p-4 rounded-2xl border border-primary/25 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <CalendarCheck size={20} weight="regular" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-foreground">
                    Agendar Cita o Evaluación
                  </h3>
                  <p className="text-sm font-normal text-muted-foreground">
                    Programa un nuevo control o seguimiento CRED
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </Link>
        </section>
      </div>

      {/* 3. Bottom Sheet de Selección de Idioma */}
      <Sheet open={isLanguageSheetOpen} onOpenChange={setIsLanguageSheetOpen}>
        <SheetContent
          side="bottom"
          className="pb-8 pt-4 space-y-4 animate-in slide-in-from-bottom duration-300 ease-out"
        >
          {/* Indicador de arrastre / barra de agarre superior */}
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto" />

          <SheetHeader className="text-left space-y-1">
            <SheetTitle className="text-base font-semibold text-foreground">
              Seleccionar Idioma
            </SheetTitle>
            <SheetDescription className="text-sm font-normal text-muted-foreground">
              Elige el idioma preferido para la atención y contenidos de la aplicación.
            </SheetDescription>
          </SheetHeader>

          {/* Lista de Idiomas */}
          <div className="space-y-2 pt-1">
            {LANGUAGES.map((lang, index) => {
              const isSelected = selectedLanguage === lang.id

              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(lang.id)
                    setIsLanguageSheetOpen(false)
                  }}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all active:scale-[0.99] animate-in fade-in slide-in-from-bottom-2 duration-300 ${isSelected
                    ? "bg-primary/10 text-primary border border-primary/25 shadow-sm"
                    : "hover:bg-muted text-foreground border border-border/50"
                    }`}
                >
                  <div className="text-left">
                    <p className={`text-base ${isSelected ? "font-semibold text-primary" : "font-medium text-foreground"}`}>
                      {lang.name}
                    </p>
                    <p className="text-sm font-normal text-muted-foreground">
                      {lang.native}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check size={14} weight="bold" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
