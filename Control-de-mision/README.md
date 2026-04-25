# 🚀 Mission Control v2 — Landing Pages con IA

> Sistema que separa la capa humana de la capa IA para crear landing pages de forma rápida y eficiente.

---

## Cómo Funciona

```text
TÚ (15 min)                         IA (automático)

1. Abre usuario/CONTEXTO.md          1. Valida que hay info suficiente
2. Escribe sobre el cliente           2. Genera brief, design, copy
3. Describe qué secciones quieres    3. Propone plan en site.config.json
4. (Opcional) Define colores          4. Tú apruebas el plan
5. Pega contenido que tengas          5. Ejecuta misiones → código
```

## Estructura

```text
/.mission_control
├── 🧠 ROUTER.md              ← La IA lee esto primero
│
├── 👤 /usuario                ← TU CARPETA (solo tú tocas aquí)
│   ├── MANUAL.md              ← 📖 Manual completo del sistema
│   ├── CONTEXTO.md            ← Describe el proyecto (texto libre)
│   ├── REVISIONES.md          ← Anota correcciones después de ver resultados
│   ├── PROMPT.md              ← Prompts listos para copiar y pegar
│   ├── EJEMPLO.md             ← Ejemplo completado (referencia)
│   ├── SITE_CONFIG_TEMPLATE.json ← Ejemplo de formato del config
│   └── /assets                ← Mete aquí logos, fotos, videos, PDFs del cliente
│
├── 🤖 /ia                     ← Generado por la IA (no toques)
│   ├── stack.md               ← Reglas fijas (Next.js + Tailwind + Vercel)
│   ├── config-schema.md       ← Spec para generar site.config.json
│   ├── brief.md               ← Datos del cliente
│   ├── design.md              ← Colores, fuentes, tokens
│   ├── copy.md                ← Textos propuestos
│   └── state.md               ← Estado del proyecto
│
├── 📋 /missions               ← Tareas paso a paso
│   ├── m1_scaffolding         → Setup del proyecto
│   ├── m2_hero                → Hero + Navbar
│   ├── m3_sections            → Secciones de contenido
│   ├── m4_conversion          → Formulario, WhatsApp, tracking
│   ├── m5_responsive          → Auditoría mobile-first
│   └── m6_optimization        → SEO, performance, deploy
└──
[proyecto generado]/
    └── site.config.json       ← PANEL DE CONTROL (textos, colores, secciones)
```

## Nuevo Proyecto — 5 Pasos

1. **Lee** `usuario/MANUAL.md` si es tu primera vez
2. **Abre** `usuario/CONTEXTO.md` y escribe sobre el cliente
3. **Mete material** (logos, fotos, videos, PDFs) en `usuario/assets/`
4. **Copia un prompt** de `usuario/PROMPT.md` y pégalo en tu IA
5. La IA propone el plan en `site.config.json` → **tú lo apruebas** → la IA construye la web
6. **Itera**: edita `site.config.json` para cambios de contenido, o anota en `usuario/REVISIONES.md` para cambios mayores

## Stack Fijo (LEY)

| Pilar | Tecnología |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui |
| Deploy | Vercel |

---

DARW Agency — 2026
