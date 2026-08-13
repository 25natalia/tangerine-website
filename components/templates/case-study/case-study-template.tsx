"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  CaseStudyHero,
  CaseStudySummary,
  CaseStudyChallenge,
  CaseStudyObjectives,
  CaseStudyResearch,
  CaseStudyProcess,
  CaseStudyPrinciples,
  CaseStudyVisualIdentity,
  CaseStudyBridge,
  CaseStudyGallery,
  CaseStudyMockups,
  CaseStudyComponents,
  CaseStudyBeforeAfter,
  CaseStudyOutcome,
  CaseStudyImpact,
  CaseStudyLearnings,
  CaseStudyTestimonial,
  CaseStudyLiveSite,
  CaseStudyNextProject,
} from "./sections";

/**
 * The whole point of this file: every section after the Hero/Summary core
 * is `data.section ? <Section /> : null`. A project that has no
 * Testimonial, or no Before/After, simply omits that key in its data and
 * the template reflows around the gap — no empty headers, no placeholder
 * copy. Only Hero and Summary are unconditional, the same questions ("what
 * is it, why does it exist, who was involved") any case study owes a
 * reader before it earns the right to skip anything else — the "who was
 * involved" info cards live inside Hero itself now, next to the title.
 *
 * `dataByLocale` (no plain `data`) porque este template necesita elegir el
 * idioma activo en el cliente — content/case-studies/*.ts trae ambas
 * versiones (`{ es, en }`) y acá se selecciona la que corresponde.
 *
 * Doesn't render Navbar/Footer itself — those are page-level chrome a
 * consumer already has an opinion about, composed around this component
 * (see app/(templates)/preview/case-study/page.tsx for the reference
 * composition), not something a content template should own.
 */
export function CaseStudyTemplate({ dataByLocale }: { dataByLocale: Localized<CaseStudyData> }) {
  const { locale } = useLanguage();
  const data = dataByLocale[locale];
  // Color real del proyecto (el mismo de la card de "El reto") — reemplaza el morado genérico de
  // marca del sitio en los eyebrows/chulitos de las secciones de abajo, así cada case study se
  // siente teñido con su propia identidad en vez de todos compartiendo el mismo acento.
  //
  // `color` suele ser un tono oscuro/saturado pensado para verse bien como fondo sólido (la card de
  // "El desafío") o como texto sobre blanco — en dark mode, ese mismo hex como texto/ícono sobre un
  // fondo oscuro pierde casi todo el contraste (p. ej. el verde casi negro de QuickBite). Por eso en
  // dark mode se usa `colorDark`, la propia variante clara/legible de cada proyecto (nunca un color
  // inventado ni el morado genérico), cuando el proyecto la define. `mounted` evita un mismatch de
  // hidratación: next-themes no conoce el tema real hasta montarse en el cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const accentColor = (isDark && data.challenge?.colorDark) || data.challenge?.color;

  return (
    <article>
      {/* Arco narrativo: Contexto → Reto → Punto de partida → Proceso → Solución/Sistema →
          En acción → Antes/Después → Resultado → Reflexión → Siguiente proyecto. */}
      <CaseStudyHero data={data} />
      <CaseStudySummary summary={data.summary} />
      {data.challenge ? (
        <CaseStudyChallenge title={data.challenge.title} body={data.challenge.body} color={data.challenge.color} />
      ) : null}
      {data.objectives ? <CaseStudyObjectives objectives={data.objectives} accentColor={accentColor} /> : null}
      {data.research ? <CaseStudyResearch research={data.research} accentColor={accentColor} /> : null}
      {data.process ? <CaseStudyProcess process={data.process} label={data.processLabel} accentColor={accentColor} /> : null}
      {data.principles ? <CaseStudyPrinciples principles={data.principles} accentColor={accentColor} /> : null}
      {data.visualIdentity ? <CaseStudyVisualIdentity data={data.visualIdentity} accentColor={accentColor} /> : null}
      {/* Puente marca → experiencia — solo en proyectos que son branding + producto digital real
          (QuickBite, Margarita Burgos). "Exploración" (bocetos) y "Diseñando la experiencia"
          (wireframes/flujos) del brief original quedan fuera a propósito: no hay assets reales
          que las respalden y el pedido explícito es no inventar proceso. */}
      <CaseStudyBridge bridge={data.bridge} accentColor={accentColor} />
      {data.gallery ? <CaseStudyGallery gallery={data.gallery} label={data.galleryLabel} accentColor={accentColor} /> : null}
      {data.mockups && data.mockups.length > 0 ? <CaseStudyMockups mockups={data.mockups} data={data} /> : null}
      {data.componentsShowcase && data.componentsShowcase.length > 0 ? (
        <CaseStudyComponents components={data.componentsShowcase} />
      ) : null}
      {data.beforeAfter ? <CaseStudyBeforeAfter beforeAfter={data.beforeAfter} accentColor={accentColor} /> : null}
      <CaseStudyOutcome outcome={data.outcome} accentColor={accentColor} />
      {data.impact ? <CaseStudyImpact impact={data.impact} /> : null}
      {data.learnings ? (
        <CaseStudyLearnings learnings={data.learnings} label={data.learningsLabel} accentColor={accentColor} />
      ) : null}
      {data.testimonial ? <CaseStudyTestimonial testimonial={data.testimonial} /> : null}
      <CaseStudyLiveSite data={data} accentColor={accentColor} />
      {data.nextProject ? <CaseStudyNextProject nextProject={data.nextProject} /> : null}
    </article>
  );
}
