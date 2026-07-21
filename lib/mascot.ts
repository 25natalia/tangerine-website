// Single source of truth for mascot asset paths. Nothing in the app should
// ever write "/brand/mascot/lightmode/..." by hand — read it from here, so
// adding a variant or renaming the folder structure is a one-file change.

export type MascotVariant = "default" | "1" | "2" | "3" | "4";

export const mascotVariants: MascotVariant[] = ["default", "1", "2", "3", "4"];

/** Real intrinsic size of every variant/mode — identical across all ten files. */
export const MASCOT_WIDTH = 1111;
export const MASCOT_HEIGHT = 1168;

const fileByVariant: Record<MascotVariant, string> = {
  default: "Tangerine.svg",
  "1": "Tangerine-1.svg",
  "2": "Tangerine-2.svg",
  "3": "Tangerine-3.svg",
  "4": "Tangerine-4.svg",
};

export const mascotLabelByVariant: Record<MascotVariant, string> = {
  default: "Tangerine",
  "1": "Tangerine 1",
  "2": "Tangerine 2",
  "3": "Tangerine 3",
  "4": "Tangerine 4",
};

export type MascotMode = "light" | "dark";

/** The two file paths (light + dark) for a given variant. */
export function getMascotPaths(variant: MascotVariant = "default") {
  const file = fileByVariant[variant];
  return {
    light: `/brand/mascot/lightmode/${file}`,
    dark: `/brand/mascot/darkmode/${file}`,
  };
}

export function getMascotPath(variant: MascotVariant, mode: MascotMode): string {
  return getMascotPaths(variant)[mode];
}

/** Every asset in the pack, flattened — the shape Resources' gallery and the bulk-download actions iterate over. */
export interface MascotAsset {
  variant: MascotVariant;
  mode: MascotMode;
  label: string;
  path: string;
  fileName: string;
}

export const mascotAssets: MascotAsset[] = mascotVariants.flatMap((variant) =>
  (["light", "dark"] as MascotMode[]).map((mode) => ({
    variant,
    mode,
    label: mascotLabelByVariant[variant],
    path: getMascotPath(variant, mode),
    fileName: fileByVariant[variant],
  }))
);
