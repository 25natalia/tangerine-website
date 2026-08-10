"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";

const kicker = "font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase";

// Origen — Volumen I, §02. Vive en su propio componente cliente (en vez de
// inline en app/(marketing)/studio/page.tsx, un Server Component dueño de
// `metadata`) porque necesita `useLanguage()` para el toggle ES/EN.
//
// Mismo wrapper que `StudioManifesto` (`mx-auto max-w-3xl`, el mismo ancho
// exacto) — las dos secciones de texto de /studio comparten una sola
// columna central angosta, mismo borde izquierdo.
export function StudioOrigin() {
  const { t } = useLanguage();
  const copy = t.studio.origin;

  return (
    <section>
      <Container size="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="flex flex-col gap-6">
            <p className={kicker}>{copy.kicker}</p>
            <p className="font-reading text-body-lg text-pretty">{copy.body1}</p>
            <p className="font-reading text-pretty text-(--text-secondary)">{copy.body2}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
