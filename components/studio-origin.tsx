"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";

const kicker = "font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase";

// Origen — ya no la cita literal del Volumen I, §02 (reemplazada por el
// texto real que Natalia dio para esta sección). Vive en su propio
// componente cliente (en vez de inline en app/(marketing)/studio/page.tsx,
// un Server Component dueño de `metadata`) porque necesita `useLanguage()`
// para el toggle ES/EN.
//
// Foto real (public/pictures/about-us.jpeg, 3024×4032 — se declara ese
// mismo ratio acá para que Next reserve el espacio correcto y evite layout
// shift, el propio `w-full h-auto` la escala) a la izquierda, texto a la
// derecha — dos columnas parejas en desktop (`md:grid-cols-2`), la imagen
// arriba y el texto abajo en mobile por orden natural del DOM, sin
// necesidad de `order-*`. `rounded-[28px]` es el mismo radio que ya usan
// las cards del sitio (ProcessCard, CategoryCard), no uno nuevo.
//
// `emphasis` (la línea corta "De ahí nació Tangerine.") queda con el mismo
// tratamiento tipográfico que `StudioManifesto` le da a su propia línea de
// énfasis — más grande, semibold, sin el gris secundario — para que lea
// como el quiebre entre "antes" y "después" que el propio texto marca. Ya
// no lleva su propio `max-w-2xl`: el ancho de la columna de texto ya la
// acota, compartir el corte con la imagen alcanza.
export function StudioOrigin() {
  const { t } = useLanguage();
  const copy = t.studio.origin;

  return (
    <section>
      <Container size="wide" className="py-20 sm:py-24">
        <div className="grid items-center gap-y-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          <div className="overflow-hidden rounded-[28px] shadow-(--shadow-elevation-2)">
            <Image
              src="/pictures/about-us.jpeg"
              alt={copy.imageAlt}
              width={756}
              height={1008}
              className="h-auto w-full object-cover"
            />
          </div>

          <Reveal className="flex flex-col gap-6 text-left">
            <p className={kicker}>{copy.kicker}</p>
            <p className="font-reading text-body-lg text-pretty">{copy.intro}</p>
            <p className="font-display text-lg font-semibold text-(--text-primary)">{copy.emphasis}</p>
            {copy.paragraphs.map((paragraph, i) => (
              <p key={i} className="font-reading text-pretty text-(--text-secondary)">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
