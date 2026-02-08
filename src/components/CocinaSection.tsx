//identificar que componente editar para que en cada card de cada modelo , colocar descripcion ; y formulario de contacto : nombre, email, telefono ,preguntar si es desarrolladora , inmobiliaria , diseño de interiores , arquitecto/a ,si es obra nueva o remodelacion , planos , y algun comentario 
import cocinasGeneral from "@/assets/cocinas-general.png";
import CategoryCard from "./CategoryCard";
import SubCategoryCard from "./SubCategoryCard";

const premiumImageModules = import.meta.glob(
  "../assets/cocinas/premium/*/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  }
);

const premiumVideoModules = import.meta.glob(
  "../assets/cocinas/premium/*/*.{mp4,webm,mov,m4v,ogg}",
  {
    eager: true,
    import: "default",
  }
);

const getFolderName = (path: string) => {
  const match = path.match(/\/premium\/([^/]+)\//);
  return match?.[1] ?? null;
};

const getPremiumGallery = (folderName: string) =>
  Object.entries(premiumImageModules)
    .filter(([path]) => path.includes(`/premium/${folderName}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, image]) => image as string);

const getPremiumVideos = (folderName: string) =>
  Object.entries(premiumVideoModules)
    .filter(([path]) => path.includes(`/premium/${folderName}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, video]) => video as string);

const liverpoolGallery = getPremiumGallery("liverpool");
const bostonGallery = getPremiumGallery("boston");
const liverpoolVideos = getPremiumVideos("liverpool");
const bostonVideos = getPremiumVideos("boston");
const liverpoolCover = liverpoolGallery[0] ?? "";
const bostonCover = bostonGallery[0] ?? "";

const premiumModelNames: Record<string, string> = {
  "city-city-rpt": "City",
  "lumina-ii": "Lúmina II",
};

const premiumDescriptions: Record<string, string[]> = {
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
    "La colección propone líneas limpias y amplias posibilidades de personalización, permitiendo integrar la cocina de manera armónica dentro de proyectos contemporáneos. Los materiales y terminaciones cuidadosamente seleccionados aportan sofisticación y equilibrio visual.",
    "Una propuesta pensada para espacios donde la simplicidad, el diseño y la coherencia estética son protagonistas.",
  ],
  "Centery Black": [
    "Centery Black ofrece una interpretación más intensa y contemporánea del diseño esencial.",
    "Los tonos oscuros refuerzan la profundidad visual y aportan carácter al espacio, manteniendo la funcionalidad y la coherencia formal propias de la colección Centery. El resultado es una cocina moderna, elegante y de fuerte identidad estética.",
    "Una opción ideal para proyectos premium que buscan un diseño actual con presencia y personalidad definida.",
  ],
  City: [
    "City es una colección pensada para acompañar la dinámica de la vida urbana, combinando funcionalidad, diseño contemporáneo y soluciones versátiles.",
    "Su estética actual permite integrar la cocina de manera natural en espacios modernos, manteniendo calidad, orden y coherencia visual. City se adapta tanto a proyectos residenciales como a desarrollos inmobiliarios de alta gama.",
    "Una propuesta que equilibra diseño, practicidad y estilo.",
  ],
  Lacar: [
    "La colección Lacar se destaca por sus terminaciones impecables y una estética refinada que aporta luminosidad y elegancia a los espacios.",
    "Diseñada para proyectos donde el detalle y la calidad del acabado son determinantes, Lacar ofrece una propuesta sofisticada y atemporal, capaz de integrarse con distintos estilos arquitectónicos.",
    "Una opción ideal para quienes buscan una cocina de líneas cuidadas y alto nivel de terminación.",
  ],
  "Lúmina II": [
    "Lúmina II propone una estética clara y luminosa, pensada para proyectos que priorizan amplitud visual, orden y equilibrio.",
    "Sus líneas simples y su diseño limpio permiten integrar la cocina como parte armónica del espacio, aportando claridad y una sensación de continuidad visual.",
    "Una colección ideal para ambientes contemporáneos que buscan funcionalidad y sofisticación en un mismo diseño.",
  ],
  Murano: [
    "Murano combina diseño, materialidad y detalles cuidadosamente trabajados para lograr una estética elegante y contemporánea.",
    "La colección se caracteriza por su equilibrio entre funcionalidad y expresión visual, aportando calidad y personalidad al espacio. Cada elemento está pensado para acompañar proyectos de alto nivel, donde el diseño ocupa un rol central.",
    "Una propuesta que une sofisticación, calidad y diseño actual.",
  ],
  Trend: [
    "Trend acompaña las nuevas formas de habitar, integrando diseño contemporáneo, funcionalidad y versatilidad.",
    "Su propuesta se adapta a distintos tipos de proyectos, manteniendo una estética actual y equilibrada. Trend ofrece una solución moderna que combina practicidad, diseño y calidad en cada detalle.",
    "Una colección pensada para proyectos contemporáneos que buscan un diseño actualizado y funcional.",
  ],
};

const toModelName = (folderName: string) =>
  premiumModelNames[folderName] ??
  folderName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const premiumFolders = Array.from(
  new Set(
    [...Object.keys(premiumImageModules), ...Object.keys(premiumVideoModules)]
      .map(getFolderName)
      .filter((folderName): folderName is string => Boolean(folderName))
  )
)
  .filter((folderName) => folderName !== "liverpool" && folderName !== "boston")
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const premiumCards = premiumFolders.map((folderName) => {
  const gallery = getPremiumGallery(folderName);
  const videos = getPremiumVideos(folderName);
  return {
    key: folderName,
    modelo: toModelName(folderName),
    coverImage: gallery[0] ?? "",
    previewVideo: videos[0],
    gallery,
  };
});

const CocinaSection = () => {
  return (
    <section id="cocinas" className="relative py-24 md:py-32">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 md:mb-24 text-center">
        <div className="opacity-0 animate-fade-in">
          <span className="text-vintage text-xs text-gold tracking-[0.4em]">
            Colección Exclusiva
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 tracking-[0.1em] uppercase">
            Cocinas
          </h2>
          <div className="line-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Main Category */}
      <div className="container mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto">
          <CategoryCard 
            image={cocinasGeneral}
            title="Cocinas"
            subtitle="En General"
            delay={200}
          />
        </div>
      </div>

      {/* Sub Categories Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <div className="opacity-0 animate-fade-in animation-delay-400">
          <span className="text-vintage text-xs text-cream-muted tracking-[0.4em]">
            Serie Premium
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-cream mt-3 tracking-[0.15em] uppercase">
            Modelos
          </h3>
        </div>
      </div>

      {/* Sub Categories Grid */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <SubCategoryCard 
            image={liverpoolCover}
            previewVideo={liverpoolVideos[0]}
            serie="Serie Premium"
            modelo="Liverpool"
            delay={200}
            description={premiumDescriptions.Liverpool}
            gallery={liverpoolGallery}
          />
          <SubCategoryCard 
            image={bostonCover}
            previewVideo={bostonVideos[0]}
            serie="Serie Premium"
            modelo="Boston"
            delay={400}
            description={premiumDescriptions.Boston}
            gallery={bostonGallery}
          />
          {premiumCards.map((card, index) => (
            <SubCategoryCard
              key={card.key}
              image={card.coverImage}
              previewVideo={card.previewVideo}
              serie="Serie Premium"
              modelo={card.modelo}
              delay={600 + index * 200}
              description={premiumDescriptions[card.modelo]}
              gallery={card.gallery}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
    </section>
  );
};

export default CocinaSection;
