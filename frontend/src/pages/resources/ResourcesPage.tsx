import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  MagnifyingGlass,
  PlayCircle,
  Brain,
  Baby,
  HandsClapping,
  DownloadSimple,
} from "@phosphor-icons/react"

interface ResourceItem {
  id: string
  title: string
  category: "guia" | "actividad" | "video" | "norma"
  ageRange: string
  description: string
  type: string
  durationOrPages: string
  icon: typeof BookOpen
}

export function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")

  const resources: ResourceItem[] = [
    {
      id: "1",
      title: "Guía de Alerta Temprana en Neurodesarrollo (0 a 36 meses)",
      category: "guia",
      ageRange: "0 - 3 años",
      description: "Protocolo clínico MINSA para detección de señales de riesgo en controles CRED.",
      type: "PDF Clínico",
      durationOrPages: "14 págs",
      icon: Brain,
    },
    {
      id: "2",
      title: "Actividades de Estimulación Oportuna y Contacto Visual",
      category: "actividad",
      ageRange: "12 - 24 meses",
      description: "Juegos interactivos de imitación, turnos y seguimiento visual para realizar en casa.",
      type: "Guía Ilustrada",
      durationOrPages: "8 págs",
      icon: Baby,
    },
    {
      id: "3",
      title: "Pautas de Crianza Positiva y Regulación Sensorial",
      category: "actividad",
      ageRange: "18 - 36 meses",
      description: "Estrategias para manejo de hipersensibilidad a ruidos y texturas en primera infancia.",
      type: "Folleto Familiar",
      durationOrPages: "6 págs",
      icon: HandsClapping,
    },
    {
      id: "4",
      title: "Video: Cómo realizar el tamizaje M-CHAT-R en 5 minutos",
      category: "video",
      ageRange: "16 - 30 meses",
      description: "Tutorial práctico paso a paso para personal de salud de primer nivel de atención.",
      type: "Video HD",
      durationOrPages: "4:30 min",
      icon: PlayCircle,
    },
  ]

  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCategory === "todos" || item.category === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="space-y-4">
      {/* Header de Sección */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
          <BookOpen size={24} weight="fill" className="text-primary" />
          <span>Biblioteca de Recursos</span>
        </h2>
        <p className="text-md text-muted-foreground">
          Guías oficiales de neurodesarrollo, fichas ilustradas y pautas para familias.
        </p>
      </div>

      {/* Buscador */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar guías, actividades o protocolos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-10 text-md rounded-xl bg-card"
        />
      </div>

      {/* Filtros por Categoría */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: "todos", label: "Todos" },
          { id: "guia", label: "Protocolos" },
          { id: "actividad", label: "En Casa" },
          { id: "video", label: "Videos" },
        ].map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className="text-md h-8 rounded-lg shrink-0 px-3"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Lista de Recursos */}
      <div className="space-y-2.5">
        {filteredResources.map((res) => {
          const Icon = res.icon

          return (
            <Card key={res.id} className="hover:border-primary/50 transition-all">
              <CardContent className="p-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={22} weight="duotone" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="outline" className="text-md px-1.5 py-0">
                      {res.ageRange}
                    </Badge>
                    <span className="text-md text-muted-foreground font-medium">
                      {res.durationOrPages}
                    </span>
                  </div>

                  <h3 className="text-md font-bold text-foreground leading-tight">
                    {res.title}
                  </h3>

                  <p className="text-md text-muted-foreground leading-relaxed">
                    {res.description}
                  </p>

                  <div className="pt-1.5 flex items-center justify-between">
                    <span className="text-md font-semibold text-primary">
                      {res.type}
                    </span>
                    <Button size="sm" variant="ghost" className="h-7 text-md px-2 gap-1 text-primary">
                      <DownloadSimple size={14} weight="bold" />
                      <span>Descargar</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
