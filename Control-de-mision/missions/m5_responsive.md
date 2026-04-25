# M5 — Responsive

Deps: M2, M3, M4

**Checkpoint obligatorio al iniciar:**

```
🟡 CHECKPOINT M5 — Responsive
- Leo: ia/responsive-mandamientos.md (LOS 10 MANDAMIENTOS completos)
- Voy a auditar: todos los componentes en src/components/sections/
- Puedo modificar cualquier componente existente para corregir responsive
- NO creo componentes nuevos — solo corrijo los existentes
- Al terminar: marco M5 🟢 en state.md
```

Actualizar state.md: M5 → 🔵 WIP antes de empezar.

**Protocolo: leer `ia/responsive-mandamientos.md` completo ANTES de empezar.**

M5 es una auditoría completa, no una lista de ajustes rápidos. El archivo de
mandamientos define exactamente qué verificar, qué código es incorrecto y cómo
corregirlo. Ejecutar los 10 mandamientos en orden.

---

## Breakpoints del stack

| Prefix | Min | Contexto |
|--------|-----|---------|
| (base) | 0px | Mobile — 375px a 639px |
| sm: | 640px | Mobile landscape / tablet pequeña |
| md: | 768px | Tablet |
| lg: | 1024px | Desktop |
| xl: | 1280px | Desktop grande |

---

## Protocolo de auditoría

### Paso 1 — Verificar los 10 Mandamientos en el código

Por cada componente en `src/components/sections/`:

- [ ] **I. Mobile-first** — ¿La clase base (sin prefijo) es para 375px?
- [ ] **II. Sin scroll horizontal** — ¿Ningún elemento causa overflow-x?
- [ ] **III. Touch targets** — ¿Botones, links e íconos ≥ 44×44px?
- [ ] **IV. iOS zoom** — ¿Todos los inputs tienen `text-base` (≥16px)?
- [ ] **V. Imágenes** — ¿`next/image` con `sizes`, `priority` en hero, `object-cover`?
- [ ] **VI. Tipografía fluida** — ¿H1 y H2 escalan con `clamp()` o clases responsive?
- [ ] **VII. Grids** — ¿Todos los grids colapsan a 1 columna en mobile?
- [ ] **VIII. Navbar mobile** — ¿Sheet con links táctiles que cierran al tocar?
- [ ] **IX. Espaciado** — ¿`py-12 lg:py-20` en secciones, `px-4` mínimo lateral?
- [ ] **X. Viewports** — Verificar visualmente en 375px, 768px y 1280px

### Paso 2 — Verificar flujos UX en mobile

- [ ] Scroll hasta el formulario → ¿el WhatsApp flotante no lo tapa completamente?
- [ ] Si hay carousel → ¿swipeable en mobile? (Carousel de embla tiene esto por defecto)
- [ ] Si hay galería → ¿las imágenes no se cortan?
- [ ] Abrir enlace de WhatsApp → ¿abre la app con el mensaje correcto?
- [ ] CTA del navbar en mobile → ¿visible y accesible?
- [ ] **Safe Area (iPhone)** → `layout.tsx` tiene `viewport-fit=cover` en meta viewport
- [ ] **Safe Area (iPhone)** → WhatsApp button usa `env(safe-area-inset-bottom)` — no queda tapado por la barra de inicio

### Paso 3 — Performance mobile

- [ ] `npm run build` → verificar JS bundle size (< 100KB gzip)
- [ ] Hero: imagen con `priority` → LCP < 2.5s
- [ ] Lazy load en secciones below the fold (`loading="lazy"` por defecto en next/image)
- [ ] Verificar que Lenis no bloquea scroll en iOS (Safari puede tener problemas)
- [ ] CLS < 0.1 → las imágenes tienen dimensiones definidas, sin layout shift

---

## Correcciones más comunes (atajos)

Si la auditoría encuentra estos problemas frecuentes, aplicar directamente:

| Problema | Fix |
|---------|-----|
| Input hace zoom en iOS | Agregar `className="text-base"` al Input/Textarea |
| Scroll horizontal | Buscar elemento con ancho fijo o `w-screen` → reemplazar con `w-full` |
| Botón ícono muy pequeño | Agregar `className="p-3 min-h-[44px] min-w-[44px]"` |
| Grid no colapsa | Agregar `grid-cols-1` como clase base antes de `sm:grid-cols-2` |
| Imagen se deforma | Agregar `object-cover` y verificar que el contenedor tiene `aspect-ratio` |
| Hero muy chico en mobile | Usar `min-h-dvh` en mobile, ajustar `text-3xl` como base |
| Navbar no cierra en mobile | Envolver links con `<SheetClose asChild>` |
| Texto llega al borde | Container sin `px-4` → agregar padding lateral |

---

## Done

- Los 10 mandamientos verificados y corregidos
- Sin overflow horizontal en ningún viewport
- Touch targets ≥ 44px en todos los interactivos
- Inputs sin zoom en iOS
- LCP < 2.5s, CLS < 0.1
- Verificado en 375px, 768px y 1280px
- → state.md: M5 🟢, M6 🟡
