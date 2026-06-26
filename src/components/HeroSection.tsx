const HeroSection = () => {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/inicio-video.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      
      {/* Content - Only tagline and button */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="opacity-0 animate-slide-up animation-delay-200">
          <div className="line-accent mx-auto mb-6" />
          <p className="text-vintage text-sm md:text-base text-cream-muted tracking-[0.4em]">
            Cocinas de Diseño Exclusivo
          </p>
        </div>
        
        <div className="opacity-0 animate-slide-up animation-delay-400 mt-12">
          <a 
            href="#cocinas" 
            className="inline-flex items-center gap-3 border border-gold/50 px-8 py-3 text-vintage text-sm text-cream hover:bg-gold/10 hover:border-gold transition-all duration-500"
          >
            Explorar Colección
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-slow animation-delay-600">
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
