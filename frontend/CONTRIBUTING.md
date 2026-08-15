# 🤝 Guía de Contribución al Frontend — Neuroalianza

> ¡Bienvenido al desarrollo de la interfaz de **Neuroalianza**!  
> Este frontend sigue estándares rigurosos basados en **Untitled UI React**, accesibilidad universal (WCAG AAA) y tipado estricto con TypeScript.  
> Cada componente, página o flujo integrado **DEBE incluir pruebas automatizadas correspondientes** para verificar su funcionamiento y accesibilidad.

---

## 🧭 1. Reglas Esenciales de Contribución

Antes de escribir cualquier componente, ten presentes estas reglas no negociables:

1. **Untitled UI es la única fuente de componentes:** Prohibido crear botones, modales, selectores o inputs nativos a mano.
2. **Tokens semánticos obligatorios:** Prohibido el uso de colores en duro (`#fff`, `bg-blue-500`) o tipografías menores a `text-md` (16px).
3. **Áreas táctiles $\ge 44\times 44\text{ px}$:** Todo control interactivo debe ser fácilmente accionable en dispositivos móviles con pantallas táctiles.
4. **Testing obligatorio en cada integración:** Todo flujo o componente nuevo debe probarse con pruebas unitarias/componente antes de fusionar.

---

## 🛠️ 2. Entorno y Configuración Inicial

### 2.1 Prerrequisitos
* **Node.js $\ge 20$**
* **npm $\ge 10$** o **pnpm**

### 2.2 Instalación
```bash
# 1. Posicionarse en el directorio frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

---

## 📦 3. Flujo para Incorporar Componentes de Interfaz

```
1. ¿El componente ya existe en src/components/?
   ├── SÍ ──► Impórtalo directamente desde @/components/...
   └── NO ──► 2. Instálalo mediante el CLI oficial de Untitled UI:
                npx untitledui@latest add <nombre-componente>
                └── Si no está en el CLI: Cópialo íntegro desde la doc oficial
```

### 3.1 Importación Adecuada
```tsx
// ✅ Correcto: uso del componente base de Untitled UI
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badge";
import { AlertCircle } from "@untitledui/icons";

// ❌ Prohibido: elementos HTML crudos o librerías externas no autorizadas
<button className="bg-blue-500 text-white p-2">Guardar</button>
```

---

## 🎨 4. Estándares de Diseño y Tokens

### 4.1 Colores y Tokens Semánticos
| Propósito | Token Permitido | Prohibido |
| :--- | :--- | :--- |
| **Fondos** | `bg-primary`, `bg-secondary`, `bg-brand-solid`, `bg-error-primary`, `bg-success-primary` | `bg-white`, `bg-[#F4F5F7]`, `bg-blue-600` |
| **Textos** | `text-primary`, `text-secondary`, `text-tertiary`, `text-primary_on-brand`, `text-error-primary` | `text-gray-700`, `text-black`, `#333` |
| **Bordes** | `border-primary`, `border-secondary`, `border-error` | `border-gray-200`, `#E5E7EB` |
| **Foco** | `focus-ring` | `outline-none`, `focus:ring-blue-400` |

### 4.2 Escala Tipográfica Permitida
* **Permitidos:** `text-md` (16px - tamaño base mínimo), `text-lg`, `text-xl`, `text-display-xs`, `text-display-sm`, `text-display-md`.
* **Estrictamente Prohibidos:** `text-xs`, `text-sm`, `text-[13px]`, `font-thin`.

---

## 🏗️ 5. Estructura de Carpetas del Frontend

```
frontend/src/
├── main.tsx                         # Entrada con providers (RouteProvider, ThemeProvider)
├── App.tsx                          # Enrutador principal de la aplicación
├── styles/
│   ├── theme.css                    # Definición de tokens @theme y colores de marca
│   └── globals.css                  # Estilos globales y utilidades
├── components/
│   ├── base/                        # Componentes atómicos de Untitled UI (botones, inputs, badges)
│   ├── application/                 # Componentes de aplicación Untitled UI (modales, tablas, sidebars)
│   ├── shared/                      # Componentes transversales del dominio (semaforos, tarjetas)
│   └── layout/                      # AppShell, Navigation, Header
├── features/                        # Módulos organizados por contexto de negocio
│   ├── screening/                   # Cuestionario, cálculo visual de riesgo, alertas
│   ├── referral/                    # Creación y seguimiento de derivaciones
│   ├── appointments/                # Agendamiento, confirmación y declinación
│   ├── care-plan/                   # Plan de estimulación en casa para familias
│   └── metrics/                     # Panel de métricas y gráficos de gestión (Recharts)
├── pages/                           # Páginas organizadas por zona de usuario
│   ├── public/                      # Landing (/), Login (/login)
│   ├── health-worker/               # Panel CRED (/salud), Tamizaje (/salud/tamizaje)
│   ├── family/                      # Mi Ruta (/familia/ruta), Citas (/familia/citas)
│   ├── specialist/                  # Bandeja (/clinico), Ficha 360° (/clinico/casos/:id)
│   └── demo/                        # Centro de control del pitch (/demo)
├── hooks/                           # Custom React Hooks
├── services/                        # Cliente API tipado (generado desde openapi.json)
└── utils/                           # Utilidades auxiliares (cx, formatting)
```

---

## 🧪 6. Requisitos de Testing en el Frontend

Toda funcionalidad del frontend debe contar con pruebas automatizadas:

```bash
# Ejecutar verificación de tipos
npm run typecheck

# Ejecutar linters de código y estilos
npm run lint

# Ejecutar suite de pruebas de componentes
npm run test
```

### Ámbitos de Prueba Obligatorios:
1. **Flujo de Tamizaje:** Verificar que las respuestas completas disparen el resultado y semaforización esperada sin etiquetas diagnósticas.
2. **Accesibilidad (a11y):** Asegurar que todos los campos y botones tengan etiquetas accesibles y sean navegables con tabulador.
3. **Declinación de Citas:** Probar que el modal obligue a seleccionar un motivo estructurado antes de confirmar.
4. **Sincronización Offline:** Validar que un tamizaje guardado sin conexión se mantenga persistente en el cliente.

---

## 📋 7. Checklist para Pull Requests

Antes de solicitar revisión:
- [ ] Has usado exclusivamente componentes de **Untitled UI React** sin inventar elementos nativos.
- [ ] No existen colores en hexadecimal o tamaños de texto menores a `text-md`.
- [ ] Todos los botones y controles táctiles cumplen con el tamaño mínimo de $44\times 44\text{ px}$.
- [ ] Has añadido pruebas unitarias o de integración para el componente o flujo.
- [ ] Has ejecutado `npm run lint` y `npm run typecheck` sin errores.
- [ ] Los mensajes de commit cumplen con [Conventional Commits](https://www.conventionalcommits.org/).
