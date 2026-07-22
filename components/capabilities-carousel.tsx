"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";
import { Mascot } from "@/components/ui/mascot";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { capabilities, type Capability } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

const kicker = "font-display text-xs font-semibold tracking-wide uppercase opacity-70";

// Una combinación de color distinta por capability — nunca dos seguidas
// iguales — usando tokens reales del DS. "Cream" se resolvió como
// --gold-50 (el tono cálido y claro más cercano que existe); el DS no tiene
// un primitivo "cream" propio.
const styleBySlug: Record<string, { bg: string; fg: string }> = {
  "brand-systems": { bg: "bg-primary", fg: "text-primary-foreground" },
  "digital-experiences": { bg: "bg-(--tangerine-500)", fg: "text-white" },
  "product-design": { bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)" },
  "creative-direction": { bg: "bg-(--purple-800)", fg: "text-white" },
  "content-systems": { bg: "bg-(--info-600)", fg: "text-white" },
  growth: { bg: "bg-(--gold-50)", fg: "text-(--neutral-1000)" },
  automation: { bg: "bg-(--green-600)", fg: "text-white" },
};

// Cada capability con una ilustración distinta del universo Tangerine —
// mascota donde tiene sentido narrativo (Brand Systems, Creative Direction:
// las dos capacidades más "de identidad"), geometry/deco en el resto, sin
// repetir ningún archivo.
function CapabilityIllustration({ slug }: { slug: string }) {
  switch (slug) {
    case "brand-systems":
      return <Mascot variant="default" alt="" className="w-40 sm:w-48" />;
    case "creative-direction":
      return <Mascot variant="2" alt="" className="w-40 sm:w-48" />;
    case "digital-experiences":
      return <Image src="/illustrations/deco/window-tangerine-lime.svg" alt="" width={500} height={500} className="w-32 sm:w-40" />;
    case "product-design":
      return <Image src="/illustrations/geometry/leaf-orange.svg" alt="" width={130} height={123} className="w-24 sm:w-28" />;
    case "content-systems":
      return <Image src="/illustrations/geometry/semillas-yellow.svg" alt="" width={174} height={174} className="w-24 sm:w-28" />;
    case "growth":
      return <Image src="/illustrations/geometry/destello-orange.svg" alt="" width={180} height={180} className="w-24 sm:w-28" />;
    case "automation":
      return <Image src="/illustrations/deco/star-violet.svg" alt="" width={130} height={130} className="w-20 sm:w-24" />;
    default:
      return null;
  }
}

function CapabilityCard({ cap, index }: { cap: Capability; index: number }) {
  const style = styleBySlug[cap.slug];
  return (
    <div
      className={cn(
        "relative isolate flex min-h-[28rem] flex-col justify-center gap-10 overflow-hidden rounded-(--radius-container) p-8 sm:p-12 lg:flex-row lg:items-center lg:gap-16 lg:p-16",
        style.bg,
        style.fg
      )}
    >
      <div className="relative z-[1] flex max-w-xl flex-col gap-6">
        <span className={kicker}>
          Capability {String(index + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
        </span>
        <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">{cap.name}</h2>
        <p className="text-body-lg text-pretty opacity-90">{cap.resolves}</p>
        <div className="mt-2 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <p className={kicker}>Existe porque</p>
            <p className="text-pretty opacity-80">{cap.existsBecause}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={kicker}>Genera valor</p>
            <p className="text-pretty opacity-80">{cap.generatesValue}</p>
          </div>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center justify-center lg:ml-auto">
        <FloatingElement floatY={8} floatDuration={5 + (index % 3)} floatRotate={4} repelStrength={0.9}>
          <CapabilityIllustration slug={cap.slug} />
        </FloatingElement>
      </div>
    </div>
  );
}

export function CapabilitiesCarousel() {
  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-12 max-w-xl sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            Siete capacidades
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            La misma manera de pensar, aplicada a un problema distinto cada vez.
          </h2>
        </Reveal>

        {/* El ancho de la card (75-85%) se aplica en este wrapper, no vía
           `slideClassName` — las flechas del Carousel se posicionan
           relativas a su elemento raíz, no al viewport que `slideClassName`
           dimensiona, así que envolver el Carousel es lo que hace que las
           flechas terminen pegadas a los bordes de la card en vez de a los
           del Container completo. */}
        <div className="mx-auto w-[78%] sm:w-[82%] lg:w-[85%]">
          <Carousel
            aria-label="Capacidades de Tangerine Studio"
            autoplay
            autoplayInterval={7000}
            slides={capabilities.map((cap, i) => (
              <CapabilityCard key={cap.slug} cap={cap} index={i} />
            ))}
          />
        </div>
      </Container>
    </section>
  );
}
