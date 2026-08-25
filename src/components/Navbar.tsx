"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logos } from "@/lib/brand";
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
      {
        label: "Hierbas Mágicas",
        href: "/luz-de-luna/hierbas-magicas",
      },
    ],
  },
  { label: "Cursos", href: "/cursos" },
  { label: "Contacto", href: "/contacto" },
  { label: "Blog", href: "/blog" },
];

type SimpleLink = { label: string; href: string };
type DropdownLink = { label: string; children: SimpleLink[] };
type NavLink = SimpleLink | DropdownLink;

const isDropdown = (link: NavLink): link is DropdownLink => "children" in link;

const navLinkClass =
  "text-sm font-body font-medium text-white/75 hover:text-[hsl(42,70%,62%)] transition-colors duration-300";

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
        className={navLinkClass}
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
        className={navLinkClass}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={`/${link.href}`}
      onClick={onClick}
      className={navLinkClass}
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
        className="flex items-center gap-1 text-sm font-body font-medium text-white/75 hover:text-[hsl(42,70%,62%)] transition-colors duration-300"
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
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-lg border border-white/10 bg-[hsl(270,30%,14%)]/98 py-2 shadow-lg backdrop-blur-xl overflow-hidden"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-body text-white/75 hover:text-[hsl(42,70%,62%)] hover:bg-white/5 transition-colors duration-200"
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
        className="flex items-center gap-1 text-sm font-body font-medium text-white/75 hover:text-[hsl(42,70%,62%)] transition-colors duration-300"
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
                className="text-sm font-body text-white/75 hover:text-[hsl(42,70%,62%)] transition-colors duration-200"
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

const BrandMarkContent = () => (
  <>
    <Image
      src={logos.imago}
      alt=""
      aria-hidden
      width={40}
      height={40}
      className="h-9 w-9 object-contain"
      priority
    />
    <span className="font-display text-lg font-bold leading-none tracking-tight sm:text-xl">
      <span className="text-gradient-gold">Eveline</span>{" "}
      <span className="text-white">Dublán</span>
    </span>
  </>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  const isHome = location === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[hsl(270,30%,12%)]/90 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {isHome ? (
          <a href="#inicio" className="flex shrink-0 items-center gap-3">
            <BrandMarkContent />
          </a>
        ) : (
          <Link href="/#inicio" className="flex shrink-0 items-center gap-3">
            <BrandMarkContent />
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
          className="md:hidden text-white"
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
            className="md:hidden border-b border-white/10 bg-[hsl(270,30%,12%)]/98 backdrop-blur-xl"
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
