# 🚀 PROMPTS — Copia y Pega

> **Copia el prompt que necesites y pégalo en tu IA.**
> Funciona con Gemini, Claude, ChatGPT o cualquier modelo.

---

## 🟢 Iniciar Proyecto Nuevo

*Usa después de completar CONTEXTO.md.*

```
Lee el archivo .mission_control/ROUTER.md para entender el sistema.
Luego lee .mission_control/usuario/CONTEXTO.md con la información del cliente.
Sigue el flujo del ROUTER.md completo:
1. Genera /ia/brief.md, /ia/design.md y /ia/copy.md
2. Genera site.config.json con el plan de secciónes y contenido
3. Muéstrame el plan propuesto (secciones, colores, fuentes) para que lo apruebe
NO empieces a generar código hasta que yo apruebe el plan.
```

---

## 🔵 Continuar Sesión

*Usa al retomar en otra sesión o con otro modelo.*

```
Lee .mission_control/ROUTER.md y luego .mission_control/ia/state.md
para saber dónde quedamos. Identifica la misión activa y continúa
desde donde se quedó la última sesión.
Si hay algo en .mission_control/usuario/REVISIONES.md, aplica los cambios primero.
```

---

## 🟡 Pedir Cambios

*Usa después de anotar correcciones en REVISIONES.md.*

```
Lee .mission_control/usuario/REVISIONES.md donde anoté los cambios que quiero.
Actualiza los archivos /ia/ correspondientes y aplica las correcciones
en el código. Muéstrame qué cambiaste.
```

---

## ⚡ Prototipo Rápido

*Para mostrarle algo al cliente rápido (solo Hero).*

```
Lee .mission_control/ROUTER.md y opera en MODO PROTOTIPO.
Necesito solo el scaffolding (M1) y el Hero (M2) funcionando.
No hagas todas las secciones, solo lo necesario para tener
algo visual que mostrar al cliente.
```

---

## 🔧 Hotfix

*Cambio puntual sin tocar el flujo completo.*

```
Lee .mission_control/ROUTER.md y opera en MODO HOTFIX.
Necesito que hagas este cambio puntual:
[DESCRIBE TU CAMBIO AQUÍ]
No cambies nada más, solo esto.
```

---

## ➕ Agregar Sección

*El cliente pidió algo nuevo después de tener el sitio.*

```
Lee .mission_control/ROUTER.md y opera en MODO AGREGAR_SECCIÓN.
Necesito agregar una sección de [DESCRIBE LA SECCIÓN].
Primero actualiza site.config.json agregando la nueva entrada al array sections[].
Muéstramela para que la apruebe. Después crea el componente React y
agrégalo al renderer de page.tsx siguiendo el mismo design system.
Actualiza state.md cuando termines.
```

---

## 📄 Actualizar desde Config

*Usas cuando editaste site.config.json directamente y quieres que el código refleje los cambios.*

```
Lee .mission_control/ROUTER.md y opera en MODO ACTUALIZAR_CONFIG.
Revisar site.config.json y detectar qué cambió respecto a lo que está implementado.
Actualizar solo los componentes afectados por esos cambios.
No tocar nada que no haya cambiado en el config.
Confirmame qué archivos cambiaste y por qué.
```

---

## 🔍 Auto-Revisión de Calidad

*Pídele a la IA que critique la web antes de que tú la revises.*
*Muy útil para detectar problemas que quizás no ves a primera vista.*

```
Revisa el código y el site.config.json del proyecto actual y hazme
una autocrítica honesta evaluando estos puntos:

1. PRIMER IMPACTO: ¿El headline comunica el valor en menos de 3 segundos?
2. CONVERSIÓN: ¿Hay al menos 3 puntos de contacto (CTAs) en la página?
3. MOBILE: ¿Hay algo que pueda verse mal en pantallas de 375px?
4. CONTENIDO: ¿Hay algún texto que suene genérico o inventado?
5. CONFIANZA: ¿La página tiene elementos que generen credibilidad?
6. DISEÑO: ¿Los colores tienen suficiente contraste? ¿La jerarquía visual es clara?
7. VELOCIDAD: ¿Hay imágenes sin optimizar o componentes innecesariamente pesados?
8. SEO: ¿El title y description están bien escritos y dentro de los caracteres?

Para cada punto: dime si está bien, qué hay que mejorar, y cómo mejorarlo.
```

---

## 🔄 Sincronizar Sistema

*Úsalo preventivamente cada 3-4 mensajes durante una sesión activa.*
*No esperes a que la IA se pierda — úsalo antes de que pase.*

```
Sin escribir código todavía, confirma:
1. ¿Qué misión estás ejecutando actualmente?
2. ¿Qué dice ia/state.md sobre el estado actual?
3. ¿Qué archivos has modificado en esta sesión?
4. ¿Cuál es el próximo paso según el ROUTER.md?
Responde en 4 líneas. Luego continúa.
```

---

## 🆘 Reencuadrar IA

*Cuando la IA se fue por las ramas, ignoró el sistema o empezó a hacer cosas que no pediste.*

```
Para. Ignora todo lo que generaste en esta sección de la conversación.
Vuelve al inicio: lee .mission_control/ROUTER.md.
Luego lee .mission_control/ia/state.md para saber en qué punto estamos.
Espérame — no hagas nada hasta que yo confirme qué acción quiero que tomes.
```
