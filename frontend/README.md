# 🖥️ Neuroalianza — Frontend Web Application

> **Hackatón Instituto Nacional de Salud del Niño San Borja (INSN SB) 2026**  
> *Desafío 04: Neurodesarrollo — Neurología Pediátrica · Psiquiatría Infantil · Psicología · Genética · Medicina Física y Rehabilitación*

Aplicación web moderna, inclusiva y accesible para la plataforma **Neuroalianza**, construida con **React 19**, **TypeScript**, **Vite 8**, **React Compiler**, **Untitled UI React** y **Tailwind CSS**.

---

## 📚 Índice de Documentación del Frontend

Para consultar la especificación exhaustiva del frontend, navega por los documentos especializados:

| Documento | Enlace | Contenido Principal |
| :--- | :--- | :--- |
| **Filosofía y Principios UX** | [PHILOSOPHY.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/PHILOSOPHY.md) | Enfoque humano-clínico, tres realidades sobre un AppShell, "Regla Cero", legibilidad y ética médica. |
| **Guía de Contribución** | [CONTRIBUTING.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/CONTRIBUTING.md) | Instalación de Untitled UI por CLI, uso obligatorio de tokens, tipografía $\ge 16\text{px}$, testing y checklist de PR. |
| **Reglas para Asistentes AI** | [agents.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/agents.md) | Reglas obligatorias para asistentes de código: prohibición de valores fijos, componentes crudos y tamaños pequeños. |
| **Arquitectura Técnica** | [docs/ARCHITECTURE.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/docs/ARCHITECTURE.md) | Jerarquía de providers, enrutado por zonas (`/salud`, `/familia`, `/clinico`, `/demo`), React Query y caché offline. |
| **Estándares Normativos** | [docs/neuro_estandares.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/docs/neuro_estandares.md) | Documento normativo completo sobre tokens, paleta institucional, composición de providers y linters. |
| **Mapa de Rutas y Páginas** | [docs/routes.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/docs/routes.md) | Especificación funcional de las 23 pantallas del sistema priorizadas por [P1] y [P2]. |
| **Sistema de Diseño y Tokens** | [docs/DESIGN_SYSTEM_AND_TOKENS.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/docs/DESIGN_SYSTEM_AND_TOKENS.md) | Tokens semánticos de fondo/texto/borde, escala tipográfica, áreas táctiles $\ge 44\text{px}$ y accesibilidad WCAG AAA. |
| **Estrategia de Testing** | [docs/TESTING_STRATEGY.md](file:///home/techatlasdev/Proyectos/Sensoria/hackatones/neuroalianza-v1/frontend/docs/TESTING_STRATEGY.md) | Pirámide de pruebas con Vitest, React Testing Library, auditoría con axe-core y mocks de API con MSW. |

---

## ⚡ 1. Características Destacadas

* **Untitled UI React + React Aria:** Componentes nativamente accesibles con soporte total para navegación por teclado y lectores de pantalla.
* **Tres Experiencias Adaptadas:**
  * **Personal de Salud (`/salud`):** Optimizado para uso móvil ágil en postas y controles CRED con soporte offline.
  * **Familias (`/familia`):** Lenguaje simple, tipografía grande, hoja de ruta clara y ejercicios prácticos en casa.
  * **Especialistas (`/clinico`):** Ficha Multidisciplinaria 360°, agenda interactiva y panel analítico de tiempos de espera.
* **React 19 + React Compiler:** Memoización automática en compilación para máximo rendimiento.
* **Diseño Responsivo y Modo Oscuro:** Transición fluida entre temas con contraste asegurado.

---

## 🚀 2. Inicio Rápido

### 2.1 Prerrequisitos
* **Node.js $\ge 20$**
* **npm $\ge 10$** o **pnpm**

### 2.2 Instalación y Ejecución
```bash
# 1. Posicionarse en el directorio frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo Vite
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

---

## 🧪 3. Comandos de Calidad y Testing

```bash
# Ejecutar verificación estricta de TypeScript
npm run typecheck

# Ejecutar ESLint
npm run lint

# Ejecutar pruebas automatizadas
npm run test
```

---

## 🏗️ 4. Estructura del Código

```
src/
├── main.tsx                         # Composición de RouteProvider, ThemeProvider, QueryProvider
├── App.tsx                          # Enrutador principal
├── styles/                          # theme.css (@theme tokens) y globals.css
├── components/
│   ├── base/                        # Átomos de Untitled UI (Button, Input, Badge, Select)
│   ├── application/                 # Organismos de Untitled UI (Modals, Tables, Slideouts)
│   ├── shared/                      # Componentes de dominio (SemaforoRiesgo, TimelineItem)
│   └── layout/                      # AppShell, Sidebar, Header
├── features/                        # Módulos de negocio (screening, referral, appointments, metrics)
├── pages/                           # Vistas por zona (/public, /health-worker, /family, /specialist, /demo)
├── hooks/                           # Custom Hooks
└── utils/                           # Utilidades y combinadores de clases
```

---

## 📄 5. Licencia y Créditos
Desarrollado para el **Hackatón INSN San Borja 2026** por el equipo Neuroalianza.
