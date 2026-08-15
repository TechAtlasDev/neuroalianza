import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "@/pages/public/LandingPage"
import { NotFoundPage } from "@/pages/public/NotFoundPage"
import { MobileAppLayout } from "@/components/layout/MobileAppLayout"
import { AppIndexPage } from "@/pages/app/AppIndexPage"
import { HealthWorkerDashboard } from "@/pages/health-worker/HealthWorkerDashboard"
import { FamilyHomePage } from "@/pages/family/FamilyHomePage"
import { SpecialistDashboard } from "@/pages/specialist/SpecialistDashboard"
import { DemoControlPanelPage } from "@/pages/demo/DemoControlPanelPage"

export function AppRoutes() {
  return (
    <Routes>
      {/* 1. Ruta Principal: Landing Page Responsiva (Desktop + Móvil) */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. Ruta de Aplicación: Layout Modular PWA Mobile-First */}
      <Route path="/app" element={<MobileAppLayout />}>
        <Route index element={<AppIndexPage />} />
        <Route path="salud" element={<HealthWorkerDashboard />} />
        <Route path="familia" element={<FamilyHomePage />} />
        <Route path="clinico" element={<SpecialistDashboard />} />
        <Route path="demo" element={<DemoControlPanelPage />} />
        
        {/* Alias de navegación rápida */}
        <Route path="pacientes" element={<HealthWorkerDashboard />} />
        <Route path="citas" element={<FamilyHomePage />} />
      </Route>

      {/* 3. Ruta Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
