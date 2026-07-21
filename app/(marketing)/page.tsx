import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardBody, CardDescription } from "@/components/ui/card";
import { Reveal, RevealGroup } from "@/components/templates/reveal";
import { HomeHero } from "@/components/home-hero";
import { capabilities } from "@/lib/capabilities";

// Seis creencias reales de Tangerine Studio (Brand OS, Volumen II —
// "Creencias"), citadas literalmente. No es contenido de placeholder.
const beliefs = [
  "La creatividad se aprende.",
  "La identidad vale más que la tendencia.",
  "La curiosidad precede a la innovación.",
  "El proceso importa tanto como el resultado.",
  "El miedo a equivocarse cuesta más que el error mismo.",
  "Nadie recuerda lo perfecto; recuerda lo verdadero.",
];

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

      {/* Filosofía — banda inversa, mismo patrón de énfasis que el Case
         Study Template usa para Challenge/Impact (fixed dark, independiente
         del tema activo de la página). */}
      <section className="bg-(--background-inverse) text-(--text-inverse)">
        <Container size="wide" className="py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="flex flex-col gap-6">
              <p className="font-display text-sm font-semibold tracking-wide text-(--tangerine-400) uppercase">
                Filosofía
              </p>
              <p className="font-display text-3xl font-bold text-balance sm:text-4xl">
                Las restricciones no limitan, revelan.
              </p>
              <p className="text-body-lg text-pretty text-(--neutral-300)">
                Un límite real, mirado de frente en vez de evitado, casi siempre esconde la
                mejor respuesta posible.
              </p>
            </Reveal>
            <RevealGroup className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {beliefs.map((belief, i) => (
                <div key={belief} className="flex gap-4">
                  <span className="font-display text-2xl font-bold text-(--tangerine-400)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-lg leading-snug font-medium text-balance">{belief}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Capabilities — preview de las 7, cada una linkea a su ancla real
         en /capabilities (Fase 4). */}
      <section className="border-t border-(--border-subtle)">
        <Container size="wide" className="py-24 sm:py-32">
          <Reveal className="mb-12 max-w-xl">
            <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
              Cómo trabajamos
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
              Siete formas distintas de aplicar la misma manera de pensar.
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <Card key={cap.slug} variant="outlined" interaction="clickable" href={`/capabilities#${cap.slug}`}>
                <CardHeader>
                  <CardTitle>{cap.name}</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardDescription>{cap.resolves}</CardDescription>
                </CardBody>
              </Card>
            ))}
          </RevealGroup>
          <div className="mt-10">
            <Button variant="outline" render={<Link href="/capabilities" />}>
              Ver todas las capacidades
            </Button>
          </div>
        </Container>
      </section>

      {/* Cierre — Misión, Volumen I, citado literalmente. */}
      <section className="border-t border-(--border-subtle)">
        <Container size="content" className="py-24 text-center sm:py-32">
          <Reveal>
            <p className="font-display text-2xl font-bold text-balance sm:text-3xl">
              La posibilidad de construir algo que nadie más podría haber construido de esa
              forma exacta.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="/work" />}>
                Ver el trabajo
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/contact" />}>
                Contacto
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
