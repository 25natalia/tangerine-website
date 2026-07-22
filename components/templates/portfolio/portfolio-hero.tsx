"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { PortfolioData } from "@/lib/templates/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A dedicated Hero, not the Home page's — the brief is explicit about this,
 * and the two have genuinely different jobs: Home's Hero introduces the
 * Design System itself (mascot, product framing); this one introduces a
 * body of work and needs to get out of the way fast, since the gallery
 * below is the actual point of the page. Exactly 3 stats, on purpose —
 * more starts reading as a dashboard, not an editorial opener.
 */
export function PortfolioHero({ data }: { data: PortfolioData }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <header>
      <Container size="wide" className="pt-6 pb-16 sm:pt-8 sm:pb-24">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.eyebrow}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-8 max-w-4xl sm:mt-10"
        >
          <h1 className="font-display text-4xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
            {data.title}
          </h1>
          <p className="text-body-lg mt-6 max-w-2xl text-pretty text-(--text-secondary)">{data.subtitle}</p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6 sm:mt-16"
        >
          {data.heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="font-display text-3xl font-bold text-(--text-primary) sm:text-4xl">{stat.value}</span>
              <span className="text-caption tracking-wide text-(--text-tertiary) uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </header>
  );
}
