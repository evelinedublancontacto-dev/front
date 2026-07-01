import { NextRequest, NextResponse } from "next/server";
import pb from "@/lib/pocketbase";

export async function GET() {
  try {
    const citas = await pb.collection("citas").getFullList({
      sort: "-created",
    });

    const citasData = citas.map((cita) => ({
      id: cita.id,
      nombre: cita.nombre || "",
      email: cita.email || "",
      telefono: cita.telefono || "",
      servicio: cita.servicio || "",
      fecha: cita.fecha || "",
      hora: cita.hora || "",
      estado: cita.estado || "disponible",
      notas: cita.notas || "",
      created: cita.created,
    }));

    return NextResponse.json({ citas: citasData });
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return NextResponse.json(
      { error: "Error al obtener citas" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, servicio, fecha, hora, notas } = body;

    if (!nombre || !email || !telefono || !servicio || !fecha || !hora) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 },
      );
    }

    const nuevaCita = await pb.collection("citas").create({
      nombre,
      email,
      telefono,
      servicio,
      fecha,
      hora,
      estado: "disponible",
      notas: notas || "",
    });

    return NextResponse.json({ cita: nuevaCita }, { status: 201 });
  } catch (error) {
    console.error("Error al crear cita:", error);
    return NextResponse.json(
      { error: "Error al crear la cita" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      estado,
      nombre,
      email,
      telefono,
      servicio,
      fecha,
      hora,
      notas,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID de la cita" },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (estado) updateData.estado = estado;
    if (nombre) updateData.nombre = nombre;
    if (email) updateData.email = email;
    if (telefono) updateData.telefono = telefono;
    if (servicio) updateData.servicio = servicio;
    if (fecha) updateData.fecha = fecha;
    if (hora) updateData.hora = hora;
    if (notas !== undefined) updateData.notas = notas;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No hay campos para actualizar" },
        { status: 400 },
      );
    }

    const citaActualizada = await pb.collection("citas").update(id, updateData);

    return NextResponse.json({ cita: citaActualizada });
  } catch (error) {
    console.error("Error al actualizar cita:", error);
    return NextResponse.json(
      { error: "Error al actualizar la cita" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID de la cita" },
        { status: 400 },
      );
    }

    await pb.collection("citas").delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    return NextResponse.json(
      { error: "Error al eliminar la cita" },
      { status: 500 },
    );
  }
}
