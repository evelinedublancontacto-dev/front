import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Heart, Music, Sparkles, Flower2, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Brain, title: "Psicoterapia", description: "Acompañamiento terapéutico profesional para tu bienestar emocional y mental.", href: "/servicios/psicoterapia" },
  { icon: Sparkles, title: "Sanación Energética", description: "Restaura el flujo de energía en tu cuerpo y libera bloqueos emocionales.", href: "/servicios/sanacion-energetica" },
  { icon: Music, title: "Cuencos Tibetanos", description: "Armoniza tu ser a través de las vibraciones sanadoras de los cuencos sagrados.", href: "/servicios/cuencos-tibetanos" },
  { icon: Heart, title: "Meditaciones", description: "Meditaciones guiadas para conectar con tu esencia y encontrar paz interior." },
  { icon: Sparkles, title: "Sesión de Cumpleaños", description: "Aprovecha el portal luminoso de tu cumpleaños para sanar y comenzar tu año con la mejor energía.", href: "/servicios/sesion-de-cumpleanos" },
  { icon: PawPrint, title: "Sanación para Animales", description: "Terapia holística especializada para el bienestar de tus compañeros animales.", href: "/servicios/sanacion-para-animales" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" className="py-24 bg-gradient-section relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Mis Servicios</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Caminos de <span className="text-gradient-gold">Sanación</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">Cada servicio está diseñado para acompañarte en tu proceso de transformación y crecimiento espiritual.</p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {service.href ? (
                <Link to={service.href} className="block group bg-gradient-card rounded-xl p-8 border-glow hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
                </Link>
              ) : (
                <div className="group bg-gradient-card rounded-xl p-8 border-glow hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
