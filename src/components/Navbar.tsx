"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, ChevronDown } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Citas", href: "/citas" },
  { label: "Meditaciones", href: "/meditaciones" },
  {
    label: "Luz de Luna",
    children: [
      { label: "Luz de Luna", href: "/luz-de-luna" },
      {
        label: "Cuarzos y Cristales",
        href: "/luz-de-luna/cuarzos-y-cristales",
      },
    ],
  },
  { label: "Cursos", href: "/cursos" },
  { label: "Contacto", href: "#contacto" },
  { label: "Blog", href: "/blog" },
];

type SimpleLink = { label: string; href: string };
type DropdownLink = { label: string; children: SimpleLink[] };
type NavLink = SimpleLink | DropdownLink;

const isDropdown = (link: NavLink): link is DropdownLink => "children" in link;

const NavItemLink = ({
  link,
  onClick,
}: {
  link: SimpleLink;
  onClick?: () => void;
}) => {
  const location = usePathname();
  const isHome = location === "/";

  if (link.href.startsWith("/")) {
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        {link.label}
      </Link>
    );
  }

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
      href={`/${link.href}`}
      onClick={onClick}
      className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      {link.label}
    </Link>
  );
};

const DesktopDropdown = ({ link }: { link: DropdownLink }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        {link.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-lg py-2 overflow-hidden"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-body text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileDropdown = ({
  link,
  onNavigate,
}: {
  link: DropdownLink;
  onNavigate: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        {link.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center gap-2 mt-2 overflow-hidden"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  const isHome = location === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {isHome ? (
          <a href="#inicio" className="flex items-center gap-3">
            <Image
              src="/assets/logos/eveline-logo.png"
              alt="Eveline Dublán"
              className="h-10 w-auto object-contain"
              width={160}
              height={40}
            />
          </a>
        ) : (
          <Link href="/#inicio" className="flex items-center gap-3">
            <Image
              src="/assets/logos/eveline-logo.png"
              alt="Eveline Dublán"
              className="h-10 w-auto object-contain"
              width={160}
              height={40}
            />
          </Link>
        )}

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              {isDropdown(link) ? (
                <DesktopDropdown link={link} />
              ) : (
                <NavItemLink link={link} />
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
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
                <li key={link.label}>
                  {isDropdown(link) ? (
                    <MobileDropdown
                      link={link}
                      onNavigate={() => setIsOpen(false)}
                    />
                  ) : (
                    <NavItemLink link={link} onClick={() => setIsOpen(false)} />
                  )}
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
