"use client";
import { useState, useEffect, useCallback } from "react";
import { Calendar, Mail, Phone, CheckCircle, XCircle, Clock, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api, ErrorApi, mensajeDeError } from "@/lib/api";
import { ETIQUETA_ESTADO, type Cita, type EstadoCita } from "@/lib/tipos";

const FILTROS: Array<"todas" | EstadoCita> = ["todas", "pendiente", "confirmada", "cancelada", "completada"];

const ESTADO_COLORS: Record<EstadoCita, string> = {
  pendiente: "bg-blue-100 text-blue-800 border-blue-200",
  confirmada: "bg-green-100 text-green-800 border-green-200",
  cancelada: "bg-red-100 text-red-800 border-red-200",
  completada: "bg-purple-100 text-purple-800 border-purple-200",
};

export default function AdminCitasPage() {
  const router = useRouter();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<"todas" | EstadoCita>("pendiente");
  const [busqueda, setBusqueda] = useState("");

  const reportar = useCallback(
    (err: unknown, mensaje: string) => {
      if (err instanceof ErrorApi && err.sinSesion) {
        router.push("/login?volver=/admin/citas");
        return;
      }
      console.error(mensaje, err);
      toast.error(mensajeDeError(err, mensaje));
    },
    [router],
  );

  const fetchCitas = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.obtener<{ citas: Cita[] }>("/v1/admin/citas?por_pagina=200");
      setCitas(r.citas);
    } catch (err) {
      reportar(err, "Error al cargar las citas");
    } finally {
      setLoading(false);
    }
  }, [reportar]);

  useEffect(() => {
    fetchCitas();
  }, [fetchCitas]);

  const actualizarEstado = async (citaId: string, nuevoEstado: EstadoCita) => {
    try {
      await api.actualizar(`/v1/admin/citas/${citaId}`, { estado: nuevoEstado });
      toast.success(`Cita ${ETIQUETA_ESTADO[nuevoEstado].toLowerCase()}`);
      fetchCitas();
    } catch (err) {
      reportar(err, "Error al actualizar la cita");
    }
  };

  const citasFiltradas = citas.filter((cita) => {
    const coincideEstado = filtroEstado === "todas" || cita.estado === filtroEstado;
    const q = busqueda.toLowerCase();
    const coincideBusqueda =
      q === "" ||
      cita.nombre.toLowerCase().includes(q) ||
      cita.email.toLowerCase().includes(q) ||
      (cita.servicioNombre ?? "").toLowerCase().includes(q);
    return coincideEstado && coincideBusqueda;
  });

  const formatearFecha = (fecha: string) =>
    new Date(fecha + "T00:00:00").toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                Gestión de Citas
              </h1>
              <p className="text-gray-500 mt-1">Administra las citas agendadas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold text-primary">{citas.length}</span>
                <span className="text-sm text-gray-600 ml-2">citas totales</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o servicio..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {FILTROS.map((estado) => (
                  <button
                    key={estado}
                    onClick={() => setFiltroEstado(estado)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      filtroEstado === estado ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {estado === "todas" ? "Todas" : ETIQUETA_ESTADO[estado]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Cargando citas...</p>
            </div>
          ) : citasFiltradas.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay citas para mostrar</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {citasFiltradas.map((cita) => (
                <div key={cita.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{cita.nombre}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${ESTADO_COLORS[cita.estado]}`}>
                          {ETIQUETA_ESTADO[cita.estado]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {cita.email}
                        </div>
                        {cita.telefono && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {cita.telefono}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm">
                        <span className="text-primary font-medium">{cita.servicioNombre ?? cita.servicio}</span>
                        <span className="text-gray-500">
                          {formatearFecha(cita.fecha)} a las {cita.hora}
                        </span>
                      </div>
                      {cita.notas && <p className="mt-2 text-sm text-gray-500 italic">Notas: {cita.notas}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      {cita.estado === "pendiente" && (
                        <button
                          onClick={() => actualizarEstado(cita.id, "confirmada")}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Confirmar
                        </button>
                      )}
                      {cita.estado === "confirmada" && (
                        <button
                          onClick={() => actualizarEstado(cita.id, "completada")}
                          className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Completada
                        </button>
                      )}
                      {cita.estado !== "cancelada" && cita.estado !== "completada" && (
                        <button
                          onClick={() => actualizarEstado(cita.id, "cancelada")}
                          className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancelar
                        </button>
                      )}
                      {cita.estado === "cancelada" && (
                        <button
                          onClick={() => actualizarEstado(cita.id, "confirmada")}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
                          <Clock className="w-4 h-4" />
                          Reconfirmar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
