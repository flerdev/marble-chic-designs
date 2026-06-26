import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import CatalogCard from "./CatalogCard";
import type { CatalogSection } from "@/data/catalog";

type Props = CatalogSection;

/**
 * Generic home-page section for a product category.
 * Shows up to 3 subcategory cards + a "Ver todo" link.
 * When items is empty, renders a "Próximamente" placeholder.
 */
const CatalogPreviewSection = ({
  id,
  sectionLabel,
  title,
  slug,
  items,
}: Props) => {
  const isEmpty = items.length === 0;
  const hasPage = !isEmpty; // show "Ver todo" only if there's something to see

  return (
    <section id={id} className="relative py-24 md:py-32 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Header row ── */}
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div className="opacity-0 animate-fade-in">
              <span className=" text-xs text-gold tracking-[0.2em]">
                {sectionLabel}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-cream mt-3 tracking-[0.1em] uppercase">
                {title}
              </h2>
              <div className="line-accent mt-6" />
            </div>

            {hasPage && (
              <Link
                to={`/${slug}`}
                className="group flex items-center gap-2 text-vintage text-xs text-cream-muted tracking-[0.3em] hover:text-gold transition-colors duration-300 mb-1"
              >
                <span>Ver todo</span>
                <span className="w-7 h-7 flex items-center justify-center border border-cream-muted/30 group-hover:border-gold/60 transition-colors duration-300">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </Link>
            )}
          </div>

          {/* ── Cards or placeholder ── */}
          {isEmpty ? (
            <div className="py-14 flex flex-col items-center justify-center border border-border/20 opacity-50">
              <p className="text-vintage text-xs text-cream-muted tracking-[0.4em]">
                Próximamente
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item, index) =>
                item.image ? (
                  <CatalogCard
                    key={item.id}
                    image={item.image}
                    badge={item.badge}
                    name={item.name}
                    to={`/${item.slug}`}
                    delay={200 + index * 150}
                  />
                ) : (
                  /* Item exists in catalog but has no image yet */
                  <div
                    key={item.id}
                    className="aspect-[16/10] border border-border/20 flex flex-col items-center justify-center gap-3 opacity-40"
                  >
                    <span className="font-display text-lg text-cream tracking-[0.1em] uppercase">
                      {item.name}
                    </span>
                    <span className="text-vintage text-[10px] text-cream-muted tracking-[0.3em]">
                      Próximamente
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogPreviewSection;
