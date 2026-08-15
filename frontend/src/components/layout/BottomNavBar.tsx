import type { ComponentType } from "react"
import { Home, ClipboardCheck, Users, Calendar } from "lucide-react"

export interface NavItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  active?: boolean
  onClick?: () => void
}

interface BottomNavBarProps {
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

export function BottomNavBar({ activeTab = "inicio", onTabChange }: BottomNavBarProps) {
  const items: NavItem[] = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "tamizaje", label: "Tamizaje", icon: ClipboardCheck },
    { id: "pacientes", label: "Pacientes", icon: Users },
    { id: "citas", label: "Citas", icon: Calendar },
  ]

  return (
    <nav
      aria-label="Navegación principal móvil"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-2 py-1 flex items-center justify-around"
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange?.(item.id)}
            className={`min-h-[44px] min-w-[64px] flex flex-col items-center justify-center gap-1 rounded-lg py-1 px-2 text-xs font-medium transition-colors ${
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
