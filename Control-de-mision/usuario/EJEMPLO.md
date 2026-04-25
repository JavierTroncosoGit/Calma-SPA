<!--
⚠️ PARA LA IA — ESTE ARCHIVO ES SOLO UN EJEMPLO DE REFERENCIA.
NO extraer datos de aquí. NO usar estos valores en el proyecto real.
El cliente ficticio "Nómade" NO existe. Leer solo para entender el formato.
Si el humano ya completó CONTEXTO.md, IGNORAR este archivo por completo.
-->

# 📝 EJEMPLO — Caso: Cafetería "Nómade" (FICTICIO)

> **Esto es un ejemplo para que veas cómo llenar CONTEXTO.md.**
> No necesitas ser tan detallado — con la mitad ya alcanza.
> ⚠️ **Todo lo de abajo es inventado, no es un cliente real.**

---

## 1. Sobre el Cliente

> Nómade es una cafetería de especialidad en Providencia, Santiago. Llevan 3 años.
> Su público son profesionales jóvenes de 25-40 que trabajan remoto o freelance
> y buscan un lugar bonito con buen café para trabajar.
>
> El tono de la marca es cercano, moderno, un poco hipster pero sin exagerar.
> Publican bastante en Instagram (@nomade.cafe, 12k seguidores) con buenas fotos.
> No tienen web actualmente, solo Instagram y Google Maps (4.7 estrellas, 280 reseñas).
>
> Lo que los hace únicos: granos de origen directo (Colombia y Guatemala),
> tostado propio, y espacio diseñado para trabajo remoto (WiFi rápido,
> enchufes en cada mesa, música ambient).

---

## 2. Objetivo y Conversión

**Acción #1:**

> Reservar mesa para trabajar via WhatsApp o venir a conocer el local.
> Secundario: comprar café en grano online (futuro).

**Diferenciador:**

> Café de especialidad con tostado propio + espacio diseñado para trabajo remoto.
> La competencia tiene buen café pero no setup para trabajar.

**Oferta/Gancho:**

> Primer café gratis si reservas por WhatsApp mencionando la web.
> "Nómade Pass" — pase mensual de café ilimitado por $45.000 CLP.

---

## 3. Checkboxes Rápidos

### Tipo de landing page

- [x] Restaurante / Negocio Local

### Secciones que necesita

> Hero que transmita el ambiente del café + trabajo remoto.
> Una barra con logos de reseñas (Google, Instagram).
> 3 beneficios reales: café de especialidad, espacio de trabajo, pase mensual.
> Cómo funciona el Nómade Pass (3 pasos simples).
> Galería de fotos del local — tenemos fotos profesionales.
> Testimonios de clientes reales de Google Maps.
> FAQ sobre WiFi, precios y reservas.
> CTA final para reservar por WhatsApp.
> Footer con redes y mapa.

### Funcionalidades

- [x] Google Analytics → ID: G-XXXXXXXXXX
- [x] Facebook Pixel → ID: 1234567890
- [x] Mapa de Google → Dirección: Av. Providencia 1234, Providencia, Santiago

### WhatsApp (OBLIGATORIO en toda landing)

- Número: +56912345678
- Mensaje pre-cargado: "Hola, vi la web de Nómade y me gustaría reservar una mesa"

### Animaciones

- [x] **Wow** — Framer Motion

### Dominio

- Dominio: nomade.cafe
- ¿Ya está comprado? [x] Sí

---

## 4. Diseño

### Colores

| Uso | Hex | Notas |
|-----|-----|-------|
| Primario | #2D1B0E | Café oscuro |
| Secundario | #D4A574 | Dorado cálido |
| Acento | #E8B94A | Amarillo miel |
| Fondo | #FAF7F2 | Crema suave |
| Texto | #1A1A1A | Negro suave |

### Fuentes

| Uso | Nombre |
|-----|--------|
| Títulos | Playfair Display |
| Cuerpo | Inter |

### Estilo
>
> Cálido, moderno. No hipster cliché. Como cafés de Copenhague: minimalista
> con toques de madera y plantas.
> Referencia: <https://www.bluebottlecoffee.com/>

### Logo

- [x] SVG + PNG disponibles
- En `usuario/assets/` como `logo.svg`

---

## 5. Contenido

> Slogan: "Tu oficina con el mejor café de Santiago"
>
> Testimonios de Google Maps:
>
> - "El mejor lugar para trabajar remoto en Providencia." — Daniela R.
> - "El pase mensual es un robo (en el buen sentido)." — Sebastián M.
> - "El espacio es hermoso, la música perfecta." — Catalina P.
>
> Datos: 280+ reseñas (4.7⭐), 12k seguidores, 3 años, WiFi 300 Mbps
>
> FAQ frecuentes:
>
> - ¿WiFi? → Sí, 300 Mbps
> - ¿Puedo trabajar todo el día? → Sí, sin límite
> - ¿Enchufes? → Sí, en cada mesa
> - ¿Nómade Pass? → $45.000/mes, café ilimitado
> - ¿Reservas? → Por WhatsApp

### Links útiles

- Competencia: <https://café-altura.cl>
- Referencia: <https://www.bluebottlecoffee.com/>
- Material: <https://drive.google.com/drive/folders/xxxxx>

### Material disponible

- [x] Fotos profesionales
- [x] Testimonios reales
- [x] Contenido de redes sociales

---

## 6. Notas para la IA

> Priorizar mobile (80% del tráfico desde Instagram).
> No usar fotos de stock — tenemos fotos reales.
> Barra de confianza: logos de Google Maps, Instagram, Rappi, PedidosYa.
> Hero debe transmitir: lugar acogedor + café premium + puedes trabajar aquí.

---

## 📤 Resultado: así se vería el site.config.json generado

*Esto lo genera la IA automáticamente. No lo escribes tú.*
*Se muestra aquí para que entiendas qué esperar antes de aprobar el plan.*
*(Solo se muestran las primeras 3 secciones — el config real tiene todas)*

```json
{
  "brand": {
    "name": "Nómade Café",
    "logo": { "src": "/images/logo.svg", "alt": "Nómade Café" }
  },

  "colors": {
    "_guide": {
      "primary":      "Botones CTA, links activos",
      "accent":       "Badges, detalles decorativos",
      "bgPrimary":    "Fondo principal",
      "bgSecondary":  "Fondo alternado entre secciones"
    },
    "primary":       "#2d6a4f",
    "primaryDark":   "#1b4332",
    "accent":        "#d4a017",
    "bgPrimary":     "#fafaf8",
    "bgSecondary":   "#f0ece4",
    "textPrimary":   "#1a1a1a",
    "textSecondary": "#5c5c52"
  },

  "fonts": {
    "heading": "Playfair Display",
    "body":    "Inter"
  },

  "seo": {
    "title":       "Nómade Café — Café de especialidad + trabajo remoto en Providencia",
    "description": "El mejor lugar para trabajar remoto en Santiago. Café de especialidad, WiFi 300 Mbps y Nómade Pass mensual. 4.7⭐ en Google.",
    "canonicalUrl": "https://nomadecafe.cl"
  },

  "contact": {
    "whatsapp": {
      "number":  "56987654321",
      "message": "Hola! Quiero saber más sobre el Nómade Pass 🌿",
      "label":   "Consultar por WhatsApp"
    }
  },

  "animations": { "level": 2 },

  "sections": [
    {
      "_note": "NAVBAR — Menú con los links principales y CTA al Nómade Pass",
      "id": "navbar", "type": "navbar",
      "links": [
        { "text": "El café",      "href": "#el-cafe" },
        { "text": "Nómade Pass",  "href": "#nomade-pass" },
        { "text": "Galería",      "href": "#galeria" },
        { "text": "Ubicación",    "href": "#ubicacion" }
      ],
      "cta": { "text": "Ver el Nómade Pass", "href": "#nomade-pass" }
    },
    {
      "_note": "HERO — Primera sección. Foto del local con título y CTAs",
      "id": "hero", "type": "hero",
      "badge":       "☕ Café de especialidad · Trabajo remoto · Providencia",
      "headline":    "Tu oficina favorita huele a café",
      "subheadline": "Espacio de trabajo con café premium, WiFi de 300 Mbps y ambiente diseñado para que fluyas.",
      "ctas": [
        { "text": "Ver el Nómade Pass", "href": "#nomade-pass", "variant": "primary" },
        { "text": "¿Cómo es el lugar?", "href": "#galeria",     "variant": "secondary" }
      ],
      "media": { "type": "image", "src": "/images/hero--interior.jpg", "alt": "Interior Nómade Café" }
    },
    {
      "_note": "STATS — Números reales del negocio. Edita los values si cambian.",
      "id": "numeros", "type": "stats",
      "items": [
        { "value": "280+",  "label": "Reseñas en Google",  "icon": "star" },
        { "value": "4.7⭐", "label": "Calificación",       "icon": "trophy" },
        { "value": "3",     "label": "Años en Providencia","icon": "clock" },
        { "value": "300",   "label": "Mbps de WiFi",       "icon": "wifi" }
      ]
    }
  ]
}
```

> **Nota:** La IA muestra este plan antes de escribir código.
> Tú lo revisas, apruebas (o pides ajustes), y recién ahí empieza a construir.
