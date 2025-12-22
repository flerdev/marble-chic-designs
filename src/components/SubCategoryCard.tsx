import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface SubCategoryCardProps {
  image: string;
  serie: string;
  modelo: string;
  delay?: number;
  description?: string;
}

const SubCategoryCard = ({ image, serie, modelo, delay = 0, description }: SubCategoryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
              <button 
                onClick={() => setIsOpen(true)}
                className="mt-4 text-vintage text-xs text-gold border-b border-gold/50 pb-1 hover:border-gold transition-colors"
              >
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

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl bg-background border-border/50 p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-[4/3] md:aspect-auto">
              <img 
                src={image} 
                alt={modelo}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Description */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-vintage text-xs text-gold tracking-[0.4em] mb-4">
                {serie}
              </span>
              <h3 className="font-display text-4xl md:text-5xl text-cream tracking-[0.15em] uppercase mb-8">
                {modelo}
              </h3>
              <div className="line-accent mb-8" />
              {description && (
                <p className="text-vintage text-base text-cream-muted leading-relaxed tracking-wide">
                  {description}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubCategoryCard;
