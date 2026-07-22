import type { CaseStudyData } from "@/lib/templates/case-study";
import {
  CaseStudyHero,
  CaseStudySummary,
  CaseStudyInfo,
  CaseStudyChallenge,
  CaseStudyObjectives,
  CaseStudyProcess,
  CaseStudyResearch,
  CaseStudyPrinciples,
  CaseStudyVisualIdentity,
  CaseStudyGallery,
  CaseStudyMockups,
  CaseStudyComponents,
  CaseStudyBeforeAfter,
  CaseStudyImpact,
  CaseStudyLearnings,
  CaseStudyTestimonial,
  CaseStudyLiveSite,
  CaseStudyNextProject,
} from "./sections";

/**
 * The whole point of this file: every section after the Hero/Summary/Info
 * core is `data.section ? <Section /> : null`. A project that has no
 * Testimonial, or no Before/After, simply omits that key in its data and
 * the template reflows around the gap — no empty headers, no placeholder
 * copy. Only Hero, Summary and Info are unconditional, the same three
 * questions ("what is it, why does it exist, who was involved") any case
 * study owes a reader before it earns the right to skip anything else.
 *
 * Doesn't render Navbar/Footer itself — those are page-level chrome a
 * consumer already has an opinion about, composed around this component
 * (see app/(templates)/preview/case-study/page.tsx for the reference
 * composition), not something a content template should own.
 */
export function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    <article>
      <CaseStudyHero data={data} />
      <CaseStudySummary summary={data.summary} />
      <CaseStudyInfo info={data.info} />
      {data.challenge ? <CaseStudyChallenge title={data.challenge.title} body={data.challenge.body} /> : null}
      {data.objectives ? <CaseStudyObjectives objectives={data.objectives} /> : null}
      {data.process ? <CaseStudyProcess process={data.process} /> : null}
      {data.research ? <CaseStudyResearch research={data.research} /> : null}
      {data.principles ? <CaseStudyPrinciples principles={data.principles} /> : null}
      {data.visualIdentity ? <CaseStudyVisualIdentity data={data.visualIdentity} /> : null}
      {data.gallery ? <CaseStudyGallery gallery={data.gallery} /> : null}
      {data.mockups && data.mockups.length > 0 ? <CaseStudyMockups mockups={data.mockups} data={data} /> : null}
      {data.componentsShowcase && data.componentsShowcase.length > 0 ? (
        <CaseStudyComponents components={data.componentsShowcase} />
      ) : null}
      {data.beforeAfter ? <CaseStudyBeforeAfter beforeAfter={data.beforeAfter} /> : null}
      {data.impact ? <CaseStudyImpact impact={data.impact} /> : null}
      {data.learnings ? <CaseStudyLearnings learnings={data.learnings} /> : null}
      {data.testimonial ? <CaseStudyTestimonial testimonial={data.testimonial} /> : null}
      <CaseStudyLiveSite data={data} />
      {data.nextProject ? <CaseStudyNextProject nextProject={data.nextProject} /> : null}
    </article>
  );
}
