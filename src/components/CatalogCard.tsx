import { Link } from "react-router-dom";

interface CatalogCardProps {
  image: string;
  badge: string;   // e.g. "Cocinas"
  name: string;    // e.g. "Serie Premium"
  to: string;      // React Router path
  delay?: number;
}

/**
 * Navigating image card — same visual language as SubCategoryCard
 * but clicking routes to a page instead of opening a modal.
 */
const CatalogCard = ({ image, badge, name, to, delay = 0 }: CatalogCardProps) => (
  <Link to={to} className="block">
    <div
      className="group relative overflow-hidden cursor-pointer opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
          />
        ) : (
          <div className="w-full h-full bg-card/60 flex items-center justify-center">
            <span className="text-vintage text-xs text-cream-muted/40 tracking-[0.3em]">
              Sin imagen
            </span>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-end justify-center pb-8 px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-xs text-cream-muted tracking-[0.25em]">
              {badge}
            </span>
            <span className="w-8 h-[1px] bg-gold/50" />
            <span className="font-display text-xl md:text-2xl text-cream tracking-[0.15em] uppercase">
              {name}
            </span>
          </div>

          {/* Hover reveal */}
          <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-500">
            <span className="mt-4 inline-block text-vintage text-xs text-gold border-b border-gold/50 pb-1">
              Ver Colección
            </span>
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-8 h-[1px] bg-gold" />
        <div className="absolute top-4 right-4 w-[1px] h-8 bg-gold" />
      </div>
    </div>
  </Link>
);

export default CatalogCard;
