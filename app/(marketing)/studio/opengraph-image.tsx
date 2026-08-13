import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Sobre nosotras" title="Dos personas que notaron algo que a nadie más parecía molestarle." />,
    { ...size }
  );
}
