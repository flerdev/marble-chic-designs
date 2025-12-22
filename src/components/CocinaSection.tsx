import cocinasGeneral from "@/assets/cocinas-general.png";
import liverpool from "@/assets/liverpool.jpg";
import boston from "@/assets/boston.jpg";
import CategoryCard from "./CategoryCard";
import SubCategoryCard from "./SubCategoryCard";

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
