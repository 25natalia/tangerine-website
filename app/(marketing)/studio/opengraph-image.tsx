import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, getOgFonts } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgCard />, { ...size, fonts: await getOgFonts() });
}
