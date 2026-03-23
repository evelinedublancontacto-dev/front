import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contacto" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
            Contacto
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comienza tu <span className="text-gradient-gold">Transformación</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Estoy aquí para acompañarte. Agenda tu sesión o escríbeme para resolver cualquier duda.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">WhatsApp</h3>
                <p className="text-muted-foreground font-body text-sm">771 14 39 116</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground font-body text-sm">contacto@evelinedublan.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Ubicación</h3>
                <p className="text-muted-foreground font-body text-sm">Hidalgo, México</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-primary/20 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-primary/20 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </div>
            <div>
              <textarea
                placeholder="Tu mensaje..."
                rows={4}
                className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary hover:bg-purple-glow text-primary-foreground font-body font-semibold rounded-lg transition-all duration-300 shadow-mystical hover:scale-[1.02]"
            >
              Enviar Mensaje
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
