import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import cocinasGeneral from "@/assets/cocinas-general.png";
import CategoryHeroCard from "./CategoryHeroCard";
import SubCategoryCard from "./SubCategoryCard";
import { premiumCollections } from "@/data/cocinas";

const PREVIEW_COUNT = 3;

const CocinaSection = () => {
  const previewCollections = premiumCollections.slice(0, PREVIEW_COUNT);

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

      {/* Main Category Hero */}
      <div className="container mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto">
          <CategoryHeroCard
            image={cocinasGeneral}
            title="Cocinas"
            subtitle="En General"
            delay={200}
          />
        </div>
      </div>

      {/* Preview grid */}
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Row: serie label + "Ver todo" link */}
          <div className="opacity-0 animate-fade-in animation-delay-400 flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="text-vintage text-xs text-cream-muted tracking-[0.4em]">
                Serie Premium
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-cream mt-2 tracking-[0.15em] uppercase">
                Modelos
              </h3>
            </div>

            <Link
              to="/cocinas"
              className="group flex items-center gap-2 text-vintage text-xs text-cream-muted tracking-[0.3em] hover:text-gold transition-colors duration-300 mb-1"
            >
              <span>Ver todo</span>
              <span className="w-7 h-7 flex items-center justify-center border border-cream-muted/30 group-hover:border-gold/60 transition-colors duration-300">
                <Plus className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* 3 preview cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {previewCollections.map((col, index) => (
              <SubCategoryCard
                key={col.id}
                image={col.image}
                previewVideo={col.previewVideo}
                serie={col.serieLabel}
                modelo={col.name}
                delay={400 + index * 150}
                description={col.description}
                gallery={col.gallery}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
    </section>
  );
};

export default CocinaSection;
