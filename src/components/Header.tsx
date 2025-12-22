import logo from "@/assets/logo-creato.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="CREATO by PALERMO" className="h-12 w-auto" />
          </a>
          
          <ul className="hidden md:flex items-center gap-10">
            <li>
              <a 
                href="#inicio" 
                className="text-vintage text-sm text-cream hover:text-gold transition-colors duration-300"
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#cocinas" 
                className="text-vintage text-sm text-cream hover:text-gold transition-colors duration-300"
              >
                Cocinas
              </a>
            </li>
            <li>
              <a 
                href="#colecciones" 
                className="text-vintage text-sm text-cream hover:text-gold transition-colors duration-300"
              >
                Colecciones
              </a>
            </li>
            <li>
              <a 
                href="#contacto" 
                className="text-vintage text-sm text-cream hover:text-gold transition-colors duration-300"
              >
                Contacto
              </a>
            </li>
          </ul>

          <button className="md:hidden text-cream">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
