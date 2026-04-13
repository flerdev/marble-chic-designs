interface CategoryHeroCardProps {
  image: string;
  title: string;
  subtitle?: string;
  delay?: number;
}

const CategoryHeroCard = ({ image, title, subtitle, delay = 0 }: CategoryHeroCardProps) => {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 card-overlay opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6">
        {subtitle && (
          <span className="text-vintage text-xs text-cream-muted tracking-[0.3em] mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {subtitle}
          </span>
        )}

        <h3 className="font-display text-3xl md:text-4xl text-cream text-center tracking-[0.15em] uppercase">
          {title}
        </h3>

        <div className="line-accent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

        <span className="text-vintage text-xs text-gold mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          Ver Más
        </span>
      </div>
    </div>
  );
};

export default CategoryHeroCard;
