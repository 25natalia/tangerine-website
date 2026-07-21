# Design System Sync

Registro de qué se portó desde `tangerine-design-system`, cuándo, y desde qué commit. Ver la regla
completa en [`ARCHITECTURE.md`](./ARCHITECTURE.md).

| Componente | Fecha de sincronización | Commit del DS | Observaciones |
|---|---|---|---|
| Design tokens + tema Tailwind (`globals.css`) | 2026-07-21 | `9c99437` | Porteo completo del archivo como bloque atómico |
| Tipografía (fonts de `layout.tsx` + `Cocogoose-Regular.otf`) | 2026-07-21 | `9c99437` | Cocogoose Display (bold, headlines) sigue sin licencia en ambos repos — cae a Baloo 2 |
| `lib/utils.ts` (`cn`) | 2026-07-21 | `9c99437` | — |
| `theme-provider.tsx` | 2026-07-21 | `9c99437` | — |
| `theme-toggle.tsx` | 2026-07-21 | `9c99437` (contenido) | Promovido de `components/docs/` a `components/ui/` en el DS como parte de este porteo; ese commit de promoción todavía está pendiente de crearse en el DS |
| `components.json` | 2026-07-21 | `9c99437` | — |
| `Button` | 2026-07-21 | `9c99437` | — |
| `Container` | 2026-07-21 | `9c99437` | — |
| `Drawer` | 2026-07-21 | `9c99437` | Se portó `components/ui/drawer.tsx` (archivo suelto), no la carpeta `components/ui/drawer/` — es la que `Navbar` realmente consume por resolución de módulos. Ambas coexisten en el DS; vale la pena que el DS resuelva esa duplicación |
| `Mascot` (+ `lib/mascot.ts`, assets `public/brand/mascot/`) | 2026-07-21 | `9c99437` | — |
| `Navbar` (+ `Drawer` para el menú mobile) | 2026-07-21 | `9c99437` | `NavbarBrand`/`NavbarLink` renderizan un `<a>` plano (no `next/link`) — ver observación en el reporte de Fase 1 |
| `Footer` (+ `FooterMascotShowcase`, `lib/use-prefers-reduced-motion.ts`) | 2026-07-21 | `9c99437` | Social links todavía en `href="#"` — pendiente de handles reales, no inventados acá |
| `Card`, `Skeleton` (dependencia de `Card`) | 2026-07-21 | `9c99437` | — |
| `Reveal` / `RevealGroup` (`components/templates/reveal.tsx`) | 2026-07-21 | `9c99437` | Capa de "template motion infrastructure", no `components/ui` — documentado como reutilizable entre templates en el propio DS |
| `PatternImage` + `lib/patterns.ts` + los 5 SVG de `public/patterns/` | 2026-07-21 | `9c99437` | Solo se usó Mosaico en Home; los otros 4 quedan disponibles para fases siguientes |
| `Badge` | 2026-07-21 | `9c99437` | — |
| Case Study Template completo (`case-study-template.tsx`, `sections.tsx`, `lib/templates/case-study.ts`) | 2026-07-21 | `d24a131` | — |
| Portfolio Template completo (`portfolio-template.tsx` + 6 sub-componentes, `lib/templates/portfolio.ts`) | 2026-07-21 | `d24a131` | — |
| `VisualBlock`, `MockupFrame` (`pattern-mockup.tsx`) | 2026-07-21 | `d24a131` | Estándar in de "sin fotografía real todavía" ya documentado en el propio DS |
| `Accordion`, `Avatar`, `Switch`, `Input`, `Breadcrumb`, `Popover`, `Chip`, `SearchBar`, `Tabs`, `EmptyState` (+ `lib/empty-states.ts`) | 2026-07-21 | `d24a131` | Dependencias transitivas de los dos templates — se portaron completos aunque no todas sus variantes se usan hoy |

| Contact Template completo (`contact-template.tsx`, `contact-form.tsx`, `contact-hero.tsx`, `contact-sidebar.tsx`, `social-proof.tsx`, `contact-page.tsx`, `lib/templates/contact-data.ts`) | 2026-07-21 | `db83fdd` | `contact-page.tsx` y `social-proof.tsx` se portaron por fidelidad del barrel export, pero no se usan — ver nota abajo |
| `Field`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Tooltip` | 2026-07-21 | `db83fdd` | Dependencias del formulario |
| Not Found Template completo (`not-found-template.tsx`, `not-found-scene.tsx`, `not-found-page.tsx`, `index.ts`) | 2026-07-21 | `9c99437` | `not-found-page.tsx` se portó por fidelidad del barrel export, pero no se usa — `app/not-found.tsx` compone `SiteNavbar` + `NotFoundTemplate` + `SiteFooter` directamente, con CTAs propios (`/`, `/work`, `/studio`) |
| `MascotStage` + `CursorTrail` (`components/marketing/`) + keyframe `cursor-particle-drift` (`globals.css`) | 2026-07-21 | `3cc8465` | Nunca se habían portado — existían en el DS desde antes pero solo el propio Home del DS los consumía. `MascotStage` se usa acá con el prop `sparkle` (agregado en este mismo commit del DS) para el efecto de partículas cerca del mascot del Hero; ver nota abajo |
| `Carousel` (`components/ui/carousel/`) | 2026-07-21 | `2418db1` | Componente nuevo en el DS — no existía nada equivalente. Ver nota abajo |
| `Accordion` — prop nuevo `hiddenUntilFound` | 2026-07-21 | `93734c2` | El componente ya estaba portado (Fase 5); este commit solo trae el prop nuevo. Se usa en las secciones "Cómo trabajamos" y FAQ de la Home |
| Isotipo como favicon: `app/icon.svg`, `app/apple-icon.png`, `public/brand/icon-mark-square.svg` | 2026-07-21 | `2418db1` | `apple-icon.png` y el SVG full-bleed son nuevos también en el propio DS (no tenía apple-touch-icon hasta este commit) |
| `Accordion` — prop nuevo `trailingIcon` en `AccordionTrigger` | 2026-07-21 | `f65de00` | Simétrico a `leadingIcon` pero antes del ícono de expandir en vez de antes del título. Se usa en la grilla nueva de "Cómo trabajamos" |

### Nota sobre Contact Template — dos mejoras hechas primero en el DS

Antes de portar, se corrigieron dos problemas reales en el propio DS (commit `db83fdd`):

1. `ContactForm` no tenía forma de conectarse a un backend real — `handleSubmit` simulaba el
   envío con un `setTimeout`, tal como el propio README del template ya documentaba
   ("wiring a real endpoint later only touches `contact-form.tsx`'s `handleSubmit`"). Se agregó
   un prop `onSubmit` opcional (default: el mismo comportamiento simulado de siempre) en vez de
   forkear el componente.
2. `ContactTemplate` renderizaba siempre `<SocialProof />`, que muestra clientes ficticios
   ("Estudio Nébula", "Fintech Co.") y un testimonio inventado (Julia Fernández) — contenido de
   demo que Tangerine Studio no puede publicar como si fuera real. Se agregó un prop
   `showSocialProof` (default `true`, sin cambiar el comportamiento del propio DS) para que un
   consumidor real pueda omitir la sección en vez de mostrar clientes falsos.

La web usa `<ContactTemplate onSubmit={...} showSocialProof={false} />` — ver
`components/site-contact-form.tsx` y `lib/actions/send-contact-email.ts` (Resend, requiere
`RESEND_API_KEY`; sin esa variable el formulario falla explícitamente, nunca finge éxito).

### Nota sobre la Fase 5

Se detectó un error de documentación en el propio Brand OS: las secciones 01–04 del Volumen VIII
(SIMER) contienen texto copiado del Volumen X (Margarita Burgos) — hablan de una "asesora de
seguros" en vez del semillero de medicina de emergencias. No se usó ese texto como fuente;
`content/case-studies/simer.ts` documenta esto y construye el contenido solo a partir de las
secciones del Volumen VIII que sí son genuinamente sobre SIMER. Vale la pena corregir el Brand OS
original en Notion para que esto no se repita en una futura sincronización.

### Nota sobre la Fase 7 — `opengraph-image` es por segmento, no se hereda

`opengraph-image.tsx` (convención de archivo de Next.js) solo aplica al segmento de ruta exacto
donde vive, no cae en cascada a sub-rutas hermanas. Un primer intento con un único
`app/opengraph-image.tsx` "por defecto" quedó huérfano (aplicaba a un `app/page.tsx` que no
existe, porque la home real es `app/(marketing)/page.tsx`) y dejó `/`, `/studio`, `/capabilities`,
`/work` y `/contact` sin `og:image`. Se detectó levantando un build de producción real
(`next build` + `next start`) y comprobando con `curl` el HTML de cada ruta — no alcanza con que
el build compile o que la ruta aparezca como estática. Fix: un `opengraph-image.tsx` por segmento
(`/`, `/studio`, `/capabilities`, `/work`, `/contact`, más el ya existente `/work/[slug]`), cada
uno reusando `OgCard` de `lib/og.tsx` con el título/eyebrow real de esa página.

### Nota post-Fase 7 — `Button render={<Link />}` nunca fue el patrón correcto

Base UI documenta explícitamente que `Button` fuerza semántica de `<button>` nativo
(`nativeButton` es `true` por defecto) y que los links tienen su propia semántica: no deben
pasarse por `render`. El patrón correcto — estilizar `<Link>` directo con `buttonVariants` — ya
existía en el propio DS (`not-found-template.tsx`, `featured-project.tsx`); el error se originó
en la página de docs del Button del DS, que enseñaba `<Button render={<Link />}>` como ejemplo.
Corregido en el DS (commit `acc6251`, incluye también `suppressHydrationWarning` en `<body>` del
propio DS) y replicado acá en `components/home-hero.tsx` y `app/(marketing)/page.tsx`: los 5 CTAs
de navegación ahora son `<Link className={buttonVariants({...})}>` en vez de `Button render`.
`components/ui/button.tsx` no cambió — `buttonVariants` ya estaba exportado para exactamente este
caso.

### Nota sobre el rediseño del Home Hero

`components/home-hero.tsx` se reescribió por completo (layout editorial de dos columnas, sin
`PatternImage` de fondo, CTAs nuevos, mascota como protagonista) siguiendo de cerca el propio
`components/marketing/home-hero.tsx` del DS — mismo grid `[fr_fr]` con texto a la izquierda y
`MascotStage` a la derecha, mismo patrón de `PrimaryCTA`/`SecondaryCTA` (`buttonVariants` +
`motion.div` con lift en hover, nunca `Button render={<Link/>}`), misma recesión de scroll. No es
un porteo 1:1 — el copy, las stats y el eyebrow son de Tangerine Studio, no del Design System —
pero la estructura y las decisiones de motion/accesibilidad replican el precedente ya validado
del DS en vez de inventar un patrón nuevo. `MascotStage sparkle` reemplaza al mosaico de fondo
que pedía eliminarse: el "brillo" ya no viene de un patrón repetitivo sino del propio stage glow +
sombra de aterrizaje que `MascotStage` ya traía, más las partículas de proximidad del `sparkle`.

También se agregó `suppressHydrationWarning` a `<body>` en `app/layout.tsx` (ya estaba en
`<html>`, pero no cae en cascada a descendientes). Causa raíz confirmada: una extensión de
navegador ("Heurio") inyecta elementos/atributos (`id="heurio-app"`, `version="..."`) en el DOM
antes de la hidratación — no hay ninguna referencia a eso en el código de ninguno de los dos
repos. Ese mismatch forzaba a React a re-crear del lado del cliente el subárbol donde
`next-themes` monta su script inline de anti-FOUC, que es lo que disparaba el warning secundario
de "script tag" (no era un bug de `ThemeProvider`, que sigue siendo el patrón oficial de
next-themes para App Router).

### Nota sobre la segunda iteración de la Home

Tres secciones nuevas/rediseñadas — Filosofía (carrusel), Cómo trabajamos (accordion), FAQ —
reemplazan el grid estático anterior. Antes de escribir código se hizo el chequeo que pide
`ARCHITECTURE.md`: no había Carousel en el DS (de ahí el componente nuevo, ver tabla arriba);
Accordion sí existía y ya soportaba todo lo necesario (`variant="faq"`, `leadingIcon`) sin
modificarlo, salvo el `hiddenUntilFound` agregado para que el contenido colapsado no desaparezca
del HTML servido.

- **Filosofía**: las 6 creencias son las mismas de siempre (Volumen II, citadas literalmente) —
  solo cambia la presentación a carrusel. Fondo/patrón por tarjeta usan colores y los 4 patrones
  satélite reales del DS (`lib/patterns.ts`), nunca un tono inventado. La ilustración de hoja por
  tarjeta viene de `public/illustrations/hojas/` (6 PNG que estaban sueltos en
  `public/ilustrations/New folder/`, sin trackear, agregados por el usuario para este pedido —
  confirmado con él antes de usarlos; se reorganizaron a una ruta prolija).
- **Cómo trabajamos**: sigue siendo las 7 Capabilities reales (Volumen IV) — no se inventó una
  taxonomía de "proceso" nueva (confirmado con el usuario; su ejemplo de
  Descubrimiento→Evolución era solo referencia de formato). El accordion muestra `resolves` como
  descripción visible y `existsBecause`/`generatesValue` como contenido expandible — es el mismo
  contenido que ya vive en `/capabilities`, con otra presentación.
- **FAQ**: las 8 preguntas son las que pidió el usuario; las respuestas se escribieron ancladas a
  contenido ya real del sitio (capabilities.ts, la copy del propio Contact) evitando a propósito
  inventar políticas de negocio específicas — plazos exactos, alcance internacional — que no
  están confirmadas en el Brand OS todavía. Vale la pena que el usuario las revise y las ajuste
  con datos reales antes de tratarlas como definitivas, en particular "¿Cuánto dura un proyecto?",
  "¿Trabajan con empresas internacionales?" y "¿Pueden integrarse con equipos internos?".

El `Carousel` del DS no tiene todavía página de docs propia (`app/(docs)/components/carousel/`)
ni entrada en `nav-config.ts`/`components-roadmap.ts` — quedó pendiente, el resto de los
componentes del DS sí la tienen.

### Nota sobre la segunda iteración de Studio

Se eliminó por completo la sección "Personalidad de marca" (los tres arquetipos, Volumen II) —
sin mover ni resumir, como pidió el usuario. Origen perdió su tercer párrafo porque era una
cita idéntica, palabra por palabra, a la que ya usa la Home en Filosofía ("un límite real,
mirado de frente en vez de evitado, casi siempre esconde la mejor respuesta posible") — contenido
repetido entre páginas, no una cita distinta. El Manifiesto pasó de 13 bloques a 4: se conservan
la apertura y las dos líneas que el propio texto ya destacaba tipográficamente (pull quotes), más
un párrafo de tesis — cada frase que quedó es una cita literal sin reescribir; lo que se cortó
fueron bloques enteros, no palabras dentro de ellos.

Valores se rediseñó como el mismo `Carousel` que ya se portó para la Home (`components/ui/carousel`,
sin cambios) — tarjetas horizontales anchas en vez del carrusel casi-cuadrado de Filosofía, para
que ambas secciones no se sientan como el mismo componente reskineado. `notMeaning` (antes "Qué NO
significa") se redujo a una etiqueta corta "No es" en vez de desaparecer — es contenido real, solo
con menos ceremonia tipográfica. La ilustración por tarjeta usa `Mascot` (variants 1-4 + default)
en vez de las ilustraciones de hoja que ya usa Filosofía, para que ninguna de las dos secciones
repita exactamente los mismos assets; el detalle gráfico de fondo reutiliza los mismos 4 patrones
satélite, con una paleta de colores DS distinta a la de Home (incluye `--info-*`, que Home no usa
para tarjetas).

| `ScrollCarousel` (`components/ui/carousel/scroll-carousel.tsx`) | 2026-07-21 | `73c9e5e` | Componente nuevo en el DS — el `Carousel` existente es de un solo slide con crossfade, no soporta mostrar 2 a la vez sin cambiar su contrato de interacción |

### Nota sobre la segunda iteración de Filosofía (Home)

Solo se ajustó diseño, no contenido: las mismas 6 creencias, sin reescribir ninguna. Cambios:

- Cards más compactas (`h-64 sm:h-72`, antes `h-[26rem] sm:h-[28rem]`) y ahora anchas en vez de
  casi cuadradas, para mostrar ~2 por vista en desktop.
- El carrusel pasó de `Carousel` (un slide con crossfade) a `ScrollCarousel` (scroll nativo con
  snap, varios slides visibles) — ver el componente nuevo arriba. `Carousel` no se tocó; Studio
  sigue usándolo tal cual para Valores.
- Las ilustraciones de hoja (`public/illustrations/hojas/`) se reemplazaron por completo por los
  SVG de `public/illustrations/geometry/` que el usuario agregó — 4 motivos (destello/flor/hoja/
  semillas, los mismos de siempre) × 5 colores, un solo shape grande por tarjeta en vez de un
  ícono chico, posicionado para sangrar levemente el borde superior de la tarjeta
  (`overflow-visible` + posición absoluta) en vez de recortarse. Ningún motivo se repite en la
  posición inmediatamente siguiente. `public/illustrations/hojas/` se borró del repo — ya no lo
  usa nada (Studio/Valores usa `Mascot`, no esas hojas). Los SVG de `geometry/` viven solo en el
  repositorio de la web, igual que `hojas/` antes — no se portaron al DS.
- El fondo `bg-(--background-inverse)` de toda la sección se eliminó — ahora es blanco/default,
  igual que el resto de las secciones de Home, con el mismo padding (`py-24 sm:py-32`) y el mismo
  `border-t` que ya usan Cómo trabajamos/FAQ/Cierre. El color ahora lo aportan únicamente las
  tarjetas.
- Las flechas de `ScrollCarousel` son un estilo nuevo (circular, `bg-(--surface-default)`, borde
  sutil, sombra `--shadow-elevation-1` → `-3` en hover, estado disabled real en los extremos del
  scroll) — específico de este componente nuevo, no se tocó el estilo de flechas de `Carousel`
  (Studio/Valores no cambia).

### Nota sobre la segunda iteración de Cómo trabajamos (Home)

Patrón "resumen cerrado, detalle al expandir" (referencia: Headspace) — mismo contenido de
siempre (las 7 Capabilities reales), otra presentación. Cada capacidad pasó de una fila de
`Accordion variant="card"` en una sola columna (con `resolves` visible como descripción
permanente) a su propia celda en una grilla `1 col / 2 cols (sm) / 4 cols (lg)`: siete raíces de
`Accordion` de un solo item, no un "modo grilla" nuevo — el DS ya resuelve el expand/collapse, acá
solo se reorganiza dónde vive cada instancia.

En cerrado ya no se muestra `resolves` como descripción — eso violaría el pedido explícito de "no
mostrar párrafos en el estado cerrado". Las tres partes del contenido real (`resolves`,
`existsBecause`, `generatesValue`) se movieron juntas adentro del panel expandible, apiladas en
una columna (el `sm:grid-cols-2` que tenían antes no cabía bien en una celda de ~1/4 del ancho).
El ícono a la izquierda del título (círculo violeta + lucide-icon) se eliminó — en su lugar, un
SVG chico de `geometry/` a la derecha del título, vía el prop nuevo `trailingIcon` de
`AccordionTrigger` (ver tabla arriba). Ninguna combinación motivo+color se repite entre las 7
capacidades ni coincide con las que ya usa Filosofía en la misma página.

| `FloatingElement` (`components/marketing/floating-element.tsx`) | 2026-07-21 | `29e49fc` | Componente nuevo en el DS — generaliza la técnica de pointer-tracking que `MascotStage` ya usaba, para cualquier ilustración chica |

### Nota sobre el rediseño del Cierre (Home)

Misma frase, mismo copy, sin tocar una palabra — solo cambió la puesta en escena. `HomeClosing`
reemplaza la sección "Cierre" que vivía inline en `page.tsx`. El tamaño tipográfico de la frase sí
subió (`text-3xl sm:text-4xl lg:text-5xl`, antes `text-2xl sm:text-3xl`) — es jerarquía visual, no
copy. El padding vertical de la sección también subió considerablemente (`py-32 sm:py-40 lg:py-48`,
antes `py-24 sm:py-32`) para el "muchísimo espacio en blanco" pedido.

Las ilustraciones flotantes usan `FloatingElement` (ver tabla arriba): 2 piezas grandes de
`deco/` (`window-tangerine-lime`, `window-sandy-green`) como anclas en las esquinas, 1 `hoja` y 2
`star-*` de `deco/` como acentos medianos, y 2 SVG de `geometry/` (`semillas-lime`, `flor-violet`)
como detalle fino — ninguna combinación coincide con las que ya usan Filosofía o Cómo trabajamos
en la misma Home. Todas están posicionadas a mano (no en grilla), con offsets negativos relativos
a la sección; `overflow-hidden` en la sección es lo que las recorta parcialmente en el borde sin
arriesgar un scroll horizontal. Los elementos más chicos (estrellas, geometry) tienen loops de
flotación más rápidos y `repelStrength` más alto que las dos piezas grandes de `deco/` — la
lectura de profundidad viene de esa diferencia de velocidad, no de valores aleatorios.
Responsive: los 2 `window-*` y 1 estrella se ven siempre; hoja y la segunda estrella aparecen
desde `sm`; los 2 acentos de `geometry/` solo desde `lg` — en mobile quedan únicamente los
elementos más grandes/importantes, como pidió el usuario.
