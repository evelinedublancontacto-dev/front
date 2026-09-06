"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { contact } from "@/lib/contact";

const whatsappCTAUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
  "Hola Eveline, me gustaría recibir más información sobre tus servicios."
)}`;

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contacto"
      className="py-12 md:py-14 relative overflow-hidden"
      style={{ background: "hsl(275 38% 94%)" }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 md:gap-10 items-center max-w-5xl mx-auto"
        >
          <div className="text-center md:text-left">
            <p className="text-primary font-body text-xs tracking-[0.2em] uppercase mb-2">
              Contacto
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              Comienza tu{" "}
              <span className="text-gradient-gold">Transformación</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-5 max-w-md md:mx-0 mx-auto">
              Escríbeme por WhatsApp y con gusto te acompaño en tu camino de
              sanación.
            </p>

            <a
              href={whatsappCTAUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-lg font-body font-semibold text-white text-sm transition-all duration-300 shadow-md hover:scale-[1.03] hover:brightness-110"
              style={{ backgroundColor: "#25D366" }}
            >
              <Image
                src="/assets/icons/whatsapp.png"
                alt="WhatsApp"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              Escribir por WhatsApp
            </a>

            <p className="text-muted-foreground font-body text-xs mt-2.5">
              {contact.phone}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mt-5 pt-5 border-t border-primary/15">
              <Link
                href="/citas"
                className="inline-flex items-center gap-1.5 text-primary font-body text-xs font-medium hover:underline"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                Agendar sesión
              </Link>
              <Link
                href="/contacto"
                className="text-muted-foreground font-body text-xs hover:text-primary transition-colors"
              >
                Más formas de contacto
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-auto md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-mystical border border-primary/15">
            <Image
              src="/assets/contacto-servicios-hero.png"
              alt="Servicios de sanación holística: cuencos, cristales y energía"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, hsla(275,55%,25%,0.15) 0%, transparent 50%, hsla(42,70%,48%,0.08) 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
