import { type ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { TopHeader, type ConnectionStatus } from "./TopHeader"
import { BottomNavBar, type BottomNavItem } from "./BottomNavBar"

export interface MobileAppLayoutProps {
  /** Título para el TopHeader predeterminado */
  title?: string
  /** Subtítulo o rol para el TopHeader predeterminado */
  role?: string
  /** Mostrar botón de retroceso en el TopHeader */
  showBack?: boolean
  /** Callback para el botón de retroceso */
  onBack?: () => void
  /** Estado de conexión para el TopHeader */
  connectionStatus?: ConnectionStatus
  /** Conteo de notificaciones */
  notificationCount?: number
  /** Callback al presionar notificaciones */
  onNotificationsClick?: () => void

  /** Ranura superior (encima del header: banners offline, alertas críticas, barra de pitch) */
  topBannerSlot?: ReactNode
  /** Ranura de encabezado personalizada (reemplaza a TopHeader por completo) */
  headerSlot?: ReactNode
  /** Oculta el encabezado por completo */
  hideHeader?: boolean
  /** Ranura sub-encabezado (debajo del header: buscadores, steps, filtros o tabs) */
  subHeaderSlot?: ReactNode

  /** Contenido principal. Si no se provee, renderiza <Outlet /> para React Router */
  children?: ReactNode

  /** Ranura encima de la barra inferior (botones de acción flotantes, resumen fijo, CTA) */
  aboveBottomSlot?: ReactNode
  /** Ranura de navegación inferior personalizada (reemplaza a BottomNavBar) */
  bottomSlot?: ReactNode
  /** Oculta la barra de navegación inferior */
  hideBottomNav?: boolean
  /** Elementos de navegación personalizados para el BottomNavBar predeterminado */
  bottomNavItems?: BottomNavItem[]
  /** Pestaña activa forzada para el BottomNavBar */
  activeTab?: string
  /** Callback al cambiar de pestaña */
  onTabChange?: (tabId: string) => void

  /** Ranura de extensión inferior (pie de página, debug drawer, barra segura) */
  bottomExtensionSlot?: ReactNode

  /** Clases CSS para el contenedor móvil externo */
  className?: string
  /** Clases CSS para la zona de contenido scrollable */
  contentClassName?: string
}

export function MobileAppLayout({
  title = "Neuroalianza",
  role = "CRED / Posta de Salud",
  showBack = false,
  onBack,
  connectionStatus = "online",
  notificationCount = 0,
  onNotificationsClick,
  topBannerSlot,
  headerSlot,
  hideHeader = false,
  subHeaderSlot,
  children,
  aboveBottomSlot,
  bottomSlot,
  hideBottomNav = false,
  bottomNavItems,
  activeTab,
  onTabChange,
  bottomExtensionSlot,
  className = "",
  contentClassName = "",
}: MobileAppLayoutProps) {
  return (
    <div
      data-testid="mobile-app-shell"
      className="min-h-screen bg-muted/40 flex justify-center text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary"
    >
      {/* Contenedor central tipo teléfono móvil en escritorio (max-w-md), 100% en pantallas móviles */}
      <div
        className={`w-full max-w-md min-h-screen bg-background border-x border-border/80 shadow-2xl flex flex-col relative ${
          hideBottomNav ? "pb-4" : "pb-20"
        } ${className}`}
      >
        {/* 1. Ranura Superior (Banner / Alertas de emergencia / Conectividad) */}
        {topBannerSlot && (
          <div data-testid="layout-top-banner" className="w-full shrink-0">
            {topBannerSlot}
          </div>
        )}

        {/* 2. Encabezado Modular */}
        {!hideHeader &&
          (headerSlot ? (
            <div data-testid="layout-custom-header" className="shrink-0">
              {headerSlot}
            </div>
          ) : (
            <TopHeader
              title={title}
              role={role}
              showBack={showBack}
              onBack={onBack}
              connectionStatus={connectionStatus}
              notificationCount={notificationCount}
              onNotificationsClick={onNotificationsClick}
            />
          ))}

        {/* 3. Ranura Sub-Encabezado (Filtros, Tabs, Stepper) */}
        {subHeaderSlot && (
          <div
            data-testid="layout-sub-header"
            className="w-full bg-background/90 backdrop-blur-sm border-b border-border px-4 py-2 shrink-0"
          >
            {subHeaderSlot}
          </div>
        )}

        {/* 4. Contenido Principal Scrollable */}
        <main
          data-testid="layout-main-content"
          className={`flex-1 p-4 overflow-y-auto ${contentClassName}`}
        >
          {children !== undefined ? children : <Outlet />}
        </main>

        {/* 5. Ranura encima de la navegación inferior (FABs, Resúmenes de caso) */}
        {aboveBottomSlot && (
          <div
            data-testid="layout-above-bottom"
            className="sticky bottom-20 px-4 z-30 pointer-events-auto"
          >
            {aboveBottomSlot}
          </div>
        )}

        {/* 6. Barra de Navegación Inferior Modular */}
        {!hideBottomNav &&
          (bottomSlot ? (
            <div data-testid="layout-custom-bottom" className="shrink-0">
              {bottomSlot}
            </div>
          ) : (
            <BottomNavBar
              items={bottomNavItems}
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
          ))}

        {/* 7. Ranura de Extensión Inferior */}
        {bottomExtensionSlot && (
          <div data-testid="layout-bottom-extension" className="w-full shrink-0">
            {bottomExtensionSlot}
          </div>
        )}
      </div>
    </div>
  )
}
