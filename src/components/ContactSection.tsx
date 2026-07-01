"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contacto" className="py-24 bg-gradient-section relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Contacto</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comienza tu <span className="text-gradient-gold">Transformación</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">Estoy aquí para acompañarte. Agenda tu sesión o escríbeme para resolver cualquier duda.</p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="space-y-6">
            {[
              { icon: Phone, label: "WhatsApp", value: "771 14 39 116" },
              { icon: Mail, label: "Email", value: "contacto@evelinedublan.com" },
              { icon: MapPin, label: "Ubicación", value: "Hidalgo, México" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.label}</h3>
                  <p className="text-muted-foreground font-body text-sm">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 pt-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Tu nombre" className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
            <input type="email" placeholder="Tu email" className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
            <textarea placeholder="Tu mensaje..." rows={4} className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" />
            <button type="submit" className="w-full px-8 py-4 bg-primary hover:bg-purple-glow text-primary-foreground font-body font-semibold rounded-lg transition-all duration-300 shadow-mystical hover:scale-[1.02]">
              Enviar Mensaje
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
