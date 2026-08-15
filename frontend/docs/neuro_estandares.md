
# Neuroalianza — Estándares de Frontend y Reglas de Implementación

**Hackatón Niño San Borja 2026 · Desafío 04: Neurodesarrollo**

Versión 1.0 · Documento normativo de frontend

---

## 1. Propósito y carácter de este documento

Este documento es **normativo, no orientativo**. Define la única forma permitida de construir interfaz en el proyecto Neuroalianza.

Está escrito con un destinatario específico en mente: además de personas, el código de este proyecto será generado en parte por un modelo de lenguaje. Los modelos de lenguaje presentan dos fallas recurrentes y bien documentadas al generar interfaz:

1. **Reinventan componentes que ya existen.** Ante la necesidad de un slider, escriben un `<input type="range">` con clases sueltas en lugar de instalar el componente de la librería.
2. **Codifican valores en duro.** Producen `#3B82F6`, `font-size: 13px`, `gap-[7px]`, `text-xs`. El resultado es una interfaz incoherente, con texto ilegible y colores que no responden al modo oscuro.

Cada regla de este documento existe para hacer esas dos fallas **imposibles de cometer sin que la construcción falle**. Las reglas no dependen de la disciplina de quien escribe: están respaldadas por linters, por un script de auditoría y por la puerta de calidad de integración continua.

---

## 2. Regla Cero

> **Untitled UI React es la única fuente de componentes de interfaz del proyecto.**
>
> No se escribe un componente de interfaz a mano. No se instala otra librería de componentes. No se copia código de interfaz de ninguna otra fuente. Si un componente no existe en el proyecto, se instala desde Untitled UI antes de usarlo.

Esta regla no admite excepciones por urgencia, por simplicidad aparente ni por preferencia estética. Un botón no se escribe: se importa. Un input no se estiliza: se importa. Un modal no se construye con `position: fixed`: se importa.

La única categoría de componente que se escribe a mano es la **composición de dominio** —una tarjeta de paciente, un semáforo de riesgo, una línea de tiempo del caso— y aun así, esas composiciones se construyen exclusivamente ensamblando componentes de Untitled UI y tokens del tema.

---

## 3. Instalación obligatoria

El proyecto se inicializa siguiendo el procedimiento oficial de Untitled UI para Vite, sin desviaciones.

### 3.1 Inicialización

```bash
npx untitledui@latest init neuroalianza-web --vite
```

Durante la ejecución se responden las preguntas de nombre de proyecto y color de marca. **El color de marca no se elige por gusto**: se selecciona la opción base y luego se sobreescribe la escala completa en `theme.css` con la paleta institucional definida en §6.3.

Este comando deja el proyecto con toda la configuración y los componentes base preinstalados. No se altera la estructura que genera.

### 3.2 Dependencias obligatorias del setup manual

Si por cualquier motivo se integra sobre un proyecto existente, las dependencias exactas son:

```bash
npm install @untitledui/icons react-aria-components tailwindcss \
  @tailwindcss/vite tailwindcss-react-aria-components \
  tailwind-merge tailwindcss-animate
```

### 3.3 Archivos de configuración que no se improvisan

Los siguientes artefactos se crean exactamente como indica la documentación oficial de Untitled UI, sin modificaciones estructurales:

| Archivo                          | Contenido                                              | Modificable                                                |
| -------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| `vite.config.ts`               | Plugin de Tailwind + alias`@` a `./src`            | Solo para añadir plugins nuevos                           |
| `tsconfig.json`                | `baseUrl` y `paths` con `@/*`                    | Solo para endurecer el tipado                              |
| `styles/theme.css`             | Bloque`@theme` completo con todos los tokens         | **Solo la escala de marca y los tokens semánticos** |
| `styles/globals.css`           | Imports, plugins, variantes personalizadas, utilidades | Solo para añadir utilidades nuevas                        |
| `utils/cx.ts`                  | `twMerge` extendido y `sortCx`                     | No                                                         |
| `utils/is-react-component.ts`  | Verificadores de tipo de componente                    | No                                                         |
| `hooks/use-breakpoint.ts`      | Hook de breakpoints                                    | No                                                         |
| `hooks/use-clipboard.ts`       | Hook de portapapeles                                   | No                                                         |
| `providers/route-provider.tsx` | `RouterProvider` de React Aria + React Router        | No                                                         |
| `providers/theme-provider.tsx` | Contexto de tema claro/oscuro                          | No                                                         |
| `main.tsx`                     | Composición de providers                              | Solo para añadir providers                                |

**El bloque `@theme` de `theme.css` se copia íntegro.** Contiene las escalas de tipografía, radios, sombras, colores de utilidad, colores de texto, borde, fondo y foreground, además del bloque `.dark-mode`. Recortarlo rompe el sistema de tokens y hace que las reglas de §6 no tengan a qué apuntar.

### 3.4 Composición de providers

El árbol de la aplicación es exactamente este orden:

```tsx
<React.StrictMode>
  <BrowserRouter>
    <RouteProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RouteProvider>
  </BrowserRouter>
</React.StrictMode>
```

`RouteProvider` es obligatorio: sin él, los componentes de React Aria que navegan (enlaces del sidebar, breadcrumbs, items de menú) rompen el enrutado del lado del cliente y provocan recargas completas de página.

---

## 4. Procedimiento para incorporar un componente

Este es el procedimiento completo. No existe otro.

### 4.1 Flujo obligatorio

1. **Verificar si ya existe** en `src/components/base/` o `src/components/application/`.
2. Si no existe, **instalarlo por CLI**:

   ```bash
   npx untitledui@latest add slider
   ```
3. Si el CLI no dispone de ese componente, **copiarlo desde su página oficial** en la documentación de componentes de Untitled UI, íntegro y sin recortes.
4. Ubicarlo en la carpeta que corresponda según §5.
5. Importarlo por su ruta con alias: `import { Slider } from "@/components/base/slider/slider";`

### 4.2 Prohibiciones asociadas

- **Prohibido** escribir un componente equivalente a uno que la librería ofrece.
- **Prohibido** modificar el archivo fuente de un componente base para cambiar su apariencia. La personalización se hace por `props` y por tokens del tema.
- **Prohibido** instalar otra librería de componentes de interfaz (Material UI, Chakra, HeroUI, Mantine, shadcn, Ant Design, Flowbite o cualquier otra).
- **Prohibido** copiar componentes de interfaz de blogs, generadores o respuestas de modelos de lenguaje.

### 4.3 Librerías complementarias permitidas

Únicamente estas, y solo para las funciones indicadas:

| Librería                 | Función exclusiva                                                     |
| ------------------------- | ---------------------------------------------------------------------- |
| `@untitledui/icons`     | Iconografía. No se usa otro set de iconos                             |
| `recharts`              | Gráficos del panel de métricas                                       |
| `@tanstack/react-table` | Lógica de tablas —**los estilos siguen siendo de Untitled UI** |
| `@tanstack/react-query` | Estado del servidor                                                    |
| `react-router-dom`      | Enrutado                                                               |
| `motion`                | Animaciones puntuales, no componentes                                  |
| `date-fns`              | Manejo de fechas                                                       |

Cualquier incorporación fuera de esta lista requiere justificación explícita y actualización de este documento.

---

## 5. Estructura de carpetas

```
src/
├── main.tsx
├── App.tsx
├── styles/
│   ├── globals.css
│   └── theme.css
├── providers/
│   ├── route-provider.tsx
│   └── theme-provider.tsx
├── utils/
│   ├── cx.ts
│   └── is-react-component.ts
├── hooks/
│   ├── use-breakpoint.ts
│   └── use-clipboard.ts
│
├── components/
│   ├── base/            ← Untitled UI, intocable
│   ├── application/     ← Untitled UI, intocable
│   ├── shared/          ← composiciones transversales del proyecto
│   │   ├── case-status-badge.tsx
│   │   ├── risk-indicator.tsx
│   │   ├── case-timeline.tsx
│   │   ├── offline-banner.tsx
│   │   └── empty-state.tsx
│   └── layout/
│       ├── app-shell.tsx
│       ├── sidebar-nav.tsx
│       └── role-nav-config.ts
│
├── features/
│   ├── screening/
│   ├── referral/
│   ├── appointments/
│   ├── case/
│   ├── family/
│   └── metrics/
│
├── pages/
│   ├── public/
│   ├── health-worker/
│   ├── family/
│   ├── specialist/
│   └── demo/
│
├── api/
│   ├── client.ts
│   ├── endpoints/
│   └── types.ts
│
└── config/
    ├── routes.ts
    ├── nav-items.ts
    └── constants.ts
```

**Regla de intocabilidad.** Los directorios `components/base/` y `components/application/` contienen código de la librería. Están protegidos por regla de lint: ninguna modificación manual es admisible. Actualizarlos significa reinstalar por CLI.

---

## 6. Prohibición de valores en duro

Esta es la sección que resuelve el problema descrito en §1. Se enuncia como una regla general y se desarrolla en categorías.

> **Ningún valor visual se escribe literalmente en el código de la aplicación. Todo valor visual proviene de un token del tema o de una prop del componente.**

### 6.1 Prohibiciones absolutas

Las siguientes construcciones están **prohibidas en todo el código bajo `src/pages`, `src/features`, `src/components/shared` y `src/components/layout`**:

| Prohibido                       | Ejemplo de infracción                  | Sustituto obligatorio                  |
| ------------------------------- | --------------------------------------- | -------------------------------------- |
| Color hexadecimal               | `className="bg-[#F04438]"`            | `className="bg-error-primary"`       |
| Color`rgb()` / `hsl()`      | `style={{ color: "rgb(16,24,40)" }}`  | `className="text-primary"`           |
| Color base de Tailwind          | `className="text-blue-600"`           | `className="text-utility-blue-600"`  |
| Valor arbitrario de Tailwind    | `className="p-[13px]"`, `gap-[7px]` | `className="p-3"`, `gap-2`         |
| Tamaño de fuente en px         | `style={{ fontSize: 13 }}`            | `className="text-md"`                |
| Prop`style` inline            | `style={{ marginTop: 12 }}`           | `className="mt-3"`                   |
| Ancho o alto mágico            | `className="w-[247px]"`               | `className="w-full max-w-container"` |
| Radio arbitrario                | `className="rounded-[9px]"`           | `className="rounded-lg"`             |
| Sombra arbitraria               | `box-shadow: 0 2px 4px #0002`         | `className="shadow-sm"`              |
| Elemento HTML crudo interactivo | `<button>`, `<input>`, `<select>` | Componentes de Untitled UI             |

### 6.2 Excepción única y controlada

La prop `style` se permite exclusivamente para **valores calculados en tiempo de ejecución que no pueden expresarse como clase**: por ejemplo, el ancho porcentual de una barra de progreso derivado de datos.

En ese caso, es obligatorio:

```tsx
// eslint-disable-next-line react/forbid-dom-props -- ancho dinámico derivado de datos
<div style={{ width: `${percentage}%` }} className="h-2 rounded-full bg-brand-solid" />
```

El comentario de supresión **debe nombrar la regla y justificar el motivo**. Una supresión sin justificación es rechazada en revisión y por el linter.

### 6.3 Tokens de color: única vía permitida

Los colores se consumen siempre a través de los tokens semánticos definidos en `theme.css`. Estos tokens ya están resueltos para modo claro y oscuro; usarlos es lo único que hace que el tema oscuro funcione.

| Necesidad                   | Token                                                          |
| --------------------------- | -------------------------------------------------------------- |
| Texto principal             | `text-primary`                                               |
| Texto secundario            | `text-secondary`                                             |
| Texto de apoyo              | `text-tertiary`                                              |
| Texto sobre fondo de marca  | `text-primary_on-brand`                                      |
| Fondo de página            | `bg-primary`                                                 |
| Fondo de superficie elevada | `bg-secondary`                                               |
| Fondo de marca sólido      | `bg-brand-solid`                                             |
| Borde principal             | `border-primary`                                             |
| Borde secundario            | `border-secondary`                                           |
| Estado de error             | `text-error-primary`, `bg-error-primary`, `border-error` |
| Estado de advertencia       | `text-warning-primary`, `bg-warning-primary`               |
| Estado de éxito            | `text-success-primary`, `bg-success-primary`               |
| Anillo de foco              | `focus-ring`                                                 |

**Cambio de paleta institucional.** La marca del proyecto se define reemplazando únicamente las once variables `--color-brand-50` a `--color-brand-950` dentro del bloque `@theme` de `theme.css`. Ningún otro archivo se toca. Todo el sistema —botones, enlaces, anillos de foco, badges— se reconfigura solo.

### 6.4 Semáforo de riesgo: mapeo obligatorio

El indicador de riesgo del tamizaje es el único lugar del sistema donde el color transmite significado clínico. Se define una sola vez, en `components/shared/risk-indicator.tsx`, con este mapeo:

| Nivel           | Token de fondo           | Token de texto           |
| --------------- | ------------------------ | ------------------------ |
| `SIN_RIESGO`  | `bg-success-secondary` | `text-success-primary` |
| `RIESGO_LEVE` | `bg-warning-secondary` | `text-warning-primary` |
| `RIESGO_ALTO` | `bg-error-secondary`   | `text-error-primary`   |

El color nunca es el único portador de información: cada nivel lleva además icono y etiqueta textual. Esto es requisito de accesibilidad y de seguridad clínica.

---

## 7. Reglas de tipografía

### 7.1 Tamaño mínimo

> **`text-xs` y `text-sm` están prohibidos en el código de la aplicación.**

El tamaño mínimo permitido es **`text-md`**, que en la escala de Untitled UI equivale a 16px con interlineado de 24px.

La razón no es estética. Los usuarios de este sistema son: personal de salud leyendo en un celular bajo luz solar, y madres y padres que pueden tener baja alfabetización digital o presbicia. Un jurado clínico detecta texto ilegible de inmediato y lo interpreta como desconocimiento del usuario final.

### 7.2 Escala permitida

| Uso                                | Clase                                      | Tamaño      |
| ---------------------------------- | ------------------------------------------ | ------------ |
| Cuerpo de texto, etiquetas, tablas | `text-md`                                | 16px         |
| Texto destacado, subtítulos       | `text-lg`                                | 18px         |
| Encabezado de sección             | `text-xl`                                | 20px         |
| Título de página                 | `text-display-xs`                        | 24px         |
| Título de sección mayor          | `text-display-sm`                        | 30px         |
| Hero de la landing                 | `text-display-md` a `text-display-2xl` | 36px – 72px |

### 7.3 Excepción acotada

`text-sm` se admite **exclusivamente** dentro de `components/base/` y `components/application/`, porque son archivos de la librería que no se modifican. La regla de lint aplica la restricción solo fuera de esos directorios.

### 7.4 Prohibiciones adicionales

- Prohibido `font-size` en píxeles, en cualquier forma.
- Prohibido `text-[14px]` o cualquier valor arbitrario de tipografía.
- Prohibido importar tipografías distintas a la configurada en `--font-body`.
- Prohibido usar peso `font-thin` o `font-extralight`: no son legibles en pantallas de baja calidad.
- El contraste mínimo es AA de WCAG. Los tokens semánticos ya lo garantizan; los colores inventados no.

---

## 8. Reglas de espaciado y dimensión

### 8.1 Escala de espaciado

Todo margen, relleno y separación proviene de la escala de Tailwind, que está anclada a la variable `--spacing` del tema. Valores permitidos: `0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24`.

Cualquier `p-[Npx]`, `m-[Npx]`, `gap-[Npx]` o `space-x-[Npx]` es una infracción.

### 8.2 Tamaños de componente

Los componentes de Untitled UI exponen una prop `size`. En el código de aplicación:

- **Prohibido** `size="xs"` en componentes interactivos (botones, inputs, selects, checkboxes).
- El tamaño mínimo para cualquier control que el usuario deba tocar es `size="md"`.
- `size="sm"` se admite únicamente en elementos decorativos no interactivos, como badges dentro de una celda de tabla.

Fundamento: el área táctil mínima recomendada es de 44 por 44 píxeles. Un botón `xs` en un celular de gama baja, usado por alguien con guantes o prisa, no es accionable.

### 8.3 Dimensiones

- Prohibidos anchos y altos arbitrarios (`w-[247px]`, `h-[38px]`).
- Se usa `w-full`, `max-w-container`, la escala de spacing o `flex`/`grid`.
- Los contenedores de página usan `max-w-container`, que está definido en el tema.

### 8.4 Radios y sombras

Solo los tokens del tema: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`; `shadow-xs` a `shadow-3xl`. Ningún `box-shadow` escrito a mano.

---

## 9. Aplicación automática de las reglas

Las reglas anteriores no se confían al criterio de quien escribe. Se verifican.

### 9.1 ESLint

```js
// eslint.config.js
import tailwind from "eslint-plugin-tailwindcss";
import react from "eslint-plugin-react";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/base/**", "src/components/application/**"],
    plugins: { tailwindcss: tailwind, react },
    rules: {
      // --- Prohibición de valores arbitrarios ---
      "tailwindcss/no-arbitrary-value": "error",
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/classnames-order": "error",

      // --- Prohibición de estilos inline ---
      "react/forbid-dom-props": ["error", { forbid: ["style"] }],
      "react/forbid-component-props": ["error", { forbid: ["style"] }],

      // --- Prohibición de elementos crudos interactivos ---
      "react/forbid-elements": ["error", {
        forbid: [
          { element: "button", message: "Usa @/components/base/buttons/button" },
          { element: "input",  message: "Usa @/components/base/input/input" },
          { element: "select", message: "Usa @/components/base/select/select" },
          { element: "textarea", message: "Usa @/components/base/textarea/textarea" },
          { element: "a", message: "Usa el componente Link o Button con href" },
        ],
      }],

      // --- Prohibición de tipografía pequeña y colores crudos ---
      "no-restricted-syntax": ["error",
        {
          selector: "Literal[value=/\\btext-(xs|sm)\\b/]",
          message: "Tipografía mínima permitida: text-md. Ver §7 del documento de estándares.",
        },
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Color en duro prohibido. Usa un token semántico del tema. Ver §6.3.",
        },
        {
          selector: "Literal[value=/\\b(bg|text|border|ring)-(red|blue|green|yellow|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\\b/]",
          message: "Color base de Tailwind prohibido. Usa tokens semánticos o la escala utility-*. Ver §6.3.",
        },
        {
          selector: "Literal[value=/\\b(size|iconSize)=\\\"xs\\\"/]",
          message: "Tamaño xs prohibido en controles interactivos. Ver §8.2.",
        },
        {
          selector: "Literal[value=/\\b(w|h|p|m|gap|space-[xy]|top|left|right|bottom)-\\[[^\\]]+\\]/]",
          message: "Valor arbitrario prohibido. Usa la escala de spacing. Ver §8.1.",
        },
      ],

      // --- Prohibición de librerías de UI alternativas ---
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["@mui/*", "@chakra-ui/*", "@heroui/*", "@mantine/*", "antd", "@radix-ui/*", "flowbite-react"],
            message: "Untitled UI es la única librería de componentes permitida. Ver §2." },
          { group: ["lucide-react", "react-icons", "@heroicons/*"],
            message: "El set de iconos del proyecto es @untitledui/icons. Ver §4.3." },
        ],
      }],
    },
  },
  {
    // Los archivos de la librería quedan fuera del alcance de estas reglas.
    files: ["src/components/base/**", "src/components/application/**"],
    rules: {},
  },
];
```

### 9.2 Stylelint

Para los archivos CSS del proyecto, con `globals.css` y `theme.css` explícitamente excluidos por ser los que definen los tokens:

```json
{
  "rules": {
    "color-no-hex": true,
    "declaration-property-value-disallowed-list": {
      "font-size": ["/^[0-9]+px$/"],
      "/^(margin|padding|gap)/": ["/^[0-9]+px$/"]
    },
    "unit-disallowed-list": ["px", { "ignoreProperties": { "px": ["border-width", "outline-width"] } }]
  },
  "ignoreFiles": ["src/styles/theme.css", "src/styles/globals.css"]
}
```

### 9.3 Script de auditoría

Un script propio que recorre `src/pages`, `src/features`, `src/components/shared` y `src/components/layout`, y falla ante cualquiera de estos patrones:

| Patrón buscado                      | Motivo                                   |
| ------------------------------------ | ---------------------------------------- |
| `#[0-9a-fA-F]{3,8}`                | Color hexadecimal                        |
| `rgb\(`, `rgba\(`, `hsl\(`     | Color funcional                          |
| `\[[0-9]+px\]`                     | Valor arbitrario en píxeles             |
| `text-xs`, `text-sm`             | Tipografía por debajo del mínimo       |
| `size="xs"`                        | Control demasiado pequeño               |
| `style={{`                         | Estilo inline sin supresión justificada |
| `font-thin`, `font-extralight`   | Peso ilegible                            |
| `<button`, `<input`, `<select` | Elemento crudo en lugar de componente    |

El script reporta archivo, línea y la regla infringida con su número de sección en este documento, de modo que la corrección sea inmediata.

### 9.4 Puerta de calidad

```bash
npm run lint          # ESLint con la configuración de §9.1
npm run lint:css      # Stylelint
npm run audit:ui      # Script de auditoría de §9.3
npm run typecheck     # TypeScript en modo estricto
npm run build         # Construcción de producción
```

Los cinco comandos se ejecutan en pre-commit y en integración continua. Ninguno admite advertencias toleradas.

### 9.5 TypeScript estricto

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

---

## 10. Instrucciones para el asistente de código

Este apartado se replica textualmente en un archivo `AGENTS.md` en la raíz del repositorio, para que quede cargado en el contexto de cualquier modelo de lenguaje que trabaje sobre el proyecto.

### 10.1 Reglas invariables

1. **Untitled UI es la única librería de interfaz.** Antes de escribir cualquier elemento visual, busca el componente en `src/components/`. Si no está, instálalo con `npx untitledui@latest add <componente>`. Nunca lo escribas a mano.
2. **Nunca escribas un color.** Ni hexadecimal, ni `rgb()`, ni clases base de Tailwind como `bg-blue-500`. Usa exclusivamente los tokens semánticos: `bg-primary`, `text-secondary`, `border-error`, `bg-brand-solid`.
3. **Nunca uses `text-xs` ni `text-sm`.** El mínimo es `text-md`. Si el diseño parece requerir texto más pequeño, el diseño está mal: reduce la densidad, no la legibilidad.
4. **Nunca uses valores arbitrarios.** Nada de `p-[13px]`, `gap-[7px]`, `w-[247px]`, `rounded-[9px]`, `text-[14px]`. Usa la escala.
5. **Nunca uses la prop `style`** salvo para un valor calculado en tiempo de ejecución, y siempre con comentario de supresión justificado.
6. **Nunca uses `size="xs"`** en un control interactivo. Mínimo `size="md"`.
7. **Nunca uses `<button>`, `<input>`, `<select>` o `<textarea>` crudos.** Importa el componente correspondiente.
8. **Nunca modifiques archivos bajo `components/base/` o `components/application/`.**
9. **Nunca instales otra librería de componentes ni otro set de iconos.**
10. **Los iconos vienen de `@untitledui/icons`**, importados por nombre.

### 10.2 Procedimiento antes de escribir código de interfaz

Responde estas preguntas antes de generar el archivo:

- ¿Existe ya este componente en el proyecto? → si sí, impórtalo.
- ¿Existe en Untitled UI? → si sí, instálalo por CLI antes de continuar.
- ¿Estoy a punto de escribir un valor visual literal? → si sí, busca el token equivalente.
- ¿Algún texto queda por debajo de `text-md`? → si sí, corrígelo.
- ¿Algún control interactivo mide menos de 44 píxeles de lado? → si sí, agrándalo.

### 10.3 Frase de cierre obligatoria

Toda entrega de código de interfaz debe poder pasar `npm run lint && npm run audit:ui` sin infracciones. Si el asistente no puede verificarlo, debe declararlo explícitamente en su respuesta en lugar de asumirlo.

---

## 11. Accesibilidad

Untitled UI está construido sobre React Aria, lo que resuelve navegación por teclado, gestión de foco, semántica ARIA y soporte de lectores de pantalla **siempre que se usen los componentes de la librería**. Cada componente escrito a mano rompe esa garantía.

Requisitos adicionales del proyecto:

- Todo control interactivo tiene etiqueta accesible, no solo icono.
- El color nunca es el único portador de significado.
- El anillo de foco usa el token `focus-ring` y jamás se elimina con `outline-none`.
- El área táctil mínima es de 44 por 44 píxeles.
- La interfaz funciona íntegramente con teclado.
- El contenido dirigido a familias se redacta con lenguaje simple y frases cortas.

---

## 12. Criterios de aceptación del frontend

La entrega se considera conforme cuando:

1. El proyecto fue inicializado con el CLI oficial de Untitled UI para Vite.
2. `theme.css` contiene el bloque `@theme` completo, con la escala de marca institucional sustituida.
3. Los cuatro providers están compuestos en el orden especificado.
4. No existe ningún componente de interfaz escrito a mano fuera de `components/shared/`.
5. `npm run lint` pasa sin errores ni advertencias.
6. `npm run lint:css` pasa.
7. `npm run audit:ui` reporta cero infracciones.
8. `npm run typecheck` pasa con la configuración estricta.
9. No existe ninguna clase `text-xs` ni `text-sm` fuera de los directorios de librería.
10. No existe ningún color hexadecimal ni valor arbitrario en el código de aplicación.
11. El modo oscuro funciona en todas las pantallas sin ajustes manuales.
12. Toda la interfaz es navegable con teclado.

---

*Documento normativo de frontend · Neuroalianza · Hackatón Niño San Borja 2026*
