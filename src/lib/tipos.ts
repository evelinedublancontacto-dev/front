/* Formas que devuelve el back. Reemplazan al RecordModel genérico de PocketBase. */

export type EstadoCita = "pendiente" | "confirmada" | "cancelada" | "completada";

export const ESTADOS_CITA: EstadoCita[] = ["pendiente", "confirmada", "cancelada", "completada"];

export const ETIQUETA_ESTADO: Record<EstadoCita, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  completada: "Completada",
};

export type Modalidad = "presencial" | "en_linea";

export const ETIQUETA_MODALIDAD: Record<Modalidad, string> = {
  presencial: "Presencial, en consultorio",
  en_linea: "En línea (videollamada)",
};

/** Aviso que Eveline pide mostrar en toda la reserva. */
export const AVISO_QUIEN_AGENDA =
  "La cita debe agendarla directamente la persona que tomará la sesión.";

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number;
  precio: number;
  activo?: boolean;
  orden?: number;
  reglas?: { dias_permitidos?: number[]; modalidad?: string; mensaje_dias?: string };
}

export interface Cita {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  servicioNombre?: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
  notas: string;
  origen?: string;
  created: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  notas: string;
  creado_en: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  published: boolean;
  date?: string;
  created?: string;
}

export interface Usuario {
  id: string;
  correo: string;
  nombre: string;
  rol: "admin";
}

export interface Paginado<T> {
  total: number;
  pagina: number;
  por_pagina: number;
  [lista: string]: T[] | number;
}
