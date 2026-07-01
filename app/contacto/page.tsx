import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contacto — Eveline Dublán",
  description:
    "Contáctame por WhatsApp, teléfono o email. Psicoterapeuta y terapeuta holística en Hidalgo, México. Sesiones en línea y presenciales.",
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <ContactHero />
        <ContactPageContent />
      </div>
      <Footer />
    </>
  );
}
