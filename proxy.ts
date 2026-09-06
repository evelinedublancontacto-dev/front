/* ------------------------------------------------------------------ *
 *  proxy.ts  (convención de Next 16; antes middleware.ts)
 *  Protege /admin en el servidor: reenvía la cookie de sesión al back y
 *  redirige a /login si no hay usuario. La autorización real la hace el
 *  back en cada llamada; esto evita que el panel llegue a pintarse.
 *
 *  En producción el back debe emitir la cookie con COOKIE_DOMINIO igual
 *  al dominio padre (.evelinedublan.com) para que llegue hasta aquí.
 * ------------------------------------------------------------------ */

import { NextResponse, type NextRequest } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

export async function proxy(request: NextRequest) {
  const cookie = request.headers.get("cookie") ?? "";
  const aLogin = () => {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("volver", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  };

  if (!cookie.includes("sesion=")) return aLogin();

  try {
    const r = await fetch(`${API_URL}/v1/auth/yo`, {
      headers: { cookie },
      signal: AbortSignal.timeout(3000),
    });
    const { usuario } = (await r.json()) as { usuario: { rol: string } | null };
    if (!usuario || usuario.rol !== "admin") return aLogin();
  } catch {
    /* Back inalcanzable: se deja pasar y el panel mostrará el error de
       conexión. Ningún dato sale sin que el back lo autorice. */
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
