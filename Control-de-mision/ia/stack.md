# Stack (LEY — no cambiar)

## Core

| Pilar | Tecnología | Versión |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Styling | Tailwind CSS (CSS-first) | v4.x |
| Deploy | Vercel | — |
| UI | shadcn/ui | latest |
| Lenguaje | TypeScript (strict) | — |
| Runtime | Node.js 20.x LTS | — |
| Package Manager | npm | — |

## Layout Base (LEY)

Todo el contenido vive dentro de un contenedor de **1200px máximo**.
Los fondos de secciones (color, imagen, gradiente) son siempre **full-width**.

**Patrón obligatorio en cada sección:**

```tsx
// ✅ Correcto
<section className="w-full bg-bg-secondary py-16 lg:py-24">
  <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    {/* contenido aqui */}
  </div>
</section>

// ❌ Incorrecto — contenido que llega al borde en pantallas grandes
<section className="w-full bg-bg-secondary py-16">
  {/* contenido sin contenedor máximo */}
</section>
```

**El hero es la excepción:** el visual (imagen/video de fondo) es full-width;
el texto sigue dentro del contenedor 1200px.

## Patrones

- App Router (`src/app/`), nunca Pages Router
- `next/image`, nunca `<img>`
- `next/font`, nunca Google Fonts CDN
- Metadata API, nunca `<head>` manual
- Tailwind utilities, nunca CSS Modules/styled-components
- Server Components default, `"use client"` solo si necesario
- `cn()` de `src/lib/utils.ts` para clases condicionales
- Lenis para smooth scroll, nunca `scroll-behavior: smooth`
- Formularios → Server Actions o API Routes + react-hook-form + zod

## Elementos Fijos (toda landing)

- WhatsApp flotante: `fixed right-6 z-50` con `bottom: calc(1.5rem + env(safe-area-inset-bottom))` — siempre visible (incluye safe area para iPhone)
- Firma footer: `Desarrollado por <a href="https://darw.cl" target="_blank">DARW</a>`

## Libs Aprobadas

| Lib | Uso |
|-----|-----|
| shadcn/ui | Button, Input, Form, Accordion, Sheet, Card, Badge, Carousel, Dialog |
| lenis | Smooth scroll |
| framer-motion | Animaciones Nivel 2 |
| lucide-react | Íconos |
| react-hook-form + zod | Formularios |
| next-themes | Dark mode |
| embla-carousel-react | Carousels (via shadcn) |

## Animaciones

| Nivel | Tool | Cuándo |
|-------|------|--------|
| 1 | Tailwind transition/animate | Hovers, fades |
| 2 | Framer Motion | Scroll reveals, stagger |
| 3 | GSAP + ScrollTrigger | Parallax, pin. Requiere aprobación |

## Prohibido

jQuery, Bootstrap, Moment.js, styled-components, CSS Modules, Axios, React Router, @radix-ui/* directo

## Vercel

- Producción: `main` (auto-deploy)
- Build: `next build`
- Env vars: `NEXT_PUBLIC_GA_ID`, `CONTACT_EMAIL`, `WHATSAPP_NUMBER`

## Naming

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Componentes | PascalCase | HeroSection.tsx |
| Pages | page.tsx | app/page.tsx |
| API | route.ts | app/api/contact/route.ts |
| Tipos | PascalCase | ContactFormData |
| Hooks | camelCase+use | useScrollPosition |

## Performance

LCP <2.5s, CLS <0.1, INP <200ms, Lighthouse >90, SEO >95, JS <100KB gzip

## Git

`feat:` `fix:` `style:` `refactor:` `perf:` `docs:` `chore:`
