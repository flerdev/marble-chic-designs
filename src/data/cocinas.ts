import type { Collection } from "@/components/CollectionGrid";
import type { CategoryNode } from "@/components/CategoryCard";

// ─── Single broad glob for the new folder layout ──────────────────────────────
// New structure: cocinas/{SERIE nova | serie premium | serie premium design}/...

const cocinasImages = import.meta.glob(
  "../assets/cocinas/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const cocinasVideos = import.meta.glob(
  "../assets/cocinas/**/*.{mp4,webm,mov,m4v,ogg}",
  { eager: true, import: "default" }
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const imageEntries = Object.entries(cocinasImages) as [string, string][];
const videoEntries = Object.entries(cocinasVideos) as [string, string][];

const sortedByName = <T extends [string, unknown]>(arr: T[]) =>
  [...arr].sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));

const imagesIn = (pathSegment: string) =>
  sortedByName(imageEntries.filter(([p]) => p.includes(pathSegment))).map(([, img]) => img);

const videosIn = (pathSegment: string) =>
  sortedByName(videoEntries.filter(([p]) => p.includes(pathSegment))).map(([, vid]) => vid);

/** "01 - GOFRATTO MATE" → "Gofratto Mate"  |  "boston" → "Boston" */
const cleanName = (raw: string) =>
  raw
    .replace(/^\d+\s*[-–]\s*/, "")
    .replace(/^\d+-/, "")
    .trim()
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

/** Extract unique immediate sub-folder names for a given path segment */
const subFolders = (pathSegment: string): string[] => {
  const regex = new RegExp(`${pathSegment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^/]+)/`);
  return Array.from(
    new Set(
      imageEntries
        .map(([p]) => p.match(regex)?.[1])
        .filter((f): f is string => Boolean(f))
    )
  ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
};

// ─── Special name overrides for serie premium ─────────────────────────────────

const premiumNameOverrides: Record<string, string> = {
  "city-city-rpt": "City",
  "lumina-ii": "Lúmina II",
};

// ─── Descriptions ─────────────────────────────────────────────────────────────

export const descriptions: Record<string, string[]> = {
  // ── Serie Premium ──
  Liverpool: [
    "Sobria, urbana y con una identidad marcada, la colección Liverpool se inspira en la estética industrial reinterpretada desde una mirada contemporánea.",
    "La combinación de metales, maderas y tonos intensos construye un espacio con carácter, donde conviven la fuerza visual y la calidez del diseño. Liverpool logra una síntesis equilibrada entre lo clásico y lo moderno, recuperando la esencia de la tradición y adaptándola a un lenguaje actual.",
    "Una propuesta pensada para proyectos donde la cocina ocupa un rol central, aportando personalidad, funcionalidad y presencia en espacios residenciales y desarrollos premium.",
  ],
  Boston: [
    "La colección Boston recupera la nobleza del diseño tradicional y la reinterpreta desde una estética actual, equilibrada y elegante.",
    "Las puertas enmarcadas, las sutiles ranuras y la paleta clara de blancos y tonos suaves crean una atmósfera cálida y delicada. Los detalles en tonos cobre aportan un acento sofisticado que refuerza el carácter romántico de la propuesta.",
    "Boston es ideal para proyectos que buscan atemporalidad, calidez y una elegancia que trasciende las tendencias.",
  ],
  Centery: [
    "Centery se define por la pureza de sus formas y una marcada personalidad basada en la funcionalidad y el diseño esencial.",
    "La colección propone líneas limpias y amplias posibilidades de personalización, permitiendo integrar la cocina de manera armónica dentro de proyectos contemporáneos.",
    "Una propuesta pensada para espacios donde la simplicidad, el diseño y la coherencia estética son protagonistas.",
  ],
  "Centery Black": [
    "Centery Black ofrece una interpretación más intensa y contemporánea del diseño esencial.",
    "Los tonos oscuros refuerzan la profundidad visual y aportan carácter al espacio, manteniendo la funcionalidad y la coherencia formal propias de la colección Centery.",
    "Una opción ideal para proyectos premium que buscan un diseño actual con presencia y personalidad definida.",
  ],
  City: [
    "City es una colección pensada para acompañar la dinámica de la vida urbana, combinando funcionalidad, diseño contemporáneo y soluciones versátiles.",
    "Su estética actual permite integrar la cocina de manera natural en espacios modernos, manteniendo calidad, orden y coherencia visual.",
    "Una propuesta que equilibra diseño, practicidad y estilo.",
  ],
  Lacar: [
    "La colección Lacar se destaca por sus terminaciones impecables y una estética refinada que aporta luminosidad y elegancia a los espacios.",
    "Diseñada para proyectos donde el detalle y la calidad del acabado son determinantes, Lacar ofrece una propuesta sofisticada y atemporal.",
    "Una opción ideal para quienes buscan una cocina de líneas cuidadas y alto nivel de terminación.",
  ],
  "Lúmina Ii": [
    "Lúmina II propone una estética clara y luminosa, pensada para proyectos que priorizan amplitud visual, orden y equilibrio.",
    "Sus líneas simples y su diseño limpio permiten integrar la cocina como parte armónica del espacio.",
    "Una colección ideal para ambientes contemporáneos que buscan funcionalidad y sofisticación en un mismo diseño.",
  ],
  Murano: [
    "Murano combina diseño, materialidad y detalles cuidadosamente trabajados para lograr una estética elegante y contemporánea.",
    "La colección se caracteriza por su equilibrio entre funcionalidad y expresión visual, aportando calidad y personalidad al espacio.",
    "Una propuesta que une sofisticación, calidad y diseño actual.",
  ],
  Trend: [
    "Trend acompaña las nuevas formas de habitar, integrando diseño contemporáneo, funcionalidad y versatilidad.",
    "Su propuesta se adapta a distintos tipos de proyectos, manteniendo una estética actual y equilibrada.",
    "Una colección pensada para proyectos contemporáneos que buscan un diseño actualizado y funcional.",
  ],
};

// ─── Serie Nova ───────────────────────────────────────────────────────────────
// Path depth: /SERIE nova/{model}/{image}

const NOVA_PATH = "/SERIE nova/";

const serieNovaCollections: Collection[] = subFolders(NOVA_PATH).map((folder) => {
  const name = cleanName(folder);
  const segment = `${NOVA_PATH}${folder}/`;
  return {
    id: `nova-${folder}`,
    name,
    serieLabel: "Serie Nova",
    image: imagesIn(segment)[0] ?? "",
    gallery: imagesIn(segment),
    previewVideo: videosIn(segment)[0],
    description: descriptions[name],
  };
});

// ─── Serie Premium ────────────────────────────────────────────────────────────
// Path depth: /serie premium/{model}/{image}
// Must exclude "serie premium design" paths

const PREMIUM_PATH = "/serie premium/";

const seriePremiumFolders = subFolders(PREMIUM_PATH).filter(
  (f) => !f.toLowerCase().includes("design")
);

const seriePremiumCollections: Collection[] = seriePremiumFolders.map((folder) => {
  const rawName = premiumNameOverrides[folder] ?? cleanName(folder);
  // Fix lumina special case (cleanName lowercases "II" → "Ii")
  const name = rawName === "Lúmina Ii" ? "Lúmina II" : rawName;
  const segment = `${PREMIUM_PATH}${folder}/`;
  return {
    id: `premium-${folder}`,
    name,
    serieLabel: "Serie Premium",
    image: imagesIn(segment)[0] ?? "",
    gallery: imagesIn(segment),
    previewVideo: videosIn(segment)[0],
    description: descriptions[name],
  };
});

// ─── Serie Premium Design ─────────────────────────────────────────────────────
// Path depth: /serie premium design/{parent}/{variant}/{image}
// Treat each variant as a Collection

const DESIGN_PATH = "/serie premium design/";

// Collect all unique "parent/variant" combos
const designVariants: Array<{ parentFolder: string; variantFolder: string }> = [];
const seenDesign = new Set<string>();

imageEntries.forEach(([path]) => {
  const match = path.match(/\/serie premium design\/([^/]+)\/([^/]+)\//);
  if (match) {
    const key = `${match[1]}/${match[2]}`;
    if (!seenDesign.has(key)) {
      seenDesign.add(key);
      designVariants.push({ parentFolder: match[1], variantFolder: match[2] });
    }
  }
});

designVariants.sort((a, b) =>
  `${a.parentFolder}/${a.variantFolder}`.localeCompare(
    `${b.parentFolder}/${b.variantFolder}`,
    undefined,
    { numeric: true }
  )
);

const serieDesignCollections: Collection[] = designVariants.map(({ parentFolder, variantFolder }) => {
  const name = cleanName(variantFolder);
  const parentName = cleanName(parentFolder);
  const segment = `${DESIGN_PATH}${parentFolder}/${variantFolder}/`;
  return {
    id: `design-${parentFolder}-${variantFolder}`,
    name,
    serieLabel: `Serie Premium Design · ${parentName}`,
    image: imagesIn(segment)[0] ?? "",
    gallery: imagesIn(segment),
    previewVideo: videosIn(segment)[0],
    description: descriptions[name],
  };
});

// ─── Category tree (used by /cocinas page) ────────────────────────────────────

export const cocinasCategory: CategoryNode = {
  id: "cocinas-root",
  title: "Cocinas",
  childType: "subcategories",
  subcategories: [
    {
      id: "serie-nova",
      title: "Serie Nova",
      childType: "collections",
      collections: serieNovaCollections,
      disabled: serieNovaCollections.length === 0,
    },
    {
      id: "serie-premium",
      title: "Serie Premium",
      childType: "collections",
      collections: seriePremiumCollections,
      disabled: seriePremiumCollections.length === 0,
    },
    {
      id: "serie-premium-design",
      title: "Serie Premium Design",
      childType: "collections",
      collections: serieDesignCollections,
      disabled: serieDesignCollections.length === 0,
    },
  ],
};

// ─── Flat list of all premium collections (kept for backward compat) ──────────

export const premiumCollections = seriePremiumCollections;
