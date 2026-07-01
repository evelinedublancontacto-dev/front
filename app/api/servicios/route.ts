import { NextResponse } from "next/server";
import serviciosData from "@/data/services.json";

export async function GET() {
  try {
    return NextResponse.json({
      servicios: serviciosData,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("Error al obtener servicios:", error);
    return NextResponse.json(
      { error: "Error al obtener servicios", details: message },
      { status: 500 },
    );
  }
}
