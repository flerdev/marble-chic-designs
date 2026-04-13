/**
 * Árbol de datos para Placards / Vestidores.
 * Estructura: Placards → Elite | Classic | Kubia → variantes (hojas).
 */

import { type ProductNode } from "@/data/piletas";

// ─── Globs ────────────────────────────────────────────────────────────────────

const allImages = import.meta.glob(
  "../assets/2-VESTIDORES Y PLACARES/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const allVideos = import.meta.glob(
  "../assets/2-VESTIDORES Y PLACARES/**/*.{mp4,mov,webm}",
  { eager: true, import: "default" }
) as Record<string, string>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Todas las imágenes dentro de una carpeta (incluyendo subcarpetas). */
const imagesIn = (segment: string): string[] =>
  Object.entries(allImages)
    .filter(([p]) => p.includes(segment))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, img]) => img);

/**
 * Solo las imágenes directamente en una carpeta, sin bajar a subcarpetas.
 * Útil para carpetas que tienen subdirectorios de baja calidad / redes sociales.
 */
const imagesDirectlyIn = (segment: string): string[] =>
  Object.entries(allImages)
    .filter(([p]) => {
      const idx = p.indexOf(segment);
      if (idx === -1) return false;
      const rest = p.slice(idx + segment.length);
      return !rest.includes("/");
    })
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, img]) => img);

const cover = (segment: string): string =>
  imagesDirectlyIn(segment)[0] ?? imagesIn(segment)[0] ?? "";

const videoIn = (segment: string): string | undefined =>
  Object.entries(allVideos)
    .filter(([p]) => p.includes(segment))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v)[0];

// ─── Paths ────────────────────────────────────────────────────────────────────

const ELITE       = "/1-PLACARD-ELITE/";
const ELITE_GLOSS = `${ELITE}PUERTA GLOSS/`;
const ELITE_VETA  = `${ELITE}PUERTA VETA/`;

const CLASSIC     = "/2-placard - classic/";
const CL_TECNIA   = `${CLASSIC}1-CLASSIC + TECNIA/`;
const CL_MEL      = `${CL_TECNIA}1-CLASSIC + TECNIA MELAMINA/`;
const CL_VID      = `${CL_TECNIA}2-CLASSIC + TECNIA vidriado/`;
const CL_VID_HQ   = `${CL_VID}fotos en alta calidad/`;

const KUBIA        = "/3- placard kubia/";
const KU_TECNIA    = `${KUBIA}1-KUBIA+PUERTAS TECNIA/`;
const KU_VARESE    = `${KUBIA}2-KUBIA+PUERTAS VARESE/`;
const KU_BATIENTE  = `${KUBIA}3-KUBIA BATIENTE/`;
const KU_LINK      = `${KU_BATIENTE}1-01. LINK VIDRIADA/`;
const KU_CITY_MEL  = `${KU_BATIENTE}2-02. CITY MELAMINA/`;
const KU_CITY_LAQ  = `${KU_BATIENTE}03. CITY LAQUEADO/`;
const KU_MIDI      = `${KU_BATIENTE}04. MIDI/`;
const KU_NEXT      = `${KU_BATIENTE}05. NEXT/`;

// ─── Tree ─────────────────────────────────────────────────────────────────────

export const placardsRoot: ProductNode = {
  id: "placards",
  name: "Placards",
  badge: "Vestidores y Placards",
  image: cover(ELITE_GLOSS),
  children: [
    {
      id: "elite",
      name: "Elite",
      badge: "Placards",
      image: cover(ELITE_GLOSS),
      children: [
        {
          id: "puerta-gloss",
          name: "Puerta Gloss",
          badge: "Elite",
          image: cover(ELITE_GLOSS),
          gallery: imagesDirectlyIn(ELITE_GLOSS),
          previewVideo: videoIn(ELITE_GLOSS),
        },
        {
          id: "puerta-veta",
          name: "Puerta Veta",
          badge: "Elite",
          image: cover(ELITE_VETA),
          gallery: imagesDirectlyIn(ELITE_VETA),
          previewVideo: videoIn(ELITE_VETA),
        },
      ],
    },
    {
      id: "classic",
      name: "Classic",
      badge: "Placards",
      image: cover(CL_MEL),
      children: [
        {
          // Carpeta con subdirectorios de baja calidad → imagesDirectlyIn
          id: "tecnia-melamina",
          name: "Tecnia Melamina",
          badge: "Classic",
          image: cover(CL_MEL),
          gallery: imagesDirectlyIn(CL_MEL),
          previewVideo: videoIn(CL_MEL),
        },
        {
          // Las fotos de calidad están en el subdirectorio "fotos en alta calidad"
          id: "tecnia-vidriado",
          name: "Tecnia Vidriado",
          badge: "Classic",
          image: imagesIn(CL_VID_HQ)[0] ?? "",
          gallery: imagesIn(CL_VID_HQ),
          previewVideo: videoIn(CL_VID),
        },
      ],
    },
    {
      id: "kubia",
      name: "Kubia",
      badge: "Placards",
      image: imagesIn(KU_TECNIA)[0] ?? "",
      children: [
        {
          id: "puertas-tecnia",
          name: "Puertas Tecnia",
          badge: "Kubia",
          image: imagesIn(KU_TECNIA)[0] ?? "",
          gallery: imagesIn(KU_TECNIA),
        },
        {
          id: "puertas-varese",
          name: "Puertas Varese",
          badge: "Kubia",
          image: imagesIn(KU_VARESE)[0] ?? "",
          gallery: imagesIn(KU_VARESE),
        },
        {
          id: "batiente",
          name: "Kubia Batiente",
          badge: "Kubia",
          image: imagesIn(KU_LINK)[0] ?? "",
          children: [
            {
              id: "link-vidriada",
              name: "Link Vidriada",
              badge: "Kubia Batiente",
              image: imagesIn(KU_LINK)[0] ?? "",
              gallery: imagesIn(KU_LINK),
            },
            {
              id: "city-melamina",
              name: "City Melamina",
              badge: "Kubia Batiente",
              image: imagesIn(KU_CITY_MEL)[0] ?? "",
              gallery: imagesIn(KU_CITY_MEL),
              previewVideo: videoIn(KU_CITY_MEL),
            },
            {
              id: "city-laqueado",
              name: "City Laqueado",
              badge: "Kubia Batiente",
              image: imagesIn(KU_CITY_LAQ)[0] ?? "",
              gallery: imagesIn(KU_CITY_LAQ),
              previewVideo: videoIn(KU_CITY_LAQ),
            },
            {
              id: "midi",
              name: "Midi",
              badge: "Kubia Batiente",
              image: imagesIn(KU_MIDI)[0] ?? "",
              gallery: imagesIn(KU_MIDI),
              previewVideo: videoIn(KU_MIDI),
            },
            {
              id: "next",
              name: "Next",
              badge: "Kubia Batiente",
              image: imagesIn(KU_NEXT)[0] ?? "",
              gallery: imagesIn(KU_NEXT),
              previewVideo: videoIn(KU_NEXT),
            },
          ],
        },
      ],
    },
  ],
};
