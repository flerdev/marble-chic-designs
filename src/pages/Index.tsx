import marbleBg from "@/assets/marble-bg.png";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CatalogPreviewSection from "@/components/CatalogPreviewSection";
import Footer from "@/components/Footer";
import { catalog } from "@/data/catalog";

const Index = () => {
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
      {/* Dark overlay for marble texture */}
      <div className="fixed inset-0 bg-background/85 pointer-events-none" />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          {catalog.map((section) => (
            <CatalogPreviewSection key={section.id} {...section} />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
