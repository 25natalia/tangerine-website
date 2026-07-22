import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { StudioIntro } from "@/components/studio-intro";
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
      <section className="border-t border-(--border-subtle)">
        <Container size="reading" className="py-20 sm:py-24">
          <Reveal className="flex flex-col gap-6">
            <p className={kicker}>Origen</p>
            <p className="text-body-lg text-pretty">
              Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas
              bien hechas y vacías. Interfaces perfectas sin ningún error, y sin ninguna huella.
              Identidades correctas, entregadas a tiempo, olvidadas apenas una semana después. Un
              oficio entero —el suyo— empezando a medirse por lo rápido que podía producir en vez
              de por lo verdadero que podía ser.
            </p>
            <p className="text-pretty text-(--text-secondary)">
              No fundaron un estudio para corregir eso. Fundaron un estudio porque no encontraron
              ningún lugar donde esa incomodidad tuviera espacio para convertirse en trabajo.
              Empezaron con lo que cualquiera empieza cuando no tiene nada más que una intuición:
              pocos recursos, ningún nombre conocido, y la certeza incómoda de que hacer las
              cosas del modo en que las venían viendo hacer no era una opción.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Manifiesto — Volumen I, §06, condensado a su arco esencial (apertura
         → tesis → dos líneas de énfasis que el propio texto ya destacaba
         tipográficamente). Cada frase es una cita literal; se redujo cuántas
         se incluyen, no se reescribió ninguna. */}
      <section className="border-t border-(--border-subtle)">
        <Container size="reading" className="py-20 sm:py-24">
          <Reveal className="flex flex-col gap-6">
            <p className={kicker}>Manifiesto</p>
            <p className="font-display text-xl leading-snug font-semibold text-balance sm:text-2xl">
              Hubo un tiempo, para cada persona que existe, en el que crear no pedía permiso.
            </p>
            <div className="flex flex-col gap-5 text-pretty text-(--text-secondary)">
              <p>
                Tangerine no cree que la creatividad sea un talento reservado para pocos. Cree
                que es una memoria compartida por todos, y que el trabajo de un lugar como este
                consiste, antes que nada, en ayudar a recordarla.
              </p>
              <p className="font-display text-lg font-semibold text-(--text-primary)">
                El mundo no necesita más cosas bonitas. Necesita más cosas que signifiquen algo.
              </p>
              <p className="text-(--text-primary)">
                Este es el punto exacto donde termina la reflexión y empieza el trabajo.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <StudioValues />
    </>
  );
}
