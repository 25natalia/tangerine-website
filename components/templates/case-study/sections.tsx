"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check, Quote } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardTitle, CardBody, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MockupFrame } from "@/components/patterns/pattern-mockup";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import type { CaseStudyData, CaseStudyMockupKind, CaseStudyVisualColor } from "@/lib/templates/case-study";
import { VisualBlock } from "@/components/templates/shared/visual-block";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades/rises into place once, the moment it scrolls into view — the only scroll motion this template uses, applied consistently instead of a different effect per section. */
function Reveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  eyebrowColor,
  eyebrowAccent,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Override del morado genérico — p. ej. "El sistema" usa el color real del proyecto en vez del morado de marca del sitio. */
  eyebrowColor?: string;
  /** Punto chico junto al eyebrow en un segundo color real del proyecto. */
  eyebrowAccent?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl sm:mb-14">
      <p
        className="text-overline flex items-center gap-2 text-(--text-brand) uppercase"
        style={eyebrowColor ? { color: eyebrowColor } : undefined}
      >
        {eyebrowAccent ? <span aria-hidden="true" className="inline-block size-2 shrink-0 rounded-full" style={{ background: eyebrowAccent }} /> : null}
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
      {description ? <p className="font-reading mt-4 text-lg text-pretty text-(--text-secondary)">{description}</p> : null}
    </Reveal>
  );
}

/* ================= HERO ================= */

export function CaseStudyHero({ data }: { data: CaseStudyData }) {
  const reduceMotion = usePrefersReducedMotion();
  const { t } = useLanguage();
  const copy = t.caseStudy;
  return (
    <header className="relative">
      <Container size="wide" className="pt-6 pb-10 sm:pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{copy.breadcrumbHome}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/work">{copy.breadcrumbWork}</BreadcrumbLink>
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
          className="mt-8 flex flex-col gap-5 sm:mt-10"
        >
          <div className="flex flex-col gap-4">
            <h1 className="font-display max-w-4xl text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
              {data.client}
            </h1>
            {data.intent ? (
              <p className="font-reading max-w-2xl text-body-lg text-pretty text-(--text-secondary)">{data.intent}</p>
            ) : null}
          </div>

          {/* Ficha técnica — chica, en fila, secundaria frente al proyecto (no una grilla que ocupe todo el ancho). */}
          <div className="flex flex-wrap gap-2">
            <Card variant="outlined" className="border-(--border-strong) bg-transparent shadow-none">
              <CardBody className="gap-0.5 p-2.5">
                <p className="text-caption font-bold text-(--text-tertiary)">{copy.servicesLabel}</p>
                <p className="text-caption font-medium text-(--text-secondary)">{data.services.join(", ")}</p>
              </CardBody>
            </Card>
            {data.info.map((item) => (
              <Card key={item.label} variant="outlined" className="border-(--border-strong) bg-transparent shadow-none">
                <CardBody className="gap-0.5 p-2.5">
                  <p className="text-caption font-bold text-(--text-tertiary)">{item.label}</p>
                  <p className="text-caption font-medium text-(--text-secondary)">{item.value}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {data.liveUrl ? (
            <div>
              <a href={data.liveUrl} className={cn(buttonVariants({ size: "lg" }), "group/cta")}>
                {copy.visitProjectCta}
                <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </motion.div>
      </Container>

      {/* La imagen protagonista — imagen o video real del proyecto cuando existe (imagen tiene prioridad
          sobre video cuando ambos están), patrón de marca como respaldo honesto cuando no hay ninguno.
          Card contenida, no de lado a lado. */}
      <Container size="wide" className="mt-8 sm:mt-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="overflow-hidden rounded-(--radius-container) border border-(--border-subtle)"
        >
          {data.heroImage ? (
            <VisualBlock image={data.heroImage} priority className="aspect-[16/9] w-full" />
          ) : data.bannerVideo ? (
            <VisualBlock video={data.bannerVideo} className="aspect-[16/9] w-full" />
          ) : (
            <VisualBlock pattern={data.heroPattern} accent={data.accent} animate className="aspect-[16/9] w-full" />
          )}
        </motion.div>
      </Container>
    </header>
  );
}

/* ================= SUMMARY ================= */

export function CaseStudySummary({ summary }: { summary: string[] }) {
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal className="flex max-w-3xl flex-col gap-6">
        {summary.map((p, i) => (
          <p key={i} className="font-reading text-body-lg text-pretty leading-relaxed text-(--text-secondary)">
            {p}
          </p>
        ))}
      </Reveal>
    </Container>
  );
}

/* ================= CHALLENGE (card, color propio del proyecto) ================= */

export function CaseStudyChallenge({ title, body, color }: { title: string; body: string[]; color: string }) {
  const { t } = useLanguage();
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal
        className="flex flex-col gap-5 rounded-(--radius-container) p-8 text-white sm:p-12 lg:p-16"
        style={{ background: color }}
      >
        <p className="text-overline text-white/70 uppercase">{t.caseStudy.challenge.eyebrow}</p>
        <h2 className="font-display max-w-3xl text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
        <div className="flex max-w-3xl flex-col gap-5">
          {body.map((p, i) => (
            <p key={i} className="font-reading text-body-lg text-pretty text-white/85">{p}</p>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}

/* ================= OBJECTIVES ================= */

export function CaseStudyObjectives({ objectives, accentColor }: { objectives: string[]; accentColor?: string }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.objectives;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} eyebrowColor={accentColor} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {objectives.map((o, i) => (
          <Reveal key={o} delay={i * 0.05} className="h-full">
            <div className="flex h-full min-h-24 items-start gap-3 rounded-(--radius-container) border border-(--border-subtle) p-5">
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-(--background-brand-subtle) text-(--icon-brand)"
                style={accentColor ? { background: `${accentColor}1A`, color: accentColor } : undefined}
              >
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

/* ================= PROCESS (secuencia editorial, no cards parejas) ================= */

export function CaseStudyProcess({
  process,
  label,
  accentColor,
}: {
  process: CaseStudyData["process"];
  label?: CaseStudyData["processLabel"];
  accentColor?: string;
}) {
  const { t } = useLanguage();
  const copy = t.caseStudy.process;
  if (!process) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={label?.eyebrow ?? copy.eyebrow} title={label?.title ?? copy.title} eyebrowColor={accentColor} />
      <div className="flex flex-col">
        {process.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="flex flex-col gap-4 border-t border-(--border-subtle) py-8 sm:flex-row sm:items-start sm:gap-10 first:border-t-0 first:pt-0">
              <div className="sm:w-48 sm:shrink-0">
                <span className="font-display text-4xl font-bold text-(--border-strong) sm:text-5xl">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold sm:text-2xl">{step.title}</h3>
                <p className="font-reading max-w-xl text-body-lg text-pretty text-(--text-secondary)">{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ================= RESEARCH ================= */

export function CaseStudyResearch({ research, accentColor }: { research: CaseStudyData["research"]; accentColor?: string }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.research;
  if (!research) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading
        eyebrow={research.eyebrow ?? copy.eyebrow}
        title={research.title ?? copy.title}
        description={research.intro}
        eyebrowColor={accentColor}
      />
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

export function CaseStudyPrinciples({ principles, accentColor }: { principles: CaseStudyData["principles"]; accentColor?: string }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.principles;
  if (!principles) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} eyebrowColor={accentColor} />
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

/* ================= VISUAL IDENTITY (cards de color + marcas/tipografía/patrones reales, sin video de paleta) ================= */

/** Busca el color "primario" y un segundo color de acento real dentro de la paleta del proyecto —
 * así "El sistema" usa los colores reales del proyecto (verde y naranja en QuickBite, lo que sea
 * en cada uno de los demás) en vez del morado genérico de marca del sitio. */
function pickIdentityAccentDot(colors: CaseStudyVisualColor[]) {
  const primary = colors.find((c) => /primari/i.test(c.role)) ?? colors[0];
  const accent = colors.find((c) => /acent|complement/i.test(c.role) && c.hex !== primary?.hex) ?? colors[1];
  return accent?.hex;
}

export function CaseStudyVisualIdentity({
  data,
  accentColor,
}: {
  data: NonNullable<CaseStudyData["visualIdentity"]>;
  accentColor?: string;
}) {
  const { t } = useLanguage();
  const copy = t.caseStudy.visualIdentity;
  const accentDot = pickIdentityAccentDot(data.colors);
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading
        eyebrow={data.eyebrow ?? copy.eyebrow}
        title={data.title ?? copy.title}
        description={data.intro}
        eyebrowColor={accentColor}
        eyebrowAccent={accentDot}
      />
      {data.colors.length > 0 ? (
        <Reveal className="flex gap-2 sm:gap-3">
          {data.colors.map((color) => (
            <div key={color.hex} className="min-w-0 flex-1 overflow-hidden rounded-(--radius-container) border border-(--border-subtle)">
              <div className="aspect-[4/3] w-full" style={{ background: color.hex }} />
              <div className="p-2 sm:p-3">
                <p className="hidden text-caption text-(--text-tertiary) sm:block">{color.role}</p>
                <p className="truncate text-body-sm font-semibold">{color.name}</p>
                <p className="hidden text-caption text-(--text-tertiary) uppercase sm:block">{color.hex}</p>
              </div>
            </div>
          ))}
        </Reveal>
      ) : null}
      {data.marks && data.marks.length > 0 ? (
        <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" delay={0.1}>
          {data.marks.map((mark) => (
            <div key={mark.src} className="overflow-hidden rounded-(--radius-container) border border-(--border-subtle) bg-white">
              <img
                src={mark.src}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn("aspect-square w-full", mark.fit === "contain" ? "object-contain p-6" : "object-cover")}
              />
              <p className="border-t border-(--border-subtle) p-3 text-caption text-(--text-tertiary)">{mark.label}</p>
            </div>
          ))}
        </Reveal>
      ) : null}
      {data.typography.length > 0 ? (
        <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" delay={0.15}>
          {data.typography.map((type) =>
            type.image ? (
              // Fondo blanco fijo: el specimen trae su propio color de marca "horneado" en la
              // imagen (a veces oscuro, como los tipográficos de QuickBite) — igual que los logos
              // de `marks`, necesita una superficie clara constante para leerse en dark mode.
              <div key={type.role} className="overflow-hidden rounded-(--radius-container) border border-(--border-subtle) bg-white">
                <div className="p-8">
                  <img src={type.image} alt="" loading="lazy" decoding="async" className="h-28 w-auto" />
                </div>
                <div className="border-t border-(--border-subtle) p-4">
                  {/* --neutral-1000, no --text-primary: esta tarjeta fuerza fondo blanco fijo, así
                      que el texto también debe ser un negro fijo — --text-primary se invierte a
                      casi blanco en dark mode y quedaría ilegible sobre esta misma superficie. */}
                  <p className="text-body-sm font-semibold text-(--neutral-1000)">{type.role}</p>
                  <p className="text-caption text-(--text-tertiary)">{type.family}</p>
                </div>
              </div>
            ) : (
              <div key={type.role} className="rounded-(--radius-container) border border-(--border-subtle) p-8">
                <span className="font-display block text-5xl">{type.sample}</span>
                <p className="mt-4 text-body-sm font-semibold">{type.role}</p>
                <p className="text-caption text-(--text-tertiary)">{type.family}</p>
              </div>
            ),
          )}
        </Reveal>
      ) : null}
      {data.patterns && data.patterns.length > 0 ? (
        <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" delay={0.2}>
          {data.patterns.map((p) => (
            <figure key={p.src} className="overflow-hidden rounded-(--radius-container) border border-(--border-subtle)">
              <img src={p.src} alt="" loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
              <figcaption className="p-3 text-caption text-(--text-tertiary)">{p.label}</figcaption>
            </figure>
          ))}
        </Reveal>
      ) : null}
      {data.identityMockups && data.identityMockups.length > 0 ? (
        <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" delay={0.25}>
          {data.identityMockups.map((mockup) => (
            <figure key={mockup.src} className="overflow-hidden rounded-(--radius-container) border border-(--border-subtle)">
              <img
                src={mockup.src}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn("aspect-square w-full", mockup.fit === "contain" ? "object-contain" : "object-cover")}
              />
              <figcaption className="p-3 text-caption text-(--text-tertiary)">{mockup.label}</figcaption>
            </figure>
          ))}
        </Reveal>
      ) : null}
    </Container>
  );
}

/* ================= BRIDGE (marca → experiencia, solo branding+web) ================= */

/** Mismo lenguaje visual que `CaseStudyOutcome` — tipografía grande, sin card —
 * para el puente entre identidad y producto digital que solo tiene sentido en
 * proyectos que son las dos cosas (QuickBite, Margarita Burgos). */
export function CaseStudyBridge({ bridge, accentColor }: { bridge?: string; accentColor?: string }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.bridge;
  if (!bridge) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal className="max-w-3xl">
        <p className="text-overline text-(--text-brand) uppercase" style={accentColor ? { color: accentColor } : undefined}>{copy.eyebrow}</p>
        <p className="font-display mt-4 text-2xl leading-snug text-balance sm:text-3xl">{bridge}</p>
      </Reveal>
    </Container>
  );
}

/* ================= GALLERY (1 grande + medianas — ritmo editorial, no grid parejo) ================= */

export function CaseStudyGallery({
  gallery,
  label,
  accentColor,
}: {
  gallery: CaseStudyData["gallery"];
  label?: CaseStudyData["galleryLabel"];
  accentColor?: string;
}) {
  const { t } = useLanguage();
  const copy = t.caseStudy.gallery;
  if (!gallery || gallery.length === 0) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={label?.eyebrow ?? copy.eyebrow} title={label?.title ?? copy.title} eyebrowColor={accentColor} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {gallery.map((item, i) => (
          <Reveal key={item.caption} delay={i * 0.05} className={i === 0 ? "sm:col-span-2" : undefined}>
            <figure className="group/gallery overflow-hidden rounded-(--radius-container) border border-(--border-subtle)">
              <div className="overflow-hidden">
                {item.video ? (
                  <VisualBlock
                    video={item.video}
                    className={cn("w-full transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover/gallery:scale-105", i === 0 ? "aspect-[16/7]" : "aspect-[4/3]")}
                  />
                ) : item.image ? (
                  <VisualBlock
                    image={item.image}
                    fit={item.fit}
                    className={cn("w-full bg-white transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover/gallery:scale-105", i === 0 ? "aspect-[16/7]" : "aspect-[4/3]")}
                  />
                ) : (
                  <VisualBlock
                    pattern={item.pattern ?? "flor"}
                    accent={item.accent}
                    className={cn("w-full transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover/gallery:scale-105", i === 0 ? "aspect-[16/7]" : "aspect-[4/3]")}
                  />
                )}
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

const mockupFrameClassName: Record<CaseStudyMockupKind, string> = {
  desktop: "aspect-video w-full",
  tablet: "aspect-[4/3] w-64",
  mobile: "aspect-[9/19] w-40",
  branding: "aspect-[1.75/1] w-56",
  merch: "aspect-square w-40",
  packaging: "aspect-square w-40",
};

export function CaseStudyMockups({ mockups, data }: { mockups: CaseStudyMockupKind[]; data: CaseStudyData }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.mockups;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <Reveal className="flex flex-wrap items-end gap-8">
        {mockups.map((kind, i) => {
          const config = { label: copy.labels[kind], frameClassName: mockupFrameClassName[kind] };
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
  const { t } = useLanguage();
  const copy = t.caseStudy.components;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
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

export function CaseStudyBeforeAfter({
  beforeAfter,
  accentColor,
}: {
  beforeAfter: NonNullable<CaseStudyData["beforeAfter"]>;
  accentColor?: string;
}) {
  const { t } = useLanguage();
  const copy = t.caseStudy.beforeAfter;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} eyebrowColor={accentColor} />
      <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-(--radius-container) border border-(--border-subtle) bg-(--background-subtle) p-8">
          <p className="text-overline text-(--text-tertiary) uppercase">{beforeAfter.before.label}</p>
          <p className="font-reading mt-3 text-body-lg text-(--text-secondary)">{beforeAfter.before.description}</p>
        </div>
        <div
          className="rounded-(--radius-container) border border-(--border-brand) bg-(--background-brand-subtle) p-8"
          style={accentColor ? { borderColor: accentColor, background: `${accentColor}14` } : undefined}
        >
          <p className="text-overline text-(--text-brand) uppercase" style={accentColor ? { color: accentColor } : undefined}>
            {beforeAfter.after.label}
          </p>
          <p className="font-reading mt-3 text-body-lg text-(--text-primary)">{beforeAfter.after.description}</p>
        </div>
      </Reveal>
    </Container>
  );
}

/* ================= OUTCOME (cierre cualitativo, sin card — solo tipografía) ================= */

export function CaseStudyOutcome({ outcome, accentColor }: { outcome?: string; accentColor?: string }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.outcome;
  if (!outcome) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal className="max-w-3xl">
        <p className="text-overline text-(--text-brand) uppercase" style={accentColor ? { color: accentColor } : undefined}>{copy.eyebrow}</p>
        <p className="font-display mt-4 text-2xl leading-snug text-balance sm:text-3xl">{outcome}</p>
      </Reveal>
    </Container>
  );
}

/* ================= IMPACT (inverse band, stat tiles) ================= */

export function CaseStudyImpact({ impact }: { impact: CaseStudyData["impact"] }) {
  const { t } = useLanguage();
  const copy = t.caseStudy.impact;
  if (!impact) return null;
  return (
    <section className="bg-(--neutral-1000) text-(--neutral-0)">
      <Container size="wide" className="py-20 sm:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-overline text-(--tangerine-400) uppercase">{copy.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">{copy.title}</h2>
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

export function CaseStudyLearnings({
  learnings,
  label,
  accentColor,
}: {
  learnings: CaseStudyData["learnings"];
  label?: CaseStudyData["learningsLabel"];
  accentColor?: string;
}) {
  const { t } = useLanguage();
  const copy = t.caseStudy.learnings;
  if (!learnings) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <SectionHeading eyebrow={label?.eyebrow ?? copy.eyebrow} title={label?.title ?? copy.title} eyebrowColor={accentColor} />
      <div className="flex max-w-3xl flex-col gap-8">
        {learnings.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.05} className="flex flex-col gap-2">
            <h3 className="font-display text-xl font-bold text-balance sm:text-2xl">{l.title}</h3>
            <p className="font-reading text-body-lg text-pretty text-(--text-secondary)">{l.description}</p>
          </Reveal>
        ))}
      </div>
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

export function CaseStudyLiveSite({ data, accentColor }: { data: CaseStudyData; accentColor?: string }) {
  const { t } = useLanguage();
  const copy = t.caseStudy;
  if (!data.liveSite || !data.liveUrl) return null;
  return (
    <Container size="wide" className="py-20 sm:py-28">
      <Reveal>
        <Card variant="flat" className="flex flex-col items-start gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div className="max-w-xl">
            <p className="text-overline text-(--text-brand) uppercase" style={accentColor ? { color: accentColor } : undefined}>{copy.liveSiteEyebrow}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-balance sm:text-4xl">{data.liveSite.title}</h2>
            <p className="mt-4 text-body-lg text-pretty text-(--text-secondary)">{data.liveSite.description}</p>
          </div>
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "group/cta shrink-0")}
          >
            {copy.liveSiteCta}
            <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Card>
      </Reveal>
    </Container>
  );
}

/* ================= NEXT PROJECT ================= */

export function CaseStudyNextProject({ nextProject }: { nextProject: NonNullable<CaseStudyData["nextProject"]> }) {
  const { t } = useLanguage();
  return (
    <Container size="wide" className="pb-20 sm:pb-28">
      {/* `interaction="interactive"` (no `href`) en vez de `clickable`+`href`: la Card ported
          renderiza un `<a>` plano en modo `href` — envolviéndola en `next/link` acá afuera se gana
          navegación cliente + prefetch real entre case studies (el recorrido "siguiente proyecto"
          que más se encadena), sin tocar el componente ported. Mismas clases de hover, ya que
          "interactive" cae en los mismos `compoundVariants` que "clickable". */}
      <Reveal>
        <Link href={nextProject.href} className="block">
          <Card variant="outlined" interaction="interactive" className="group/next overflow-hidden">
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
                  {t.caseStudy.nextProjectCta}
                  <ArrowRight className="size-4 transition-transform duration-(--duration-fast) ease-(--ease-standard) group-hover/next:translate-x-1" aria-hidden="true" />
                </span>
              </CardBody>
            </div>
          </Card>
        </Link>
      </Reveal>
    </Container>
  );
}
