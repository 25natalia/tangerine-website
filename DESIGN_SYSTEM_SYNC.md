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
