import { type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { Activity, Bell, ArrowLeft, Wifi, WifiOff, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type ConnectionStatus = "online" | "offline" | "syncing"

export interface TopHeaderProps {
  /** Título principal de la vista */
  title?: string
  /** Subtítulo o rol del usuario actual (ej. CRED / Posta, Neuropediatría) */
  role?: string
  /** Muestra un botón de retroceso a la izquierda */
  showBack?: boolean
  /** Callback personalizado al presionar retroceso (por defecto ejecuta navigate(-1)) */
  onBack?: () => void
  /** Estado de conectividad de la PWA */
  connectionStatus?: ConnectionStatus
  /** Número de notificaciones pendientes */
  notificationCount?: number
  /** Callback al presionar el botón de notificaciones */
  onNotificationsClick?: () => void
  /** Ranura para componentes personalizados a la izquierda (reemplaza icono/back) */
  leftSlot?: ReactNode
  /** Ranura para acciones o botones personalizados a la derecha */
  rightSlot?: ReactNode
  /** Clase CSS adicional para el contenedor */
  className?: string
}

export function TopHeader({
  title = "Neuroalianza",
  role = "CRED / Posta",
  showBack = false,
  onBack,
  connectionStatus = "online",
  notificationCount = 0,
  onNotificationsClick,
  leftSlot,
  rightSlot,
  className = "",
}: TopHeaderProps) {
  let navigate: ReturnType<typeof useNavigate> | null = null
  try {
    // Usar navigate si estamos dentro de un Router context
    navigate = useNavigate()
  } catch {
    // Fallback si se renderiza fuera de un Router
    navigate = null
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (navigate) {
      navigate(-1)
    }
  }

  return (
    <header
      data-testid="top-header"
      className={`sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md px-4 py-3 flex items-center justify-between transition-colors ${className}`}
    >
      {/* Zona Izquierda: Back button o Logo/Icono de Neuroalianza */}
      <div className="flex items-center gap-2.5 min-w-0">
        {leftSlot ? (
          leftSlot
        ) : showBack ? (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Volver atrás"
            className="w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-foreground hover:bg-muted/80 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/85 flex items-center justify-center text-primary-foreground shadow-sm shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        )}

        <div className="min-w-0">
          <h1 className="text-base font-bold leading-tight tracking-tight text-foreground truncate">
            {title}
          </h1>
          {role && (
            <p className="text-xs font-medium text-muted-foreground truncate">
              {role}
            </p>
          )}
        </div>
      </div>

      {/* Zona Derecha: Status Badge, Notificaciones o Ranura Personalizada */}
      <div className="flex items-center gap-2 shrink-0">
        {rightSlot ? (
          rightSlot
        ) : (
          <>
            {connectionStatus === "online" && (
              <Badge
                variant="outline"
                className="gap-1 text-xs font-medium border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-0.5 px-2"
              >
                <Wifi className="w-3 h-3" />
                <span className="hidden sm:inline">Online</span>
              </Badge>
            )}

            {connectionStatus === "offline" && (
              <Badge
                variant="outline"
                className="gap-1 text-xs font-medium border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 py-0.5 px-2"
              >
                <WifiOff className="w-3 h-3" />
                <span>Offline</span>
              </Badge>
            )}

            {connectionStatus === "syncing" && (
              <Badge
                variant="outline"
                className="gap-1 text-xs font-medium border-primary/30 bg-primary/10 text-primary py-0.5 px-2 animate-pulse"
              >
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Sincronizando</span>
              </Badge>
            )}

            <button
              type="button"
              onClick={onNotificationsClick}
              aria-label={
                notificationCount > 0
                  ? `Notificaciones: ${notificationCount} nuevas`
                  : "Notificaciones"
              }
              className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-destructive ring-2 ring-background" />
              )}
            </button>
          </>
        )}
      </div>
    </header>
  )
}
