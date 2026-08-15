import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { BottomNavBar, DEFAULT_BOTTOM_NAV_ITEMS } from "./BottomNavBar"
import { Activity } from "lucide-react"

describe("BottomNavBar Component", () => {
  it("renderiza todos los elementos por defecto", () => {
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <BottomNavBar />
      </MemoryRouter>
    )

    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Tamizaje")).toBeInTheDocument()
    expect(screen.getByText("Familias")).toBeInTheDocument()
    expect(screen.getByText("Especialistas")).toBeInTheDocument()
    expect(screen.getByText("Demo Lab")).toBeInTheDocument()
  })

  it("detecta la pestaña activa según la ruta actual en react-router", () => {
    render(
      <MemoryRouter initialEntries={["/app/salud"]}>
        <BottomNavBar />
      </MemoryRouter>
    )

    const saludButton = screen.getByTestId("nav-item-salud")
    expect(saludButton).toHaveClass("text-primary")
    expect(saludButton).toHaveClass("bg-primary/10")
  })

  it("permite pasar una lista de items personalizada", () => {
    const customItems = [
      { id: "custom1", label: "Citas Hoy", to: "/app/citas", icon: Activity },
      { id: "custom2", label: "Reportes", to: "/app/reportes", icon: Activity, badgeCount: 4 },
    ]

    render(
      <MemoryRouter initialEntries={["/app/citas"]}>
        <BottomNavBar items={customItems} />
      </MemoryRouter>
    )

    expect(screen.getByText("Citas Hoy")).toBeInTheDocument()
    expect(screen.getByText("Reportes")).toBeInTheDocument()
    expect(screen.getByText("4")).toBeInTheDocument()
  })

  it("ejecuta callback onTabChange al hacer clic", () => {
    const onTabChangeMock = vi.fn()
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <BottomNavBar onTabChange={onTabChangeMock} />
      </MemoryRouter>
    )

    const familiasButton = screen.getByTestId("nav-item-familia")
    fireEvent.click(familiasButton)
    expect(onTabChangeMock).toHaveBeenCalledWith("familia")
  })
})
