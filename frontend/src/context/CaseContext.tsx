import React, { createContext, useContext, useState } from "react"
import { submitScreeningApi, apiClient } from "@/services/apiClient"

export interface Patient {
  id: string
  name: string
  ageMonths: number
  ageDisplay: string
  dni: string
  guardian: string
  phone: string
  origin: string
  riskLevel: "bajo" | "medio" | "alto"
  riskLabel: string
  daysInCurrentState: number
  status: "tamizaje_completado" | "derivado" | "cita_programada" | "en_evaluacion" | "plan_activo" | "contrarreferido"
  statusLabel: string
  lastScreeningScore?: string
  lastUpdate: string
}

export interface ScreeningAnswer {
  questionId: number
  answer: boolean
}

export interface ReferralData {
  patientId: string
  findings: string[]
  priority: "alta" | "media" | "ordinaria"
  notes: string
  targetCenter: string
  referralCode: string
  createdAt: string
}

interface CaseContextType {
  patients: Patient[]
  referrals: ReferralData[]
  activePatient: Patient | null
  setActivePatient: (patient: Patient | null) => void
  addScreeningResult: (patientData: Partial<Patient>, answers: Record<number, boolean>, risk: "bajo" | "medio" | "alto") => string
  submitReferral: (referral: Omit<ReferralData, "referralCode" | "createdAt">) => string
  updatePatientStatus: (patientId: string, status: Patient["status"], statusLabel: string) => void
}

const INITIAL_PATIENTS: Patient[] = [
  {
    id: "pat-1",
    name: "Mateo Jimenez Ramos",
    ageMonths: 18,
    ageDisplay: "18 meses",
    dni: "78349201",
    guardian: "Elena Ramos (Madre)",
    phone: "+51 984 123 456",
    origin: "C.S. San Juan de Lurigancho",
    riskLevel: "alto",
    riskLabel: "Alto Riesgo",
    daysInCurrentState: 4,
    status: "derivado",
    statusLabel: "Derivado a Tele-Interconsulta",
    lastScreeningScore: "4/5 fallas críticas",
    lastUpdate: "Hace 15 min",
  },
  {
    id: "pat-2",
    name: "Sofía Huamán Castro",
    ageMonths: 24,
    ageDisplay: "24 meses",
    dni: "79102455",
    guardian: "Carlos Huamán (Padre)",
    phone: "+51 971 889 231",
    origin: "Puesto de Salud Huaycán",
    riskLevel: "medio",
    riskLabel: "Riesgo Moderado",
    daysInCurrentState: 12,
    status: "cita_programada",
    statusLabel: "Cita en Neuropediatría",
    lastScreeningScore: "2/5 fallas",
    lastUpdate: "Hace 2 días",
  },
  {
    id: "pat-3",
    name: "Lucas Mendoza Vera",
    ageMonths: 12,
    ageDisplay: "12 meses",
    dni: "77651209",
    guardian: "María Vera (Madre)",
    phone: "+51 955 674 120",
    origin: "C.S. Santa Anita",
    riskLevel: "bajo",
    riskLabel: "Bajo Riesgo",
    daysInCurrentState: 1,
    status: "tamizaje_completado",
    statusLabel: "Control CRED Habitual",
    lastScreeningScore: "0/5 fallas",
    lastUpdate: "Hoy · 09:00 AM",
  },
]

const CaseContext = createContext<CaseContextType | undefined>(undefined)

export function CaseProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS)
  const [referrals, setReferrals] = useState<ReferralData[]>([])
  const [activePatient, setActivePatient] = useState<Patient | null>(INITIAL_PATIENTS[0])

  const addScreeningResult = (
    patientData: Partial<Patient>,
    answers: Record<number, boolean>,
    risk: "bajo" | "medio" | "alto"
  ) => {
    const newId = `pat-${Date.now()}`
    const riskLabel = risk === "alto" ? "Alto Riesgo" : risk === "medio" ? "Riesgo Moderado" : "Bajo Riesgo"
    const failureCount = Object.values(answers).filter((v) => !v).length

    const newPatient: Patient = {
      id: newId,
      name: patientData.name || "Paciente Sin Nombre",
      ageMonths: patientData.ageMonths || 18,
      ageDisplay: `${patientData.ageMonths || 18} meses`,
      dni: patientData.dni || "00000000",
      guardian: patientData.guardian || "Apoderado",
      phone: patientData.phone || "+51 900 000 000",
      origin: patientData.origin || "C.S. Primer Nivel",
      riskLevel: risk,
      riskLabel,
      daysInCurrentState: 0,
      status: risk === "alto" ? "derivado" : "tamizaje_completado",
      statusLabel: risk === "alto" ? "Derivación Pendiente" : "Control CRED Habitual",
      lastScreeningScore: `${failureCount}/5 fallas`,
      lastUpdate: "Recién registrado",
    }

    // Petición asíncrona HTTP al Backend FastAPI
    submitScreeningApi({
      patient_name: newPatient.name,
      age_months: newPatient.ageMonths,
      dni: newPatient.dni,
      guardian_name: newPatient.guardian,
      guardian_phone: newPatient.phone,
      health_center_origin: newPatient.origin,
      answers,
    }).catch((err) => {
      console.warn("Backend offline o error, operando en modo local:", err.message)
    })

    setPatients((prev) => [newPatient, ...prev])
    setActivePatient(newPatient)
    return newId
  }

  const submitReferral = (referral: Omit<ReferralData, "referralCode" | "createdAt">) => {
    const code = `REF-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const newReferral: ReferralData = {
      ...referral,
      referralCode: code,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Petición asíncrona HTTP al Backend FastAPI
    apiClient("/health-worker/referral", {
      method: "POST",
      body: JSON.stringify({
        patient_id: referral.patientId,
        findings: referral.findings,
        priority: referral.priority,
        notes: referral.notes,
        target_center: referral.targetCenter,
      }),
    }).catch((err) => {
      console.warn("Backend offline o error, operando en modo local:", err.message)
    })

    setReferrals((prev) => [newReferral, ...prev])
    updatePatientStatus(referral.patientId, "derivado", "Derivado a INSN San Borja")
    return code
  }

  const updatePatientStatus = (patientId: string, status: Patient["status"], statusLabel: string) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status, statusLabel, daysInCurrentState: 0, lastUpdate: "Hoy" } : p))
    )
  }

  return (
    <CaseContext.Provider
      value={{
        patients,
        referrals,
        activePatient,
        setActivePatient,
        addScreeningResult,
        submitReferral,
        updatePatientStatus,
      }}
    >
      {children}
    </CaseContext.Provider>
  )
}

export function useCase() {
  const context = useContext(CaseContext)
  if (!context) {
    throw new Error("useCase must be used within a CaseProvider")
  }
  return context
}
