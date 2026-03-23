import { Moon } from "lucide-react";

const Footer = () => (
  <footer className="py-10 border-t border-border bg-background">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Moon className="w-5 h-5 text-accent" />
        <span className="font-display text-lg text-gradient-gold">Eveline Dublán</span>
      </div>
      <p className="text-muted-foreground font-body text-sm">
        © {new Date().getFullYear()} Eveline Dublán — Psicoterapeuta & Terapeuta Holística
      </p>
    </div>
  </footer>
);

export default Footer;
