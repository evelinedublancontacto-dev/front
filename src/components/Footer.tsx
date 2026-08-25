"use client";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import TwinkleStars from "@/components/TwinkleStars";
import { logos } from "@/lib/brand";

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Wave divider from white to footer */}
    <div className="relative -mb-1">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <path
          d="M0 60C240 0 480 120 720 60C960 0 1200 120 1440 60V120H0V60Z"
          fill="hsl(270 30% 12%)"
        />
      </svg>
    </div>

    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <Image
        src="/assets/footer-bg.jpg"
        alt=""
        width={1920}
        height={600}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsla(270,30%,12%,0.85) 0%, hsla(270,30%,12%,0.75) 50%, hsla(270,30%,12%,0.9) 100%)",
        }}
      />
    </div>

    <TwinkleStars count={15} topMin={20} topRange={70} />

    {/* Content */}
    <div className="relative z-10 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src={logos.eveline.vertical}
              alt="Eveline Dublán"
              width={180}
              height={72}
              className="h-20 w-auto object-contain mb-4"
              style={{ width: "auto" }}
            />
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "hsl(270 30% 75%)" }}
            >
              Psicoterapeuta & Terapeuta Holística. Sanación y florecimiento
              para humanos y animales.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-display text-lg mb-4"
              style={{ color: "hsl(0 0% 100%)" }}
            >
              Servicios
            </h4>
            <ul
              className="space-y-2 font-body text-sm"
              style={{ color: "hsl(270 30% 75%)" }}
            >
              <li>
                <a
                  href="/servicios/psicoterapia"
                  className="hover:text-gold-light transition-colors"
                >
                  Psicoterapia
                </a>
              </li>
              <li>
                <a
                  href="/servicios/sanacion-energetica"
                  className="hover:text-gold-light transition-colors"
                >
                  Sanación Energética
                </a>
              </li>
              <li>
                <a
                  href="/servicios/cuencos-tibetanos"
                  className="hover:text-gold-light transition-colors"
                >
                  Cuencos Tibetanos
                </a>
              </li>
              <li>
                <a
                  href="/meditaciones"
                  className="hover:text-gold-light transition-colors"
                >
                  Meditaciones
                </a>
              </li>
              <li>
                <a
                  href="/servicios/sanacion-con-velas"
                  className="hover:text-gold-light transition-colors"
                >
                  Sanación con Velas
                </a>
              </li>
              <li>
                <a
                  href="/servicios/sanacion-para-animales"
                  className="hover:text-gold-light transition-colors"
                >
                  Sanación para Animales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-display text-lg mb-4"
              style={{ color: "hsl(0 0% 100%)" }}
            >
              Contacto
            </h4>
            <ul
              className="space-y-3 font-body text-sm"
              style={{ color: "hsl(270 30% 75%)" }}
            >
              <li className="flex items-center gap-2">
                <Mail
                  className="w-4 h-4"
                  style={{ color: "hsl(42 70% 62%)" }}
                />
                <span>contacto@evelinedublan.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4"
                  style={{ color: "hsl(42 70% 62%)" }}
                />
                <span>WhatsApp disponible</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: "hsl(42 70% 62%)" }}
                />
                <span>Sesiones en línea</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                style={{ color: "hsl(42 70% 62%)" }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                style={{ color: "hsl(42 70% 62%)" }}
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t mb-6"
          style={{ borderColor: "hsla(270, 30%, 50%, 0.3)" }}
        />

        <p
          className="text-center font-body text-sm"
          style={{ color: "hsl(270 30% 65%)" }}
        >
          © {new Date().getFullYear()} Eveline Dublán — Psicoterapeuta &
          Terapeuta Holística. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
