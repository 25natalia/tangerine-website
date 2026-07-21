import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { HomeHero } from "@/components/home-hero";
import { HomePhilosophy } from "@/components/home-philosophy";
import { HomeProcess } from "@/components/home-process";
import { HomeFaq } from "@/components/home-faq";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Tangerine Studio",
  description:
    "Ayudamos a que las cosas, y las personas, recuerden cómo ser exactamente lo que son. No vendemos diseño. Construimos identidad.",
  path: "/",
  titleAbsolute: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Por qué existe Tangerine — Volumen I, §03, citado literalmente. */}
      <section>
        <Container size="content" className="py-24 sm:py-32">
          <Reveal>
            <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
              Por qué existe
            </p>
            <p className="mt-6 font-display text-2xl leading-snug font-semibold text-balance sm:text-3xl">
              Porque el mundo tiene, cada vez más, marcas y personas que funcionan perfecto y
              dicen cada vez menos. Esa es la respuesta completa.
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-(--text-secondary)">
              No existe Tangerine para hacer branding, ni diseño, ni contenido. Esos son, hoy,
              los oficios a través de los cuales se ejerce algo más antiguo: la convicción de que
              cualquier persona o cualquier marca, si se le da el espacio y el criterio
              necesarios, puede recuperar una identidad que le pertenezca de un modo que ninguna
              otra pueda reclamar.
            </p>
          </Reveal>
        </Container>
      </section>

      <HomePhilosophy />
      <HomeProcess />
      <HomeFaq />

      {/* Cierre — Misión, Volumen I, citado literalmente. */}
      <section className="border-t border-(--border-subtle)">
        <Container size="content" className="py-24 text-center sm:py-32">
          <Reveal>
            <p className="font-display text-2xl font-bold text-balance sm:text-3xl">
              La posibilidad de construir algo que nadie más podría haber construido de esa
              forma exacta.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/work" className={cn(buttonVariants({ size: "lg" }))}>
                Ver el trabajo
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                Contacto
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
