"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/**
 * Word → colored square → word → colored square, recuperando el lenguaje
 * visual original de `ticker.svg` (banda lima + bloques de color con una
 * geometría centrada) en vez del separador "✦" de texto que tenía la
 * iteración anterior. Los 8 pares bg/ícono ciclan por índice — mismo índice,
 * mismo color+forma en ES y en EN, ya que ambos diccionarios tienen
 * exactamente 8 palabras en el mismo orden conceptual. Todos los íconos son
 * SVGs que ya existen en `public/illustrations/` (los mismos usados en el
 * Hero/HomeFaq/HomeClosing) — ninguno nuevo.
 */
const tickerStyle = [
  { bg: "bg-(--purple-600)", icon: "/illustrations/geometry/destello-yellow.svg" },
  { bg: "bg-(--tangerine-500)", icon: "/illustrations/geometry/flor-lime.svg" },
  { bg: "bg-(--green-600)", icon: "/illustrations/deco/star-violet.svg" },
  { bg: "bg-(--info-600)", icon: "/illustrations/geometry/hoja-orange.svg" },
  { bg: "bg-(--gold-400)", icon: "/illustrations/geometry/spring-violet.svg" },
  { bg: "bg-(--purple-600)", icon: "/illustrations/geometry/semillas-yellow.svg" },
  { bg: "bg-(--tangerine-500)", icon: "/illustrations/geometry/leaf-green.svg" },
  { bg: "bg-(--green-600)", icon: "/illustrations/geometry/destello-violet.svg" },
];

// Cuántas veces se repite el set base de palabras ANTES de duplicar para el
// loop — no es density visual, es garantía de ancho: con solo 8 palabras el
// truco estándar de "duplicar una vez y desplazar -50%" se queda corto en
// pantallas anchas (2560px+), porque una sola pasada de contenido no llega a
// cubrir la mitad del viewport — ahí es donde aparecía el hueco vacío que se
// pidió eliminar. Repetir el set base 3 veces antes de duplicar asegura que
// cada "copia" (la unidad que se desplaza -50%) sea más ancha que cualquier
// viewport razonable, sin tocar el keyframe `ticker-scroll` compartido
// (mismo mecanismo que `FooterTicker`, 0% → -50%, ya en globals.css).
const REPEAT = 3;

function TickerUnit({ word, index }: { word: string; index: number }) {
  const style = tickerStyle[index % tickerStyle.length];
  return (
    <span className="flex shrink-0 items-center gap-4 sm:gap-5">
      <span className="font-display text-lg font-bold whitespace-nowrap text-(--neutral-1000) sm:text-2xl">
        {word}
      </span>
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-11", style.bg)}>
        <Image src={style.icon} alt="" width={90} height={90} className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
    </span>
  );
}

/**
 * Banda decorativa entre el Hero y "Por qué existe" — lima sólida + bloques
 * de color con geometría centrada, mismo peso visual que `ticker.svg`
 * original, ahora con texto real (editable, sin emoji ni mayúsculas
 * forzadas — Title Case tal como vive en el diccionario).
 *
 * Loop infinito real: el track duplica el set ya repetido (`REPEAT` arriba)
 * una vez más y se desplaza -50% con el keyframe `ticker-scroll` compartido
 * — es la técnica estándar de "dos copias idénticas + translateX(-50%)", el
 * mismo mecanismo de `FooterTicker`. Solo la primera copia es accesible
 * (la segunda es `aria-hidden`, es la duplicada del loop) para que un lector
 * de pantalla escuche la frase una sola vez, no dos seguidas.
 */
export function HomeTicker() {
  const { t } = useLanguage();
  const items = t.home.ticker.items;
  const loopedItems = Array.from({ length: REPEAT }, () => items).flat();

  return (
    <div className="relative flex overflow-hidden bg-(--lime-400) py-3 sm:py-4">
      <div
        className="flex w-max shrink-0 items-center gap-8 will-change-transform sm:gap-10"
        style={{ animation: "ticker-scroll 165s linear infinite" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8 sm:gap-10" aria-hidden={copy === 1 || undefined}>
            {loopedItems.map((word, i) => (
              <TickerUnit key={i} word={word} index={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
