# M3 — Secciones de Contenido

Deps: M2

**Checkpoint obligatorio al iniciar:**

```
🟡 CHECKPOINT M3 — Secciones
- Leo: site.config.json sections[] (excluyo navbar, hero, contact-form, footer)
- Voy a crear: un componente .tsx por cada type distinto encontrado
- NO toco: HeroSection.tsx, Navbar.tsx, globals.css
- Al terminar: marco M3 🟢 en state.md
```

Actualizar state.md: M3 → 🔵 WIP antes de empezar.

**Fuente de verdad: `site.config.json` → array `sections[]`**

La lista de secciones, su orden y su contenido ya fue decidida por la IA en M1
y aprobada por el humano. M3 no redefine qué secciones hay — las lee del config
y construye un componente por cada entrada del array.

## Instrucciones generales

1. Leer `site.config.json` → recorrer `sections[]`
2. Para cada sección (excepto `navbar`, `hero` y `footer` — ya implementados):
   - Crear `src/components/sections/[NombreSeccion].tsx`
   - Recibir `data` tipado desde el config
   - Leer TODO el contenido desde `data` — cero texto hardcodeado
3. Actualizar `src/app/page.tsx` con el switch/renderer que mapea cada `type` → componente

## Renderer en page.tsx

```typescript
import { siteConfig } from '@/lib/config'
// importar aquí cada componente que se cree en M3

export default function Home() {
  return (
    <main>
      {siteConfig.sections.map((section) => {
        switch (section.type) {
          case 'navbar':        return <Navbar key={section.id} data={section} />
          case 'hero':          return <HeroSection key={section.id} data={section} />
          // ↓ M3 agrega un case por cada tipo que encuentre en el config
          case 'stats':         return <StatsBar key={section.id} data={section} />
          case 'logos':         return <TrustBar key={section.id} data={section} />
          case 'benefits-grid': return <BenefitsGrid key={section.id} data={section} />
          case 'steps':         return <ProcessSteps key={section.id} data={section} />
          case 'testimonials':  return <Testimonials key={section.id} data={section} />
          case 'gallery':       return <Gallery key={section.id} data={section} />
          case 'pricing':       return <Pricing key={section.id} data={section} />
          case 'faq':           return <FAQ key={section.id} data={section} />
          case 'contact-form':  return <ContactForm key={section.id} data={section} />
          case 'cta-banner':    return <CTABanner key={section.id} data={section} />
          case 'footer':        return <Footer key={section.id} data={section} />
          // tipos custom del proyecto → agregar aquí según lo que haya en el config
          default:
            console.warn(`Tipo desconocido: ${section.type}`)
            return null
        }
      })}
    </main>
  )
}
```

## Implementación de cada componente

### Lo que va en TODOS

- [ ] Props: `{ data: Extract<SiteConfig['sections'][number], { type: '...' }> }`
- [ ] `<section id={data.id}>` como raíz
- [ ] `py-12 lg:py-20 px-6` + `container mx-auto max-w-7xl`
- [ ] Fondo alternado (bg-bg-primary / bg-bg-secondary, alternando entre secciones)
- [ ] `<h2>` con el título de sección (de `data.headline` o `data.sectionLabel`)
- [ ] Framer Motion `whileInView` para scroll reveals (si level ≥ 2 en config)
- [ ] Responsive: 1col mobile → 2-3col desktop
- [ ] Campos opcionales del config siempre con `&&`:

  ```typescript
  {data.subheadline && <p>{data.subheadline}</p>}
  ```

### Tipos conocidos y sus patrones

#### `stats`

- Grid horizontal o flex wrap de métricas
- Cada item: valor grande + label + ícono (lucide, de `item.icon`)

#### `logos`

- Strip o grid de logos
- `style` del config define si es animado (scroll infinito) o estático
- next/image para cada logo

#### `benefits-grid`

- Grid de Cards shadcn
- `data.columns` define el grid (2, 3 o 4)
- Cada item: ícono lucide (`item.icon`) + título + body
- hover:shadow-lg hover:-translate-y-0.5 transition-all

#### `steps`

- `data.style` define la variante: `"numbered"` | `"timeline"` | `"horizontal"`
- Cada step numerado con `item.number`

#### `testimonials`

- `data.style` define variante: `"carousel"` | `"grid"` | `"masonry"` | `"single"`
- Carousel: Carousel shadcn (embla) + Card + Badge rating
- next/image para avatares (solo si `item.avatar` existe en el item)
- Touch/swipe mobile

#### `gallery`

- `data.style` define: `"grid"` | `"masonry"` | `"carousel"` | `"slider"`
- next/image con sizes responsive para cada imagen

#### `pricing`

- `data.style` define: `"cards"` | `"table"` | `"toggle"` (anual/mensual)
- Plan con `highlighted: true` → borde/fondo destacado

#### `faq`

- Accordion shadcn, `type="single"` `collapsible`
- Si `data.schema === true` → agregar JSON-LD FAQPage a la sección
  (script type="application/ld+json" con los Q&A del array)

#### `contact-form`

- Ver M4 — esta sección la implementa M4 completamente

#### `cta-banner`

- Full-width, centrado
- `data.style`: `"gradient"` → `bg-gradient-to-r from-primary to-accent`
- `data.style`: `"image-bg"` → imagen de fondo con overlay

### Tipos custom (no listados arriba)

Si el config tiene un `type` que no está en la lista, la IA:

1. Lee los campos del objeto en el config
2. Diseña el componente apropiado para esos datos
3. Lo crea en `src/components/sections/`
4. Lo agrega al switch del renderer

## Checklist M3

- [ ] Leer `site.config.json` → identificar todos los tipos en `sections[]`
- [ ] Por cada tipo (excepto navbar, hero, footer ya hechos en M2):
  - [ ] Crear componente en `src/components/sections/`
  - [ ] Agregar al switch en `page.tsx`
- [ ] Verificar que ningún componente tiene texto hardcodeado
- [ ] Verificar fondos alternados entre secciones
- [ ] Verificar `id` de cada `<section>` = `section.id` del config (para anchor links)
- [ ] Verificar JSON-LD FAQPage si hay sección `faq` con `schema: true`
- [ ] `npm run dev` sin errores de TypeScript

## Done

- Todos los tipos del config implementados, copy 100% desde siteConfig, sin texto hardcodeado, anchors correctos, fondos alternados, WCAG AA
- → state.md: M3 🟢, M4 🟡
