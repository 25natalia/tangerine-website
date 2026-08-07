"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";

// Por qué existe Tangerine — Volumen I, §03, citado literalmente. Vive en su
// propio componente cliente (en vez de inline en app/(marketing)/page.tsx,
// que es un Server Component dueño de `metadata`) porque necesita
// `useLanguage()` para el toggle ES/EN. Padding inferior recortado a
// propósito (py-24/32 simétrico daba ~192-256px de separación real hasta
// Filosofía, que también arranca con su propio padding superior) — el
// superior queda igual, relativo al Ticker de arriba.
export function HomeWhyExists() {
  const { t } = useLanguage();
  const copy = t.home.whyExists;

  return (
    <section>
      <Container size="content" className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            {copy.eyebrow}
          </p>
          <p className="mt-6 font-display text-2xl leading-snug font-semibold text-balance sm:text-3xl">
            {copy.title}
          </p>
          <p className="font-reading mt-6 max-w-2xl text-pretty text-(--text-secondary)">{copy.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
