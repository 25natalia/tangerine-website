// Shell compartido por las OG images (raíz, Studio/Work/Contact, case
// studies). ImageResponse (Satori) solo soporta un subconjunto de CSS vía
// flexbox/posición absoluta — nada de Tailwind, nada de var(--token) — por
// eso los valores acá son hex literales copiados de tokens/color/primitive
// .tokens.json, no clases. Los `<img src>` necesitan una URL absoluta (no
// una ruta relativa): Satori los resuelve en el servidor, no en el
// navegador, así que se arman con `SITE_URL`.

import { SITE_URL } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

const NEUTRAL_0 = "#FCFBFF";

/**
 * Sin texto ni franja de color: pura ilustración sobre fondo claro. La
 * mascota grande y centrada, siete geometrías reales alrededor en tamaños
 * bien variados (de 40 a 130px) para que la composición no se sienta
 * repetitiva — mismo set de motivos que ya usa el Home Hero
 * (`home-hero.tsx`: flor-lime, star-green, hoja-orange, destello-violet,
 * semillas-orange, leaf-lime), más un séptimo (destello-yellow) para sumar
 * densidad sin salirse del vocabulario visual del sitio.
 *
 * Cada `<img>` usa el ancho/alto en la proporción exacta de su `viewBox`
 * — sin eso Satori estira el bitmap al tamaño declarado sin mantener el
 * aspect ratio y sale deformado.
 */
export function OgCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: NEUTRAL_0,
        position: "relative",
      }}
    >
      <img
        src={`${SITE_URL}/illustrations/geometry/flor-lime.svg`}
        width={108}
        height={113}
        style={{ position: "absolute", top: 40, left: 150 }}
      />
      <img
        src={`${SITE_URL}/illustrations/deco/star-green.svg`}
        width={46}
        height={46}
        style={{ position: "absolute", top: 280, left: 60 }}
      />
      <img
        src={`${SITE_URL}/illustrations/geometry/hoja-orange.svg`}
        width={88}
        height={84}
        style={{ position: "absolute", top: 30, right: 150 }}
      />
      <img
        src={`${SITE_URL}/illustrations/geometry/leaf-lime.svg`}
        width={40}
        height={40}
        style={{ position: "absolute", top: 150, right: 60 }}
      />
      <img
        src={`${SITE_URL}/illustrations/geometry/semillas-orange.svg`}
        width={120}
        height={120}
        style={{ position: "absolute", bottom: 40, left: 90 }}
      />
      <img
        src={`${SITE_URL}/illustrations/geometry/destello-violet.svg`}
        width={70}
        height={70}
        style={{ position: "absolute", bottom: 90, right: 80 }}
      />
      <img
        src={`${SITE_URL}/illustrations/geometry/destello-yellow.svg`}
        width={56}
        height={56}
        style={{ position: "absolute", bottom: 150, right: 280 }}
      />

      <img
        src={`${SITE_URL}/brand/mascot/lightmode/Tangerine-2.svg`}
        width={497}
        height={460}
        style={{ display: "flex" }}
      />
    </div>
  );
}
