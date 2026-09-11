"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  CalendarDays,
  MessageCircle,
  Clock,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { contact, social, buildWhatsAppMessage } from "@/lib/contact";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.phone,
    href: contact.whatsappUrl,
    description: "Respuesta rápida por mensaje",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: contact.phone,
    href: contact.telUrl,
    description: "Llámame directamente",
  },
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    description: "Para consultas detalladas",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: contact.location,
    href: undefined,
    description: contact.sessionNote,
  },
] as const;

const ContactPageContent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Por favor completa tu nombre y mensaje.");
      return;
    }

    const url = `${contact.whatsappUrl}?text=${buildWhatsAppMessage(form)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Te redirigimos a WhatsApp para enviar tu mensaje.");
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/citas"
            className="group flex flex-col sm:flex-row sm:items-center gap-5 p-7 md:p-8 rounded-2xl border border-primary/30 bg-gradient-card shadow-mystical hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
              <CalendarDays className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
                Agenda tu sesión en línea
              </h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Elige servicio, fecha y hora tú misma. Queda reservada al
                instante, sin esperar respuesta.
              </p>
            </div>
            <span className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm whitespace-nowrap transition-transform group-hover:scale-[1.03]">
              Ver horarios
            </span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Canales de contacto
              </h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Elige el medio que te resulte más cómodo. Estoy disponible para
                resolver dudas sobre servicios, horarios y sesiones.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((item) => {
                const content = (
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {item.label === "WhatsApp" ? (
                        <Image
                          src="/assets/icons/whatsapp.png"
                          alt="WhatsApp"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <item.icon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {item.label}
                      </h3>
                      <p className="text-foreground/90 font-body text-sm mt-0.5">
                        {item.value}
                      </p>
                      <p className="text-muted-foreground font-body text-xs mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {social.map((perfil) => {
                const Icono = perfil.red === "facebook" ? Facebook : Instagram;
                return (
                  <a
                    key={perfil.url}
                    href={perfil.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${perfil.label} — ${perfil.handle}`}
                    className="inline-flex items-center gap-2 h-11 pl-3 pr-4 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <Icono className="w-5 h-5 flex-shrink-0" />
                    <span className="font-body text-sm">{perfil.handle}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 shadow-mystical">
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                ¿Tienes una duda antes de agendar?
              </h2>
              <p className="text-muted-foreground font-body text-sm mb-6">
                Escríbeme y te llevaremos a WhatsApp con tu mensaje listo para
                enviar. Si ya sabes qué sesión quieres, agenda directamente
                arriba.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre *"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  required
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <input
                  type="text"
                  placeholder="Asunto (opcional)"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <textarea
                  placeholder="Tu mensaje *"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="w-full px-5 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary hover:bg-purple-glow text-primary-foreground font-body font-semibold rounded-lg transition-all duration-300 shadow-mystical hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Image
                    src="/assets/icons/whatsapp.png"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>Enviar por WhatsApp</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-3 gap-4 mt-14"
        >
          {[
            {
              icon: Clock,
              title: "Horario de respuesta",
              text: "Generalmente respondo en menos de 24 horas",
            },
            {
              icon: Video,
              title: "Sesiones en línea",
              text: "Atención por videollamada desde cualquier lugar",
            },
            {
              icon: MessageCircle,
              title: "Consulta sin compromiso",
              text: "Pregunta lo que necesites antes de agendar",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-5 rounded-xl bg-secondary/50 border border-border"
            >
              <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-xs leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPageContent;
