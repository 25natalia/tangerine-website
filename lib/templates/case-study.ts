// The Case Study template's data model — every section is optional and
// renders only when its data is present ("cada sección debe poder
// ocultarse"), and nothing here is JSX: this file stays importable from a
// future MDX/CMS loader without dragging React along, the same separation
// lib/patterns.ts already uses between data and components/patterns/*.tsx.

import type { PatternId } from "@/lib/patterns";

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
}

export interface CaseStudyVisualIdentity {
  intro: string;
  colors: CaseStudyVisualColor[];
  typography: CaseStudyTypeRole[];
}

export interface CaseStudyGalleryItem {
  pattern: PatternId;
  caption: string;
  accent?: CaseStudyAccent;
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

  /** 2-3 paragraphs — enforced loosely by convention, not by the type. */
  summary: string[];

  /** Cliente / Industria / Servicios / Duración / Equipo / Herramientas / Estado / Año / Rol — pick any subset. */
  info: CaseStudyMeta[];

  challenge?: { title: string; body: string[] };
  objectives?: string[];
  process?: CaseStudyProcessStep[];
  research?: { intro: string; insights: CaseStudyInsight[] };
  principles?: CaseStudyPrinciple[];
  visualIdentity?: CaseStudyVisualIdentity;
  gallery?: CaseStudyGalleryItem[];
  mockups?: CaseStudyMockupKind[];
  componentsShowcase?: string[];
  beforeAfter?: CaseStudyBeforeAfter;
  impact?: CaseStudyStat[];
  learnings?: CaseStudyLearning[];
  testimonial?: CaseStudyTestimonial;
  nextProject?: CaseStudyNextProject;
}
