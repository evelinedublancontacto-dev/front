import type { Metadata } from "next";
import "../src/index.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Eveline Dublán — Psicoterapeuta & Terapeuta Holística",
  description:
    "Eveline Dublán, Psicoterapeuta y Terapeuta Holística. Sanación energética, cuencos tibetanos, meditaciones y psicoterapia.",
  authors: [{ name: "Eveline Dublán" }],
};

// Force dynamic rendering to prevent static serialization of AuthContext
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
