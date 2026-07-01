"use client";

import { useState, useEffect, useCallback } from "react";

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number;
  precio: number;
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
  estado: "disponible" | "confirmada" | "cancelada" | "completada";
  notas: string;
  created: string;
}

export interface TimeSlot {
  hora: string;
  disponible: boolean;
}

const getErrorMessage = (err: unknown): string => {
  return err instanceof Error ? err.message : "Error desconocido";
};

export function useServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/servicios");
        if (!response.ok) throw new Error("Error al cargar servicios");
        const data = await response.json();
        setServicios(data.servicios || []);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  return { servicios, loading, error };
}

export function useDisponibilidad(fecha: string | null) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disponible, setDisponible] = useState(false);

  const fetchDisponibilidad = useCallback(async () => {
    if (!fecha) {
      setSlots([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/disponibilidad?fecha=${fecha}`);
      if (!response.ok) throw new Error("Error al cargar disponibilidad");
      const data = await response.json();
      setSlots(data.slots || []);
      setDisponible(data.disponible);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [fecha]);

  useEffect(() => {
    fetchDisponibilidad();
  }, [fetchDisponibilidad]);

  return { slots, loading, error, disponible, refetch: fetchDisponibilidad };
}

export function useCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCitas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/citas");
      if (!response.ok) throw new Error("Error al cargar citas");
      const data = await response.json();
      setCitas(data.citas || []);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCitas();
  }, [fetchCitas]);

  const crearCita = async (cita: Omit<Cita, "id" | "created">) => {
    try {
      const response = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error al crear la cita");
      }
      await fetchCitas();
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getErrorMessage(err) };
    }
  };

  const actualizarEstado = async (citaId: string, estado: Cita["estado"]) => {
    try {
      const response = await fetch(`/api/citas`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: citaId, estado }),
      });
      if (!response.ok) throw new Error("Error al actualizar la cita");
      await fetchCitas();
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getErrorMessage(err) };
    }
  };

  return {
    citas,
    loading,
    error,
    crearCita,
    actualizarEstado,
    refetch: fetchCitas,
  };
}
