import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CollectionGrid, { type Collection } from "./CollectionGrid";
import { scrollToTop } from "@/lib/scrollToTop";

export interface CategoryNode {
  id: string;
  title: string;
  childType: "subcategories" | "collections";
  subcategories?: CategoryNode[];
  collections?: Collection[];
  disabled?: boolean;
}

interface CategoryCardProps {
  title: string;
  previewItems: string[];
  childType: "subcategories" | "collections";
  subcategories?: CategoryNode[];
  collections?: Collection[];
  disabled?: boolean;
  depth?: number;
}

const CategoryCard = ({
  title,
  previewItems,
  childType,
  subcategories,
  collections,
  disabled = false,
  depth = 0,
}: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isEmpty =
    disabled ||
    (childType === "subcategories"
      ? !subcategories?.length
      : !collections?.length);

  const toggle = () => {
    if (isEmpty) return;

    setIsExpanded((prev) => !prev);
    scrollToTop();
  };

  return (
    <div
      className={[
        "border transition-colors duration-300",
        isEmpty
          ? "border-border/20 opacity-50"
          : isExpanded
          ? "border-gold/20"
          : "border-border/30 hover:border-gold/30",
      ].join(" ")}
    >
      {/* ── Header button ── */}
      <button
        type="button"
        onClick={toggle}
        disabled={isEmpty}
        aria-expanded={isEmpty ? undefined : isExpanded}
        className={[
          "w-full flex items-center justify-between gap-4 text-left",
          depth === 0 ? "px-6 py-5" : "px-5 py-4",
          isEmpty ? "cursor-not-allowed" : "cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
        ].join(" ")}
      >
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={[
              "font-display tracking-[0.15em] uppercase text-cream leading-tight",
              depth === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
            ].join(" ")}
          >
            {title}
          </h3>

          {/* Preview chips or "Próximamente" */}
          {isEmpty ? (
            <p className="text-vintage text-[10px] text-cream-muted/60 tracking-[0.3em] mt-2">
              Próximamente
            </p>
          ) : previewItems.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {previewItems.map((item) => (
                <span
                  key={item}
                  className="text-vintage text-[10px] text-cream-muted tracking-[0.2em] border border-border/40 px-2 py-[3px]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Chevron */}
        {!isEmpty && (
          <ChevronDown
            className={[
              "w-5 h-5 text-gold flex-shrink-0",
              "transition-transform duration-300 motion-reduce:transition-none",
              isExpanded ? "rotate-180" : "",
            ].join(" ")}
          />
        )}
      </button>

      {/* Gold separator — only visible when open */}
      <div
        className={[
          "transition-opacity duration-300 motion-reduce:transition-none",
          depth === 0 ? "mx-6" : "mx-5",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="line-accent" />
      </div>

      {/* ── Accordion body (CSS grid-rows trick for smooth animation) ── */}
      <div
        className={[
          "grid",
          "transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        {/* min-h-0 + overflow-hidden is the required inner wrapper */}
        <div className="min-h-0 overflow-hidden">
          <div className={depth === 0 ? "px-6 pb-6 pt-5" : "px-5 pb-5 pt-4"}>
            {childType === "subcategories" &&
            subcategories &&
            subcategories.length > 0 ? (
              <div className="space-y-3">
                {subcategories.map((sub) => {
                  const subPreview =
                    sub.childType === "subcategories"
                      ? (sub.subcategories ?? [])
                          .slice(0, 3)
                          .map((s) => s.title)
                      : (sub.collections ?? [])
                          .slice(0, 3)
                          .map((c) => c.name);
                  return (
                    <CategoryCard
                      key={sub.id}
                      title={sub.title}
                      previewItems={subPreview}
                      childType={sub.childType}
                      subcategories={sub.subcategories}
                      collections={sub.collections}
                      disabled={sub.disabled}
                      depth={depth + 1}
                    />
                  );
                })}
              </div>
            ) : childType === "collections" &&
              collections &&
              collections.length > 0 ? (
              <CollectionGrid collections={collections} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
