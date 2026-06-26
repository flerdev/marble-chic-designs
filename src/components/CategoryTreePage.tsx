import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import marbleBg from "@/assets/marble-bg.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogCard from "@/components/CatalogCard";
import { type ProductNode } from "@/data/piletas";

// ─── Tree traversal ───────────────────────────────────────────────────────────

function findNode(root: ProductNode, segments: string[]): ProductNode | null {
  let node = root;
  for (const seg of segments) {
    const child = node.children?.find((c) => c.id === seg);
    if (!child) return null;
    node = child;
  }
  return node;
}

function buildBreadcrumbs(
  root: ProductNode,
  basePath: string,
  segments: string[]
) {
  const crumbs: Array<{ name: string; path: string }> = [
    { name: root.name, path: basePath },
  ];
  let node = root;
  for (let i = 0; i < segments.length; i++) {
    const child = node.children?.find((c) => c.id === segments[i]);
    if (!child) break;
    node = child;
    crumbs.push({
      name: node.name,
      path: basePath + "/" + segments.slice(0, i + 1).join("/"),
    });
  }
  return crumbs;
}

// ─── Main component ───────────────────────────────────────────────────────────

interface CategoryTreePageProps {
  root: ProductNode;
  basePath: string; // e.g. "/piletas", "/placards"
}

const CategoryTreePage = ({ root, basePath }: CategoryTreePageProps) => {
  const { "*": splat = "" } = useParams();
  const segments = splat.split("/").filter(Boolean);
  const currentNode = findNode(root, segments);

  if (!currentNode) {
    return (
      <PageShell>
        <div className="text-center py-20 opacity-50">
          <p className="text-vintage text-xs text-cream-muted tracking-[0.4em]">
            Sección no encontrada
          </p>
        </div>
      </PageShell>
    );
  }

  const currentPath = basePath + (splat ? "/" + splat : "");
  const breadcrumbs = buildBreadcrumbs(root, basePath, segments);
  const isLeaf = !currentNode.children || currentNode.children.length === 0;
  const children = currentNode.children ?? [];

  const breadcrumbBar = breadcrumbs.length > 1 && (
    <div className="container mx-auto px-6 mb-4">
      <div className="max-w-6xl mx-auto flex items-center gap-2 flex-wrap">
        {breadcrumbs.slice(0, -1).map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <Link
              to={crumb.path}
              className="text-vintage text-xs text-cream-muted/60 tracking-[0.3em] hover:text-gold transition-colors duration-300"
            >
              {crumb.name}
            </Link>
            <span className="text-cream-muted/30 text-xs">›</span>
          </span>
        ))}
        <span className="text-vintage text-xs text-cream-muted tracking-[0.3em]">
          {breadcrumbs[breadcrumbs.length - 1].name}
        </span>
      </div>
    </div>
  );

  if (isLeaf) {
    return (
      <PageShell>
        {breadcrumbBar}
        <LeafGalleryPage node={currentNode} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      {breadcrumbBar}

      <div className="container mx-auto px-6 mb-16 md:mb-20 text-center">
        <div className="opacity-0 animate-fade-in">
          <span className="text-vintage text-xs text-gold tracking-[0.4em]">
            {currentNode.badge}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 tracking-[0.1em] uppercase">
            {currentNode.name}
          </h1>
          <div className="line-accent mx-auto mt-6" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {children.map((child, index) => (
            <CatalogCard
              key={child.id}
              image={child.image}
              badge={child.badge}
              name={child.name}
              to={`${currentPath}/${child.id}`}
              delay={200 + index * 150}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
};

// ─── Leaf gallery ─────────────────────────────────────────────────────────────

const LeafGalleryPage = ({ node }: { node: ProductNode }) => {
  const images =
    node.gallery && node.gallery.length > 0
      ? node.gallery
      : node.image
      ? [node.image]
      : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        {/* Gallery */}
        <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-background-dark">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={img}
                alt={`${node.name} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

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

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gold w-6"
                      : "bg-cream/40 hover:bg-cream/60 w-2"
                  }`}
                />
              ))}
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-background/60 backdrop-blur-sm border border-border/30">
              <span className="text-vintage text-xs text-cream">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="p-6 md:p-8 border border-t-0 border-border/30">
          <span className="text-vintage text-xs text-gold tracking-[0.4em]">
            {node.badge}
          </span>
          <h1 className="font-display text-3xl md:text-4xl text-cream tracking-[0.15em] uppercase mt-2 mb-6">
            {node.name}
          </h1>
          <div className="line-accent mb-6" />
          {node.description && node.description.length > 0 && (
            <div className="space-y-4 font-body text-base md:text-lg text-cream-muted leading-relaxed tracking-normal">
              {node.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Contact form */}
        <div className="px-6 pb-8 md:px-8 border border-t-0 border-border/30">
          <div className="py-8">
            <h4 className="font-display text-2xl text-cream tracking-[0.12em] uppercase">
              ¿Estás desarrollando un proyecto?
            </h4>
            <p className="font-body text-base md:text-lg text-cream-muted mt-3 max-w-2xl leading-relaxed tracking-normal">
              Contanos sobre tu espacio para que podamos asesorarte de forma
              personalizada según la colección que te interese.
            </p>
          </div>
          <form
            className="grid gap-5 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitted(true);
            }}
          >
            <input type="hidden" name="coleccion" value={node.name} />
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-nombre"
              >
                Nombre y apellido
              </label>
              <input
                id="lp-nombre"
                name="nombre"
                required
                type="text"
                className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-email"
              >
                Email
              </label>
              <input
                id="lp-email"
                name="email"
                required
                type="email"
                className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-telefono"
              >
                Teléfono
              </label>
              <input
                id="lp-telefono"
                name="telefono"
                required
                type="tel"
                className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-perfil"
              >
                Perfil
              </label>
              <select
                id="lp-perfil"
                name="perfil"
                required
                className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
              >
                <option value="">Seleccionar</option>
                <option value="Diseñador/a de interiores">
                  Diseñador/a de interiores
                </option>
                <option value="Arquitecto/a">Arquitecto/a</option>
                <option value="Desarrollador/a inmobiliario">
                  Desarrollador/a inmobiliario
                </option>
                <option value="Inmobiliaria">Inmobiliaria</option>
                <option value="Particular">Particular</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-tipo-proyecto"
              >
                Tipo de proyecto
              </label>
              <select
                id="lp-tipo-proyecto"
                name="tipo_proyecto"
                className="h-12 rounded-md border border-border/50 bg-background px-4 text-cream outline-none focus:border-gold/70"
              >
                <option value="">Seleccionar</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Desarrollo inmobiliario">
                  Desarrollo inmobiliario
                </option>
                <option value="Reforma / remodelación">
                  Reforma / remodelación
                </option>
                <option value="A definir">A definir</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-descripcion"
              >
                Descripción del proyecto
              </label>
              <textarea
                id="lp-descripcion"
                name="descripcion"
                rows={4}
                className="rounded-md border border-border/50 bg-background px-4 py-3 text-cream outline-none focus:border-gold/70"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                className="text-xs tracking-[0.2em] text-cream-muted uppercase"
                htmlFor="lp-archivo"
              >
                Adjuntar archivo (opcional)
              </label>
              <input
                id="lp-archivo"
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
                  Gracias por tu consulta. Recibimos la información sobre tu
                  proyecto y la colección seleccionada. Nos pondremos en
                  contacto para asesorarte de forma personalizada.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ─── Layout wrapper ───────────────────────────────────────────────────────────

const PageShell = ({ children }: { children: React.ReactNode }) => (
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
      <main className="pt-32 pb-24 md:pb-32">{children}</main>
      <Footer />
    </div>
  </div>
);

export default CategoryTreePage;
