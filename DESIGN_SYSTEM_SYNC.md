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
