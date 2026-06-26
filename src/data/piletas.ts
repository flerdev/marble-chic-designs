/**
 * Árbol de datos para Piletas.
 * Cada nodo con `children` → página de preview.
 * Nodo sin `children` (leaf) → abre modal de galería con SubCategoryCard.
 */

export interface ProductNode {
  id: string;           // segmento de URL (e.g. "piletas-304", "curve")
  name: string;         // nombre de display
  badge: string;        // etiqueta pequeña (padre)
  image: string;        // imagen de portada
  children?: ProductNode[];
  // Campos presentes solo en leaf nodes:
  gallery?: string[];
  previewVideo?: string;
  description?: string[];
}

// ─── Glob ────────────────────────────────────────────────────────────────────

const allImages = import.meta.glob(
  "../assets/piletas-mesadas/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const imagesIn = (segment: string): string[] =>
  Object.entries(allImages)
    .filter(([p]) => p.includes(segment))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, img]) => img);

const cover = (segment: string): string => imagesIn(segment)[0] ?? "";

// ─── Paths ───────────────────────────────────────────────────────────────────

const BASE        = "/01 - PILETAS/01 - PILETAS 304/";
const P_CURVE     = `${BASE}01 - CURVE/`;
const P_LUXOR     = `${BASE}02 - LUXOR/`;
const P_LUXOR_C   = `${P_LUXOR}LUXOR COMPACT SI71A - STA/`;
const P_QUADRA    = `${BASE}03 - QUADRA/`;
const P_QUADRA_MAX  = `${P_QUADRA}01 - QUADRA MAX Q71A/`;
const P_QUADRA_MINI = `${P_QUADRA}02 - QUADRA MINI Q55 A/`;

// ─── Tree ────────────────────────────────────────────────────────────────────

export const piletasRoot: ProductNode = {
  id: "piletas",
  name: "Piletas",
  badge: "Piletas y Mesadas",
  image: cover(P_CURVE),
  children: [
    {
      id: "piletas-304",
      name: "Piletas 304",
      badge: "Piletas",
      image: cover(P_CURVE),
      children: [
        {
          // LEAF — imágenes directamente en la carpeta
          id: "curve",
          name: "Curve",
          badge: "Piletas 304",
          image: cover(P_CURVE),
          gallery: imagesIn(P_CURVE),
        },
        {
          // NON-LEAF — tiene variantes
          id: "luxor",
          name: "Luxor",
          badge: "Piletas 304",
          image: cover(P_LUXOR),
          children: [
            {
              id: "luxor-compact",
              name: "Luxor Compact SI71A",
              badge: "Luxor",
              image: cover(P_LUXOR_C),
              gallery: imagesIn(P_LUXOR_C),
            },
          ],
        },
        {
          // NON-LEAF — tiene variantes
          id: "quadra",
          name: "Quadra",
          badge: "Piletas 304",
          image: cover(P_QUADRA_MAX),
          children: [
            {
              id: "quadra-max",
              name: "Quadra Max Q71A",
              badge: "Quadra",
              image: cover(P_QUADRA_MAX),
              gallery: imagesIn(P_QUADRA_MAX),
            },
            {
              id: "quadra-mini",
              name: "Quadra Mini Q55 A",
              badge: "Quadra",
              image: cover(P_QUADRA_MINI),
              gallery: imagesIn(P_QUADRA_MINI),
            },
          ],
        },
      ],
    },
  ],
};
