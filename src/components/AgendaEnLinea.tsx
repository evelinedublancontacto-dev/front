import Link from "next/link";
import { CalendarDays } from "lucide-react";

/**
 * Segunda vía de agenda en las tarjetas "¿Cómo agendar?" de los servicios.
 * Va debajo del texto del teléfono para que llamar y reservar en línea
 * aparezcan como dos opciones equivalentes.
 */
const AgendaEnLinea = () => (
  <Link
    href="/citas"
    className="flex items-center gap-3 p-4 mb-4 rounded-xl border border-primary/25 bg-primary/5 hover:bg-primary/10 transition-colors group"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
      <CalendarDays className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="font-body text-sm font-semibold text-foreground">
        O agenda en línea
      </p>
      <p className="font-body text-xs text-muted-foreground">
        Elige fecha y hora tú misma, sin esperar respuesta
      </p>
    </div>
  </Link>
);

export default AgendaEnLinea;
