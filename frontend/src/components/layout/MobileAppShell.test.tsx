import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { MobileAppShell } from "./MobileAppShell"

describe("MobileAppShell Component", () => {
  it("renderiza correctamente como alias de MobileAppLayout", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <MobileAppShell title="Neuroalianza CRED" role="Posta San Martín">
          <div data-testid="test-content">Contenido de prueba</div>
        </MobileAppShell>
      </MemoryRouter>
    )

    // Verifica encabezado y rol
    expect(screen.getByText("Neuroalianza CRED")).toBeInTheDocument()
    expect(screen.getByText("Posta San Martín")).toBeInTheDocument()

    // Verifica contenido principal
    expect(screen.getByTestId("test-content")).toBeInTheDocument()

    // Verifica elementos de navegación inferior
    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Tamizaje")).toBeInTheDocument()
  })
})
