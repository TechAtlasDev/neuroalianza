import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  User,
  ShieldCheck,
  Hospital,
  CloudArrowDown,
  SignOut,
  CaretRight,
  IdentificationCard,
} from "@phosphor-icons/react"

export function UserProfilePage() {
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true)

  return (
    <div className="space-y-4">
      {/* Header Perfil */}
      <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-heading font-black text-xl shrink-0">
          <User size={30} weight="duotone" />
        </div>

        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-bold font-heading text-foreground truncate">
              Lic. Carmen Morales
            </h2>
            <Badge variant="outline" className="text-md text-primary border-primary/40 px-1.5 py-0">
              CRED
            </Badge>
          </div>
          <p className="text-md text-muted-foreground truncate">
            Enfermera Especialista en Crecimiento y Desarrollo
          </p>
          <p className="text-md text-muted-foreground flex items-center gap-1 font-medium pt-0.5">
            <Hospital size={13} className="text-primary" />
            <span>C.S. San Juan de Miraflores (RIS Sur)</span>
          </p>
        </div>
      </div>

      {/* Ajustes de la Aplicación */}
      <section className="space-y-2">
        <h3 className="text-md font-bold text-muted-foreground uppercase tracking-wider px-1">
          Ajustes de Sincronización y PWA
        </h3>

        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {/* Modo Offline */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CloudArrowDown size={18} weight="bold" />
                </div>
                <div>
                  <p className="text-md font-bold text-foreground">Sincronización Offline</p>
                  <p className="text-md text-muted-foreground">
                    Guarda fichas de tamizaje sin internet y sincroniza al conectar
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={offlineSyncEnabled}
                onChange={(e) => setOfflineSyncEnabled(e.target.checked)}
                className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
              />
            </div>

            {/* Seguridad y Datos Clínicos */}
            <div className="p-3.5 flex items-center justify-between hover:bg-muted/40 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck size={18} weight="bold" />
                </div>
                <div>
                  <p className="text-md font-bold text-foreground">Protección de Datos MINSA</p>
                  <p className="text-md text-muted-foreground">
                    Cifrado de fichas CRED y consentimiento informado
                  </p>
                </div>
              </div>
              <CaretRight size={16} className="text-muted-foreground" />
            </div>

            {/* Credenciales y Colegiatura */}
            <div className="p-3.5 flex items-center justify-between hover:bg-muted/40 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <IdentificationCard size={18} weight="bold" />
                </div>
                <div>
                  <p className="text-md font-bold text-foreground">Colegiatura y Registro</p>
                  <p className="text-md text-muted-foreground">
                    CEP: 58941 • RNE: 024194
                  </p>
                </div>
              </div>
              <CaretRight size={16} className="text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cerrar Sesión */}
      <Button
        variant="outline"
        className="w-full min-h-11 text-md font-semibold text-destructive border-destructive/30 hover:bg-destructive/10 gap-2 mt-2"
      >
        <SignOut size={16} weight="bold" />
        <span>Cerrar Sesión Segura</span>
      </Button>
    </div>
  )
}
