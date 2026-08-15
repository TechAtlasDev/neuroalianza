import type { ComponentType } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Home,
  ClipboardCheck,
  HeartHandshake,
  Stethoscope,
  Sparkles,
} from "lucide-react"

export interface BottomNavItem {
  id: string
  label: string
  to?: string
  icon: ComponentType<{ className?: string }>
  badgeCount?: number
  onClick?: () => void
}

export interface BottomNavBarProps {
  /** Lista personalizada de elementos de navegación */
  items?: BottomNavItem[]
  /** ID o ruta de la pestaña activa (opcional si se usa con react-router) */
  activeTab?: string
  /** Callback al cambiar de pestaña */
  onTabChange?: (tabId: string) => void
  /** Clases adicionales */
  className?: string
}

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  {
    id: "inicio",
    label: "Inicio",
    to: "/app",
    icon: Home,
  },
  {
    id: "salud",
    label: "Tamizaje",
    to: "/app/salud",
    icon: ClipboardCheck,
  },
  {
    id: "familia",
    label: "Familias",
    to: "/app/familia",
    icon: HeartHandshake,
  },
  {
    id: "clinico",
    label: "Especialistas",
    to: "/app/clinico",
    icon: Stethoscope,
    badgeCount: 2,
  },
  {
    id: "demo",
    label: "Demo Lab",
    to: "/app/demo",
    icon: Sparkles,
  },
]

export function BottomNavBar({
  items = DEFAULT_BOTTOM_NAV_ITEMS,
  activeTab,
  onTabChange,
  className = "",
}: BottomNavBarProps) {
  let locationPath = ""
  let navigate: ReturnType<typeof useNavigate> | null = null

  try {
    const loc = useLocation()
    locationPath = loc.pathname
    navigate = useNavigate()
  } catch {
    // Fuera del contexto de React Router
    locationPath = ""
    navigate = null
  }

  const isItemActive = (item: BottomNavItem): boolean => {
    if (activeTab !== undefined) {
      return activeTab === item.id || (item.to !== undefined && activeTab === item.to)
    }

    if (!item.to || !locationPath) {
      return false
    }

    if (item.to === "/app") {
      return locationPath === "/app" || locationPath === "/app/"
    }

    return locationPath.startsWith(item.to)
  }

  const handleItemClick = (item: BottomNavItem) => {
    if (item.onClick) {
      item.onClick()
    }
    if (onTabChange) {
      onTabChange(item.id)
    }
    if (item.to && navigate && !item.onClick) {
      navigate(item.to)
    }
  }

  return (
    <nav
      data-testid="bottom-nav-bar"
      aria-label="Navegación principal móvil"
      className={`fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto border-t border-border/80 bg-background/95 backdrop-blur-md px-1.5 py-1.5 flex items-center justify-around shadow-lg ${className}`}
    >
      {items.map((item) => {
        const Icon = item.icon
        const active = isItemActive(item)

        return (
          <button
            key={item.id}
            type="button"
            data-testid={`nav-item-${item.id}`}
            onClick={() => handleItemClick(item)}
            className={`relative min-h-[48px] min-w-[56px] flex-1 flex flex-col items-center justify-center gap-1 rounded-xl py-1 px-1 text-xs font-semibold transition-all duration-200 active:scale-95 ${
              active
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  active ? "scale-110 stroke-[2.4]" : "stroke-[1.75]"
                }`}
              />
              {Boolean(item.badgeCount && item.badgeCount > 0) && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
                  {item.badgeCount}
                </span>
              )}
            </div>
            <span className="truncate max-w-[64px] tracking-tight">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
