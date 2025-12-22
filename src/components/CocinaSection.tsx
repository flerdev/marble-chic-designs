import cocinasGeneral from "@/assets/cocinas-general.png";
import liverpool from "@/assets/liverpool.jpg";
import boston from "@/assets/boston.jpg";
import liverpool1 from "@/assets/liverpool-1.jpg";
import liverpool2 from "@/assets/liverpool-2.jpg";
import liverpool3 from "@/assets/liverpool-3.jpg";
import liverpool4 from "@/assets/liverpool-4.jpg";
import liverpool5 from "@/assets/liverpool-5.jpg";
import liverpool6 from "@/assets/liverpool-6.jpg";
import liverpool7 from "@/assets/liverpool-7.jpg";
import liverpool8 from "@/assets/liverpool-8.jpg";
import liverpool9 from "@/assets/liverpool-9.jpg";
import liverpool10 from "@/assets/liverpool-10.jpg";
import CategoryCard from "./CategoryCard";
import SubCategoryCard from "./SubCategoryCard";

const liverpoolGallery = [
  liverpool1,
  liverpool2,
  liverpool3,
  liverpool4,
  liverpool5,
  liverpool6,
  liverpool7,
  liverpool8,
  liverpool9,
  liverpool10,
];

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
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          <SubCategoryCard 
            image={liverpool}
            serie="Serie Premium"
            modelo="Liverpool"
            delay={200}
            description="Como testimonio de herencias anglosajonas, su esencia conjuga calidez y sobriedad, bienestar compartido y la tibieza de los días."
            gallery={liverpoolGallery}
          />
          <SubCategoryCard 
            image={boston}
            serie="Serie Premium"
            modelo="Boston"
            delay={400}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
    </section>
  );
};

export default CocinaSection;
