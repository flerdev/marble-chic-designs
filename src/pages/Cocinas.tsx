import marbleBg from "@/assets/marble-bg.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogCard from "@/components/CatalogCard";
import { catalog } from "@/data/catalog";

const cocinasSection = catalog.find((s) => s.id === "cocinas");
const serieItems = cocinasSection?.items ?? [];

const Cocinas = () => (
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

      <main className="pt-32 pb-24 md:pb-32">
        {/* Page header */}
        <div className="container mx-auto px-6 mb-16 md:mb-20 text-center">
          <div className="opacity-0 animate-fade-in">
            <span className="text-vintage text-xs text-gold tracking-[0.4em]">
              Catálogo Completo
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 tracking-[0.1em] uppercase">
              Cocinas
            </h1>
            <div className="line-accent mx-auto mt-6" />
          </div>
        </div>

        {/* Serie cards */}
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serieItems.map((item, index) => (
              <CatalogCard
                key={item.id}
                image={item.image}
                badge={item.badge}
                name={item.name}
                to={`/${item.slug}`}
                delay={200 + index * 150}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </div>
);

export default Cocinas;
