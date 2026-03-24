import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Meditaciones", href: "#meditaciones" },
  { label: "Contacto", href: "#contacto" },
  { label: "Blog", href: "/blog" },
];

const NavItem = ({ link, onClick }: { link: { label: string; href: string }; onClick?: () => void }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (link.href.startsWith("/")) {
    return (
      <Link
        to={link.href}
        onClick={onClick}
        className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        {link.label}
      </Link>
    );
  }

  // On home page, use anchor links; on other pages, navigate to /#section
  if (isHome) {
    return (
      <a
        href={link.href}
        onClick={onClick}
        className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      to={`/${link.href}`}
      onClick={onClick}
      className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      {link.label}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {isHome ? (
          <a href="#inicio" className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-semibold text-gradient-purple">Eveline Dublán</span>
          </a>
        ) : (
          <Link to="/#inicio" className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-semibold text-gradient-purple">Eveline Dublán</span>
          </Link>
        )}

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavItem link={link} />
            </li>
          ))}
        </ul>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavItem link={link} onClick={() => setIsOpen(false)} />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
