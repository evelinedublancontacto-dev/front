"use client";
import { useMemo } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Loader2, Mail, Pencil, Phone, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ETIQUETA_ESTADO, type Cita, type EstadoCita, type Servicio } from "@/lib/tipos";
import { ESTILO_ESTADO, PUNTO_ESTADO } from "@/components/admin/estados";

/* ------------------------------------------------------------------ *
 *  Fechas
 *  Las citas guardan la fecha como AAAA-MM-DD, sin zona horaria. Todo
 *  el calendario usa esa cadena como clave para no correrse de día al
 *  convertir a Date y de vuelta.
 * ------------------------------------------------------------------ */

export const claveFecha = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const desdeClave = (clave: string) => new Date(clave + "T00:00:00");

/** Primer y último día del mes al que pertenece la clave, también en clave. */
export const rangoDelMes = (clave: string) => {
  const d = desdeClave(clave);
  return {
    desde: claveFecha(new Date(d.getFullYear(), d.getMonth(), 1)),
    hasta: claveFecha(new Date(d.getFullYear(), d.getMonth() + 1, 0)),
  };
};

const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const etiquetaMes = (clave: string) =>
  mayuscula(desdeClave(clave).toLocaleDateString("es-MX", { month: "long", year: "numeric" }));

const etiquetaDia = (clave: string) =>
  mayuscula(desdeClave(clave).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));

/* Lunes primero, como se lee una agenda en español. */
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

/** Las celdas del mes, completando la primera y última semana. */
function diasDelMes(clave: string) {
  const ancla = desdeClave(clave);
  const anio = ancla.getFullYear();
  const mes = ancla.getMonth();
  const desplazamiento = (new Date(anio, mes, 1).getDay() + 6) % 7;
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const semanas = Math.ceil((desplazamiento + diasEnMes) / 7);
  return Array.from({ length: semanas * 7 }, (_, i) => new Date(anio, mes, 1 - desplazamiento + i));
}

const soloHora = (hora: string) => (hora || "").slice(0, 5);

/** Hora de término a partir de la duración del servicio. */
function horaFin(hora: string, minutos?: number) {
  if (!hora || !minutos) return null;
  const [h, m] = soloHora(hora).split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const total = h * 60 + m + minutos;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

const porHora = (a: Cita, b: Cita) => soloHora(a.hora).localeCompare(soloHora(b.hora));

/* ------------------------------------------------------------------ *
 *  Componente
 * ------------------------------------------------------------------ */

export interface CalendarioCitasProps {
  vista: "mes" | "dia";
  /** Día enfocado; también fija el mes que se muestra. */
  fecha: string;
  onFecha: (clave: string) => void;
  /** Abrir un día concreto desde la cuadrícula del mes. */
  onAbrirDia: (clave: string) => void;
  citas: Cita[];
  servicios: Servicio[];
  cargando: boolean;
  cambiandoEstado: string | null;
  onNueva: (fecha: string) => void;
  onEditar: (cita: Cita) => void;
  onBorrar: (cita: Cita) => void;
  onEstado: (cita: Cita, estado: EstadoCita) => void;
}

export default function CalendarioCitas({
  vista,
  fecha,
  onFecha,
  onAbrirDia,
  citas,
  servicios,
  cargando,
  cambiandoEstado,
  onNueva,
  onEditar,
  onBorrar,
  onEstado,
}: CalendarioCitasProps) {
  const hoy = claveFecha(new Date());

  /* Las citas de cada día, ya ordenadas por hora. */
  const porDia = useMemo(() => {
    const mapa = new Map<string, Cita[]>();
    for (const cita of citas) {
      if (!cita.fecha) continue;
      const lista = mapa.get(cita.fecha);
      if (lista) lista.push(cita);
      else mapa.set(cita.fecha, [cita]);
    }
    for (const lista of mapa.values()) lista.sort(porHora);
    return mapa;
  }, [citas]);

  const nombreServicio = (cita: Cita) =>
    cita.servicioNombre || servicios.find((s) => s.id === cita.servicio)?.titulo || cita.servicio || "—";
  const duracion = (cita: Cita) => servicios.find((s) => s.id === cita.servicio)?.duracion;

  const mover = (pasos: number) => {
    const d = desdeClave(fecha);
    const siguiente =
      vista === "mes"
        ? new Date(d.getFullYear(), d.getMonth() + pasos, 1)
        : new Date(d.getFullYear(), d.getMonth(), d.getDate() + pasos);
    onFecha(claveFecha(siguiente));
  };

  const citasDelDia = porDia.get(fecha) ?? [];

  return (
    <div className="p-4 sm:p-5">
      {/* Navegación */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => mover(-1)}
            aria-label={vista === "mes" ? "Mes anterior" : "Día anterior"}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => mover(1)}
            aria-label={vista === "mes" ? "Mes siguiente" : "Día siguiente"}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 aria-live="polite" className="ml-2 font-display text-base font-semibold text-foreground">
            {vista === "mes" ? etiquetaMes(fecha) : etiquetaDia(fecha)}
          </h3>
          {cargando && <Loader2 className="ml-1 h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        <Button variant="outline" size="sm" onClick={() => onFecha(hoy)} disabled={fecha === hoy}>
          Hoy
        </Button>
      </div>

      {vista === "mes" ? (
        <VistaMes
          fecha={fecha}
          hoy={hoy}
          porDia={porDia}
          nombreServicio={nombreServicio}
          onAbrirDia={onAbrirDia}
        />
      ) : (
        <VistaDia
          fecha={fecha}
          hoy={hoy}
          citas={citasDelDia}
          nombreServicio={nombreServicio}
          duracion={duracion}
          cambiandoEstado={cambiandoEstado}
          onNueva={onNueva}
          onEditar={onEditar}
          onBorrar={onBorrar}
          onEstado={onEstado}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Vista de mes
 * ------------------------------------------------------------------ */

function VistaMes({
  fecha,
  hoy,
  porDia,
  nombreServicio,
  onAbrirDia,
}: {
  fecha: string;
  hoy: string;
  porDia: Map<string, Cita[]>;
  nombreServicio: (c: Cita) => string;
  onAbrirDia: (clave: string) => void;
}) {
  const dias = useMemo(() => diasDelMes(fecha), [fecha]);
  const mesActual = desdeClave(fecha).getMonth();

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="grid grid-cols-7 border-b border-border bg-muted/40">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="px-1 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {/* Dos letras: una sola repetiría M en lunes y miércoles. */}
            <span className="sm:hidden">{d.slice(0, 2)}</span>
            <span className="hidden sm:inline">{d}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {dias.map((dia) => {
          const clave = claveFecha(dia);
          const delMes = dia.getMonth() === mesActual;
          const esHoy = clave === hoy;
          const delDia = porDia.get(clave) ?? [];
          const visibles = delDia.slice(0, 3);
          const restantes = delDia.length - visibles.length;

          return (
            <button
              key={clave}
              type="button"
              onClick={() => onAbrirDia(clave)}
              aria-label={`${desdeClave(clave).toLocaleDateString("es-MX", { day: "numeric", month: "long" })}, ${
                delDia.length === 0 ? "sin citas" : delDia.length === 1 ? "1 cita" : `${delDia.length} citas`
              }`}
              className={cn(
                "flex min-h-[4.5rem] flex-col gap-1 border-b border-r border-border/60 p-1.5 text-left align-top transition-colors last:border-r-0 hover:bg-muted/40 focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[7rem] sm:p-2",
                !delMes && "bg-muted/20",
                esHoy && "bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  esHoy ? "bg-primary text-primary-foreground" : delMes ? "text-foreground" : "text-muted-foreground/60",
                )}
              >
                {dia.getDate()}
              </span>

              {/* Pantallas chicas: un punto por cita */}
              <span className="flex flex-wrap gap-0.5 sm:hidden">
                {delDia.slice(0, 4).map((c) => (
                  <span key={c.id} className={cn("h-1.5 w-1.5 rounded-full", PUNTO_ESTADO[c.estado])} />
                ))}
              </span>

              {/* Desde sm: hora y nombre */}
              <span className="hidden min-w-0 flex-col gap-0.5 sm:flex">
                {visibles.map((c) => (
                  <span
                    key={c.id}
                    title={`${soloHora(c.hora)} · ${c.nombre} · ${nombreServicio(c)}`}
                    className={cn(
                      "truncate rounded border px-1 py-0.5 text-[11px] leading-tight",
                      ESTILO_ESTADO[c.estado],
                      c.estado === "cancelada" && "line-through opacity-70",
                    )}
                  >
                    <span className="font-semibold">{soloHora(c.hora)}</span> {c.nombre}
                  </span>
                ))}
                {restantes > 0 && (
                  <span className="px-1 text-[11px] font-medium text-muted-foreground">+{restantes} más</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Vista de día
 * ------------------------------------------------------------------ */

function VistaDia({
  fecha,
  hoy,
  citas,
  nombreServicio,
  duracion,
  cambiandoEstado,
  onNueva,
  onEditar,
  onBorrar,
  onEstado,
}: {
  fecha: string;
  hoy: string;
  citas: Cita[];
  nombreServicio: (c: Cita) => string;
  duracion: (c: Cita) => number | undefined;
  cambiandoEstado: string | null;
  onNueva: (fecha: string) => void;
  onEditar: (cita: Cita) => void;
  onBorrar: (cita: Cita) => void;
  onEstado: (cita: Cita, estado: EstadoCita) => void;
}) {
  const vivas = citas.filter((c) => c.estado !== "cancelada").length;

  if (citas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-14 text-center">
        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <CalendarDays className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="font-medium text-foreground">{fecha === hoy ? "Hoy no hay citas" : "Sin citas este día"}</p>
        <p className="max-w-sm text-sm text-muted-foreground">El día está libre. Puedes registrar una cita a mano.</p>
        <Button size="sm" className="mt-2" onClick={() => onNueva(fecha)}>
          <Plus className="h-4 w-4" /> Agendar en este día
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {citas.length === 1 ? "1 cita" : `${citas.length} citas`}
          {vivas !== citas.length && ` · ${citas.length - vivas} cancelada${citas.length - vivas === 1 ? "" : "s"}`}
        </p>
        <Button variant="outline" size="sm" onClick={() => onNueva(fecha)}>
          <Plus className="h-4 w-4" /> Agendar en este día
        </Button>
      </div>

      <ul className="space-y-2">
        {citas.map((cita) => {
          const fin = horaFin(cita.hora, duracion(cita));
          const ocupada = cambiandoEstado === cita.id;
          const cancelada = cita.estado === "cancelada";
          return (
            <li
              key={cita.id}
              className={cn(
                "flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center",
                cancelada && "opacity-70",
              )}
            >
              {/* Hora */}
              <div className="flex shrink-0 flex-row items-baseline gap-2 sm:w-24 sm:flex-col sm:gap-0">
                <span className={cn("font-display text-lg font-semibold leading-tight text-foreground", cancelada && "line-through")}>
                  {soloHora(cita.hora) || "—"}
                </span>
                {fin && <span className="text-xs text-muted-foreground">a {fin}</span>}
              </div>

              {/* Detalle */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{cita.nombre || "—"}</p>
                  <Badge variant="outline" className={cn("font-medium", ESTILO_ESTADO[cita.estado])}>
                    {ETIQUETA_ESTADO[cita.estado] ?? cita.estado}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{nombreServicio(cita)}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {cita.email && (
                    <a href={`mailto:${cita.email}`} className="inline-flex items-center gap-1 hover:text-primary">
                      <Mail className="h-3.5 w-3.5" /> {cita.email}
                    </a>
                  )}
                  {cita.telefono && (
                    <a href={`tel:${cita.telefono}`} className="inline-flex items-center gap-1 hover:text-primary">
                      <Phone className="h-3.5 w-3.5" /> {cita.telefono}
                    </a>
                  )}
                </div>
                {cita.notas && <p className="mt-1.5 text-xs italic text-muted-foreground">Notas: {cita.notas}</p>}
              </div>

              {/* Acciones */}
              <div className="flex shrink-0 items-center justify-end gap-0.5">
                {ocupada ? (
                  <span className="inline-flex h-8 w-8 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </span>
                ) : (
                  <>
                    {cita.estado === "pendiente" && (
                      <Accion etiqueta="Confirmar" onClick={() => onEstado(cita, "confirmada")}>
                        <Check className="h-4 w-4 text-emerald-600" />
                      </Accion>
                    )}
                    {cita.estado === "confirmada" && (
                      <Accion etiqueta="Marcar completada" onClick={() => onEstado(cita, "completada")}>
                        <Check className="h-4 w-4 text-primary" />
                      </Accion>
                    )}
                    {(cita.estado === "pendiente" || cita.estado === "confirmada") && (
                      <Accion etiqueta="Cancelar cita" onClick={() => onEstado(cita, "cancelada")} destructiva>
                        <X className="h-4 w-4" />
                      </Accion>
                    )}
                  </>
                )}
                <Accion etiqueta="Editar" onClick={() => onEditar(cita)}>
                  <Pencil className="h-4 w-4" />
                </Accion>
                <Accion etiqueta="Eliminar" onClick={() => onBorrar(cita)} destructiva>
                  <Trash2 className="h-4 w-4" />
                </Accion>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Accion({
  etiqueta,
  onClick,
  children,
  destructiva,
}: {
  etiqueta: string;
  onClick: () => void;
  children: React.ReactNode;
  destructiva?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          aria-label={etiqueta}
          className={cn("h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground", destructiva && "hover:bg-destructive/10 hover:text-destructive")}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{etiqueta}</TooltipContent>
    </Tooltip>
  );
}
