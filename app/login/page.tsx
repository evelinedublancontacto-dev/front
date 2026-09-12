"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mensajeDeError } from "@/lib/api";
import { logos } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* A dónde ir tras entrar: a la ruta del panel que pidió `?volver=`, o al panel. */
function destinoTrasEntrar() {
  const volver = new URLSearchParams(window.location.search).get("volver");
  return volver && volver.startsWith("/admin") ? volver : "/admin";
}

export default function Login() {
  const { login, user, isLoading: cargandoSesion } = useAuth();
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Con sesión viva no tiene sentido mostrar el formulario. */
  useEffect(() => {
    if (!cargandoSesion && user) router.replace(destinoTrasEntrar());
  }, [cargandoSesion, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo.trim() || !contrasena) return;
    setEnviando(true);
    setError(null);
    try {
      await login(correo.trim(), contrasena);
      router.replace(destinoTrasEntrar());
      /* Se deja `enviando` en true: el botón sigue bloqueado hasta salir de aquí. */
    } catch (err) {
      setError(mensajeDeError(err, "Correo o contraseña incorrectos."));
      setEnviando(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center p-4">
      {/* Manchas de color suaves, en la paleta del sitio */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <Link href="/" className="mx-auto mb-6 block w-fit" aria-label="Ir al sitio de Eveline Dublán">
          <Image
            src={logos.eveline.vertical}
            alt="Eveline Dublán"
            width={176}
            height={117}
            priority
            className="h-auto w-44"
          />
        </Link>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-mystical sm:p-8">
          <div className="space-y-1">
            <h1 className="font-display text-xl font-semibold text-foreground">Panel de administración</h1>
            <p className="text-sm text-muted-foreground">Entra para gestionar citas, clientes y el blog.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="correo">Correo</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="correo"
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="tu@correo.com"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    if (error) setError(null);
                  }}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contrasena">Contraseña</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="contrasena"
                  type={verContrasena ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => {
                    setContrasena(e.target.value);
                    if (error) setError(null);
                  }}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setVerContrasena((v) => !v)}
                  aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={verContrasena}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {verContrasena ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={enviando}>
              {enviando ? (
                <>
                  <Loader2 className="animate-spin" /> Entrando…
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver al sitio
          </Link>
          <span>Acceso solo para administración</span>
        </div>
      </div>
    </div>
  );
}
