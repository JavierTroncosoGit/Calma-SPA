# M6 — Optimización + Deploy

Deps: todas

**Checkpoint obligatorio al iniciar:**

```
🟡 CHECKPOINT M6 — Optimización + Deploy
- Leo: site.config.json (seo, analytics, contact, canonicalUrl)
- Voy a verificar y completar: SEO, imágenes, performance, deploy
- Puedo modificar layout.tsx para metadata y env vars
- Al terminar: marco M6 🟢 en state.md. El proyecto está vivo.
```

Actualizar state.md: M6 → 🔵 WIP antes de empezar.

**Fuente de verdad: `site.config.json`**
M6 verifica y completa lo que las misiones anteriores dejaron. No reescribe
contenido — confirma que lo que está en el código coincide con el config.

## SEO

Los metadatos ya deberían estar configurados desde M1 (`siteConfig.seo`).
M6 verifica que estén correctos y completa lo que falte:

- [ ] Verificar `layout.tsx` tiene Metadata API con valores de `siteConfig.seo`
- [ ] `siteConfig.seo.title` ≤60ch, `description` ≤155ch
- [ ] Open Graph completo: ogTitle, ogDescription, ogImage, canonicalUrl
- [ ] Twitter Card: `summary_large_image`
- [ ] `robots.txt` → `/public/`
- [ ] `sitemap.xml` (Next.js generateSitemap o manual si es landing)
- [ ] JSON-LD: `Organization` en layout + `FAQPage` si la página tiene sección `faq` con `schema: true`
- [ ] Un solo `<h1>` por página (no puede haber más del hero)

## Imágenes

- [ ] Todo next/image (no img)
- [ ] alt descriptivo
- [ ] sizes responsive
- [ ] priority en hero (LCP)
- [ ] Favicon + icon.png + og-image.jpg (buscar favicon.*y og.* en assets/)

## Performance

- [ ] npm run build → JS <100KB gzip
- [ ] Lighthouse >90 perf, >90 a11y, >95 SEO
- [ ] Eliminar "use client" innecesarios
- [ ] Lazy load below the fold
- [ ] Sin console.log en prod

## Accesibilidad

- [ ] WCAG AA contraste
- [ ] aria-label en botones de ícono
- [ ] Focus visible
- [ ] Navegación por teclado

## Deploy

- [ ] GitHub → Vercel conectado
- [ ] Env vars en Vercel (solo las que apliquen según `siteConfig`):
  - `NEXT_PUBLIC_GA_ID` → si `siteConfig.analytics.googleAnalyticsId` existe
  - `NEXT_PUBLIC_FB_PIXEL_ID` → si `siteConfig.analytics.facebookPixelId` existe
  - `CONTACT_EMAIL` → de `siteConfig.contact.email`
  - `WHATSAPP_NUMBER` → de `siteConfig.contact.whatsapp.number`
- [ ] Preview deploy ok — verificar en URL de preview
- [ ] Dominio custom → `siteConfig.seo.canonicalUrl` (si tiene dominio real)
- [ ] Merge main → producción

## Post-Deploy

- [ ] Verificar mobile real
- [ ] Analytics recibiendo
- [ ] Formulario enviando
- [ ] WhatsApp abriendo
- [ ] Compartir URL al cliente

## Done

- Lighthouse all green, SEO ok, deploy ok, form+WhatsApp ok en prod
- → state.md: M6 🟢, Estado: 🟢 Completado, URL: [REGISTRAR]
