# 🎨 Sistema de Diseño, Tokens y Accesibilidad — Neuroalianza Frontend

> **Proyecto:** Neuroalianza (Hackatón INSN San Borja 2026 — Desafío 04: Neurodesarrollo)  
> **Base:** Untitled UI React + Tailwind CSS v4 / `@tailwindcss/vite`  
> **Estándar de Accesibilidad:** WCAG 2.2 Nivel AAA para legibilidad y áreas táctiles.

---

## 1. Fundamentos del Sistema de Diseño

El sistema de diseño de Neuroalianza se basa íntegramente en los componentes y tokens de **Untitled UI React**. Todos los elementos visuales están parametrizados mediante variables CSS y tokens semánticos definidos en `src/styles/theme.css`.

---

## 2. Tokens Semánticos de Color

Está estrictamente prohibido utilizar colores en formato hexadecimal o escalas directas de Tailwind (`bg-blue-500`, `text-gray-600`). Se deben emplear siempre los **tokens semánticos**:

### 2.1 Fondos (`bg-*`)
| Token Semántico | Uso Clínico / Visual | Modo Claro | Modo Oscuro |
| :--- | :--- | :--- | :--- |
| `bg-primary` | Fondo principal de pantallas y tarjetas | Blanco puro | Gris neutro oscuro |
| `bg-secondary` | Fondos de contenedores secundarios y paneles laterales | Gris muy claro | Gris carbón |
| `bg-brand-solid` | Botones de acción primaria institucional | Azul marca principal | Azul marca accesible |
| `bg-brand-section` | Banners destacados y cabeceras de bienvenida | Azul marca suave | Azul marino profundo |
| `bg-success-primary` | Estados completados, riesgo bajo, citas confirmadas | Verde éxito | Verde esmeralda oscuro |
| `bg-warning-primary` | Estados de observación, riesgo moderado, alertas intermedias | Ámbar cálido | Ámbar oscuro |
| `bg-error-primary` | Señales de alarma críticas, riesgo alto, inasistencias reiteradas | Rojo clínico | Rojo rubí oscuro |

### 2.2 Textos (`text-*`)
| Token Semántico | Uso Clínico / Visual |
| :--- | :--- |
| `text-primary` | Títulos, nombres de pacientes y textos principales de lectura. |
| `text-secondary` | Subtítulos, descripciones de apoyo y metadatos complementarios. |
| `text-tertiary` | Fechas, marcas de tiempo y textos informativos secundarios. |
| `text-primary_on-brand` | Texto de contraste sobre fondos sólidos de marca (`bg-brand-solid`). |
| `text-error-primary` | Mensajes de validación de error y alertas clínicas críticas. |
| `text-success-primary` | Mensajes de éxito y confirmación. |

### 2.3 Bordes y Foco
* `border-primary`: Separadores principales de tarjetas y tablas.
* `border-secondary`: Líneas sutiles de división.
* `border-error`: Resaltado de campos inválidos o casos en estado de alerta.
* `focus-ring`: Anillo de foco accesible para navegación por teclado (reemplaza `outline-none`).

---

## 3. Escala Tipográfica y Legibilidad

> [!CAUTION]
> **Prohibición de Tamaños Pequeños:**  
> Los tamaños `text-xs` y `text-sm` están **prohibidos sin excepción**.

Para asegurar que una enfermera en una posta rural bajo luz solar directa o un familiar con presbicia puedan leer la información sin esfuerzo, se aplica la siguiente escala:

| Token | Tamaño (px) | Propósito |
| :--- | :--- | :--- |
| `text-md` | **16 px** | **Tamaño base mínimo** para párrafos, campos de formulario, botones y tablas. |
| `text-lg` | **18 px** | Subtítulos de sección y textos destacados. |
| `text-xl` | **20 px** | Títulos de tarjetas y modales. |
| `text-display-xs`| **24 px** | Títulos principales de páginas. |
| `text-display-sm`| **30 px** | Encabezados de métricas y contadores clave. |
| `text-display-md`| **36 px** | Título principal de la Landing Page. |

---

## 4. Dimensiones y Áreas Táctiles ($\ge 44\times 44\text{ px}$)

* **Controles Interactivos:** Todo botón, selector de opción múltiple, casilla de verificación o enlace interactivo debe tener un **área de pulsación mínima de $44\times 44\text{ px}$**.
* **Radios de Borde:** `rounded-md` (8px), `rounded-lg` (12px), `rounded-xl` (16px), `rounded-2xl` (24px) y `rounded-full`.
* **Sombras:** `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.

---

## 5. El Semáforo Clínico de Riesgo en la UI

El componente `SemaforoRiesgo` traduce visualmente las recomendaciones del motor de tamizaje del backend:

```
┌─────────────────────────────────────────────────────────────┐
│ 🟢 BAJO RIESGO                                              │
│ Token: bg-success-primary / text-success-primary            │
│ Mensaje: "Desarrollo acorde a la edad. Reevaluación en CRED"│
├─────────────────────────────────────────────────────────────┤
│ 🟡 RIESGO MODERADO                                          │
│ Token: bg-warning-primary / text-warning-primary            │
│ Mensaje: "Señales en observación. Control en 30-60 días"    │
├─────────────────────────────────────────────────────────────┤
│ 🔴 ALTO RIESGO / ALERTA DE NEURODESARROLLO                  │
│ Token: bg-error-primary / text-error-primary                │
│ Mensaje: "Requiere derivación prioritaria a Neuropediatría" │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Accesibilidad (a11y) y Redacción Empática

1. **Navegación Completa por Teclado:** Toda la aplicación puede recorrerse mediante `Tab`, `Shift+Tab`, `Enter` y `Espacio` con indicadores de foco visibles (`focus-ring`).
2. **El Color Nunca es el Único Significante:** Toda señal de riesgo o alerta incluye siempre **icono descriptivo + texto explícito** para garantizar comprensión en usuarios con daltonismo.
3. **Lenguaje Claro para Familias:** Los textos de la zona `/familia` utilizan frases breves, voz activa, terminología no técnica y explicaciones visuales paso a paso.
