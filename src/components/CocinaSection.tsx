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
            description="Como testimonio de herencias anglosajonas, su esencia conjuga calidez y sobriedad, bienestar compartido y la tibieza de los días."
            gallery={liverpoolGallery}
          />
          <SubCategoryCard 
            image={bostonCover}
            previewVideo={bostonVideos[0]}
            serie="Serie Premium"
            modelo="Boston"
            delay={400}
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
