# 📁 Assets — Tu material

> Mete aquí imágenes, videos, PDFs, lo que sea del cliente.
> **Solo nómbralos bien. Nada más. La IA entiende el nombre.**

---

## Cómo nombrar

```
[dónde-va]--[descripción].[ext]
```

### Ejemplos

| Nombre del archivo | La IA entenderá |
|--------------------|-----------------|
| `hero--foto-local.jpg` | Imagen principal del hero |
| `hero--video-intro.mp4` | Video de fondo del hero |
| `galeria--01.jpg` | Primera imagen de galería |
| `galeria--02.jpg` | Segunda imagen de galería |
| `testimonios--foto-daniela.jpg` | Foto del testimonio de Daniela |
| `testimonios--fondo.jpg` | Fondo de la sección testimonios |
| `equipo--fundador.jpg` | Foto del fundador |
| `beneficios--icono-wifi.svg` | Ícono para card de beneficios |
| `contacto--mapa.png` | Imagen junto al formulario |
| `logo.svg` | Logo del cliente |
| `favicon.png` | Favicon |
| `og.jpg` | Open Graph (1200x630) |
| `descarga--carta-menu.pdf` | PDF descargable |
| `descarga--brochure.pdf` | PDF descargable |
| `entre-beneficios-y-proceso--banner-promo.jpg` | Banner entre dos secciones |

**¿No sabes la sección exacta?** Ponle un nombre descriptivo y ya:

- `foto-equipo-completo.jpg` → la IA preguntará dónde ponerla
- `video-recorrido-local.mp4` → la IA preguntará dónde ponerla

---

## Formatos

| Tipo | Formatos | Recomendación |
|------|----------|---------------|
| Imágenes | JPG, PNG, WebP, SVG | SVG para logos. Fotos max ~500KB |
| Videos | MP4, WebM | MP4 preferido. Comprimir |
| Documentos | PDF | Se ofrece como descarga |

---

<!--
PARA LA IA:
Los archivos siguen el formato [seccion]--[descripcion].[ext]
El texto antes de -- indica la sección destino.
Si no hay --, inferir del nombre o preguntar al humano.
Routing: imágenes→/public/images/, videos→/public/videos/, PDFs→/public/docs/
Imágenes: siempre next/image. Videos: <video>. PDFs: link descarga.
-->
