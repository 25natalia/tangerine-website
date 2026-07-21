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
