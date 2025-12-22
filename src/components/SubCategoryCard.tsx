interface SubCategoryCardProps {
  image: string;
  serie: string;
  modelo: string;
  delay?: number;
}

const SubCategoryCard = ({ image, serie, modelo, delay = 0 }: SubCategoryCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden cursor-pointer opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={modelo}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-center pb-8 px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-vintage text-xs text-cream-muted tracking-[0.25em]">
              {serie}
            </span>
            <span className="w-8 h-[1px] bg-gold/50" />
            <span className="font-display text-xl md:text-2xl text-cream tracking-[0.15em] uppercase">
              {modelo}
            </span>
          </div>
          
          {/* Hover reveal */}
          <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-500">
            <button className="mt-4 text-vintage text-xs text-gold border-b border-gold/50 pb-1 hover:border-gold transition-colors">
              Descubrir
            </button>
          </div>
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-8 h-[1px] bg-gold" />
        <div className="absolute top-4 right-4 w-[1px] h-8 bg-gold" />
      </div>
    </div>
  );
};

export default SubCategoryCard;
