# 🎨 Filosofía y Principios de Diseño del Frontend — Neuroalianza

> **Proyecto:** Neuroalianza (Hackatón INSN San Borja 2026 — Desafío 04: Neurodesarrollo)  
> **Propósito:** Definir los principios de diseño de experiencia (UX/UI), accesibilidad clínica, adaptabilidad a la realidad nacional y arquitectura de interfaz.

---

## 1. Misión y Enfoque Humano-Clínico

La interfaz de **Neuroalianza** no es un dashboard convencional ni una aplicación de consumo estándar: es el canal que acompaña a familias peruanas en momentos de alta vulnerabilidad emocional y facilita la labor de profesionales de salud bajo presión asistencial.

El diseño del frontend se rige por **cuatro pilares de empatía estructural**:

### 1.1 Tres Experiencias, Tres Realidades Asistenciales
El sistema unifica a tres actores completamente dispares sobre un mismo `AppShell`, adaptando la densidad de información y el lenguaje para cada uno:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           APPSHELL UNIFICADO                            │
├────────────────────┬────────────────────────────┬───────────────────────┤
│  PERSONAL DE SALUD │          FAMILIA           │     ESPECIALISTA      │
│      (/salud)      │         (/familia)         │       (/clinico)      │
├────────────────────┼────────────────────────────┼───────────────────────┤
│ • Móvil / Tablet   │ • Móvil de gama de entrada │ • Pantallas desktop   │
│ • Rápido y conciso │ • Lenguaje simple y cálido │ • Alta densidad datos │
│ • Funciona offline │ • Tipografía grande        │ • Ficha 360°, tablas  │
│ • Tamizaje en CRED │ • Hoja de ruta clara       │ • Agenda y métricas   │
└────────────────────┴────────────────────────────┴───────────────────────┘
```

1. **Personal de Salud (CRED / Postas):**
   * *Contexto:* Consultas rápidas de 15 minutos, celulares de gama media, a menudo bajo luz solar en postas rurales y con conectividad intermitente.
   * *Respuesta de Diseño:* Formularios ágiles con selección táctil grande, semaforización intuitiva y persistencia local para sincronización diferida.
2. **Familia y Cuidadores:**
   * *Contexto:* Incertidumbre tras una sospecha médica, posibles limitaciones de alfabetización digital o presbicia, y uso exclusivo de teléfonos móviles.
   * *Respuesta de Diseño:* Redacción en lenguaje natural (cero tecnicismos médicos crudos), visualización visual del progreso ("Ruta de Atención"), botones con áreas táctiles generosas ($\ge 44\times 44\text{ px}$) y guías prácticas para el hogar.
3. **Equipo Especializado Multidisciplinario (INSN SB):**
   * *Contexto:* Médicos y terapeutas en monitores de escritorio que requieren correlacionar múltiples fuentes (Neurología, Genética, Psiquiatría, Terapias).
   * *Respuesta de Diseño:* Ficha Multidisciplinaria 360° de alta densidad, tablas ordenables, filtros avanzados y bandejas de alertas proactivas.

---

## 2. Regla Cero y Disciplina del Sistema de Diseño

> [!IMPORTANT]
> **Untitled UI React es la única fuente de componentes de interfaz del proyecto.**  
> No se improvisan ni se programan componentes interactivos básicos desde cero. Si se requiere un botón, modal, select, dropdown o badge, se utiliza el componente correspondiente del sistema de diseño.

### 2.1 Por qué Prohibimos la Improvisación de Componentes
1. **Consistencia Visual Absoluta:** Garantiza que los estados de foco, hover, active y disabled se comporten de manera idéntica en toda la aplicación.
2. **Accesibilidad Nativa (a11y):** Untitled UI React está construido sobre **React Aria Components**, asegurando soporte completo para lectores de pantalla, gestión adecuada de foco (`focus-ring`) y navegación por teclado sin esfuerzo adicional.
3. **Mantenibilidad en Equipo:** Elimina estilos duplicados y reduce drásticamente la deuda técnica durante el desarrollo concurrente.

---

## 3. Principios Visuales y Restricciones No Negociables

### 3.1 Prohibición de Valores "Hardcodeados"
* **Colores:** Prohibido el uso de valores hexadecimales (`#3B82F6`) o clases base arbitrarias de Tailwind (`bg-blue-500`). Se utilizan exclusivamente los **tokens semánticos** del tema (`bg-primary`, `text-secondary`, `bg-brand-solid`, `border-error`, `text-error-primary`).
* **Tipografía Mínima:** Tamaño mínimo de texto `text-md` (16px). Los tamaños `text-xs` y `text-sm` están estrictamente prohibidos para garantizar legibilidad bajo cualquier condición de iluminación.
* **Espaciado y Radios:** Todo padding, margin, gap y borde redondeado se selecciona estrictamente de la escala del sistema (`rounded-md`, `rounded-lg`, `gap-4`, `p-6`).

### 3.2 Postura Ético-Clínica en la Interfaz
* **Nunca Emitir Diagnósticos Automatizados:** Las pantallas de tamizaje muestran niveles de riesgo (`BAJO`, `MODERADO`, `ALTO`), señales de alerta observadas y recomendaciones de acción asistencial. Ningún texto de la UI califica al paciente con un diagnóstico clínico.
* **Empatía con las Inasistencias:** Los formularios de declinación o reprogramación de citas ofrecen opciones respetuosas y estructuradas (motivos económicos, distancia, cruce laboral, motivos de salud), reforzando que la inasistencia no es desinterés de la familia.

---

## 4. Filosofía de Rendimiento y Modo Offline

1. **React 19 + React Compiler:** Optimización automática de memoización de componentes sin sobrecargar el código con `useMemo` o `useCallback` innecesarios.
2. **Offline-First para Tamizaje:** El personal de CRED puede completar cuestionarios sin red; el estado se retiene localmente en IndexedDB/LocalStorage y se sincroniza automáticamente al recuperar conexión.
3. **Cero Parpadeos en Modo Oscuro:** Soporte nativo y sincronizado de tema claro/oscuro mediante tokens semánticos en `theme.css`.
