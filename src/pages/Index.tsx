import marbleBg from "@/assets/marble-bg.png";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CocinaSection from "@/components/CocinaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-background"
      style={{
        backgroundImage: `url(${marbleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for marble */}
      <div className="fixed inset-0 bg-background/85 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <CocinaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
