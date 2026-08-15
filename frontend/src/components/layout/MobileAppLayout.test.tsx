import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { MobileAppLayout } from "./MobileAppLayout"

describe("MobileAppLayout (Modular Mobile-First PWA Shell)", () => {
  it("renderiza correctamente las ranuras predeterminadas (Header, Contenido y BottomNav)", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <MobileAppLayout title="Neuroalianza CRED" role="Posta San Juan">
          <div data-testid="main-child">Vista de prueba</div>
        </MobileAppLayout>
      </MemoryRouter>
    )

    // Verifica que el contenedor móvil esté presente
    expect(screen.getByTestId("mobile-app-shell")).toBeInTheDocument()

    // Verifica TopHeader por defecto
    expect(screen.getByText("Neuroalianza CRED")).toBeInTheDocument()
    expect(screen.getByText("Posta San Juan")).toBeInTheDocument()

    // Verifica Contenido
    expect(screen.getByTestId("main-child")).toBeInTheDocument()

    // Verifica BottomNavBar por defecto
    expect(screen.getByTestId("bottom-nav-bar")).toBeInTheDocument()
    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Tamizaje")).toBeInTheDocument()
  })

  it("permite inyectar componentes personalizados en todas las ranuras modulares", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <MobileAppLayout
          topBannerSlot={<div data-testid="custom-top-banner">Alerta Offline</div>}
          headerSlot={<div data-testid="custom-header">Mi Header Personalizado</div>}
          subHeaderSlot={<div data-testid="custom-sub-header">Barra de Búsqueda</div>}
          aboveBottomSlot={<button data-testid="custom-fab">FAB Flotante</button>}
          bottomSlot={<div data-testid="custom-bottom">Mi Barra Inferior</div>}
          bottomExtensionSlot={<div data-testid="custom-extension">Debug Drawer</div>}
        >
          <div>Contenido Central</div>
        </MobileAppLayout>
      </MemoryRouter>
    )

    expect(screen.getByTestId("custom-top-banner")).toHaveTextContent("Alerta Offline")
    expect(screen.getByTestId("custom-header")).toHaveTextContent("Mi Header Personalizado")
    expect(screen.getByTestId("custom-sub-header")).toHaveTextContent("Barra de Búsqueda")
    expect(screen.getByTestId("custom-fab")).toHaveTextContent("FAB Flotante")
    expect(screen.getByTestId("custom-bottom")).toHaveTextContent("Mi Barra Inferior")
    expect(screen.getByTestId("custom-extension")).toHaveTextContent("Debug Drawer")
  })

  it("permite ocultar encabezado o barra de navegación según configuración", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <MobileAppLayout hideHeader={true} hideBottomNav={true}>
          <div>Solo Contenido</div>
        </MobileAppLayout>
      </MemoryRouter>
    )

    expect(screen.queryByTestId("top-header")).not.toBeInTheDocument()
    expect(screen.queryByTestId("bottom-nav-bar")).not.toBeInTheDocument()
    expect(screen.getByText("Solo Contenido")).toBeInTheDocument()
  })
})
