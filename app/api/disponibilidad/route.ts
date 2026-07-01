import { NextRequest, NextResponse } from "next/server";
import pb from "@/lib/pocketbase";

// Horarios por defecto si no hay configuración en la BD
const HORARIOS_POR_DEFECTO = [
  { dia: 1, inicio: "09:00", fin: "17:00" }, // Lunes
  { dia: 2, inicio: "09:00", fin: "17:00" }, // Martes
  { dia: 3, inicio: "09:00", fin: "17:00" }, // Miércoles
  { dia: 4, inicio: "09:00", fin: "17:00" }, // Jueves
  { dia: 5, inicio: "09:00", fin: "17:00" }, // Viernes
];

const INTERVALO_MINUTOS = 60;

interface HorarioDB {
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
}

interface CitaRecord {
  hora: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get("fecha");
    const servicioId = searchParams.get("servicioId");

    if (!fecha) {
      return NextResponse.json(
        { error: "La fecha es requerida" },
        { status: 400 },
      );
    }

    // Obtener el día de la semana (0=Domingo, 1=Lunes, etc.)
    const date = new Date(fecha + "T00:00:00");
    const diaSemana = date.getDay();

    // Intentar obtener horarios configurados, si no usar los por defecto
    let horarios = HORARIOS_POR_DEFECTO.filter((h) => h.dia === diaSemana);

    try {
      const horariosDB = await pb
        .collection("horarios_disponibles")
        .getFullList({
          filter: `dia_semana = ${diaSemana} && activo = true`,
        });
      if (horariosDB.length > 0) {
        horarios = horariosDB.map((h) => {
          const horario = h as unknown as HorarioDB;
          return {
            dia: horario.dia_semana,
            inicio: horario.hora_inicio,
            fin: horario.hora_fin,
          };
        });
      }
    } catch {
      // Usar horarios por defecto si no existe la colección
    }

    // Si no hay horarios para este día, retornar sin disponibilidad
    if (horarios.length === 0) {
      return NextResponse.json({ slots: [], disponible: false });
    }

    // Generar los slots de tiempo disponibles (sin duplicados)
    const slotsSet = new Set<string>();
    for (const horario of horarios) {
      const [horaInicio, minInicio] = horario.inicio.split(":").map(Number);
      const [horaFin, minFin] = horario.fin.split(":").map(Number);

      let minutosTotales = horaInicio * 60 + minInicio;
      const finMinutosTotales = horaFin * 60 + minFin;

      while (minutosTotales + INTERVALO_MINUTOS <= finMinutosTotales) {
        const horas = Math.floor(minutosTotales / 60);
        const mins = minutosTotales % 60;
        const horaStr = `${horas.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
        slotsSet.add(horaStr);
        minutosTotales += INTERVALO_MINUTOS;
      }
    }
    const slots = Array.from(slotsSet).sort();

    // Obtener citas ya agendadas para esta fecha
    let citasOcupadas: string[] = [];
    try {
      const citas = await pb.collection("citas").getFullList({
        filter: `fecha = "${fecha}" && (estado = "confirmada" || estado = "disponible")`,
      });
      citasOcupadas = citas.map((c) => {
        const cita = c as unknown as CitaRecord;
        return cita.hora;
      });
    } catch {
      // Si no existe la colección, no hay citas ocupadas
    }

    // Filtrar slots disponibles
    const slotsDisponibles = slots
      .filter((slot) => !citasOcupadas.includes(slot))
      .map((hora) => ({
        hora,
        disponible: true,
      }));

    const slotsNoDisponibles = slots
      .filter((slot) => citasOcupadas.includes(slot))
      .map((hora) => ({
        hora,
        disponible: false,
      }));

    return NextResponse.json({
      slots: [...slotsDisponibles, ...slotsNoDisponibles].sort((a, b) =>
        a.hora.localeCompare(b.hora),
      ),
      disponible: slotsDisponibles.length > 0,
      fecha,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("Error al obtener disponibilidad:", error);
    return NextResponse.json(
      { error: "Error al obtener disponibilidad", details: message },
      { status: 500 },
    );
  }
}
