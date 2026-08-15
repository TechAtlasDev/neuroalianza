/**
 * Configuración oficial e inicialización del SDK de Firebase para Tinkuy.
 * Proyecto: oculuslab
 * Aplicación: Tinkuy Web PWA (App ID: 1:483160648321:web:d341b686c4496056aebb80)
 */

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD2nrL_LGdyxIlbuEv-3MmcaQkwNGUReKk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oculuslab.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oculuslab",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oculuslab.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "483160648321",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:483160648321:web:d341b686c4496056aebb80",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WKQ6Y1D4HE",
}

// Inicializar la app de Firebase evitando duplicados
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Inicializar servicios de Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
