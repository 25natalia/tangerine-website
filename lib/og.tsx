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
// Mismos hex que usa `logo-extended.svg` para "The"/"studio" y "tangerine" —
// se reusa la paleta del logo real aunque acá se dibuje como texto, no SVG.
const WORDMARK_PURPLE = "#8C77EC";
const WORDMARK_TANGERINE = "#FF7401";

let fontPromise: Promise<ArrayBuffer> | null = null;

/**
 * Plus Jakarta Sans Bold real, traída de Google Fonts en tiempo de
 * request — `next/font/google` (lo que usa `app/layout.tsx`) es una
 * optimización específica de páginas renderizadas normalmente, Satori no
 * tiene acceso a eso y necesita el archivo de fuente posta vía la opción
 * `fonts` de `ImageResponse`. Se pide con un User-Agent viejo a propósito:
 * así Google Fonts devuelve TTF en vez de WOFF2, que Satori no soporta de
 * forma confiable. Cacheada a nivel de módulo — un solo fetch, reusado por
 * las 5 rutas de OG image del sitio dentro de la misma instancia.
 *
 * Se usa texto real (no el SVG `logo-extended.svg`) para el wordmark: ese
 * archivo tiene `<rect>`s con `transform="matrix(...)"` que Satori/resvg no
 * rasteriza de forma confiable al traerlo como `<img>` — a diferencia de
 * las geometrías (paths simples) y la mascota, que sí se renderizan bien
 * por ese camino. Texto real vía `fonts` no tiene ese riesgo.
 */
async function getPlusJakartaSansBold(): Promise<ArrayBuffer> {
  if (!fontPromise) {
    fontPromise = (async (): Promise<ArrayBuffer> => {
      const cssRes = await fetch(
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
          },
        }
      );
      const css = await cssRes.text();
      const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
      if (!fontUrl) throw new Error("No se pudo resolver la URL de Plus Jakarta Sans desde Google Fonts.");
      const fontRes = await fetch(fontUrl);
      return fontRes.arrayBuffer();
    })();
  }
  return fontPromise;
}

/** Se pasa como `fonts` al segundo argumento de `ImageResponse` en cada ruta. */
export async function getOgFonts() {
  const data = await getPlusJakartaSansBold();
  return [{ name: "Plus Jakarta Sans", data, style: "normal" as const, weight: 800 as const }];
}

/**
 * Composición a dos columnas: wordmark a la izquierda, mascota grande a la
 * derecha, geometrías reales alrededor de ambas — misma disposición que la
 * imagen de referencia del brand. El wordmark ("The" / "tangerine" /
 * "studio") es texto real en Plus Jakarta Sans Extrabold, con los mismos
 * dos colores del logo real (`logo-extended.svg`), no el SVG en sí — ver
 * el comentario en `getPlusJakartaSansBold` sobre por qué.
 *
 * Cada `<img>` de geometría/mascota usa el ancho/alto en la proporción
 * exacta de su `viewBox` — sin eso Satori estira el bitmap al tamaño
 * declarado sin mantener el aspect ratio y sale deformado.
 *
 * `accent` (case studies) tiñe un punto chico junto al wordmark, el único
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
        fontFamily: "Plus Jakarta Sans",
        padding: "0 70px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", position: "relative", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05, color: WORDMARK_PURPLE }}>
            The
          </div>
          {accent ? (
            <div style={{ display: "flex", width: 16, height: 16, borderRadius: 999, background: accent }} />
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05, color: WORDMARK_TANGERINE }}>
          tangerine
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05, color: WORDMARK_PURPLE }}>
          studio
        </div>
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
