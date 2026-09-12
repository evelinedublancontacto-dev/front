import type { EstadoCita } from "@/lib/tipos";

/** Colores de estado de una cita, compartidos por la tabla y el calendario. */
export const ESTILO_ESTADO: Record<EstadoCita, string> = {
  pendiente: "border-amber-200 bg-amber-50 text-amber-800",
  confirmada: "border-emerald-200 bg-emerald-50 text-emerald-800",
  completada: "border-primary/20 bg-primary/10 text-primary",
  cancelada: "border-red-200 bg-red-50 text-red-700",
};

/** Versión en punto, para el calendario en pantallas chicas. */
export const PUNTO_ESTADO: Record<EstadoCita, string> = {
  pendiente: "bg-amber-400",
  confirmada: "bg-emerald-500",
  completada: "bg-primary",
  cancelada: "bg-red-400",
};
