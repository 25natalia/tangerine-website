// The Case Study template's data model — every section is optional and
// renders only when its data is present ("cada sección debe poder
// ocultarse"), and nothing here is JSX: this file stays importable from a
// future MDX/CMS loader without dragging React along, the same separation
// lib/patterns.ts already uses between data and components/patterns/*.tsx.

import type { PatternId } from "@/lib/patterns";
import type { VisualBlockVideo } from "@/components/templates/shared/visual-block";

export type CaseStudyAccent = "purple" | "green" | "tangerine" | "info" | "gold";
/** Mirrors Avatar's own `color` variant (components/ui/avatar.tsx) — not imported directly since Avatar exports no standalone prop type. */
export type CaseStudyAvatarColor = "neutral" | "purple" | "green" | "blue" | "orange";

export interface CaseStudyMeta {
  label: string;
  value: string;
}

export interface CaseStudyProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyInsight {
  title: string;
  description: string;
}

export interface CaseStudyPrinciple {
  title: string;
  description: string;
}

export interface CaseStudyVisualColor {
  name: string;
  hex: string;
  role: string;
}

export interface CaseStudyTypeRole {
  role: string;
  family: string;
  sample: string;
  /** Specimen real del tipo (SVG/imagen de la fuente en uso) — cuando existe, reemplaza el `sample` de texto genérico. */
  image?: string;
}

export interface CaseStudyMark {
  src: string;
  label: string;
  /** "contain" cuando la imagen necesita verse completa, sin recorte (p. ej. un mockup cuyo encuadre
   * ya viene "de cerca") — por default recorta a `cover` como el resto de la grilla. */
  fit?: "cover" | "contain";
}

export interface CaseStudyPatternStrip {
  src: string;
  label: string;
}

export interface CaseStudyVisualIdentity {
  intro: string;
  colors: CaseStudyVisualColor[];
  typography: CaseStudyTypeRole[];
  /** Logos/isologos reales del proyecto — grilla aparte dentro de la sección, solo cuando existen. */
  marks?: CaseStudyMark[];
  /** Patrones de marca reales (tiras anchas) — mismo criterio que `marks`. */
  patterns?: CaseStudyPatternStrip[];
  /** Mockups reales de aplicaciones de marca (packaging, merch...) — NO el sitio web, eso vive en `gallery`/`liveSite` al final del case study.
   * Nombre distinto del `mockups` de nivel superior (`CaseStudyMockupKind[]`, el sistema abstracto viejo sin usar) a propósito, para no confundirlos. */
  identityMockups?: CaseStudyMark[];
}

export interface CaseStudyGalleryItem {
  /** Metraje real del proyecto (`portada-X`/`paleta-X`) — cuando existe, reemplaza `pattern` como en `bannerVideo`/`VisualBlock`. */
  video?: VisualBlockVideo;
  /** Imagen real (mockup, foto...) — mismo criterio que `video`, ver `VisualBlock`'s `image` mode. */
  image?: string;
  pattern?: PatternId;
  caption: string;
  accent?: CaseStudyAccent;
  fit?: "cover" | "contain";
}

export type CaseStudyMockupKind = "desktop" | "tablet" | "mobile" | "branding" | "merch" | "packaging";

export interface CaseStudyBeforeAfter {
  before: { label: string; description: string };
  after: { label: string; description: string };
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyLearning {
  title: string;
  description: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
  avatarColor?: CaseStudyAvatarColor;
}

export interface CaseStudyNextProject {
  eyebrow: string;
  title: string;
  category: string;
  href: string;
  pattern: PatternId;
  /** The target project's real cover footage, replacing `pattern` when present — same `VisualBlock` video mode as `bannerVideo`/`coverVideo` elsewhere, so "next project" previews the real thing instead of an abstract pattern. */
  coverVideo?: VisualBlockVideo;
}

/** The "explore the live site" section — only makes sense alongside `liveUrl`, which supplies the actual destination; this just supplies the section's own copy. */
export interface CaseStudyLiveSite {
  title: string;
  description: string;
}

export interface CaseStudyData {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  services: string[];
  duration: string;
  liveUrl?: string;
  heroPattern: PatternId;
  accent: CaseStudyAccent;
  /** Real footage for the hero banner, replacing `heroPattern` when present — see `VisualBlock`'s `video` mode. */
  bannerVideo?: VisualBlockVideo;
  /** Imagen real del proyecto para el hero — tiene prioridad sobre `bannerVideo` cuando existe (ver `VisualBlock`'s `image` mode). */
  heroImage?: string;
  /** Una frase corta bajo el nombre del cliente en el Hero — la intención/esencia del proyecto, condensada del `summary`/`challenge` real, nunca inventada. */
  intent?: string;

  /** 2-3 paragraphs — enforced loosely by convention, not by the type. */
  summary: string[];

  /** Cliente / Industria / Servicios / Duración / Equipo / Herramientas / Estado / Año / Rol — pick any subset. */
  info: CaseStudyMeta[];

  /** `color`: hex del color primario real del proyecto (el mismo de `visualIdentity.colors`) — la card de "El desafío" se pinta con ese color, no con un tono genérico, para que cada proyecto se sienta distinto acá.
   * `colorDark`: variante real del propio proyecto (de su misma paleta) usada como `accentColor` en dark mode en vez de `color` — muchos `color` primarios son demasiado oscuros/saturados para leerse como texto/ícono sobre un fondo oscuro, así que cada proyecto define su propio reemplazo legible en vez de recurrir a un morado genérico. Opcional: si no está, `color` se usa en ambos modos. */
  challenge?: { title: string; body: string[]; color: string; colorDark?: string };
  objectives?: string[];
  process?: CaseStudyProcessStep[];
  processLabel?: { eyebrow?: string; title?: string };
  /** `eyebrow`/`title` opcionales — cuando el proyecto los define, reemplazan el label genérico del diccionario (así "Investigación" en Alegra puede leerse distinto a "Percepción" en SIMER sin duplicar el componente). */
  research?: { eyebrow?: string; title?: string; intro: string; insights: CaseStudyInsight[] };
  principles?: CaseStudyPrinciple[];
  visualIdentity?: CaseStudyVisualIdentity & { eyebrow?: string; title?: string };
  /** Solo proyectos de branding + producto digital (QuickBite, Margarita Burgos) — un párrafo corto
   * que conecta decisiones de marca con la experiencia digital, redactado a partir de contenido
   * ya real del proyecto (nunca una relación inventada). */
  bridge?: string;
  gallery?: CaseStudyGalleryItem[];
  galleryLabel?: { eyebrow?: string; title?: string };
  mockups?: CaseStudyMockupKind[];
  componentsShowcase?: string[];
  beforeAfter?: CaseStudyBeforeAfter;
  impact?: CaseStudyStat[];
  /** Cierre cualitativo del proyecto — 1-2 frases reales, condensadas de `beforeAfter.after`/`summary`, nunca una métrica inventada. */
  outcome?: string;
  learnings?: CaseStudyLearning[];
  learningsLabel?: { eyebrow?: string; title?: string };
  testimonial?: CaseStudyTestimonial;
  nextProject?: CaseStudyNextProject;
  /** Renders near the end, before `nextProject` — only when both this and `liveUrl` are set. */
  liveSite?: CaseStudyLiveSite;
}
