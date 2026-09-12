"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, FileText, Send, Loader2, AlertCircle, UserCheck, MapPin, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { api, ErrorApi, mensajeDeError } from "@/lib/api";
import { AVISO_QUIEN_AGENDA, ETIQUETA_MODALIDAD, type Modalidad } from "@/lib/tipos";

const appointmentSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(7, "Teléfono inválido"),
  notas: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number;
  precio: number;
}

interface AppointmentFormProps {
  fecha: string;
  hora: string;
  servicioId: string;
  servicios: Servicio[];
  /** Viene de la disponibilidad del día: viernes presencial, el resto en línea. */
  modalidad?: Modalidad | null;
  onSuccess: () => void;
  className?: string;
}

/** Mensajes propios para los códigos que el back devuelve al reservar. */
function mensajeDeReserva(err: unknown): string {
  if (err instanceof ErrorApi) {
    if (err.codigo === "horario_ocupado") return "Ese horario se acaba de ocupar. Elige otro, por favor.";
    /* cita_ya_agendada trae la fecha y hora de la cita previa en el mensaje del back. */
    if (err.codigo === "cita_ya_agendada") return err.message;
  }
  return mensajeDeError(err, "No pudimos agendar la cita. Intenta de nuevo, por favor.");
}

export default function AppointmentForm({
  fecha,
  hora,
  servicioId,
  servicios,
  modalidad,
  onSuccess,
  className,
}: AppointmentFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setSubmitting(true);
    setErrorEnvio(null);
    try {
      await api.enviar("/v1/citas", {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        servicio: servicioId,
        fecha,
        hora,
        notas: data.notas || "",
      });

      reset();
      onSuccess();
    } catch (err: unknown) {
      console.error("Error al agendar cita:", err);
      setErrorEnvio(mensajeDeReserva(err));
    } finally {
      setSubmitting(false);
    }
  };

  const formatearFecha = (fechaStr: string) => {
    return new Date(fechaStr + "T00:00:00").toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const servicioSeleccionado = servicios.find((s) => s.id === servicioId);
  const IconoModalidad = modalidad === "presencial" ? MapPin : Video;

  return (
    <div
      className={cn(
        "p-6 bg-white rounded-xl shadow-sm border border-gray-200",
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">
          Datos de contacto
        </h2>
      </div>

      {/* Quién debe agendar */}
      <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        <UserCheck className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
        <p>{AVISO_QUIEN_AGENDA} Escribe tus propios datos de contacto.</p>
      </div>

      {/* Resumen de la cita */}
      <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <h3 className="font-medium text-primary mb-2">Resumen de la cita</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Fecha:</span>
            <p className="font-medium text-gray-900 capitalize">
              {formatearFecha(fecha)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Hora:</span>
            <p className="font-medium text-gray-900">
              {hora}{" "}
              <span className="text-xs font-normal text-gray-500">
                (centro de México)
              </span>
            </p>
          </div>
          {servicioSeleccionado && (
            <>
              <div>
                <span className="text-gray-500">Servicio:</span>
                <p className="font-medium text-gray-900">
                  {servicioSeleccionado.titulo}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Precio:</span>
                <p className="font-medium text-gray-900">
                  ${servicioSeleccionado.precio}
                </p>
              </div>
            </>
          )}
          {modalidad && (
            <div className="col-span-2">
              <span className="text-gray-500">Modalidad:</span>
              <p className="font-medium text-gray-900 inline-flex items-center gap-1.5 ml-1">
                <IconoModalidad className="w-4 h-4 text-primary" />
                {ETIQUETA_MODALIDAD[modalidad]}
              </p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              {...register("nombre")}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
                errors.nombre ? "border-red-300" : "border-gray-300",
              )}
              placeholder="Tu nombre completo"
            />
          </div>
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              {...register("email")}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
                errors.email ? "border-red-300" : "border-gray-300",
              )}
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              {...register("telefono")}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
                errors.telefono ? "border-red-300" : "border-gray-300",
              )}
              placeholder="+52 (55) 1234-5678"
            />
          </div>
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-600">
              {errors.telefono.message}
            </p>
          )}
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas adicionales
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              {...register("notas")}
              rows={3}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none",
                errors.notas ? "border-red-300" : "border-gray-300",
              )}
              placeholder="¿Hay algo que debamos saber?"
            />
          </div>
        </div>

        {errorEnvio && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-800"
          >
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
            <p>{errorEnvio}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Agendando cita...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Confirmar cita
            </>
          )}
        </button>
      </form>
    </div>
  );
}
