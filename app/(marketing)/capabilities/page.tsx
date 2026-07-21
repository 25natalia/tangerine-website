import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { capabilities } from "@/lib/capabilities";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "No ofrecemos una lista de servicios sueltos. Ofrecemos capacidades: formas distintas de aplicar la misma manera de pensar a un problema distinto.",
  path: "/capabilities",
});

const kicker = "font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase";

export default function CapabilitiesPage() {
  return (
    <>
      <Container size="content" className="py-24 sm:py-32">
        <Reveal>
          <p className={kicker}>Capabilities</p>
          <h1 className="mt-6 font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
            No ofrecemos una lista de servicios sueltos.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-(--text-secondary)">
            Del tipo que cualquiera podría contratar por separado sin que se note la diferencia.
            Ofrecemos capacidades: formas distintas de aplicar la misma manera de pensar a un
            problema distinto.
          </p>
        </Reveal>
      </Container>

      <div className="border-t border-(--border-subtle)">
        {capabilities.map((cap, i) => (
          <section
            key={cap.slug}
            id={cap.slug}
            className="scroll-mt-20 border-b border-(--border-subtle)"
          >
            <Container size="wide" className="py-16 sm:py-20">
              <Reveal className="grid gap-8 lg:grid-cols-[6rem_1fr] lg:gap-12">
                <span className="font-display text-3xl font-bold text-(--text-brand)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-8">
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">{cap.name}</h2>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <p className={kicker}>Resuelve</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.resolves}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className={kicker}>Existe porque</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.existsBecause}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className={kicker}>Genera valor</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.generatesValue}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
