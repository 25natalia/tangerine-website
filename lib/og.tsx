// Shell compartido por las OG images (raíz, Studio/Work/Contact, case
// studies). ImageResponse (Satori) solo soporta un subconjunto de CSS vía
// flexbox/posición absoluta — nada de Tailwind, nada de var(--token) — por
// eso los valores acá son hex literales copiados de tokens/color/primitive
// .tokens.json, no clases. Los `<img src>` necesitan una URL absoluta (no
// una ruta relativa): Satori los resuelve en el servidor, no en el
// navegador, así que se arman con `SITE_URL`.

import { SITE_URL } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

/** Hex reales de tokens/color/primitive.tokens.json — CaseStudyAccent no
 * tiene una versión "para renderizar fuera de Tailwind", así que se repite
 * acá el valor concreto en vez de intentar resolver un var(--token). */
export const ACCENT_HEX: Record<"purple" | "green" | "tangerine" | "info" | "gold", string> = {
  purple: "#5434e2",
  green: "#00a254",
  tangerine: "#ff7401",
  info: "#2f7de1",
  gold: "#ffca00",
};

const NEUTRAL_0 = "#FCFBFF";
const PURPLE_600 = "#5434E2";

/**
 * Sin texto: la mascota y las geometrías (ilustración pura) arriba sobre
 * fondo claro, una franja plana de color de marca abajo. Nada escrito en
 * la franja, es puramente un bloque de color, como referencia de diseño
 * pidió — la franja usa `accent` en case studies (mismo color que ya
 * identifica a cada proyecto en el resto del sitio) o el violeta de marca
 * por default en el resto de páginas.
 *
 * Cada `<img>` usa el ancho/alto en la proporción exacta de su `viewBox`
 * — sin eso Satori estira el bitmap al tamaño declarado sin mantener el
 * aspect ratio y sale deformado.
 */
export function OgCard({ accent }: { accent?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: NEUTRAL_0,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src={`${SITE_URL}/illustrations/geometry/flor-lime.svg`}
          width={92}
          height={96}
          style={{ position: "absolute", top: 46, left: 270 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/hoja-orange.svg`}
          width={78}
          height={74}
          style={{ position: "absolute", top: 34, right: 270 }}
        />
        <img
          src={`${SITE_URL}/illustrations/deco/star-violet.svg`}
          width={70}
          height={70}
          style={{ position: "absolute", bottom: 46, left: 320 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/destello-violet.svg`}
          width={82}
          height={82}
          style={{ position: "absolute", bottom: 34, right: 320 }}
        />

        <img
          src={`${SITE_URL}/brand/mascot/lightmode/Tangerine-2.svg`}
          width={410}
          height={380}
          style={{ display: "flex" }}
        />
      </div>

      <div style={{ display: "flex", height: 190, flexShrink: 0, background: accent ?? PURPLE_600 }} />
    </div>
  );
}
