# Config Schema — Spec Generativa v2

## Concepto central

`site.config.json` no tiene secciones predefinidas.
Las secciones son un **array ordenado**. El orden del array es el orden visual
de la página. Cada sección tiene un `type` y campos propios.

```json
{
  "sections": [
    { "id": "hero", "type": "hero", ... },
    { "id": "stats", "type": "stats-bar", ... },
    { "id": "ventajas", "type": "benefits-grid", ... }
  ]
}
```

La IA decide:

- Cuántas secciones hay
- En qué orden van
- Qué tipo es cada una
- Qué campos tiene cada sección

---

## Estructura base del JSON

Los únicos bloques **fijos** son los que no son secciones visuales:

```json
{
  "_meta": { ... },
  "brand": { ... },
  "colors": { ... },         ← solo si hay colores definidos o propuestos
  "fonts": { ... },          ← siempre
  "seo": { ... },
  "contact": { ... },        ← whatsapp, email, etc.
  "animations": { "level": 1|2|3 },
  "features": { ... },       ← solo si hay algo activo
  "sections": [ ... ]        ← array ordenado — el corazón del config
}
```

---

## Tipos de sección

### Tipos conocidos (con campos sugeridos)

Son puntos de partida, no estructuras obligatorias.
Agregar o quitar campos según el proyecto real.

---

#### `navbar`

```json
{
  "id": "navbar",
  "type": "navbar",
  "logo": { "src": "...", "alt": "..." },
  "links": [
    { "text": "...", "href": "#ancla" }
  ],
  "cta": { "text": "...", "href": "..." }
}
```

*Si el navbar no tiene CTA → omitir campo `cta`.*
*Si tiene mega-menu → agregar `submenu: []` dentro del link que lo necesite.*

---

#### `hero`

```json
{
  "id": "hero",
  "type": "hero",
  "badge": "...",           ← omitir si no hay badge
  "headline": "...",
  "subheadline": "...",     ← omitir si no hay
  "ctas": [
    { "text": "...", "href": "...", "variant": "primary" },
    { "text": "...", "href": "...", "variant": "secondary" }
  ],
  "media": {
    "type": "image",        ← "image" | "video" | "none" | "lottie" | "3d"
    "src": "..."
  }
}
```

*Si el hero tiene un formulario incrustado → agregar `"inlineForm": true`.*
*Si es un hero split (texto + imagen lado a lado) → la IA construye el componente apropiado.*

---

#### `trust-bar` / `logos`

```json
{
  "id": "clientes",
  "type": "logos",
  "label": "...",
  "logos": [
    { "src": "...", "alt": "..." }
  ],
  "style": "strip"          ← "strip" | "grid" | "carousel"
}
```

---

#### `benefits-grid` / `features`

```json
{
  "id": "beneficios",
  "type": "benefits-grid",
  "sectionLabel": "...",
  "headline": "...",
  "items": [
    { "icon": "zap", "title": "...", "body": "..." }
  ],
  "columns": 3              ← 2 | 3 | 4 (omitir si es libre)
}
```

---

#### `process` / `steps`

```json
{
  "id": "como-funciona",
  "type": "steps",
  "sectionLabel": "...",
  "headline": "...",
  "style": "numbered",      ← "numbered" | "timeline" | "horizontal"
  "steps": [
    { "number": "01", "title": "...", "body": "..." }
  ]
}
```

---

#### `testimonials`

```json
{
  "id": "testimonios",
  "type": "testimonials",
  "sectionLabel": "...",
  "headline": "...",
  "style": "carousel",      ← "carousel" | "grid" | "masonry" | "single"
  "items": [
    {
      "quote": "...",
      "author": "...",
      "role": "...",
      "avatar": "...",       ← omitir si no hay imagen
      "rating": 5            ← omitir si no aplica ratings
    }
  ]
}
```

⚠️ NUNCA inventar testimonios. Si no hay en copy.md → preguntar.

---

#### `gallery` / `portfolio`

```json
{
  "id": "galeria",
  "type": "gallery",
  "sectionLabel": "...",
  "headline": "...",
  "style": "masonry",       ← "grid" | "masonry" | "carousel" | "slider"
  "images": [
    { "src": "...", "alt": "...", "caption": "..." }
  ]
}
```

---

#### `pricing`

```json
{
  "id": "precios",
  "type": "pricing",
  "sectionLabel": "...",
  "headline": "...",
  "style": "cards",         ← "cards" | "table" | "toggle" (anual/mensual)
  "currency": "CLP",
  "plans": [
    {
      "name": "...",
      "price": "...",
      "period": "...",
      "description": "...",
      "features": ["...", "..."],
      "cta": "...",
      "highlighted": false
    }
  ]
}
```

---

#### `faq`

```json
{
  "id": "faq",
  "type": "faq",
  "sectionLabel": "...",
  "headline": "...",
  "schema": true,           ← siempre true → genera JSON-LD FAQPage
  "items": [
    { "question": "...", "answer": "..." }
  ]
}
```

---

#### `contact-form`

```json
{
  "id": "contacto",
  "type": "contact-form",
  "sectionLabel": "...",
  "headline": "...",
  "subheadline": "...",
  "destinationEmail": "...",
  "fields": [
    { "id": "nombre", "type": "text", "label": "...", "required": true },
    { "id": "email", "type": "email", "label": "...", "required": true },
    { "id": "servicio", "type": "select", "label": "...", "options": ["...", "..."], "required": false },
    { "id": "mensaje", "type": "textarea", "label": "...", "required": true }
  ],
  "submitLabel": "...",
  "successMessage": "...",
  "errorMessage": "..."
}
```

*Los campos son un array que la IA construye según el formulario real.*
*El tipo puede ser: `text`, `email`, `tel`, `textarea`, `select`, `checkbox`, `date`*

---

#### `cta-banner`

```json
{
  "id": "cta-final",
  "type": "cta-banner",
  "headline": "...",
  "subheadline": "...",
  "ctas": [
    { "text": "...", "href": "...", "variant": "primary" }
  ],
  "style": "gradient"       ← "gradient" | "solid" | "image-bg"
}
```

---

#### `footer`

```json
{
  "id": "footer",
  "type": "footer",
  "tagline": "...",
  "links": [
    { "text": "...", "href": "..." }
  ],
  "social": {
    "instagram": "...",
    "facebook": "..."
  }
}
```

*Incluir solo las redes que el cliente tiene activas.*

---

### Tipos personalizados (inventar cuando se necesita)

Si el proyecto necesita algo que no está en la lista → inventar un `type` nuevo
con un nombre descriptivo en kebab-case y los campos que necesite.

La IA crea:

1. La entrada en `sections[]` con los campos apropiados
2. El componente React en `src/components/sections/`
3. El case en el renderer de `page.tsx`

#### Ejemplos de tipos custom

```json
{ "id": "equipo", "type": "team-grid",
  "headline": "...",
  "members": [
    { "name": "...", "role": "...", "bio": "...", "photo": "...", "linkedin": "..." }
  ]
}
```

```json
{ "id": "comparacion", "type": "before-after",
  "headline": "...",
  "items": [
    { "before": { "label": "...", "points": ["..."] },
      "after":  { "label": "...", "points": ["..."] } }
  ]
}
```

```json
{ "id": "mapa", "type": "map-section",
  "headline": "...",
  "address": "...",
  "googleMapsUrl": "...",
  "embedUrl": "..."
}
```

```json
{ "id": "video-demo", "type": "video-section",
  "headline": "...",
  "subheadline": "...",
  "videoSrc": "/videos/demo.mp4",
  "poster": "/images/video-thumb.jpg",
  "autoplay": false
}
```

```json
{ "id": "numeros", "type": "stats",
  "items": [
    { "value": "500+", "label": "Clientes", "icon": "users" },
    { "value": "10", "label": "Años de experiencia", "icon": "clock" }
  ]
}
```

```json
{ "id": "certificaciones", "type": "badges-strip",
  "headline": "...",
  "badges": [
    { "src": "...", "alt": "Certificación ISO", "url": "..." }
  ]
}
```

---

## Impacto en la generación de código

### page.tsx — renderer dinámico

```typescript
import { siteConfig } from '@/lib/config'
// importar todos los componentes que apliquen

export default function Home() {
  return (
    <main>
      {siteConfig.sections.map((section) => {
        switch (section.type) {
          case 'navbar':        return <Navbar key={section.id} data={section} />
          case 'hero':          return <HeroSection key={section.id} data={section} />
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
          // tipos custom del proyecto:
          case 'team-grid':     return <TeamGrid key={section.id} data={section} />
          default:
            console.warn(`Tipo de sección desconocido: ${section.type}`)
            return null
        }
      })}
    </main>
  )
}
```

### Componentes — reciben los datos del config

```typescript
// Cada componente recibe su slice del JSON
// No hay props mágicas — todo viene del config

interface HeroProps {
  data: Extract<SiteConfig['sections'][number], { type: 'hero' }>
}

export function HeroSection({ data }: HeroProps) {
  return (
    <section>
      {data.badge && <Badge>{data.badge}</Badge>}
      <h1>{data.headline}</h1>
      {data.subheadline && <p>{data.subheadline}</p>}
      {data.ctas.map(cta => (
        <Button key={cta.href} variant={cta.variant}>{cta.text}</Button>
      ))}
    </section>
  )
}
```

---

## Proceso de construcción del config

```
1. Leer CONTEXTO.md procesado, brief.md, copy.md, design.md
2. Entender el proyecto: ¿qué tipo de negocio? ¿qué quiere comunicar?
3. Diseñar el flujo narrativo de la página (la IA propone el orden de secciones
   pensando en conversión y storytelling, no en una lista predefinida)
4. Para cada sección decidida:
   a. ¿Existe un tipo conocido que encaje? → usarlo con los campos reales
   b. ¿No encaja ninguno? → inventar un tipo nuevo, nombrarlo, definir sus campos
5. Construir el JSON con los campos reales (no placeholders)
6. PAUSA → "Propongo este flujo de secciones: [lista]. ¿Lo apruebas?"
7. Tras aprobación → M2 (diseño) y M3 (implementación de componentes)
```

---

## Reglas

- Las secciones son un array → su orden importa, es el orden de la página
- Cada `id` es único, kebab-case, descriptivo en español o inglés del negocio
- Nunca dejar campos con valor vacío `""` o `null` — si no hay dato, omitir el campo
- Nunca inventar testimonios, clientes, datos o números
- Los tipos custom empiezan con nombre descriptivo, no "custom-1"
- El renderer en `page.tsx` se actualiza con cada nuevo tipo que se cree

### Anotaciones para el usuario (OBLIGATORIO en el config real generado)

El `site.config.json` lo editará el usuario. Debe ser auto-explicativo:

- **En `colors`**: incluir un bloque `"_guide"` que mapee cada token a los elementos visuales que controla:

  ```json
  "_guide": {
    "_uso": "Cambia el hex del token. Guarda y usa el prompt 'Actualizar desde Config'.",
    "primary": "Botones CTA, links activos, bordes destacados",
    "accent": "Badges, íconos decorativos, elementos de atención",
    "bgPrimary": "Fondo principal de la página",
    "bgSecondary": "Fondo alternado entre secciones",
    "textPrimary": "Títulos y texto principal",
    "textSecondary": "Subtítulos y texto de apoyo"
  }
  ```

- **En cada sección del array**: incluir un `"_note"` que explique en una línea qué es esa sección y qué campos se pueden editar fácilmente:

  ```json
  "_note": "HERO — Título principal (headline), subtítulo y botones. Edita los textos de ctas[]."
  ```

- Los bloques `_guide` y `_note` son ignorados por el código (empiezan con `_`). Solo sirven para el usuario que edita el JSON.

---

## Referencia de íconos Lucide

Para campos `icon` en benefits, steps, stats:

| Concepto | Icon |
|----------|------|
| Velocidad / Eficiencia | `zap` |
| Seguridad / Confianza | `shield` |
| Calidad / Premium | `star` |
| Tiempo / Rapidez | `clock` |
| Equipo / Personas | `users` |
| Verificado / Garantía | `check-circle` |
| Dinero / Ahorro | `banknote` |
| Documento | `file-text` |
| Soporte / Chat | `message-circle` |
| Global / Online | `globe` |
| Crecimiento | `trending-up` |
| Casa / Inmobiliaria | `home` |
| Salud / Médico | `heart-pulse` |
| Educación | `book-open` |
| Tecnología | `cpu` |
| Configuración | `settings` |
| Ubicación | `map-pin` |
| Calendario | `calendar` |
| Premio | `trophy` |
| Herramienta | `wrench` |
