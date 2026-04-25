# M4 — Conversión

Deps: M3

**Checkpoint obligatorio al iniciar:**

```
🟡 CHECKPOINT M4 — Conversión
- Leo: site.config.json (contact-form, contact.whatsapp, analytics)
- Voy a crear: ContactForm.tsx, WhatsAppButton.tsx, api/contact/route.ts
- NO toco: componentes de secciones ya creados en M3
- Al terminar: marco M4 🟢 en state.md
```

Actualizar state.md: M4 → 🔵 WIP antes de empezar.

**Fuente de verdad: `site.config.json`**

M4 lee la configuración del config para implementar la capa de conversión.
No hay campos hardcodeados: el formulario, WhatsApp y tracking se construyen
exactamente a partir de lo que la IA definió en M1.

## Formulario de Contacto

La sección de formulario viene definida en el config como tipo `contact-form`.
Si no existe esa sección en el config → no hay formulario → saltar al siguiente bloque.

### Paso 1 — Leer el config

```typescript
// Leer del config:
const formSection = siteConfig.sections.find(s => s.type === 'contact-form')
// formSection.fields → array de campos
// formSection.destinationEmail → destino
// formSection.submitLabel, successMessage, errorMessage → copy
```

### Paso 2 — Schema Zod (construido desde config.fields)

Iterar `formSection.fields[]` y generar el schema dinámicamente:

```typescript
// Ejemplo de lo que la IA construye a partir del array de campos del config:
const contactSchema = z.object({
  // Por cada { id, type, required } en formSection.fields:
  nombre: z.string().min(2, 'Nombre requerido'),             // type: "text", required: true
  email: z.string().email('Email inválido'),                  // type: "email", required: true
  servicio: z.string().optional(),                            // type: "select", required: false
  mensaje: z.string().min(10, 'Mensaje muy corto').optional() // type: "textarea", required: false
  // etc — construir solo los campos que están en el config
})
```

Reglas:

- `required: true` → validación estricta
- `required: false` → `.optional()`
- `type: "email"` → `z.string().email()`
- `type: "tel"` → `z.string().regex(/^[\d\s\+\-]+$/).optional()`
- `type: "select"` → `z.enum([...field.options])`
- `type: "textarea"` → `z.string().min(10)`

### Paso 3 — API Route

```
src/app/api/contact/route.ts
```

- Validar con el schema zod construido en Paso 2
- Enviar a `formSection.destinationEmail`
- Response: `{ ok: true }` o `{ ok: false, error: "..." }`

### Paso 4 — Componente ContactForm

Si M3 creó el componente `ContactForm.tsx` (porque la sección existe en el config),
M4 lo completa con la lógica real:

- `react-hook-form` + zod resolver
- Por cada campo en `formSection.fields` → renderizar el input correcto:
  - `text | email | tel` → `<Input>` shadcn + `<Label>`
  - `textarea` → `<Textarea>` shadcn + `<Label>`
  - `select` → `<Select>` shadcn con `field.options`
  - `checkbox` → `<Checkbox>` shadcn + `<Label>`
- Button submit con loading state (texto: `formSection.submitLabel`)
- Estado success: `formSection.successMessage`
- Estado error: `formSection.errorMessage`

### Página /gracias (opcional)

Si el config tiene `"successAction": "redirect"` en `contact-form` → crear:

- `src/app/gracias/page.tsx`
- Confirmación + CTA secundario
- `noindex` en metadata

---

## WhatsApp

Fuente: `siteConfig.contact.whatsapp`

```typescript
const { number, message, label } = siteConfig.contact.whatsapp
const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
```

- [ ] Botón flotante: `fixed bottom-6 right-6 z-50`
- [ ] Ícono WhatsApp (SVG verde #25D366 o lucide `MessageCircle`)
- [ ] `hover:scale-110 transition-transform`
- [ ] `aria-label={label}` para accesibilidad
- [ ] Visible mobile + desktop
- [ ] Si `siteConfig.contact.whatsapp.number` está vacío → error en consola + no renderizar

---

## CTAs

Fuente: `siteConfig.sections[].ctas` en cada sección relevante

- [ ] CTA Hero — ya implementado en M2
- [ ] CTA intermedio — si hay una sección `cta-banner` a mitad del config → ya implementado en M3
- [ ] CTA Final — si hay sección `cta-banner` al final → ya implementado en M3
- [ ] Verificar que todos los `href` en CTAs del config apuntan a IDs que existen en la página

---

## Tracking

Fuente: `siteConfig.analytics` (solo si el objeto existe en el config)

```typescript
// Si siteConfig.analytics?.googleAnalyticsId está definido:
// → implementar GA4 con @next/third-parties
// Si siteConfig.analytics?.facebookPixelId está definido:
// → implementar FB Pixel
```

- [ ] GA4 → `NEXT_PUBLIC_GA_ID` en `.env.local` + Vercel
- [ ] FB Pixel → `NEXT_PUBLIC_FB_PIXEL_ID` en `.env.local` + Vercel
- [ ] Eventos a trackear (solo los que apliquen según lo que hay en el config):
  - `form_submit` — en el submit del formulario
  - `whatsapp_click` — en el botón flotante
  - `cta_click` — en cada CTA principal

Si `siteConfig.analytics` no existe en el config → omitir tracking completamente.

---

## Checklist M4

- [ ] Leer `site.config.json` → verificar si hay sección `contact-form`
- [ ] Si existe: construir schema zod desde `formSection.fields[]`
- [ ] Crear/completar API route con destino desde `formSection.destinationEmail`
- [ ] Completar componente ContactForm con lógica real
- [ ] WhatsApp desde `siteConfig.contact.whatsapp`
- [ ] Verificar hrefs de todos los CTAs → IDs correctos en la página
- [ ] Tracking solo si `siteConfig.analytics` existe con IDs reales
- [ ] Verificar formulario en dev (submit → response ok → mensaje éxito)
- [ ] Verificar WhatsApp abre con mensaje pre-cargado correcto

## Done

- Form envía ok (si hay), WhatsApp abre con msg del config, tracking activo solo si configurado, CTAs apuntan a IDs correctos
- → state.md: M4 🟢, M5 🟡
