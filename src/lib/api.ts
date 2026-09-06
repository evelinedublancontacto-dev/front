/* ------------------------------------------------------------------ *
 *  src/lib/api.ts
 *  Cliente del back propio (Bun + Elysia). Sustituye a PocketBase.
 *  Todas las llamadas van con credenciales para que viaje la cookie de
 *  sesión del admin; el back responde { error, codigo } en fallos.
 * ------------------------------------------------------------------ */

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

export class ErrorApi extends Error {
  constructor(
    public readonly status: number,
    public readonly codigo: string,
    mensaje: string,
  ) {
    super(mensaje);
    this.name = "ErrorApi";
  }
  get sinSesion() {
    return this.status === 401;
  }
}

async function llamar<T>(metodo: string, ruta: string, cuerpo?: unknown): Promise<T> {
  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: metodo,
      credentials: "include",
      headers: cuerpo === undefined ? {} : { "Content-Type": "application/json" },
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
    });
  } catch {
    throw new ErrorApi(0, "sin_conexion", "No hay conexión con el servidor.");
  }

  const datos = (await respuesta.json().catch(() => ({}))) as Record<string, unknown>;
  if (!respuesta.ok) {
    throw new ErrorApi(
      respuesta.status,
      String(datos.codigo ?? "error"),
      String(datos.error ?? `Error ${respuesta.status}`),
    );
  }
  return datos as T;
}

export const api = {
  obtener: <T>(ruta: string) => llamar<T>("GET", ruta),
  enviar: <T>(ruta: string, cuerpo?: unknown) => llamar<T>("POST", ruta, cuerpo),
  actualizar: <T>(ruta: string, cuerpo: unknown) => llamar<T>("PATCH", ruta, cuerpo),
  borrar: <T>(ruta: string) => llamar<T>("DELETE", ruta),
};

export function mensajeDeError(err: unknown, porDefecto = "Ocurrió un error"): string {
  if (err instanceof ErrorApi) return err.message;
  if (err instanceof Error) return err.message;
  return porDefecto;
}
