import { useState, type ReactNode } from "react"
import { TopHeader } from "./TopHeader"
import { BottomNavBar } from "./BottomNavBar"

interface MobileAppShellProps {
  children: ReactNode
  title?: string
  role?: string
}

export function MobileAppShell({
  children,
  title = "Neuroalianza",
  role = "CRED / Posta de Salud",
}: MobileAppShellProps) {
  const [activeTab, setActiveTab] = useState("inicio")

  return (
    <div className="min-h-screen bg-muted/40 flex justify-center text-foreground font-sans antialiased">
      {/* Contenedor central tipo móvil (Mobile-First PWA) */}
      <div className="w-full max-w-md min-h-screen bg-background border-x border-border shadow-2xl flex flex-col relative pb-20">
        <TopHeader title={title} role={role} />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
        <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
