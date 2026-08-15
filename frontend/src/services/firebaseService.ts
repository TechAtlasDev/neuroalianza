/**
 * Servicio de integración con Firebase Firestore DB para el MVP de Neuroalianza.
 * Maneja el almacenamiento de tamizajes CRED, derivaciones e historias 360°.
 */

import { collection, addDoc, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/config/firebase"

export interface FirestoreScreeningData {
  patientName: string
  ageMonths: number
  dni: string
  guardianName: string
  guardianPhone: string
  healthCenterOrigin: string
  riskLevel: "bajo" | "medio" | "moderado" | "alto"
  riskLabel: string
  failuresCount: number
  recommendation: string
  createdAt?: any
}

export interface FirestoreReferralData {
  patientId: string
  referralCode: string
  findings: string[]
  priority: "alta" | "media" | "ordinaria"
  notes: string
  targetCenter: string
  createdAt?: any
}

/**
 * Guarda un tamizaje CRED en Firestore DB.
 */
export async function saveScreeningToFirestore(data: FirestoreScreeningData) {
  try {
    const docRef = await addDoc(collection(db, "screenings"), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error: any) {
    console.warn("[Firestore Warning] Error al guardar tamizaje en Firestore:", error.message)
    return null
  }
}

/**
 * Registra una derivación asistencial a INSN San Borja en Firestore DB.
 */
export async function saveReferralToFirestore(data: FirestoreReferralData) {
  try {
    const docRef = doc(collection(db, "referrals"), data.referralCode)
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
    })
    return data.referralCode
  } catch (error: any) {
    console.warn("[Firestore Warning] Error al guardar derivación en Firestore:", error.message)
    return null
  }
}

/**
 * Obtiene la lista de tamizajes guardados en Firestore.
 */
export async function getScreeningsFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "screenings"))
    return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (error: any) {
    console.warn("[Firestore Warning] Error al consultar tamizajes de Firestore:", error.message)
    return []
  }
}
