export const contact = {
  email: "contacto@evelinedublan.com",
  phone: "771 143 91 16",
  phoneE164: "+527711439116",
  whatsappUrl: "https://wa.me/527711439116",
  telUrl: "tel:+527711439116",
  location: "Hidalgo, México",
  sessionNote: "Sesiones en línea y presenciales",
} as const;

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
