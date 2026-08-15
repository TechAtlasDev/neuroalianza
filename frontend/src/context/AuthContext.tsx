import React, { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { auth } from "@/config/firebase"

export type UserRole = "salud" | "familia" | "especialista" | "admin"

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string
  role: UserRole
  healthCenter: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  loginWithEmail: (email: string, pass: string) => Promise<void>
  loginWithRole: (role: UserRole) => Promise<void>
  logout: () => Promise<void>
}

const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  salud: {
    uid: "usr-cred-101",
    email: "salud@tinkuy.pe",
    displayName: "Lic. María Elena Ramos (CRED)",
    role: "salud",
    healthCenter: "C.S. San Juan de Lurigancho",
  },
  familia: {
    uid: "usr-fam-202",
    email: "familia@tinkuy.pe",
    displayName: "Elena Ramos (Madre de Mateo)",
    role: "familia",
    healthCenter: "C.S. San Juan de Lurigancho",
  },
  especialista: {
    uid: "usr-esp-303",
    email: "especialista@insnsb.gob.pe",
    displayName: "Dr. Arnaldo Silva (Neuropediatra)",
    role: "especialista",
    healthCenter: "INSN San Borja",
  },
  admin: {
    uid: "usr-adm-404",
    email: "admin@tinkuy.pe",
    displayName: "Administrador de Red",
    role: "admin",
    healthCenter: "INSN San Borja",
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(DEFAULT_PROFILES.salud)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        // Asignar perfil basado en email o fallback
        const email = currentUser.email || ""
        if (email.includes("especialista")) {
          setProfile(DEFAULT_PROFILES.especialista)
        } else if (email.includes("familia")) {
          setProfile(DEFAULT_PROFILES.familia)
        } else {
          setProfile(DEFAULT_PROFILES.salud)
        }
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, pass)
    } catch (err: any) {
      console.warn("Firebase Auth fallback para demo:", err.message)
      // Fallback para login de demo en cliente si el usuario no existe en Firebase Auth remoto
      if (email.includes("especialista")) setProfile(DEFAULT_PROFILES.especialista)
      else if (email.includes("familia")) setProfile(DEFAULT_PROFILES.familia)
      else setProfile(DEFAULT_PROFILES.salud)
    } finally {
      setLoading(false)
    }
  }

  const loginWithRole = async (role: UserRole) => {
    setLoading(true)
    try {
      await signInAnonymously(auth)
      setProfile(DEFAULT_PROFILES[role])
    } catch (err: any) {
      console.warn("Firebase Anónimo fallback:", err.message)
      setProfile(DEFAULT_PROFILES[role])
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (err: any) {
      console.warn("SignOut:", err.message)
    }
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        loginWithEmail,
        loginWithRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
