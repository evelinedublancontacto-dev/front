export const contact = {
  email: "evelinedublan@gmail.com",
  phone: "771 143 91 16",
  phoneE164: "+527711439116",
  whatsappUrl: "https://wa.me/527711439116",
  telUrl: "tel:+527711439116",
  location: "Hidalgo, México",
  sessionNote: "Sesiones en línea y presenciales",
} as const;

/**
 * Perfiles públicos. Las URLs vienen limpias de parámetros de rastreo
 * (`mibextid`, `stkn`, `utm_source`), que caducan y no hacen falta.
 */
export const social = [
  {
    id: "facebook",
    red: "facebook",
    label: "Facebook",
    handle: "Eveline Dublán",
    url: "https://www.facebook.com/EvelineDublan/",
  },
  {
    id: "instagram",
    red: "instagram",
    label: "Instagram",
    handle: "@evelinegd",
    url: "https://www.instagram.com/evelinegd",
  },
  {
    id: "luzDeLuna",
    red: "instagram",
    label: "Instagram · Luz de Luna",
    handle: "@luzdelunasanadora",
    url: "https://www.instagram.com/luzdelunasanadora",
  },
] as const;

export function buildWhatsAppMessage({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const lines = [
    `Hola Eveline, soy ${name}.`,
    subject ? `Asunto: ${subject}` : null,
    message,
    email ? `Mi email: ${email}` : null,
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n\n"));
}
