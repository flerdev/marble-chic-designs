import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface SubCategoryCardProps {
  image: string;
  serie: string;
  modelo: string;
  delay?: number;
  description?: string[];
  gallery?: string[];
  previewVideo?: string;
}

const SubCategoryCard = ({ image, serie, modelo, delay = 0, description, gallery, previewVideo }: SubCategoryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const images = gallery && gallery.length > 0 ? gallery : image ? [image] : [];

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <>
      <div 
        className="group relative overflow-hidden cursor-pointer opacity-0 animate-slide-up"
        style={{ animationDelay: `${delay}ms` }}
        onClick={() => setIsOpen(true)}
      >
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          {previewVideo ? (
            <video
              src={previewVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
            />
          ) : (
            <img 
              src={image} 
              alt={modelo}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
            />
          )}
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
              {images.length > 0 && (
                <button 
                  onClick={() => setIsOpen(true)}
                  className="mt-4 text-vintage text-xs text-gold border-b border-gold/50 pb-1 hover:border-gold transition-colors"
                >
                  Descubrir
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-8 h-[1px] bg-gold" />
          <div className="absolute top-4 right-4 w-[1px] h-8 bg-gold" />
        </div>
      </div>

      {/* Modal with Gallery */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[max(92vw,1500px)] max-h-[90vh] bg-background border-border/50 p-0 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col">
            {/* Gallery */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-background-dark">
              {/* Images */}
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    index === currentIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${modelo} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/60 backdrop-blur-sm border border-border/30 text-cream hover:bg-background/80 hover:border-gold/50 transition-all duration-300 group"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:text-gold transition-colors" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/60 backdrop-blur-sm border border-border/30 text-cream hover:bg-background/80 hover:border-gold/50 transition-all duration-300 group"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:text-gold transition-colors" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-gold w-6' 
                          : 'bg-cream/40 hover:bg-cream/60'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-background/60 backdrop-blur-sm border border-border/30">
                  <span className="text-vintage text-xs text-cream">
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="p-6 md:p-8 border-t border-border/30">
              <span className="text-vintage text-xs text-gold tracking-[0.4em] mb-4">
                {serie}
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-cream tracking-[0.15em] uppercase mb-6">
                {modelo}
              </h3>
              <div className="line-accent mb-6" />
              {description && description.length > 0 && (
                <div className="space-y-4 font-body text-base md:text-lg text-cream-muted leading-relaxed tracking-normal">
                  {description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="px-6 pb-8 md:px-8 border-t border-border/30">
              <div className="py-8">
                <h4 className="font-display text-2xl text-cream tracking-[0.12em] uppercase">
                  ¿Estás desarrollando un proyecto?
                </h4>
                <p className="font-body text-base md:text-lg text-cream-muted mt-3 max-w-2xl leading-relaxed tracking-normal">
                  Contanos sobre tu espacio para que podamos asesorarte de forma personalizada según la colección que te interese.
                </p>
              </div>
              <form
                className="grid gap-5 md:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsSubmitted(true);
                }}
              >
                <input type="hidden" name="coleccion" value={modelo} />
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-nombre`}>
                    Nombre y apellido
                  </label>
                  <input
                    id={`${modelo}-nombre`}
                    name="nombre"
                    required
                    className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-email`}>
                    Email
                  </label>
                  <input
                    id={`${modelo}-email`}
                    name="email"
                    required
                    className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-telefono`}>
                    Teléfono
                  </label>
                  <input
                    id={`${modelo}-telefono`}
                    name="telefono"
                    required
                    className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
                    type="tel"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-perfil`}>
                    Perfil
                  </label>
                  <select
                    id={`${modelo}-perfil`}
                    name="perfil"
                    required
                    className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Diseñador/a de interiores">Diseñador/a de interiores</option>
                    <option value="Arquitecto/a">Arquitecto/a</option>
                    <option value="Desarrollador/a inmobiliario">Desarrollador/a inmobiliario</option>
                    <option value="Inmobiliaria">Inmobiliaria</option>
                    <option value="Particular">Particular</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-tipo-proyecto`}>
                    Tipo de proyecto
                  </label>
                  <select
                    id={`${modelo}-tipo-proyecto`}
                    name="tipo_proyecto"
                    className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Desarrollo inmobiliario">Desarrollo inmobiliario</option>
                    <option value="Reforma / remodelación">Reforma / remodelación</option>
                    <option value="A definir">A definir</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-descripcion`}>
                    Descripción del proyecto
                  </label>
                  <textarea
                    id={`${modelo}-descripcion`}
                    name="descripcion"
                    rows={4}
                    className="rounded-md border border-border/50 bg-background px-4 py-3 text-cream outline-none focus:border-gold/70"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs tracking-[0.2em] text-cream-muted uppercase" htmlFor={`${modelo}-archivo`}>
                    Adjuntar archivo (opcional)
                  </label>
                  <input
                    id={`${modelo}-archivo`}
                    name="archivo"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="rounded-md border border-border/50 bg-background px-4 py-2 text-cream file:mr-4 file:rounded-md file:border-0 file:bg-gold/10 file:px-4 file:py-2 file:text-xs file:text-gold hover:file:bg-gold/20"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col items-start gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 border border-gold/60 text-xs tracking-[0.3em] text-gold uppercase transition-colors hover:bg-gold/10"
                  >
                    Solicitar asesoramiento
                  </button>
                  {isSubmitted && (
                    <p className="text-sm text-cream-muted">
                      Gracias por tu consulta. Recibimos la información sobre tu proyecto y la colección seleccionada. Nos pondremos en contacto para asesorarte de forma personalizada.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubCategoryCard;
