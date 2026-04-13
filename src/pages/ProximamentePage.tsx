import { useParams, Link } from "react-router-dom";
import marbleBg from "@/assets/marble-bg.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { catalog } from "@/data/catalog";

/**
 * Temporary placeholder for categories that don't have a dedicated page yet.
 * Replace with a full category page once the content is ready.
 */
const ProximamentePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const section = catalog.find((s) => s.slug === slug);
  const title = section?.title ?? slug ?? "Sección";

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundImage: `url(${marbleBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 bg-background/85 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center opacity-0 animate-fade-in">
            <span className="text-vintage text-xs text-gold tracking-[0.4em]">
              En preparación
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 tracking-[0.1em] uppercase">
              {title}
            </h1>
            <div className="line-accent mx-auto mt-6 mb-8" />
            <p className="font-body text-base text-cream-muted max-w-sm mx-auto leading-relaxed">
              Esta sección estará disponible próximamente.
            </p>
            <Link
              to="/"
              className="inline-block mt-10 px-6 py-3 border border-gold/50 text-vintage text-xs text-gold tracking-[0.3em] hover:bg-gold/10 transition-colors duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProximamentePage;
