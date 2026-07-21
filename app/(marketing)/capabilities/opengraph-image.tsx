import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Capabilities" title="No ofrecemos una lista de servicios sueltos. Ofrecemos capacidades." />,
    { ...size }
  );
}
