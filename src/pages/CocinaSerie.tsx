import { useParams, Link } from "react-router-dom";
import marbleBg from "@/assets/marble-bg.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubCategoryCard from "@/components/SubCategoryCard";
import { cocinasCategory } from "@/data/cocinas";

const CocinaSerie = () => {
  const { serie } = useParams<{ serie: string }>();

  const subcategory = cocinasCategory.subcategories?.find((s) => s.id === serie);
  const collections = subcategory?.collections ?? [];
  const serieName = subcategory?.title ?? serie ?? "";

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

        <main className="pt-32 pb-24 md:pb-32">
          {/* Breadcrumb */}
          <div className="container mx-auto px-6 mb-4">
            <div className="max-w-6xl mx-auto">
              <Link
                to="/cocinas"
                className="text-vintage text-xs text-cream-muted/60 tracking-[0.3em] hover:text-gold transition-colors duration-300"
              >
                ← Cocinas
              </Link>
            </div>
          </div>

          {/* Page header */}
          <div className="container mx-auto px-6 mb-16 md:mb-20 text-center">
            <div className="opacity-0 animate-fade-in">
              <span className="text-vintage text-xs text-gold tracking-[0.4em]">
                Cocinas
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 tracking-[0.1em] uppercase">
                {serieName}
              </h1>
              <div className="line-accent mx-auto mt-6" />
            </div>
          </div>

          {/* Collection cards */}
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {collections.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {collections.map((col, index) => (
                    <SubCategoryCard
                      key={col.id}
                      image={col.image}
                      previewVideo={col.previewVideo}
                      serie={col.serieLabel}
                      modelo={col.name}
                      delay={200 + index * 150}
                      description={col.description}
                      gallery={col.gallery}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center gap-4 border border-border/20 opacity-50">
                  <p className="text-vintage text-xs text-cream-muted tracking-[0.4em]">
                    Próximamente
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CocinaSerie;
