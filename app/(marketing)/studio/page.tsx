import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { StudioIntro } from "@/components/studio-intro";
import { StudioManifesto } from "@/components/studio-manifesto";
import { StudioValues } from "@/components/studio-values";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Studio",
  description:
    "Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas bien hechas y vacías.",
  path: "/studio",
});

const kicker = "font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase";

export default function StudioPage() {
  return (
    <>
      <StudioIntro />

      {/* Origen — Volumen I, §02 */}
      <section>
        <Container size="reading" className="py-20 sm:py-24">
          <Reveal className="flex flex-col gap-6">
            <p className={kicker}>Origen</p>
            <p className="font-reading text-body-lg text-pretty">
              Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas
              bien hechas y vacías. Interfaces perfectas sin ningún error, y sin ninguna huella.
              Identidades correctas, entregadas a tiempo, olvidadas apenas una semana después. Un
              oficio entero —el suyo— empezando a medirse por lo rápido que podía producir en vez
              de por lo verdadero que podía ser.
            </p>
            <p className="font-reading text-pretty text-(--text-secondary)">
              No fundaron un estudio para corregir eso. Fundaron un estudio porque no encontraron
              ningún lugar donde esa incomodidad tuviera espacio para convertirse en trabajo.
              Empezaron con lo que cualquiera empieza cuando no tiene nada más que una intuición:
              pocos recursos, ningún nombre conocido, y la certeza incómoda de que hacer las
              cosas del modo en que las venían viendo hacer no era una opción.
            </p>
          </Reveal>
        </Container>
      </section>

      <StudioManifesto />

      <StudioValues />
    </>
  );
}
