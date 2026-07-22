import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { HomeHero } from "@/components/home-hero";
import { HomeTicker } from "@/components/home-ticker";
import { HomePhilosophy } from "@/components/home-philosophy";
import { HomeProcess } from "@/components/home-process";
import { HomeFaq } from "@/components/home-faq";
import { HomeClosing } from "@/components/home-closing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tangerine Studio",
  description:
    "Construimos marcas que no podrían pertenecerle a nadie más. No vendemos diseño. Construimos identidad.",
  path: "/",
  titleAbsolute: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeTicker />

      {/* Por qué existe Tangerine — Volumen I, §03, citado literalmente.
         Padding inferior recortado a propósito (py-24/32 simétrico daba
         ~192-256px de separación real hasta Filosofía, que también arranca
         con su propio padding superior) — el superior queda igual, relativo
         al Ticker de arriba. */}
      <section>
        <Container size="content" className="pt-24 pb-16 sm:pt-32 sm:pb-20">
          <Reveal>
            <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
              Por qué existe
            </p>
            <p className="mt-6 font-display text-2xl leading-snug font-semibold text-balance sm:text-3xl">
              Porque el mundo tiene, cada vez más, marcas y personas que funcionan perfecto y
              dicen cada vez menos. Esa es la respuesta completa.
            </p>
            <p className="font-reading mt-6 max-w-2xl text-pretty text-(--text-secondary)">
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
      <HomeClosing />
    </>
  );
}
