
# AGENTS.md — Neuroalianza Frontend

Reglas obligatorias para cualquier asistente de código que trabaje en este repositorio.
Estas reglas no son sugerencias. El código que las incumpla no pasa la puerta de calidad.

---

## REGLA CERO

**Untitled UI React es la única librería de componentes de interfaz del proyecto.**

No escribas componentes de interfaz a mano. Si necesitas un componente, instálalo:

```bash
npx untitledui@latest add <componente>
```

Si el CLI no lo tiene, cópialo íntegro desde la página oficial del componente en la
documentación de Untitled UI. Nunca lo improvises.

---

## PROHIBICIONES ABSOLUTAS

Aplican a `src/pages/`, `src/features/`, `src/components/shared/` y `src/components/layout/`.

### Colores

- ❌ `#F04438`, `#fff`, `rgb(16,24,40)`, `hsl(...)`
- ❌ `bg-blue-500`, `text-gray-600`, `border-red-400` (escala base de Tailwind)
- ✅ `bg-primary`, `text-secondary`, `border-error`, `bg-brand-solid`, `text-error-primary`

Tokens disponibles: `text-primary`, `text-secondary`, `text-tertiary`,
`text-primary_on-brand`, `bg-primary`, `bg-secondary`, `bg-brand-solid`,
`bg-error-primary`, `bg-warning-primary`, `bg-success-primary`,
`border-primary`, `border-secondary`, `border-error`, `focus-ring`.

### Tipografía

- ❌ `text-xs`, `text-sm` — **prohibidos sin excepción**
- ❌ `text-[14px]`, `style={{ fontSize: 13 }}`
- ❌ `font-thin`, `font-extralight`
- ✅ Mínimo `text-md` (16px). Escala: `text-md`, `text-lg`, `text-xl`,
  `text-display-xs`, `text-display-sm`, `text-display-md`

Si el diseño "necesita" texto más pequeño, reduce la densidad de información,
no el tamaño de letra. Los usuarios son personal de salud en celulares bajo sol
y familias que pueden tener presbicia.

### Espaciado y dimensiones

- ❌ `p-[13px]`, `gap-[7px]`, `w-[247px]`, `h-[38px]`, `rounded-[9px]`
- ✅ Escala: `0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24`
- ✅ `w-full`, `max-w-container`, flex, grid
- ✅ Radios: `rounded-sm|md|lg|xl|2xl|full`
- ✅ Sombras: `shadow-xs` … `shadow-3xl`

### Estilos inline

- ❌ `style={{ marginTop: 12 }}`
- ✅ Única excepción: valor calculado en runtime, con supresión justificada:

```tsx
// eslint-disable-next-line react/forbid-dom-props -- ancho dinámico derivado de datos
<div style={{ width: `${pct}%` }} className="h-2 rounded-full bg-brand-solid" />
```

### Elementos crudos

- ❌ `<button>`, `<input>`, `<select>`, `<textarea>`, `<a>`
- ✅ `import { Button } from "@/components/base/buttons/button"` y equivalentes

### Tamaños de componente

- ❌ `size="xs"` en cualquier control interactivo
- ✅ Mínimo `size="md"`. Área táctil mínima: 44×44 px
- `size="sm"` solo en elementos decorativos no interactivos (badges en tablas)

### Librerías

- ❌ MUI, Chakra, HeroUI, Mantine, Ant Design, shadcn, Flowbite, Radix directo
- ❌ lucide-react, react-icons, heroicons
- ✅ Iconos: `@untitledui/icons`
- ✅ Permitidas para su función exclusiva: `recharts` (gráficos),
  `@tanstack/react-table` (lógica de tablas, estilos de Untitled UI),
  `@tanstack/react-query`, `react-router-dom`, `motion`, `date-fns`

### Archivos intocables

- ❌ Nunca modifiques `src/components/base/**` ni `src/components/application/**`
- Personaliza por props y por tokens, nunca editando el fuente del componente
- Para cambiar la paleta: solo `--color-brand-50` … `--color-brand-950` en `theme.css`

---

## CHECKLIST ANTES DE ESCRIBIR

1. ¿Existe ya este componente en `src/components/`? → impórtalo
2. ¿Existe en Untitled UI? → instálalo por CLI antes de continuar
3. ¿Voy a escribir un valor visual literal? → busca el token
4. ¿Algún texto queda bajo `text-md`? → corrígelo
5. ¿Algún control mide menos de 44px de lado? → agrándalo
6. ¿Usé `<button>` o `<input>` crudo? → cámbialo por el componente

---

## VERIFICACIÓN

Todo código entregado debe pasar:

```bash
npm run lint && npm run lint:css && npm run audit:ui && npm run typecheck
```

Si no puedes verificarlo, dilo explícitamente en tu respuesta. No lo asumas.

---

## ACCESIBILIDAD

- Todo control interactivo lleva etiqueta accesible, no solo icono
- El color nunca es el único portador de significado (añade icono + texto)
- Nunca uses `outline-none`; el foco usa el token `focus-ring`
- La interfaz completa debe ser navegable con teclado
- El contenido para familias se redacta en lenguaje simple y frases cortas

---

## CONTEXTO DEL PROYECTO

Neuroalianza conecta la detección de señales de alarma del neurodesarrollo en el
primer nivel de atención con la evaluación especializada y el seguimiento terapéutico.

Tres roles, tres experiencias distintas sobre el mismo AppShell:

- **Personal de salud (CRED)** — móvil, offline, poco tiempo, tamizaje y derivación
- **Familia** — móvil de gama baja, lenguaje simple, densidad baja, tipografía grande
- **Especialista** — escritorio, densidad alta, tablas, alertas, ficha consolidada

Restricción de alcance del desafío: **el sistema nunca emite un diagnóstico**.
El semáforo de riesgo devuelve una recomendación de acción, no una etiqueta clínica.
Cualquier texto de interfaz debe respetar esto.
