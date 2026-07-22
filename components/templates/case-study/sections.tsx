"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import * as icons from "lucide-react";
import { ArrowUpRight, ArrowRight, Check, Quote, type LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardTitle, CardBody, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MockupFrame } from "@/components/patterns/pattern-mockup";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { CaseStudyData, CaseStudyMockupKind } from "@/lib/templates/case-study";
import { VisualBlock } from "@/components/templates/shared/visual-block";

const EASE = [0.22, 1, 0.36, 1] as const;

function Icon({ name, className }: { name: string; className?: string }) {
  const Lucide = (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Sparkles;
  return <Lucide className={className} strokeWidth={1.75} aria-hidden="true" />;
}

/** Fades/rises into place once, the moment it scrolls into view — the only scroll motion this template uses, applied consistently instead of a different effect per section. */
function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl sm:mb-14">
      <p className="text-overline text-(--text-brand) uppercase">{eyebrow}</p>
      <h2 className="font-display mt-3 text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
      {description ? <p className="font-reading mt-4 text-lg text-pretty text-(--text-secondary)">{description}</p> : null}
    </Reveal>
  );
}

/* ================= HERO ================= */

export function CaseStudyHero({ data }: { data: CaseStudyData }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <header className="relative">
      <Container size="wide" className="pt-6 pb-10 sm:pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/work">Work</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.client}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-8 flex flex-col gap-6 sm:mt-10"
        >
          <div className="flex flex-wrap items-center gap-3 text-(--text-secondary)">
            <Badge variant="primary">{data.category}</Badge>
            <span className="text-body-sm">{data.client}</span>
            <span aria-hidden="true">·</span>
            <span className="text-body-sm">{data.year}</span>
          </div>
          <h1 className="font-display max-w-4xl text-4xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-(--text-tertiary)">
            <span className="text-body-sm">
              <strong className="text-(--text-primary)">Servicios</strong> — {data.services.join(", ")}
            </span>
            <span className="text-body-sm">
              <strong className="text-(--text-primary)">Duración</strong> — {data.duration}
            </span>
          </div>
          {data.liveUrl ? (
            <div className="mt-2">
              <a href={data.liveUrl} className={cn(buttonVariants({ size: "lg" }), "group/cta")}>
                Visitar el proyecto
                <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </motion.div>
      </Container>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="mt-4"
      >
        {data.bannerVideo ? (
          <VisualBlock video={data.bannerVideo} className="aspect-[16/8] w-full sm:aspect-[16/6]" />
        ) : (
          <VisualBlock pattern={data.heroPattern} accent={data.accent} animate className="aspect-[16/8] w-full sm:aspect-[16/6]" />
        )}
      </motion.div>
    </header>
  );
}

/* ================= SUMMARY ================= */

export function CaseStudySummary({ summary }: { summary: string[] }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal className="mx-auto flex max-w-3xl flex-col gap-6">
        {summary.map((p, i) => (
          <p key={i} className={cn("font-reading text-pretty text-(--text-secondary)", i === 0 ? "text-xl leading-relaxed sm:text-2xl" : "text-body-lg leading-relaxed")}>
            {p}
          </p>
        ))}
      </Reveal>
    </Container>
  );
}

/* ================= PROJECT INFO ================= */

export function CaseStudyInfo({ info }: { info: CaseStudyData["info"] }) {
  return (
    <Container size="wide" className="pb-20 sm:pb-28">
      <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {info.map((item) => (
          <Card key={item.label} variant="flat" className="h-full">
            <CardBody className="gap-1">
              <p className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">{item.label}</p>
              <p className="text-body-sm font-medium text-(--text-primary)">{item.value}</p>
            </CardBody>
          </Card>
        ))}
      </Reveal>
    </Container>
  );
}

/* ================= CHALLENGE (inverse band) ================= */

export function CaseStudyChallenge({ title, body }: { title: string; body: string[] }) {
  return (
    <section className="bg-(--neutral-1000) text-(--neutral-0)">
      <Container size="wide" className="py-20 sm:py-28">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <p className="text-overline text-(--tangerine-400) uppercase">El desafío</p>
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
            {body.map((p, i) => (
              <p key={i} className="font-reading text-body-lg text-pretty text-(--neutral-300)">{p}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ================= OBJECTIVES ================= */

export function CaseStudyObjectives({ objectives }: { objectives: string[] }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Objetivos" title="Lo que este proyecto tenía que lograr" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {objectives.map((o, i) => (
          <Reveal key={o} delay={i * 0.05}>
            <div className="flex items-start gap-3 rounded-(--radius-container) border border-(--border-subtle) p-5">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-(--background-brand-subtle) text-(--icon-brand)">
                <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <p className="text-body-sm text-(--text-secondary)">{o}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ================= PROCESS ================= */

export function CaseStudyProcess({ process }: { process: CaseStudyData["process"] }) {
  if (!process) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Cómo trabajamos" title="Proceso" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="flex h-full flex-col gap-3 rounded-(--radius-container) border border-(--border-subtle) p-5">
              <span className="flex size-10 items-center justify-center rounded-(--radius-interactive) bg-(--background-brand-subtle) text-(--icon-brand)">
                <Icon name={step.icon} className="size-5" />
              </span>
              <div>
                <p className="text-caption font-semibold text-(--text-tertiary)">0{i + 1}</p>
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
              </div>
              <p className="text-body-sm text-(--text-secondary)">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ================= RESEARCH ================= */

export function CaseStudyResearch({ research }: { research: CaseStudyData["research"] }) {
  if (!research) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Research" title="Lo que encontramos" description={research.intro} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {research.insights.map((insight, i) => (
          <Reveal key={insight.title} delay={i * 0.05}>
            <Card variant="outlined" className="h-full">
              <CardBody>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <CardDescription className="font-reading mt-1.5">{insight.description}</CardDescription>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ================= PRINCIPLES ================= */

export function CaseStudyPrinciples({ principles }: { principles: CaseStudyData["principles"] }) {
  if (!principles) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Design Principles" title="Los principios que guiaron cada decisión" />
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className="border-t border-(--border-subtle) pt-6">
            <h3 className="font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-body-sm text-(--text-secondary)">{p.description}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ================= VISUAL IDENTITY ================= */

export function CaseStudyVisualIdentity({ data }: { data: NonNullable<CaseStudyData["visualIdentity"]> }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Visual Identity" title="El sistema visual" description={data.intro} />
      {data.video ? (
        <Reveal className="overflow-hidden rounded-(--radius-container) border border-(--border-subtle)">
          <VisualBlock video={data.video} className="aspect-video w-full" />
        </Reveal>
      ) : null}
      {data.typography.length > 0 ? (
        <Reveal
          className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", data.video && "mt-10")}
          delay={data.video ? 0.1 : 0}
        >
          {data.typography.map((t) => (
            <div key={t.role} className="rounded-(--radius-container) border border-(--border-subtle) p-6">
              <span className="font-display block text-5xl">{t.sample}</span>
              <p className="mt-3 text-body-sm font-semibold">{t.role}</p>
              <p className="text-caption text-(--text-tertiary)">{t.family}</p>
            </div>
          ))}
        </Reveal>
      ) : null}
    </Container>
  );
}

/* ================= GALLERY ================= */

export function CaseStudyGallery({ gallery }: { gallery: CaseStudyData["gallery"] }) {
  if (!gallery) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Gallery" title="El trabajo, a resolución real" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {gallery.map((item, i) => (
          <Reveal key={item.pattern} delay={i * 0.05} className={i === 0 ? "sm:col-span-2" : undefined}>
            <figure className="group/gallery overflow-hidden rounded-(--radius-container) border border-(--border-subtle)">
              <div className="overflow-hidden">
                <VisualBlock
                  pattern={item.pattern}
                  accent={item.accent}
                  className={cn("w-full transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover/gallery:scale-105", i === 0 ? "aspect-[16/7]" : "aspect-[4/3]")}
                />
              </div>
              <figcaption className="p-4 text-body-sm text-(--text-secondary)">{item.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ================= MOCKUPS ================= */

const mockupConfig: Record<CaseStudyMockupKind, { label: string; frameClassName: string; wrapperClassName?: string }> = {
  desktop: { label: "Desktop", frameClassName: "aspect-video w-full" },
  tablet: { label: "Tablet", frameClassName: "aspect-[4/3] w-64" },
  mobile: { label: "Mobile", frameClassName: "aspect-[9/19] w-40" },
  branding: { label: "Tarjeta", frameClassName: "aspect-[1.75/1] w-56" },
  merch: { label: "Merch", frameClassName: "aspect-square w-40" },
  packaging: { label: "Packaging", frameClassName: "aspect-square w-40" },
};

export function CaseStudyMockups({ mockups, data }: { mockups: CaseStudyMockupKind[]; data: CaseStudyData }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Aplicaciones" title="El sistema, en contexto real" />
      <Reveal className="flex flex-wrap items-end gap-8">
        {mockups.map((kind, i) => {
          const config = mockupConfig[kind];
          const pattern = data.gallery?.[i % (data.gallery?.length || 1)]?.pattern ?? data.heroPattern;
          return (
            <MockupFrame key={kind} label={config.label} frameClassName={config.frameClassName}>
              <VisualBlock pattern={pattern} accent={data.accent} className="size-full" />
            </MockupFrame>
          );
        })}
      </Reveal>
    </Container>
  );
}

/* ================= COMPONENTS SHOWCASE ================= */

function ComponentDemo({ name }: { name: string }) {
  switch (name) {
    case "Button":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Outline</Button>
        </div>
      );
    case "Badge":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Nuevo</Badge>
          <Badge variant="success">Activo</Badge>
        </div>
      );
    case "Switch":
      return <Switch defaultChecked />;
    case "Avatar":
      return (
        <Avatar size="sm" color="purple">
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
      );
    case "Input":
      return <Input placeholder="tu@email.com" className="max-w-48" readOnly />;
    case "Card":
      return (
        <Card variant="outlined" className="w-full max-w-xs">
          <CardBody>
            <CardTitle className="text-base">Proyecto</CardTitle>
            <CardDescription>Vista compacta</CardDescription>
          </CardBody>
        </Card>
      );
    default:
      return null;
  }
}

export function CaseStudyComponents({ components }: { components: string[] }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Components" title="Las mismas piezas, en producción" />
      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {components.map((name) => (
          <div key={name} className="flex min-h-32 flex-col justify-between rounded-(--radius-container) border border-(--border-subtle) p-5">
            <p className="text-caption font-semibold text-(--text-tertiary)">{name}</p>
            <div className="mt-4">
              <ComponentDemo name={name} />
            </div>
          </div>
        ))}
      </Reveal>
    </Container>
  );
}

/* ================= BEFORE / AFTER ================= */

export function CaseStudyBeforeAfter({ beforeAfter }: { beforeAfter: NonNullable<CaseStudyData["beforeAfter"]> }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Before / After" title="Lo que cambió" />
      <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-(--radius-container) border border-(--border-subtle) bg-(--background-subtle) p-8">
          <p className="text-overline text-(--text-tertiary) uppercase">{beforeAfter.before.label}</p>
          <p className="font-reading mt-3 text-body-lg text-(--text-secondary)">{beforeAfter.before.description}</p>
        </div>
        <div className="rounded-(--radius-container) border border-(--border-brand) bg-(--background-brand-subtle) p-8">
          <p className="text-overline text-(--text-brand) uppercase">{beforeAfter.after.label}</p>
          <p className="font-reading mt-3 text-body-lg text-(--text-primary)">{beforeAfter.after.description}</p>
        </div>
      </Reveal>
    </Container>
  );
}

/* ================= IMPACT (inverse band, stat tiles) ================= */

export function CaseStudyImpact({ impact }: { impact: CaseStudyData["impact"] }) {
  if (!impact) return null;
  return (
    <section className="bg-(--neutral-1000) text-(--neutral-0)">
      <Container size="wide" className="py-20 sm:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-overline text-(--tangerine-400) uppercase">Impact</p>
          <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">El resultado, en números</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {impact.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.04}>
              <p className="font-display text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="text-caption mt-2 text-(--neutral-400)">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ================= LEARNINGS ================= */

export function CaseStudyLearnings({ learnings }: { learnings: CaseStudyData["learnings"] }) {
  if (!learnings) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow="Learnings" title="Qué aprendimos" />
      <Reveal className="max-w-3xl">
        <Accordion variant="ghost" defaultValue={[learnings[0]?.title]}>
          {learnings.map((l) => (
            <AccordionItem key={l.title} value={l.title}>
              <AccordionTrigger title={l.title} />
              <AccordionContent>{l.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Container>
  );
}

/* ================= TESTIMONIAL ================= */

export function CaseStudyTestimonial({ testimonial }: { testimonial: NonNullable<CaseStudyData["testimonial"]> }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl">
        <Card variant="flat" className="p-8 sm:p-12">
          <Quote className="size-8 text-(--icon-brand)" aria-hidden="true" />
          <p className="font-display mt-4 text-2xl leading-snug text-balance sm:text-3xl">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar color={testimonial.avatarColor}>
              <AvatarFallback>{testimonial.avatarInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-body-sm font-semibold">{testimonial.name}</p>
              <p className="text-caption text-(--text-tertiary)">{testimonial.role} · {testimonial.company}</p>
            </div>
          </div>
        </Card>
      </Reveal>
    </Container>
  );
}

/* ================= LIVE SITE ================= */

export function CaseStudyLiveSite({ data }: { data: CaseStudyData }) {
  if (!data.liveSite || !data.liveUrl) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal>
        <Card variant="flat" className="flex flex-col items-start gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div className="max-w-xl">
            <p className="text-overline text-(--text-brand) uppercase">Sitio web en producción</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-balance sm:text-4xl">{data.liveSite.title}</h2>
            <p className="mt-4 text-body-lg text-pretty text-(--text-secondary)">{data.liveSite.description}</p>
          </div>
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "group/cta shrink-0")}
          >
            Explora el sitio en vivo
            <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Card>
      </Reveal>
    </Container>
  );
}

/* ================= NEXT PROJECT ================= */

export function CaseStudyNextProject({ nextProject }: { nextProject: NonNullable<CaseStudyData["nextProject"]> }) {
  return (
    <Container size="wide" className="pb-20 sm:pb-28">
      <Reveal>
        <Card variant="outlined" interaction="clickable" href={nextProject.href} className="group/next overflow-hidden">
          <div className="grid sm:grid-cols-2">
            {nextProject.coverVideo ? (
              <VisualBlock video={nextProject.coverVideo} className="aspect-video sm:aspect-auto" />
            ) : (
              <VisualBlock pattern={nextProject.pattern} className="aspect-video sm:aspect-auto" />
            )}
            <CardBody className="flex flex-col justify-center gap-2 p-8">
              <p className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">{nextProject.eyebrow}</p>
              <CardTitle className="text-2xl">{nextProject.title}</CardTitle>
              <CardDescription>{nextProject.category}</CardDescription>
              <span className="mt-2 inline-flex items-center gap-1.5 text-body-sm font-medium text-(--text-brand)">
                Ver más
                <ArrowRight className="size-4 transition-transform duration-(--duration-fast) ease-(--ease-standard) group-hover/next:translate-x-1" aria-hidden="true" />
              </span>
            </CardBody>
          </div>
        </Card>
      </Reveal>
    </Container>
  );
}
