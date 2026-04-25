# 📖 MANUAL DEL USUARIO — Mission Control v2

> **Todo lo que necesitas saber para crear una landing page con este sistema.**
> No necesitas saber programar. Solo seguir estos pasos.

---

## ¿Qué es Mission Control?

Es un sistema que te permite crear landing pages profesionales trabajando con una IA (Gemini, Claude, ChatGPT, etc). Tú pones la información del cliente y el material gráfico. La IA se encarga de todo lo técnico: código, diseño, SEO, deploy.

```
TÚ                                    LA IA
───                                    ─────
Describes al cliente                → Genera la estructura técnica
Marcas qué secciones quieres        → Propone diseño y textos
Metes fotos, logos, videos           → Los integra al código
Apruebas o pides cambios             → Los aplica
                                     → Despliega la web
```

---

## Tu carpeta: `/usuario`

**Solo tocas lo que está dentro de esta carpeta.** Todo lo demás es de la IA.

```
/usuario
├── CONTEXTO.md      ← Aquí describes todo sobre el cliente
├── REVISIONES.md    ← Aquí anotas cambios después de ver el resultado
├── PROMPT.md        ← Prompts listos para copiar y pegar en la IA
├── EJEMPLO.md       ← Un ejemplo inventado para que veas cómo se llena
├── MANUAL.md        ← Este archivo que estás leyendo
└── /assets          ← Aquí metes fotos, logos, videos, PDFs
```

---

## Paso a Paso: Tu Primer Proyecto

### Paso 1 — Copiar la carpeta

Copia toda la carpeta `.mission_control/` dentro de tu nuevo proyecto. Eso es todo lo que necesitas para empezar.

### Paso 2 — Revisar el ejemplo (opcional)

Abre `EJEMPLO.md` para ver un caso completo inventado (una cafetería llamada "Nómade"). Te servirá para entender qué tipo de cosas escribir. **No es un cliente real — es solo de referencia.**

### Paso 3 — Llenar CONTEXTO.md

Este es el archivo más importante. Tiene 6 secciones:

| Sección | Qué poner | ¿Obligatorio? |
|---------|-----------|---------------|
| **1. Sobre el Cliente** | Quién es, a qué se dedica, su público, su tono | ✅ Sí |
| **2. Objetivo y Conversión** | La acción #1, el diferenciador, la oferta | ✅ Sí |
| **3. Checkboxes** | Tipo de web, secciones (en tus propias palabras), WhatsApp | ✅ Sí |
| **4. Diseño** | Colores, fuentes, estilo, logo | ⚡ Opcional |
| **5. Contenido** | Textos, testimonios, datos, FAQs del cliente | ⚡ Opcional |
| **6. Notas para la IA** | Instrucciones especiales | ⚡ Opcional |

**Tips para llenar:**

- Escribe natural, como si le explicaras a un compañero
- No necesitas ser técnico
- Mientras más escribas en §1 y §5, mejor resultado tendrás
- Si no tienes los colores del cliente (§4), déjalo vacío — la IA propondrá
- Los campos dicen `[Tu respuesta aquí]` — borra eso y escribe encima
- Los campos con `___` son para datos cortos (números, IDs, dominios)

**Lo que NO puede faltar:**

- Descripción del cliente (mínimo un párrafo)
- La acción #1 de conversión
- El número de WhatsApp (es obligatorio en toda landing)
- Al menos 1 tipo de landing marcado
- Describir qué contenido quieres mostrar en la página (aunque sea en una línea)

### Paso 4 — Meter material gráfico en /assets

Mete todo lo que tengas en la carpeta `usuario/assets/`:
fotos, logos, videos, PDFs, lo que sea.

**¿Cómo nombrar los archivos?** Usa este formato:

```
[sección]--[descripción].[extensión]
```

Ejemplos:

| Nombre | La IA entiende |
|--------|---------------|
| `hero--foto-local.jpg` | Imagen para el hero |
| `logo.svg` | Logo del cliente |
| `galeria--01.jpg` | Foto para la galería |
| `testimonios--foto-ana.jpg` | Foto de quien da testimonio |
| `descarga--menu.pdf` | PDF descargable |
| `hero--video.mp4` | Video para el hero |
| `favicon.png` | Favicon del sitio |
| `og.jpg` | Imagen para redes (1200x630) |

**¿No sabes a qué sección va?** Nómbralo como quieras (`foto-bonita.jpg`) y la IA te preguntará.

### Paso 5 — Copiar un prompt y arrancar

Abre `PROMPT.md` y copia el prompt que necesites:

| Prompt | Cuándo usarlo |
|--------|--------------|
| 🟢 **Iniciar Proyecto Nuevo** | Ya llenaste CONTEXTO.md y quieres empezar |
| 🔵 **Continuar Sesión** | Regresas otro día, otra sesión o cambias de IA |
| 🟡 **Pedir Cambios** | Anotaste correcciones en REVISIONES.md |
| ⚡ **Prototipo Rápido** | Solo quieres mostrar algo rápido al cliente |
| 🔧 **Hotfix** | Un cambio puntual (color, texto, bug) |
| ➕ **Agregar Sección** | El cliente pidió algo nuevo |
| 📄 **Actualizar desde Config** | Editaste site.config.json directamente |
| 🔍 **Auto-Revisión de Calidad** | Quieres que la IA critique el resultado |
| 🔄 **Sincronizar Sistema** | Cada 3-4 mensajes para que la IA no pierda el hilo |
| 🆘 **Reencuadrar IA** | La IA se fue por las ramas o ignoró el sistema |

**Pega el prompt en tu IA** (Gemini, Claude, ChatGPT) y déjala trabajar.

---

## Después del primer resultado: Revisiones

Cuando la IA te muestre el resultado:

1. **Revísalo** en el navegador
2. **Anota** lo que quieras cambiar en `REVISIONES.md`
3. **Copia** el prompt "Pedir Cambios" de `PROMPT.md`
4. **Pégalo** en la IA

Ejemplo de revisión:

```
### Ronda 1 — 6 abril 2026
- El color primario debería ser más oscuro
- Cambiar "Contáctanos" por "Agenda tu cita gratis"
- La foto del hero no se ve bien, usar hero--foto-nueva.jpg
- Agregar una sección de "Nuestro Equipo"
- El formulario no necesita campo de teléfono
```

Escribe natural. No necesitas ser técnico. La IA entiende.

---

## Iteración rápida: el archivo site.config.json

Cuando la IA termina de construir el sitio, genera automáticamente un archivo
llamado `site.config.json` en la raíz del proyecto. **Este archivo es tu panel
de control para cambios rápidos de contenido.**

```
proyecto/
├── site.config.json   ← Tu panel de control de contenido
├── .mission_control/  ← Sistema de la IA
└── src/               ← Código (no tocar)
```

**¿Qué puedes editar directamente en site.config.json?**

- Textos: titulares, subtítulos, CTAs, descripciones de beneficios
- FAQs: agregar o modificar preguntas y respuestas
- Testimonios: editar citas, nombres, roles
- Links: número de WhatsApp, redes sociales, destinos de CTAs
- Colores principales de la paleta
- Agregar un item a un array (ej: sumar un testimonio más)

**¿Qué NO debes editar en el JSON?**

- La estructura: no cambies `{` por `[` ni rompas la jerarquía
- No borres campos que no entiendes
- No modifiques `"type"` de una sección (cambia el componente completo)

**Cómo hacer un cambio rápido:**

1. Abre `site.config.json` en un editor de texto
2. Busca el texto que quieres cambiar (Ctrl+F)
3. Edita el valor (respeta las comillas)
4. Guarda
5. Usa el prompt **"Actualizar desde Config"** para que la IA aplique los cambios al código

**¿Todavía puedo usar REVISIONES.md?**
Sí. La diferencia es:

- `site.config.json` → para cambios de contenido rápidos y específicos
- `REVISIONES.md` → para cambios de diseño, bugs, nuevas secciones, o cualquier cosa que no sea solo cambiar texto

---

## Consejo: cómo trabajar en sesiones para mejores resultados

Los modelos de IA funcionan mejor en sesiones cortas y enfocadas.
**Lo óptimo es 1 missión por sesión.** Cuando termines M1, cierra y re-abre
con el prompt "Continuar Sesión". El modelo llega descansado y re-lee todo.

**Si la sesión es larga**, usa el prompt **"Sincronizar Sistema"** cada 3-4
mensajes para que el modelo confirme en qué punto está y no se desvie.

Señales de que la IA se perdió:

- Empieza a generar código sin avisarte antes
- No actualiza `ia/state.md` después de terminar una misión
- Te hace preguntas sobre cosas que ya estaban en CONTEXTO.md
- Crea archivos que no correspondían a la misión activa

Si ves alguna de esas señales → usa el prompt **"Reencuadrar IA"** inmediatamente.

---

## Las 6 Misiones (lo que la IA hace por ti)

La IA trabaja en orden, una misión a la vez:

| # | Misión | Qué hace |
|---|--------|----------|
| M1 | **Scaffolding** | Crea el proyecto, instala todo, configura colores y fuentes |
| M2 | **Hero** | Construye la primera sección (hero) + menú de navegación |
| M3 | **Secciones** | Beneficios, testimonios, FAQ, galería, etc. |
| M4 | **Conversión** | Formulario de contacto, botón WhatsApp, analytics |
| M5 | **Responsive** | Audita que todo se vea bien en celular y tablet |
| M6 | **Deploy** | SEO, performance, y subida a producción |

**No necesitas saber qué misión va.** La IA lo maneja sola. Solo verás el resultado.

---

## Lo que SIEMPRE tendrá tu landing (reglas fijas)

Estas cosas van en TODAS las landings que hagas con este sistema:

| Elemento | Por qué |
|----------|---------|
| **Botón de WhatsApp flotante** | Siempre visible abajo a la derecha. Es la vía de contacto más directa. |
| **Smooth scroll (Lenis)** | Navegación suave y premium al hacer scroll. |
| **Firma DARW en footer** | "Desarrollado por DARW" con link a darw.cl. Branding de la agencia. |

---

## Stack tecnológico (no necesitas entender esto)

Si alguien técnico te pregunta:

- **Next.js 15** — Framework
- **Tailwind CSS v4** — Estilos
- **shadcn/ui** — Componentes
- **Vercel** — Hosting
- **TypeScript** — Lenguaje

---

## Preguntas Frecuentes

**¿Funciona con cualquier IA?**
Sí. Gemini, Claude, ChatGPT, o cualquier modelo que lea archivos.

**¿Necesito saber programar?**
No. Solo llenar CONTEXTO.md y meter archivos en assets/.

**¿Puedo usar otra herramienta que no sea Next.js?**
No. El stack es fijo. Eso garantiza calidad y velocidad.

**¿Qué pasa si no tengo los colores del cliente?**
Deja la sección 4 vacía. La IA propondrá una paleta basada en la industria.

**¿Qué pasa si no tengo fotos?**
La IA puede trabajar con placeholders, pero el resultado será mejor con fotos reales.

**¿Puedo agregar secciones después?**
Sí. Usa el prompt "Agregar Sección" de PROMPT.md.

**¿Puedo hacer cambios después de ver el resultado?**
Sí. Tantas rondas como necesites. Anótalos en REVISIONES.md.

**¿Cómo sé en qué estado va el proyecto?**
La IA mantiene un archivo `ia/state.md` con el progreso. No lo toques, es solo de lectura.

**¿Puedo reusar esto para otro cliente?**
Sí. Copia la carpeta `.mission_control/` a un proyecto nuevo y empieza de cero con otro CONTEXTO.md.

---

## Resumen en 30 segundos

1. Copia `.mission_control/` a tu proyecto
2. Llena `usuario/CONTEXTO.md`
3. Mete material en `usuario/assets/`
4. Copia un prompt de `usuario/PROMPT.md`
5. Pégalo en tu IA
6. Revisa → anota cambios en `REVISIONES.md` → repite

**Resultado: landing page profesional, desplegada, optimizada.**

---

DARW Agency — 2026
