/**
 * Árbol de datos para Sistema Open.
 * Estructura: Sistema Open → Open + Varese | Sistema Open | Open + Cajones (todas hojas).
 */

import { type ProductNode } from "@/data/piletas";

// ─── Globs ────────────────────────────────────────────────────────────────────

const allImages = import.meta.glob(
  "../assets/3-sistema open/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const allVideos = import.meta.glob(
  "../assets/3-sistema open/**/*.{mp4,mov,webm}",
  { eager: true, import: "default" }
) as Record<string, string>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const imagesIn = (segment: string): string[] =>
  Object.entries(allImages)
    .filter(([p]) => p.includes(segment))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, img]) => img);

const cover = (segment: string): string => imagesIn(segment)[0] ?? "";

const videoIn = (segment: string): string | undefined =>
  Object.entries(allVideos)
    .filter(([p]) => p.includes(segment))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v)[0];

// ─── Paths ────────────────────────────────────────────────────────────────────

const OPEN_VARESE  = "/3-sistema open/1-SISTEMA OPEN + VARESE/";
const OPEN_PLAIN   = "/3-sistema open/2- SISTEMA OPEN/";
const OPEN_CAJONES = "/3-sistema open/3-OPEN + CAJONES/";

// ─── Tree ─────────────────────────────────────────────────────────────────────

export const sistemaOpenRoot: ProductNode = {
  id: "sistema-open",
  name: "Sistema Open",
  badge: "Sistema Open",
  image: cover(OPEN_VARESE),
  children: [
    {
      id: "open-varese",
      name: "Open + Varese",
      badge: "Sistema Open",
      image: cover(OPEN_VARESE),
      gallery: imagesIn(OPEN_VARESE),
      previewVideo: videoIn(OPEN_VARESE),
    },
    {
      id: "sistema-open",
      name: "Sistema Open",
      badge: "Sistema Open",
      image: cover(OPEN_PLAIN),
      gallery: imagesIn(OPEN_PLAIN),
    },
    {
      id: "open-cajones",
      name: "Open + Cajones",
      badge: "Sistema Open",
      image: cover(OPEN_CAJONES),
      gallery: imagesIn(OPEN_CAJONES),
    },
  ],
};
