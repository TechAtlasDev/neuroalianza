import { Activity, Bell, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TopHeaderProps {
  title?: string
  role?: string
}

export function TopHeader({ title = "Neuroalianza", role = "CRED / Posta" }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-md font-bold leading-tight tracking-tight text-foreground">{title}</h1>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1 text-xs font-normal border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <Wifi className="w-3 h-3" />
          <span>Online</span>
        </Badge>
        <button
          type="button"
          aria-label="Notificaciones"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
