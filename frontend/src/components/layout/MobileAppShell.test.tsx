import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MobileAppShell } from './MobileAppShell'

describe('MobileAppShell Component', () => {
  it('renderiza correctamente el encabezado, contenido y barra inferior de navegación', () => {
    render(
      <MobileAppShell title="Neuroalianza CRED" role="Posta San Martín">
        <div data-testid="test-content">Contenido de prueba</div>
      </MobileAppShell>
    )

    // Verifica encabezado y rol
    expect(screen.getByText('Neuroalianza CRED')).toBeInTheDocument()
    expect(screen.getByText('Posta San Martín')).toBeInTheDocument()

    // Verifica contenido principal
    expect(screen.getByTestId('test-content')).toBeInTheDocument()

    // Verifica elementos de navegación inferior
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Tamizaje')).toBeInTheDocument()
    expect(screen.getByText('Pacientes')).toBeInTheDocument()
    expect(screen.getByText('Citas')).toBeInTheDocument()
  })

  it('permite alternar pestañas en la barra inferior', () => {
    render(
      <MobileAppShell>
        <div>Contenido</div>
      </MobileAppShell>
    )

    const tamizajeBtn = screen.getByRole('button', { name: /tamizaje/i })
    fireEvent.click(tamizajeBtn)
    expect(tamizajeBtn).toHaveClass('text-primary')
  })
})
