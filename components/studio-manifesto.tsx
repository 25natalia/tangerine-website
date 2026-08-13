'use client';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/templates/reveal';
import { useLanguage } from '@/lib/i18n/language-context';

const kicker = 'font-display text-sm font-semibold tracking-wide text-white/70 uppercase';

/**
 * Manifiesto — una card de marca a todo el ancho (verde sólido, texto
 * blanco). Mismo mecanismo full-bleed que `PortfolioHero`/`ContactHero`/
 * `StudioIntro` — `bg-(--green-600)`/`text-white` fijos (no
 * `bg-primary`/`text-primary-foreground`: esos tokens semánticos cambian con
 * el tema, y el pedido es que esta card no cambie con el modo oscuro),
 * `Container size="wide"` solo para el padding lateral — la sección en sí
 * no tiene max-width, así que el verde llega borde a borde. Mismo par
 * bg/fg que ya usa `HomeWhatWeCreate` para su categoría "Estrategia", así
 * que el contraste con blanco ya está validado en otra parte del sitio.
 *
 * Kicker, frase de apertura, tres párrafos de cuerpo, dos líneas de énfasis
 * cortas y un cierre — sin ningún elemento decorativo al lado (el cluster
 * de geometrías interactivo que vivió acá se sacó por completo).
 */
export function StudioManifesto() {
  const { t } = useLanguage();
  const copy = t.studio.manifesto;

  return (
    <section className="bg-(--green-600) text-white">
      <Container size="wide" className="relative py-20 sm:py-28">
        <Reveal className="flex max-w-2xl flex-col gap-6">
          <p className={kicker}>{copy.kicker}</p>
          <p className="font-display text-2xl leading-snug font-bold text-balance sm:text-3xl">{copy.lead}</p>

          <div className="font-reading flex flex-col gap-5 text-pretty text-white/85">
            {copy.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            {copy.emphasis.map((line, i) => (
              <p key={i} className="font-display text-lg leading-snug font-semibold text-balance sm:text-xl">
                {line}
              </p>
            ))}
          </div>

          <p className="font-reading text-pretty text-white/85">{copy.closing}</p>
        </Reveal>
      </Container>
    </section>
  );
}
