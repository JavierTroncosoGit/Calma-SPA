# ROUTER — Entrada IA

Lee este archivo primero en cada sesión.

## Modos

| Modo | Qué hacer |
|------|-----------|
| FULL | Flujo M1→M6 completo |
| PROTOTIPO | Solo M1 + M2 |
| HOTFIX | state.md → cambio puntual |
| AGREGAR_SECCIÓN | Agregar entrada al config + crear componente + actualizar renderer |
| REVISIONES | usuario/REVISIONES.md → aplicar cambios |
| ACTUALIZAR_CONFIG | Leer cambios en site.config.json → actualizar solo los componentes afectados |

Default: FULL.

---

## Principio Central

> La IA diseña y decide primero. El código viene después.

El flujo no es "usuario define → IA construye".
El flujo es **"IA lee el contexto → IA propone (config) → humano aprueba → IA construye"**.

`site.config.json` es el **plan de trabajo de la IA**: refleja todas las
decisiones creativas y de contenido que tomó basándose en el contexto del cliente.
El usuario lo revisa y aprueba. Después, el código se construye **leyendo ese plan**.

Si el usuario quiere iterar después: edita el config → IA actualiza los componentes.

---

## Flujo de Lectura (FULL)

1. `usuario/CONTEXTO.md`
2. `ia/contexto-procesado.md` → si no existe o hash cambió → REGENERAR
3. `usuario/REVISIONES.md` si hay pendientes → aplicar primero
4. `ia/stack.md`
5. `ia/state.md` → misión activa

### Si es proyecto nuevo (M1 no iniciada)

1. Generar `ia/brief.md` desde contexto-procesado
2. Generar `ia/design.md` desde contexto-procesado (colores, fuentes)
3. Generar `ia/copy.md` desde contexto-procesado (todos los textos por sección)
4. **Generar `site.config.json`** en la raíz del proyecto:
   - Leer `ia/config-schema.md` para la spec de construcción
   - Construir el array `sections[]` en el orden narrativo que maximice conversión
   - Un objeto por sección, con el `type` apropiado y todos los campos reales
   - Incluir solo lo que existe: campos reales, no placeholders
   - Detectar assets en `usuario/assets/` → rutas reales en el JSON
5. **PAUSA** → Mostrar al humano:
    - El flujo de secciones propuesto (lista de IDs y tipos)
    - Los colores y fuentes elegidos
    - Cualquier decisión creativa relevante
    - "¿Apruebas este plan antes de empezar el código?"
6. Tras aprobación → `missions/m1_scaffolding.md`

### Si hay misión activa (proyecto en curso)

1. Leer `site.config.json` (ya existe y fue aprobado)
2. `missions/m[N]` → ejecutar la misión activa
   - Si `m[N]` es M5 → leer `ia/responsive-mandamientos.md` ANTES de ejecutar

---

## Regla: después de que el código existe

Cuando las misiones ya generaron código, `site.config.json` se convierte en el
**único punto de edición de contenido**. El usuario edita el JSON, la IA lee
los cambios y actualiza solo los componentes afectados (modo ACTUALIZAR_CONFIG).

**Cuándo usar REVISIONES.md vs editar el config:**

- `site.config.json` → textos, links, números, order de secciones, agregar items a arrays
- `REVISIONES.md` → cambios de diseño, bugs, nuevas secciones completas, decisiones estructurales

---

## Validación Mínima (antes de generar /ia/)

| Requisito | Sección | Acción si falta |
|-----------|---------|-----------------|
| Descripción cliente ≥30 palabras | §1 | ❌ Preguntar |
| Acción #1 conversión | §2.1 | ❌ Preguntar |
| Diferenciador | §2.2 | ⚠️ Preguntar, continuar |
| ≥1 tipo de landing | §3 | ❌ Preguntar |
| Intención de secciones (libre o vacío) | §3 | ⚠️ Si vacío, IA propone |
| Número WhatsApp | §3 | ❌ Preguntar |

❌ = Bloquear. ⚠️ = Proponer y confirmar.

---

## Protocolo de Persistencia

> **El mayor riesgo del sistema: la IA deriva en conversaciones largas y
> deja de seguir el workflow. Este protocolo lo mitiga.**

### Regla de Sesiones Cortas

**1 sesión = 1 misión.** Al completar una misión, la sesión termina.
La siguiente misión abre una nueva conversación con el prompt "Continuar Sesión".
Esto garantiza que el model parte con contexto limpio y re-lee ROUTER.md y state.md.

### Ritual de Inicio de Misión (OBLIGATORIO)

Antes de ejecutar cualquier misión, la IA debe anunciar:

```
🟡 CHECKPOINT MISIÓN [N]
- Misión: M[N] — [nombre]
- Estado anterior: [lo que dice state.md]
- Archivos que voy a crear/modificar: [...]
- Archivos que NO debo tocar: [...]
- Al terminar: actualizo state.md y anuncio que la misión está completa
```

Si la IA no anuncia esto, el humano debe pedirlo antes de proceder.

### Commits Intermedios a state.md

La IA actualiza `ia/state.md` en **tres momentos**, no solo al final:

1. **Al INICIAR una misión** → marcar como 🔵 WIP
2. **A mitad** (si la misión tiene múltiples subsecciones) → anotar avance
3. **Al COMPLETAR** → marcar 🟢 y desbloquear siguiente

### Señales de Deriva (el humano debe detectarlas)

Si la IA hace alguna de estas cosas → usar el prompt "🆘 Reencuadrar IA":

- Empieza a generar código sin haber anunciado el Checkpoint
- No actualiza state.md al terminar una misión
- Omite la pausa de aprobación del config
- Inventa secciones no aprobadas en el config
- Edita archivos que no mencionó en el Checkpoint
- Responde solo con texto cuando debería estar escribiendo archivos

---

## Fin de Sesión

1. Actualizar `state.md` (estado, resumen 1-3 líneas, próximos pasos)
2. Misión completada → desbloquear siguiente
3. Revisiones aplicadas → marcar ✅ en `REVISIONES.md`
4. **Anunciar al humano:** "Sesión completa. Para continuar: abre nueva conversación y usa el prompt 'Continuar Sesión'."

---

## Reglas

- NUNCA inventar info → preguntar
- NUNCA cambiar stack → stack.md es LEY
- NUNCA generar copy sin contexto-procesado.md
- NUNCA releer CONTEXTO.md después de generar contexto-procesado.md
- NUNCA hardcodear textos en componentes → siempre desde `siteConfig`
- NUNCA construir componentes antes de que el humano apruebe site.config.json
- SIEMPRE usar contexto-procesado.md como fuente para brief/design/copy
- SIEMPRE generar site.config.json con decisiones reales, no placeholders
- SIEMPRE pausar y mostrar el plan al humano antes de arrancar código
- SIEMPRE que M3 construye un componente → lo lee del config, no inventa campos
- SIEMPRE que M4 genera el form → construye el schema desde config.fields[]
- SIEMPRE registrar en state.md
- SIEMPRE revisar REVISIONES.md al inicio
- SIEMPRE una misión a la vez (modo FULL)
