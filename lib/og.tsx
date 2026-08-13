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

/**
 * Composición a dos columnas: wordmark a la izquierda, mascota grande a la
 * derecha, geometrías reales alrededor de ambas — misma disposición que la
 * imagen de referencia del brand. `logo-extended.svg` ya es el logo con
 * texto ("The tangerine studio") resuelto como arte, así que no hace falta
 * cargar ninguna fuente para Satori: el "texto" de la imagen es en
 * realidad una ilustración más, coherente con el resto de la composición.
 *
 * Cada `<img>` usa el ancho/alto en la proporción exacta de su `viewBox`
 * (`logo-extended` 318:222, mascota `Tangerine-2` 1069:990, geometrías
 * ídem) — sin eso Satori estira el bitmap al tamaño declarado sin
 * mantener el aspect ratio y sale deformado.
 *
 * `accent` (case studies) tiñe un punto chico junto al logo, el único
 * lugar donde ese color entra.
 */
export function OgCard({ accent }: { accent?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: NEUTRAL_0,
        padding: "0 70px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", position: "relative", flexShrink: 0 }}>
        <img src={`${SITE_URL}/brand/logo-extended.svg`} width={430} height={300} style={{ display: "flex" }} />
        {accent ? (
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 60,
              right: -26,
              width: 14,
              height: 14,
              borderRadius: 999,
              background: accent,
            }}
          />
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: 560, height: 520, flexShrink: 0 }}>
        <img
          src={`${SITE_URL}/illustrations/geometry/flor-lime.svg`}
          width={78}
          height={82}
          style={{ position: "absolute", top: 34, left: 8 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/hoja-orange.svg`}
          width={70}
          height={66}
          style={{ position: "absolute", top: 14, right: 30 }}
        />
        <img
          src={`${SITE_URL}/illustrations/deco/star-violet.svg`}
          width={62}
          height={62}
          style={{ position: "absolute", bottom: 70, left: 0 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/destello-violet.svg`}
          width={72}
          height={72}
          style={{ position: "absolute", bottom: 30, right: 20 }}
        />

        <img
          src={`${SITE_URL}/brand/mascot/lightmode/Tangerine-2.svg`}
          width={475}
          height={440}
          style={{ display: "flex" }}
        />
      </div>
    </div>
  );
}
