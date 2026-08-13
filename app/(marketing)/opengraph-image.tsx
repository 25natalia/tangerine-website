import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Ey, somos Tangerine" title="Hacemos que las buenas ideas cobren vida." />,
    { ...size }
  );
}
