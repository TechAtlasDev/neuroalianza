import { useState } from "react"
import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { TopHeader } from "./TopHeader"
import type { TopHeaderProps } from "./TopHeader"
import { BottomNavBar } from "./BottomNavBar"
import type { BottomNavBarProps } from "./BottomNavBar"
import { AiAssistantModal } from "@/components/ai/AiAssistantModal"

export interface MobileAppLayoutProps {
  /** Encabezado superior o configuración de TopHeader */
  headerSlot?: ReactNode
  /** Ocultar encabezado superior */
  hideHeader?: boolean
  /** Props para TopHeader si se usa el slot por defecto */
  title?: string
  role?: string
  connectionStatus?: "online" | "offline" | "syncing"
  showBack?: boolean
  onBack?: () => void
  headerProps?: TopHeaderProps

  /** Ranura modular superior (ej: avisos de emergencia, banners de offline, etc.) */
  topBannerSlot?: ReactNode

  /** Ranura modular debajo del encabezado (ej: barra de búsqueda, tabs secundarios, filtros) */
  subHeaderSlot?: ReactNode

  /** Contenido principal (si no se pasa, renderiza <Outlet /> para react-router) */
  children?: ReactNode

  /** Ranura modular encima del BottomNavBar (ej: botón flotante FAB adicional, reproductor de audio, timer) */
  aboveBottomSlot?: ReactNode

  /** Barra inferior de navegación o componente personalizado */
  bottomSlot?: ReactNode
  /** Ocultar barra inferior */
  hideBottomNav?: boolean
  /** Props para BottomNavBar por defecto */
  bottomNavProps?: BottomNavBarProps

  /** Ranura modular inferior (ej: drawer expandible, panel de depuración) */
  bottomExtensionSlot?: ReactNode

  /** Clases CSS adicionales para el contenedor */
  className?: string
  containerClassName?: string
}

export function MobileAppLayout({
  headerSlot,
  hideHeader = false,
  title = "Neuroalianza CRED",
  role = "C.S. San Juan de Miraflores",
  connectionStatus = "online",
  showBack = false,
  onBack,
  headerProps,

  topBannerSlot,
  subHeaderSlot,
  children,
  aboveBottomSlot,

  bottomSlot,
  hideBottomNav = false,
  bottomNavProps,

  bottomExtensionSlot,
  className = "",
  containerClassName = "",
}: MobileAppLayoutProps) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)

  return (
    <div
      data-testid="mobile-app-shell"
      className={`min-h-screen w-full bg-slate-900/10 flex justify-center items-start sm:py-4 transition-colors ${className}`}
    >
      {/* Marco móvil PWA estandarizado */}
      <div
        className={`w-full max-w-md min-h-screen sm:min-h-[844px] sm:max-h-[920px] bg-background sm:rounded-[36px] shadow-2xl sm:border sm:border-border/80 flex flex-col overflow-hidden relative ${containerClassName}`}
      >
        {/* 1. Ranura Modular: Banner Superior */}
        {topBannerSlot && (
          <div className="w-full shrink-0 z-40 animate-in slide-in-from-top-2">
            {topBannerSlot}
          </div>
        )}

        {/* 2. Ranura Modular: Header */}
        {!hideHeader && (
          <div className="w-full shrink-0 z-30">
            {headerSlot || (
              <TopHeader
                title={title}
                role={role}
                connectionStatus={connectionStatus}
                showBack={showBack}
                onBack={onBack}
                {...headerProps}
              />
            )}
          </div>
        )}

        {/* 3. Ranura Modular: Sub-Header */}
        {subHeaderSlot && (
          <div className="w-full shrink-0 z-20 border-b border-border/60 bg-card/60 backdrop-blur-sm">
            {subHeaderSlot}
          </div>
        )}

        {/* 4. Contenedor de Contenido Principal (Scrolleable) */}
        <main
          data-testid="mobile-app-content"
          className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 focus:outline-none"
        >
          {children || <Outlet />}
        </main>

        {/* 5. Ranura Modular: Encima de la barra inferior */}
        {aboveBottomSlot && (
          <div className="w-full shrink-0 z-20 px-4 pb-2">
            {aboveBottomSlot}
          </div>
        )}

        {/* 6. Ranura Modular: Barra de Navegación Inferior (PWA Bar) */}
        {!hideBottomNav && (
          <div className="w-full shrink-0 z-30">
            {bottomSlot || (
              <BottomNavBar
                onAiClick={() => setIsAiModalOpen(true)}
                {...bottomNavProps}
              />
            )}
          </div>
        )}

        {/* 7. Ranura Modular: Extensión Inferior */}
        {bottomExtensionSlot && (
          <div className="w-full shrink-0 z-20">
            {bottomExtensionSlot}
          </div>
        )}

        {/* Asistente IA Modal */}
        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />
      </div>
    </div>
  )
}
