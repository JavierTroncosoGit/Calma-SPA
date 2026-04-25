# M2 — Hero + Navbar

Deps: M1

**Checkpoint obligatorio al iniciar:**

```
🟡 CHECKPOINT M2 — Hero + Navbar
- Leo: site.config.json (secciones hero y navbar)
- Voy a crear: HeroSection.tsx, Navbar.tsx
- NO toco: globals.css, config.ts, ni misiones anteriores
- Al terminar: marco M2 🟢 en state.md
```

Actualizar state.md: M2 → 🔵 WIP antes de empezar.

**Fuente de verdad: `site.config.json`**
Leer la sección con `type: "hero"` y `type: "navbar"` del array `sections[]`.
brief.md y design.md solo como contexto de tono y nivel de animaciones.

## Layout

Decidir en base a `hero.media.type` del config:

- `"image"` → Split (texto + imagen) o Full-bleed (imagen de fondo)
- `"video"` → Full-bleed con video de fondo + overlay
- `"none"` → Centrado solo tipográfico
- La IA elige el layout que mejor sirva al contenido del config

## Contenido — Hero (desde siteConfig.sections.find hero)

- [ ] `data.headline` → `<h1>`
- [ ] `data.subheadline` → subtítulo (solo si existe en el config)
- [ ] `data.badge` → badge social proof (solo si existe en el config)
- [ ] `data.ctas[]` → un Button por cada CTA del array, variante según `cta.variant`
- [ ] `data.media` → `next/image` o `<video>` según `media.type`

## Contenido — Navbar (desde siteConfig.sections.find navbar)

- [ ] `data.logo` → `next/image` con `logo.src` y `logo.alt`
- [ ] `data.links[]` → nav links, scroll via Lenis a `link.href`
- [ ] `data.cta` → Button shadcn (sm) (solo si existe en el config)
- [ ] Mobile → Sheet shadcn (hamburguesa)
- [ ] Sticky/transparente sobre Hero

## Animaciones (según `siteConfig.animations.level`)

- [ ] N1: `hover:scale-105 hover:shadow-lg transition-all`
- [ ] N2: Framer Motion stagger (h1 → sub → CTAs en secuencia)
- [ ] N3: GSAP parallax, text split (si level === 3 en config)

## Responsive

- [ ] Desktop ≥1024: layout elegido arriba
- [ ] Tablet 768-1023: ajustar según layout
- [ ] Mobile <768: stack vertical, CTAs full-width, `min-h-dvh`

## Done

- Propuesta clara <5s, CTA above fold, sin texto hardcodeado, sin CLS, WCAG AA
- → state.md: M2 🟢, M3 🟡
