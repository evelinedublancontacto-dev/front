"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { Cita, Servicio } from "@/lib/tipos";

export type { Cita, Servicio };

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
        const data = await api.obtener<{ servicios: Servicio[] }>("/v1/servicios");
        setServicios(data.servicios);
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
      const data = await api.obtener<{ slots: TimeSlot[]; disponible: boolean }>(`/v1/disponibilidad?fecha=${fecha}`);
      setSlots(data.slots);
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
