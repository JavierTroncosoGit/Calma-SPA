# M1 — Scaffolding

Deps: ninguna

> **Prerrequisito:** `site.config.json` ya existe en la raíz del proyecto y fue aprobado
> por el humano durante el inicio de sesión (ver ROUTER.md). M1 no lo genera — lo consume.

## Checkpoint Obligatorio

> Antes de escribir una sola línea de código, anunciar:
>
> ```
> 🟡 CHECKPOINT M1 — Scaffolding
> - Voy a crear: proyecto Next.js, instalar dependencias, configurar tokens
> - Archivos a crear: globals.css, layout.tsx, config.ts, SmoothScroll.tsx
> - NO toco: site.config.json (solo lo leo)
> - Al terminar: marco M1 🟢 en state.md y anuncio que M2 puede empezar
> ```
>
> Luego actualizarstate.md: M1 → 🔵 WIP

## Checklist

### Init

- [ ] `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [ ] `npx shadcn@latest init`
- [ ] Instalar solo los componentes shadcn que el config necesita:
  - Leer `site.config.json` → identificar tipos de secciones
  - Instalar los componentes relevantes de: `button input label form accordion sheet card badge carousel dialog textarea select checkbox`
- [ ] `npm install framer-motion lenis`
- [ ] Si `siteConfig.animations.level === 3` → `npm install gsap`

### Carpetas

- [ ] `/public/images/`
- [ ] `/public/videos/` (solo si hay assets de video)
- [ ] `/public/docs/` (solo si hay PDFs)
- [ ] Copiar `usuario/assets/` → `/public/` según tipo
- [ ] `/src/components/layout/`
- [ ] `/src/components/sections/`
- [ ] `/src/lib/`
- [ ] `/src/hooks/`
- [ ] `/src/app/api/contact/` (solo si hay sección `contact-form` en el config)

### Config → Código

- [ ] Crear `src/lib/config.ts`:

  ```typescript
  import siteConfig from '../../site.config.json'
  export type SiteConfig = typeof siteConfig
  export { siteConfig }
  ```

- [ ] Verificar que TypeScript puede importar el JSON correctamente

### Tailwind y Diseño

- [ ] Leer `siteConfig.colors` → mapear a tokens en `globals.css` (@theme):

  ```css
  @import "tailwindcss";
  @theme {
    --color-primary:        [siteConfig.colors.primary];
    --color-primary-dark:   [siteConfig.colors.primaryDark];
    --color-accent:         [siteConfig.colors.accent];
    --color-bg-primary:     [siteConfig.colors.bgPrimary];
    --color-bg-secondary:   [siteConfig.colors.bgSecondary];
    --color-text-primary:   [siteConfig.colors.textPrimary];
    --color-text-secondary: [siteConfig.colors.textSecondary];

    /* Layout — contenedor de contenido. NUNCA CAMBIAR */
    --max-w-content: 75rem; /* 1200px */

    /* Tipografía fluida */
    --font-size-hero:    clamp(2.25rem, 5vw, 4.5rem);
    --font-size-display: clamp(1.875rem, 3.5vw, 3rem);
  }
  ```

- [ ] Leer `siteConfig.fonts` → configurar `next/font` en `layout.tsx`
- [ ] Lenis: crear `src/components/layout/SmoothScroll.tsx` ("use client", wraps children)
- [ ] NO usar `scroll-behavior: smooth`

### Root Layout

- [ ] `layout.tsx`: lang="es", fonts, `<SmoothScroll>`, body classes
- [ ] Metadata desde `siteConfig.seo` (title, description, ogTitle, ogDescription, canonical)
- [ ] `<WhatsAppButton />` flotante base — conecta datos en M4
- [ ] `<Footer />` con firma DARW → darw.cl

### Verificar

- [ ] `npm run dev` sin errores TypeScript
- [ ] `npm run build` ok
- [ ] Tokens de color funcionan (`bg-primary`, `text-text-primary`)
- [ ] Fuentes cargando correctamente

## Done

- Build ok, shadcn ok, tokens de config ok, fonts ok, Lenis ok, config.ts ok
- → state.md: M1 🟢, M2 🟡
