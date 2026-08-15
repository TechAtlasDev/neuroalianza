import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, type UserRole } from "@/context/AuthContext"
import {
  ShieldCheck,
  UserCheck,
  Heart,
  Stethoscope,
  Lock,
  EnvelopeSimple,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react"

export function LoginPage() {
  const navigate = useNavigate()
  const { loginWithEmail, loginWithRole } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return
    setIsSubmitting(true)
    try {
      await loginWithEmail(email, password || "tinkuy2026")
      navigate("/app")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRoleQuickLogin = async (role: UserRole, targetPath: string) => {
    setIsSubmitting(true)
    try {
      await loginWithRole(role)
      navigate(targetPath)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-3xl border border-border/80 shadow-2xl overflow-hidden flex flex-col">
        {/* Header Hero */}
        <div className="bg-gradient-to-b from-primary/15 to-primary/5 p-6 text-center border-b border-border/60 relative">
          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 shadow-md">
            <Sparkle size={32} weight="fill" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Tinkuy</h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Ruta Multidisciplinaria para Conectar Salud, Familia y Neurodesarrollo (INSN San Borja)
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 text-xs font-semibold mt-3">
            <ShieldCheck size={14} />
            <span>Firebase Auth Activo (oculuslab)</span>
          </div>
        </div>

        {/* Formulario e Iniciar Sesión */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <EnvelopeSimple size={16} />
                <span>Correo Electrónico</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@tinkuy.pe"
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Lock size={16} />
                <span>Contraseña</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight size={18} weight="bold" />
            </button>
          </form>

          {/* Divisor */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/80" />
            </div>
            <span className="relative bg-background px-3 text-xs text-muted-foreground font-medium">
              Acceso Rápido Demo por Rol
            </span>
          </div>

          {/* Accesos Rápidos por Rol */}
          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => handleRoleQuickLogin("salud", "/app/salud")}
              className="p-3 rounded-2xl border border-border hover:border-primary bg-card hover:bg-muted/50 transition-all flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <UserCheck size={20} weight="bold" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary">
                  Personal de Salud (CRED)
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  salud@tinkuy.pe · Tamizaje EEDP/TEPSI
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleQuickLogin("familia", "/app/familia")}
              className="p-3 rounded-2xl border border-border hover:border-primary bg-card hover:bg-muted/50 transition-all flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <Heart size={20} weight="bold" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary">
                  Familia y Apoderados
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  familia@tinkuy.pe · Hoja de Ruta y Pautas
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleQuickLogin("especialista", "/app/clinico")}
              className="p-3 rounded-2xl border border-border hover:border-primary bg-card hover:bg-muted/50 transition-all flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Stethoscope size={20} weight="bold" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary">
                  Especialista (INSN San Borja)
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  especialista@insnsb.gob.pe · Ficha 360°
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
