import type { Metadata } from "next";
import SobreMiContent from "@/components/SobreMiContent";

export const metadata: Metadata = {
  title: "Sobre Mí — Eveline Dublán | Psicoterapeuta & Terapeuta Holística",
  description:
    "Conoce a Eveline Dublán: psicóloga (UAEH), tanatóloga (AMTAC) y terapeuta holística de humanos y animales con veinte años de experiencia. Terapia con perspectiva de género, clase e inclusión.",
};

export default function SobreMiPage() {
  return <SobreMiContent />;
}
