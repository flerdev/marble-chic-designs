/**
 * Home-page catalog: one entry per top-level category.
 * Each entry has 2-3 PreviewItems (subcategory-level cards shown on the home page).
 *
 * This is the layer that will eventually be replaced by DB / Cloudinary API calls.
 * The shape is intentionally simple so the swap is a one-file change.
 */

export interface PreviewItem {
  id: string;
  name: string;    // Displayed on the card, e.g. "Serie Premium"
  badge: string;   // Small label above the line, e.g. "Cocinas"
  image: string;   // Cover image URL (resolved at build time from local assets)
  slug: string;    // Navigates to /{slug} on click and on "Ver todo"
}

export interface CatalogSection {
  id: string;           // HTML section id (used by nav anchors)
  sectionLabel: string; // Small gold label above the title
  title: string;        // Large heading
  slug: string;         // Route: /cocinas, /piletas, etc.
  items: PreviewItem[]; // Subcategory cards to preview (≤ 3 on home page)
}

// ─── Glob imports (one per asset root folder) ─────────────────────────────────

const cocinasModules = import.meta.glob(
  "../assets/cocinas/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const piletasMesadasModules = import.meta.glob(
  "../assets/piletas-mesadas/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const placardsModules = import.meta.glob(
  "../assets/2-VESTIDORES Y PLACARES/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const sistemaOpenModules = import.meta.glob(
  "../assets/3-sistema open/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

// ─── Helper: first image whose path contains a given segment ─────────────────

const cover = (modules: Record<string, string>, segment: string): string => {
  const entry = Object.entries(modules)
    .filter(([p]) => p.includes(segment))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))[0];
  return entry?.[1] ?? "";
};

// ─── Catalog definition ───────────────────────────────────────────────────────

export const catalog: CatalogSection[] = [
  {
    id: "cocinas",
    sectionLabel: "Colección Exclusiva",
    title: "Cocinas",
    slug: "cocinas",
    items: [
      {
        id: "serie-nova",
        name: "Serie Nova",
        badge: "Cocinas",
        image: cover(cocinasModules, "/SERIE nova/"),
        slug: "cocinas/serie-nova",
      },
      {
        id: "serie-premium",
        name: "Serie Premium",
        badge: "Cocinas",
        image: cover(cocinasModules, "/serie premium/"),
        slug: "cocinas/serie-premium",
      },
      {
        id: "serie-premium-design",
        name: "Serie Premium Design",
        badge: "Cocinas",
        image: cover(cocinasModules, "/serie premium design/"),
        slug: "cocinas/serie-premium-design",
      },
    ],
  },
  {
    id: "piletas",
    sectionLabel: "Diseño y Funcionalidad",
    title: "Piletas",
    slug: "piletas",
    // Preview shows the 3 collections inside Piletas 304 directly
    // (skipping the intermediate level to keep 3 visual cards on the home page)
    items: [
      {
        id: "curve",
        name: "Curve",
        badge: "Piletas 304",
        image: cover(piletasMesadasModules, "/01 - CURVE/"),
        slug: "piletas/piletas-304/curve",
      },
      {
        id: "luxor",
        name: "Luxor",
        badge: "Piletas 304",
        image: cover(piletasMesadasModules, "/02 - LUXOR/"),
        slug: "piletas/piletas-304/luxor",
      },
      {
        id: "quadra",
        name: "Quadra",
        badge: "Piletas 304",
        image: cover(piletasMesadasModules, "/03 - QUADRA/"),
        slug: "piletas/piletas-304/quadra",
      },
    ],
  },
  {
    id: "placards",
    sectionLabel: "Organización y Estilo",
    title: "Placards",
    slug: "placards",
    items: [
      {
        id: "elite",
        name: "Elite",
        badge: "Placards",
        image: cover(placardsModules, "PUERTA GLOSS/"),
        slug: "placards/elite",
      },
      {
        id: "classic",
        name: "Classic",
        badge: "Placards",
        image: cover(placardsModules, "TECNIA MELAMINA/"),
        slug: "placards/classic",
      },
      {
        id: "kubia",
        name: "Kubia",
        badge: "Placards",
        image: cover(placardsModules, "KUBIA+PUERTAS TECNIA/"),
        slug: "placards/kubia",
      },
    ],
  },
  {
    id: "sistema-open",
    sectionLabel: "Almacenamiento Premium",
    title: "Sistema Open",
    slug: "sistema-open",
    items: [
      {
        id: "open-varese",
        name: "Open + Varese",
        badge: "Sistema Open",
        image: cover(sistemaOpenModules, "1-SISTEMA OPEN + VARESE/"),
        slug: "sistema-open/open-varese",
      },
      {
        id: "sistema-open",
        name: "Sistema Open",
        badge: "Sistema Open",
        image: cover(sistemaOpenModules, "2- SISTEMA OPEN/"),
        slug: "sistema-open/sistema-open",
      },
      {
        id: "open-cajones",
        name: "Open + Cajones",
        badge: "Sistema Open",
        image: cover(sistemaOpenModules, "3-OPEN + CAJONES/"),
        slug: "sistema-open/open-cajones",
      },
    ],
  },
  {
    id: "mesadas",
    sectionLabel: "Superficies de Diseño",
    title: "Mesadas",
    slug: "mesadas",
    items: [
      {
        id: "mesada-430",
        name: "Mesada 430",
        badge: "Mesadas",
        image: cover(piletasMesadasModules, "/02 - MESADAS/"),
        slug: "mesadas",
      },
    ],
  },
  {
    id: "griferias",
    sectionLabel: "Detalles que Definen",
    title: "Griferías",
    slug: "griferias",
    items: [],  // No images yet — section renders "Próximamente"
  },
];
