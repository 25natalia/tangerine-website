"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { buttonVariants } from "@/components/ui/button";
import { VisualBlock } from "@/components/templates/shared/visual-block";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/lib/templates/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The protagonist — always `projects[0]` (see PortfolioTemplate), never a
 * `featured: true` flag scattered across the array. One clear, unambiguous
 * source for "which project leads" beats a boolean that two projects could
 * accidentally both carry.
 *
 * A full-bleed image with the info overlaid at the bottom, not a card
 * beside a text column — the magazine-cover treatment the brief asked for
 * ("casi como un artículo de revista"), and the one place in this template
 * that earns a genuinely different composition from every ProjectCard
 * below it.
 */
export function FeaturedProject({ project }: { project: PortfolioProject }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <Container size="wide" className="py-16 sm:py-20">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <a
          href={project.href ?? "#"}
          className="group/featured relative block overflow-hidden rounded-(--radius-overlay) border border-(--border-subtle) shadow-(--shadow-elevation-2)"
        >
          <div className="overflow-hidden">
            {project.coverVideo ? (
              <VisualBlock
                video={project.coverVideo}
                className="aspect-[21/9] w-full transition-transform duration-(--duration-slower) ease-(--ease-standard) group-hover/featured:scale-[1.03] sm:aspect-[21/8]"
              />
            ) : (
              <VisualBlock
                pattern={project.pattern}
                accent={project.accent}
                animate
                className="aspect-[21/9] w-full transition-transform duration-(--duration-slower) ease-(--ease-standard) group-hover/featured:scale-[1.03] sm:aspect-[21/8]"
              />
            )}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{project.category}</Badge>
              <span className="text-body-sm text-white/80">{project.client}</span>
              <span aria-hidden="true" className="text-white/50">·</span>
              <span className="text-body-sm text-white/80">{project.year}</span>
            </div>
            <h2 className="font-display max-w-3xl text-3xl leading-[1.1] font-bold text-balance text-white sm:text-5xl">
              {project.title}
            </h2>
            <p className="text-body-sm max-w-xl text-pretty text-white/75 sm:text-body-lg">{project.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <span
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group-hover/featured:shadow-(--shadow-elevation-4) pointer-events-none bg-white text-(--purple-700) shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-base) hover:bg-white"
                )}
              >
                Explore Project
                <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/featured:translate-x-0.5 group-hover/featured:-translate-y-0.5" aria-hidden="true" />
              </span>
              <div className="hidden flex-wrap gap-1.5 sm:flex">
                {project.services.slice(0, 3).map((s) => (
                  <Chip key={s} className="border-white/20 bg-white/10 text-white">
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </Container>
  );
}
