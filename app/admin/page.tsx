"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  ExternalLink,
  FileText,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api, ErrorApi, mensajeDeError } from "@/lib/api";
import { logos } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { Cita, Cliente, EstadoCita, Post, Servicio } from "@/lib/tipos";
import { ESTADOS_CITA, ETIQUETA_ESTADO } from "@/lib/tipos";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PostFormDialog, { type PostFormData, POST_CATEGORIES } from "@/components/admin/PostFormDialog";
import ServicioFormDialog, { type ServicioFormData } from "@/components/admin/ServicioFormDialog";
import CitaFormDialog, { type CitaFormData } from "@/components/admin/CitaFormDialog";
import ClienteFormDialog, { type ClienteFormData } from "@/components/admin/ClienteFormDialog";
import ConfirmarBorradoDialog from "@/components/admin/ConfirmarBorradoDialog";

/* ------------------------------------------------------------------ *
 *  Pestañas y utilidades de presentación
 * ------------------------------------------------------------------ */

type Pestana = "citas" | "clientes" | "posts" | "servicios";
const PESTANAS: Pestana[] = ["citas", "clientes", "posts", "servicios"];

const ESTILO_ESTADO: Record<EstadoCita, string> = {
  pendiente: "border-amber-200 bg-amber-50 text-amber-800",
  confirmada: "border-emerald-200 bg-emerald-50 text-emerald-800",
  completada: "border-primary/20 bg-primary/10 text-primary",
  cancelada: "border-red-200 bg-red-50 text-red-700",
};

const fechaCorta = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

/* La fecha de una cita viene como AAAA-MM-DD; se fija la hora para no
   cambiar de día por la zona horaria. */
const fechaCita = (fecha: string) => {
  const texto = new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

const precioMXN = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

const iniciales = (texto: string) =>
  texto
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

const contiene = (q: string, ...campos: Array<string | undefined | null>) =>
  campos.some((c) => (c ?? "").toLowerCase().includes(q));

/* ------------------------------------------------------------------ *
 *  Piezas pequeñas de tabla
 * ------------------------------------------------------------------ */

function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <TableHead className={cn("h-10 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", className)}>
      {children}
    </TableHead>
  );
}

function AccionIcono({
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
          className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", destructiva && "hover:bg-destructive/10 hover:text-destructive")}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{etiqueta}</TooltipContent>
    </Tooltip>
  );
}

function AccionesFila({ onEditar, onBorrar, children }: { onEditar: () => void; onBorrar: () => void; children?: React.ReactNode }) {
  return (
    <div className="flex justify-end gap-0.5">
      {children}
      <AccionIcono etiqueta="Editar" onClick={onEditar}>
        <Pencil className="h-4 w-4" />
      </AccionIcono>
      <AccionIcono etiqueta="Eliminar" onClick={onBorrar} destructiva>
        <Trash2 className="h-4 w-4" />
      </AccionIcono>
    </div>
  );
}

function FilasCargando({ columnas }: { columnas: number }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {Array.from({ length: columnas }).map((__, j) => (
            <TableCell key={j}>
              <Skeleton className={cn("h-4", j === 0 ? "w-40" : j === columnas - 1 ? "ml-auto w-16" : "w-24")} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function Vacio({
  icono: Icono,
  titulo,
  texto,
  accion,
}: {
  icono: React.ComponentType<{ className?: string }>;
  titulo: string;
  texto?: string;
  accion?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icono className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="font-medium text-foreground">{titulo}</p>
      {texto && <p className="max-w-sm text-sm text-muted-foreground">{texto}</p>}
      {accion && <div className="mt-2">{accion}</div>}
    </div>
  );
}

/* Cabecera común de cada pestaña: título, contador, buscador y acciones. */
function Seccion({
  titulo,
  descripcion,
  total,
  busqueda,
  onBusqueda,
  placeholder,
  cargando,
  onActualizar,
  onNuevo,
  etiquetaNuevo,
  filtros,
  children,
}: {
  titulo: string;
  descripcion: string;
  total: number;
  busqueda: string;
  onBusqueda: (v: string) => void;
  placeholder: string;
  cargando: boolean;
  onActualizar: () => void;
  onNuevo: () => void;
  etiquetaNuevo: string;
  filtros?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border/60 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              {titulo}
              {!cargando && (
                <span className="rounded-full bg-muted px-2 py-0.5 font-body text-xs font-medium text-muted-foreground">{total}</span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">{descripcion}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onActualizar} disabled={cargando} aria-label="Actualizar">
              <RefreshCw className={cn("h-4 w-4", cargando && "animate-spin")} />
              <span className="hidden sm:inline">Actualizar</span>
            </Button>
            <Button size="sm" onClick={onNuevo}>
              <Plus className="h-4 w-4" /> {etiquetaNuevo}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={busqueda}
              onChange={(e) => onBusqueda(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="h-9 pl-9 pr-8"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => onBusqueda("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {filtros}
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Panel
 * ------------------------------------------------------------------ */

const Admin = () => {
  const { user, isLoading: cargandoSesion, logout } = useAuth();
  const router = useRouter();

  const [pestana, setPestana] = useState<Pestana>("citas");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todas" | EstadoCita>("todas");

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [loadingCitas, setLoadingCitas] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [servicioFormOpen, setServicioFormOpen] = useState(false);
  const [citaFormOpen, setCitaFormOpen] = useState(false);
  const [clienteFormOpen, setClienteFormOpen] = useState(false);
  const [deleteServicioOpen, setDeleteServicioOpen] = useState(false);
  const [deleteCitaOpen, setDeleteCitaOpen] = useState(false);
  const [deleteClienteOpen, setDeleteClienteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null);
  const [deletingServicio, setDeletingServicio] = useState<Servicio | null>(null);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [deletingCliente, setDeletingCliente] = useState<Cliente | null>(null);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);
  const [deletingCita, setDeletingCita] = useState<Cita | null>(null);
  const [cambiandoEstado, setCambiandoEstado] = useState<string | null>(null);

  /* Sin sesión no se pinta el panel: al login, y de vuelta aquí al entrar. */
  useEffect(() => {
    if (!cargandoSesion && !user) router.replace("/login?volver=/admin");
  }, [cargandoSesion, user, router]);

  /* La pestaña abierta se recuerda en el hash (#posts) para volver a ella tras recargar. */
  useEffect(() => {
    const inicial = window.location.hash.replace("#", "") as Pestana;
    if (PESTANAS.includes(inicial)) setPestana(inicial);
  }, []);
  const cambiarPestana = (valor: string) => {
    const p = valor as Pestana;
    setPestana(p);
    setBusqueda("");
    window.history.replaceState(null, "", `#${p}`);
  };

  /* Un 401 significa que la sesión venció: al login. Cualquier otro error, aviso. */
  const reportar = useCallback(
    (err: unknown, mensaje: string) => {
      if (err instanceof ErrorApi && err.sinSesion) {
        router.push("/login?volver=/admin");
        return;
      }
      console.error(mensaje, err);
      toast.error(mensajeDeError(err, mensaje));
    },
    [router],
  );

  const fetchClientes = useCallback(async () => {
    setLoadingClientes(true);
    try {
      const r = await api.obtener<{ clientes: Cliente[] }>("/v1/admin/clientes?por_pagina=200");
      setClientes(r.clientes);
    } catch (err) {
      reportar(err, "No se pudieron cargar los clientes.");
    } finally {
      setLoadingClientes(false);
    }
  }, [reportar]);

  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const r = await api.obtener<{ posts: Post[] }>("/v1/admin/posts");
      setPosts(r.posts);
    } catch (err) {
      reportar(err, "No se pudieron cargar los posts.");
    } finally {
      setLoadingPosts(false);
    }
  }, [reportar]);

  const fetchServicios = useCallback(async () => {
    setLoadingServicios(true);
    try {
      const r = await api.obtener<{ servicios: Servicio[] }>("/v1/admin/servicios");
      setServicios(r.servicios);
    } catch (err) {
      reportar(err, "No se pudieron cargar los servicios.");
    } finally {
      setLoadingServicios(false);
    }
  }, [reportar]);

  const fetchCitas = useCallback(async () => {
    setLoadingCitas(true);
    try {
      const r = await api.obtener<{ citas: Cita[] }>("/v1/admin/citas?por_pagina=200");
      setCitas(r.citas);
    } catch (err) {
      reportar(err, "No se pudieron cargar las citas.");
    } finally {
      setLoadingCitas(false);
    }
  }, [reportar]);

  const fetchTodo = useCallback(() => {
    fetchClientes();
    fetchPosts();
    fetchServicios();
    fetchCitas();
  }, [fetchClientes, fetchPosts, fetchServicios, fetchCitas]);

  useEffect(() => {
    if (user) fetchTodo();
  }, [user, fetchTodo]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  // Posts
  const handleNewPost = () => {
    setEditingPost(null);
    setFormOpen(true);
  };
  const handleEditPost = async (post: Post) => {
    try {
      const r = await api.obtener<{ post: Post }>(`/v1/admin/posts/${post.id}`); // con contenido
      setEditingPost(r.post);
      setFormOpen(true);
    } catch (err) {
      reportar(err, "No se pudo abrir el post.");
    }
  };
  const handleDeletePost = (post: Post) => {
    setDeletingPost(post);
    setDeleteOpen(true);
  };
  const handleSavePost = async (data: PostFormData) => {
    try {
      if (editingPost) {
        await api.actualizar(`/v1/admin/posts/${editingPost.id}`, data);
        toast.success("Post actualizado.");
      } else {
        await api.enviar("/v1/admin/posts", data);
        toast.success("Post creado.");
      }
      fetchPosts();
    } catch (err) {
      reportar(err, "Error al guardar el post.");
      throw err;
    }
  };
  const handleConfirmDelete = async () => {
    if (!deletingPost) return;
    try {
      await api.borrar(`/v1/admin/posts/${deletingPost.id}`);
      toast.success("Post eliminado.");
      fetchPosts();
    } catch (err) {
      reportar(err, "Error al eliminar el post.");
      throw err;
    }
  };

  // Servicios
  const handleNewServicio = () => {
    setEditingServicio(null);
    setServicioFormOpen(true);
  };
  const handleEditServicio = (servicio: Servicio) => {
    setEditingServicio(servicio);
    setServicioFormOpen(true);
  };
  const handleDeleteServicio = (servicio: Servicio) => {
    setDeletingServicio(servicio);
    setDeleteServicioOpen(true);
  };
  const handleSaveServicio = async (data: ServicioFormData) => {
    const cuerpo = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      duracion_min: data.duracion,
      precio: data.precio,
      activo: data.activo,
    };
    try {
      if (editingServicio) {
        await api.actualizar(`/v1/admin/servicios/${editingServicio.id}`, cuerpo);
        toast.success("Servicio actualizado.");
      } else {
        await api.enviar("/v1/admin/servicios", cuerpo);
        toast.success("Servicio creado.");
      }
      fetchServicios();
    } catch (err) {
      reportar(err, "Error al guardar el servicio.");
      throw err;
    }
  };
  const handleConfirmDeleteServicio = async () => {
    if (!deletingServicio) return;
    try {
      await api.borrar(`/v1/admin/servicios/${deletingServicio.id}`);
      toast.success("Servicio eliminado.");
      fetchServicios();
    } catch (err) {
      reportar(err, "Error al eliminar el servicio. Si tiene citas, desactívalo.");
      throw err;
    }
  };

  // Clientes
  const handleNewCliente = () => {
    setEditingCliente(null);
    setClienteFormOpen(true);
  };
  const handleEditCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setClienteFormOpen(true);
  };
  const handleDeleteCliente = (cliente: Cliente) => {
    setDeletingCliente(cliente);
    setDeleteClienteOpen(true);
  };
  const handleSaveCliente = async (data: ClienteFormData) => {
    try {
      if (editingCliente) {
        await api.actualizar(`/v1/admin/clientes/${editingCliente.id}`, data);
        toast.success("Cliente actualizado.");
      } else {
        await api.enviar("/v1/admin/clientes", data);
        toast.success("Cliente creado.");
      }
      fetchClientes();
    } catch (err) {
      reportar(err, "Error al guardar el cliente.");
      throw err;
    }
  };
  const handleConfirmDeleteCliente = async () => {
    if (!deletingCliente) return;
    try {
      await api.borrar(`/v1/admin/clientes/${deletingCliente.id}`);
      toast.success("Cliente eliminado.");
      fetchClientes();
    } catch (err) {
      reportar(err, "Error al eliminar el cliente. Si tiene citas, no se puede borrar.");
      throw err;
    }
  };

  // Citas
  const handleNewCita = () => {
    setEditingCita(null);
    setCitaFormOpen(true);
  };
  const handleEditCita = (cita: Cita) => {
    setEditingCita(cita);
    setCitaFormOpen(true);
  };
  const handleDeleteCita = (cita: Cita) => {
    setDeletingCita(cita);
    setDeleteCitaOpen(true);
  };
  const handleSaveCita = async (data: CitaFormData) => {
    try {
      if (editingCita) {
        /* El correo identifica al cliente y no se cambia desde la cita. */
        await api.actualizar(`/v1/admin/citas/${editingCita.id}`, {
          nombre: data.nombre,
          telefono: data.telefono,
          servicio: data.servicio,
          fecha: data.fecha,
          hora: data.hora,
          estado: data.estado,
          notas: data.notas,
        });
        toast.success("Cita actualizada.");
      } else {
        await api.enviar("/v1/admin/citas", data);
        toast.success("Cita creada.");
      }
      fetchCitas();
      fetchClientes();
    } catch (err) {
      reportar(err, "Error al guardar la cita.");
      throw err;
    }
  };
  const handleConfirmDeleteCita = async () => {
    if (!deletingCita) return;
    try {
      await api.borrar(`/v1/admin/citas/${deletingCita.id}`);
      toast.success("Cita eliminada.");
      fetchCitas();
    } catch (err) {
      reportar(err, "Error al eliminar la cita.");
      throw err;
    }
  };
  /* Atajo desde la fila: confirmar o cancelar sin abrir el formulario. */
  const cambiarEstadoCita = async (cita: Cita, estado: EstadoCita) => {
    setCambiandoEstado(cita.id);
    try {
      await api.actualizar(`/v1/admin/citas/${cita.id}`, { estado });
      toast.success(`Cita de ${cita.nombre} ${ETIQUETA_ESTADO[estado].toLowerCase()}.`);
      setCitas((prev) => prev.map((c) => (c.id === cita.id ? { ...c, estado } : c)));
    } catch (err) {
      reportar(err, "No se pudo cambiar el estado de la cita.");
    } finally {
      setCambiandoEstado(null);
    }
  };

  /* Filtrado en el cliente: son listas cortas. */
  const q = busqueda.trim().toLowerCase();
  const citasFiltradas = useMemo(
    () =>
      citas.filter(
        (c) =>
          (filtroEstado === "todas" || c.estado === filtroEstado) &&
          (q === "" || contiene(q, c.nombre, c.email, c.servicioNombre, c.telefono)),
      ),
    [citas, filtroEstado, q],
  );
  const clientesFiltrados = useMemo(
    () => (q === "" ? clientes : clientes.filter((c) => contiene(q, c.nombre, c.correo, c.telefono))),
    [clientes, q],
  );
  const postsFiltrados = useMemo(
    () => (q === "" ? posts : posts.filter((p) => contiene(q, p.title, p.category, p.slug))),
    [posts, q],
  );
  const serviciosFiltrados = useMemo(
    () => (q === "" ? servicios : servicios.filter((s) => contiene(q, s.titulo, s.descripcion))),
    [servicios, q],
  );

  const conteoEstado = useMemo(() => {
    const c: Record<"todas" | EstadoCita, number> = { todas: citas.length, pendiente: 0, confirmada: 0, cancelada: 0, completada: 0 };
    for (const cita of citas) c[cita.estado] = (c[cita.estado] ?? 0) + 1;
    return c;
  }, [citas]);
  const publicados = posts.filter((p) => p.published).length;
  const activos = servicios.filter((s) => s.activo !== false).length;

  const cargandoTodo = loadingCitas && loadingClientes && loadingPosts && loadingServicios;

  if (cargandoSesion || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const resumen: Array<{ id: Pestana; etiqueta: string; icono: React.ComponentType<{ className?: string }>; valor: number; detalle: string; cargando: boolean }> = [
    {
      id: "citas",
      etiqueta: "Citas",
      icono: Calendar,
      valor: citas.length,
      detalle: conteoEstado.pendiente > 0 ? `${conteoEstado.pendiente} por confirmar` : "Ninguna pendiente",
      cargando: loadingCitas,
    },
    { id: "clientes", etiqueta: "Clientes", icono: Users, valor: clientes.length, detalle: "En total", cargando: loadingClientes },
    { id: "posts", etiqueta: "Blog", icono: FileText, valor: posts.length, detalle: `${publicados} publicados`, cargando: loadingPosts },
    { id: "servicios", etiqueta: "Servicios", icono: Briefcase, valor: servicios.length, detalle: `${activos} activos`, cargando: loadingServicios },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image src={logos.imago} alt="" width={30} height={40} className="h-10 w-auto" priority />
            <div>
              <h1 className="font-display text-base font-semibold leading-tight text-foreground sm:text-lg">Panel de administración</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">Eveline Dublán</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/" target="_blank" rel="noopener">
                <ExternalLink className="h-4 w-4" /> Ver sitio
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 pl-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    {iniciales(user.nombre || user.correo)}
                  </span>
                  <span className="hidden max-w-[10rem] truncate sm:inline">{user.nombre || user.correo}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium">{user.nombre || "Administración"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.correo}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" target="_blank" rel="noopener">
                    <ExternalLink className="mr-2 h-4 w-4" /> Ver sitio público
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={fetchTodo}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Recargar todo
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Resumen: cada tarjeta lleva a su pestaña */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {resumen.map(({ id, etiqueta, icono: Icono, valor, detalle, cargando }) => {
            const activa = pestana === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => cambiarPestana(id)}
                aria-pressed={activa}
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  activa ? "border-primary/50 ring-1 ring-primary/30" : "border-border",
                )}
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", activa ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
                  <Icono className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{etiqueta}</p>
                  {cargando ? (
                    <Skeleton className="mt-1 h-6 w-12" />
                  ) : (
                    <p className="font-display text-2xl font-semibold leading-tight text-foreground">{valor}</p>
                  )}
                  <p className="truncate text-xs text-muted-foreground">{cargando ? "Cargando…" : detalle}</p>
                </div>
              </button>
            );
          })}
        </div>

        <Tabs value={pestana} onValueChange={cambiarPestana} className="space-y-4">
          <div className="overflow-x-auto pb-1">
            <TabsList className="h-11 w-max bg-muted/60 p-1">
              {resumen.map(({ id, etiqueta, icono: Icono }) => (
                <TabsTrigger key={id} value={id} className="h-full gap-2 px-4 text-sm font-medium">
                  <Icono className="h-4 w-4" /> {etiqueta}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Citas */}
          <TabsContent value="citas" className="mt-0">
            <Seccion
              titulo="Citas"
              descripcion="Las más recientes primero. Confirma o cancela desde la fila."
              total={citas.length}
              busqueda={busqueda}
              onBusqueda={setBusqueda}
              placeholder="Buscar por nombre, correo o servicio"
              cargando={loadingCitas}
              onActualizar={fetchCitas}
              onNuevo={handleNewCita}
              etiquetaNuevo="Nueva cita"
              filtros={
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por estado">
                  {(["todas", ...ESTADOS_CITA] as const).map((estado) => (
                    <button
                      key={estado}
                      type="button"
                      onClick={() => setFiltroEstado(estado)}
                      aria-pressed={filtroEstado === estado}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        filtroEstado === estado
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {estado === "todas" ? "Todas" : ETIQUETA_ESTADO[estado]}
                      <span className="ml-1 opacity-70">{conteoEstado[estado]}</span>
                    </button>
                  ))}
                </div>
              }
            >
              {!loadingCitas && citas.length === 0 ? (
                <Vacio
                  icono={Calendar}
                  titulo="Aún no hay citas"
                  texto="Aparecerán aquí cuando alguien reserve desde el sitio o cuando registres una a mano."
                  accion={
                    <Button size="sm" onClick={handleNewCita}>
                      <Plus className="h-4 w-4" /> Registrar una cita
                    </Button>
                  }
                />
              ) : !loadingCitas && citasFiltradas.length === 0 ? (
                <Vacio icono={Search} titulo="Sin resultados" texto="Prueba con otra búsqueda o cambia el filtro de estado." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Cliente</Th>
                      <Th>Servicio</Th>
                      <Th>Fecha</Th>
                      <Th>Estado</Th>
                      <Th className="text-right">Acciones</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingCitas ? (
                      <FilasCargando columnas={5} />
                    ) : (
                      citasFiltradas.map((cita) => {
                        const servicio = cita.servicioNombre || servicios.find((s) => s.id === cita.servicio)?.titulo || cita.servicio || "—";
                        const ocupada = cambiandoEstado === cita.id;
                        return (
                          <TableRow key={cita.id} className="hover:bg-muted/20">
                            <TableCell>
                              <p className="font-medium text-foreground">{cita.nombre || "—"}</p>
                              <p className="text-xs text-muted-foreground">{cita.email || cita.telefono || "—"}</p>
                            </TableCell>
                            <TableCell className="min-w-[10rem] text-sm">{servicio}</TableCell>
                            <TableCell>
                              <p className="whitespace-nowrap text-sm text-foreground">{cita.fecha ? fechaCita(cita.fecha) : "—"}</p>
                              <p className="text-xs text-muted-foreground">{cita.hora || "—"}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={cn("font-medium", ESTILO_ESTADO[cita.estado])}>
                                {ETIQUETA_ESTADO[cita.estado] ?? cita.estado}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <AccionesFila onEditar={() => handleEditCita(cita)} onBorrar={() => handleDeleteCita(cita)}>
                                {ocupada ? (
                                  <span className="inline-flex h-8 w-8 items-center justify-center">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                  </span>
                                ) : (
                                  <>
                                    {cita.estado === "pendiente" && (
                                      <AccionIcono etiqueta="Confirmar" onClick={() => cambiarEstadoCita(cita, "confirmada")}>
                                        <Check className="h-4 w-4 text-emerald-600" />
                                      </AccionIcono>
                                    )}
                                    {cita.estado === "confirmada" && (
                                      <AccionIcono etiqueta="Marcar completada" onClick={() => cambiarEstadoCita(cita, "completada")}>
                                        <Check className="h-4 w-4 text-primary" />
                                      </AccionIcono>
                                    )}
                                    {(cita.estado === "pendiente" || cita.estado === "confirmada") && (
                                      <AccionIcono etiqueta="Cancelar cita" onClick={() => cambiarEstadoCita(cita, "cancelada")} destructiva>
                                        <X className="h-4 w-4" />
                                      </AccionIcono>
                                    )}
                                  </>
                                )}
                              </AccionesFila>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </Seccion>
          </TabsContent>

          {/* Clientes */}
          <TabsContent value="clientes" className="mt-0">
            <Seccion
              titulo="Clientes"
              descripcion="Se crean solos al reservar una cita; también puedes darlos de alta."
              total={clientes.length}
              busqueda={busqueda}
              onBusqueda={setBusqueda}
              placeholder="Buscar por nombre, correo o teléfono"
              cargando={loadingClientes}
              onActualizar={fetchClientes}
              onNuevo={handleNewCliente}
              etiquetaNuevo="Nuevo cliente"
            >
              {!loadingClientes && clientes.length === 0 ? (
                <Vacio icono={Users} titulo="Aún no hay clientes" texto="Se registran solos con la primera cita que reserven." />
              ) : !loadingClientes && clientesFiltrados.length === 0 ? (
                <Vacio icono={Search} titulo="Sin resultados" texto="Ningún cliente coincide con la búsqueda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Nombre</Th>
                      <Th>Contacto</Th>
                      <Th>Cliente desde</Th>
                      <Th className="text-right">Acciones</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingClientes ? (
                      <FilasCargando columnas={4} />
                    ) : (
                      clientesFiltrados.map((c) => (
                        <TableRow key={c.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{c.nombre || "—"}</TableCell>
                          <TableCell>
                            <p className="text-sm">{c.correo}</p>
                            <p className="text-xs text-muted-foreground">{c.telefono || "Sin teléfono"}</p>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{fechaCorta(c.creado_en)}</TableCell>
                          <TableCell className="text-right">
                            <AccionesFila onEditar={() => handleEditCliente(c)} onBorrar={() => handleDeleteCliente(c)} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </Seccion>
          </TabsContent>

          {/* Blog */}
          <TabsContent value="posts" className="mt-0">
            <Seccion
              titulo="Blog"
              descripcion="Los borradores no se ven en el sitio hasta que los publiques."
              total={posts.length}
              busqueda={busqueda}
              onBusqueda={setBusqueda}
              placeholder="Buscar por título o categoría"
              cargando={loadingPosts}
              onActualizar={fetchPosts}
              onNuevo={handleNewPost}
              etiquetaNuevo="Nuevo post"
            >
              {!loadingPosts && posts.length === 0 ? (
                <Vacio
                  icono={FileText}
                  titulo="Aún no hay artículos"
                  texto="Escribe el primero y publícalo cuando esté listo."
                  accion={
                    <Button size="sm" onClick={handleNewPost}>
                      <Plus className="h-4 w-4" /> Escribir el primer post
                    </Button>
                  }
                />
              ) : !loadingPosts && postsFiltrados.length === 0 ? (
                <Vacio icono={Search} titulo="Sin resultados" texto="Ningún artículo coincide con la búsqueda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Título</Th>
                      <Th>Categoría</Th>
                      <Th>Estado</Th>
                      <Th>Fecha</Th>
                      <Th className="text-right">Acciones</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingPosts ? (
                      <FilasCargando columnas={5} />
                    ) : (
                      postsFiltrados.map((post) => (
                        <TableRow key={post.id} className="hover:bg-muted/20">
                          <TableCell className="max-w-md">
                            <p className="truncate font-medium">{post.title}</p>
                            {post.published && (
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                              >
                                Ver en el sitio <ExternalLink className="h-3 w-3" />
                              </Link>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-medium">
                              {POST_CATEGORIES.find((c) => c.value === post.category)?.label || post.category || "—"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn("font-medium", post.published ? ESTILO_ESTADO.confirmada : "border-border bg-muted text-muted-foreground")}
                            >
                              {post.published ? "Publicado" : "Borrador"}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{fechaCorta(post.date || post.created || new Date().toISOString())}</TableCell>
                          <TableCell className="text-right">
                            <AccionesFila onEditar={() => handleEditPost(post)} onBorrar={() => handleDeletePost(post)} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </Seccion>
          </TabsContent>

          {/* Servicios */}
          <TabsContent value="servicios" className="mt-0">
            <Seccion
              titulo="Servicios"
              descripcion="Solo los activos se pueden reservar desde el sitio."
              total={servicios.length}
              busqueda={busqueda}
              onBusqueda={setBusqueda}
              placeholder="Buscar servicio"
              cargando={loadingServicios}
              onActualizar={fetchServicios}
              onNuevo={handleNewServicio}
              etiquetaNuevo="Nuevo servicio"
            >
              {!loadingServicios && servicios.length === 0 ? (
                <Vacio
                  icono={Briefcase}
                  titulo="Aún no hay servicios"
                  texto="Sin servicios activos nadie puede reservar una cita."
                  accion={
                    <Button size="sm" onClick={handleNewServicio}>
                      <Plus className="h-4 w-4" /> Crear el primer servicio
                    </Button>
                  }
                />
              ) : !loadingServicios && serviciosFiltrados.length === 0 ? (
                <Vacio icono={Search} titulo="Sin resultados" texto="Ningún servicio coincide con la búsqueda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Servicio</Th>
                      <Th>Duración</Th>
                      <Th className="text-right">Precio</Th>
                      <Th>Estado</Th>
                      <Th className="text-right">Acciones</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingServicios ? (
                      <FilasCargando columnas={5} />
                    ) : (
                      serviciosFiltrados.map((servicio) => {
                        const activo = servicio.activo !== false;
                        return (
                          <TableRow key={servicio.id} className={cn("hover:bg-muted/20", !activo && "opacity-70")}>
                            <TableCell className="max-w-md">
                              <p className="font-medium">{servicio.titulo || "—"}</p>
                              <p className="truncate text-xs text-muted-foreground">{servicio.descripcion || "Sin descripción"}</p>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{servicio.duracion ? `${servicio.duracion} min` : "—"}</TableCell>
                            <TableCell className="text-right text-sm font-medium tabular-nums">{precioMXN.format(servicio.precio || 0)}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={cn("font-medium", activo ? ESTILO_ESTADO.confirmada : "border-border bg-muted text-muted-foreground")}>
                                {activo ? "Activo" : "Inactivo"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <AccionesFila onEditar={() => handleEditServicio(servicio)} onBorrar={() => handleDeleteServicio(servicio)} />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </Seccion>
          </TabsContent>
        </Tabs>

        {cargandoTodo && <p className="sr-only" aria-live="polite">Cargando el panel…</p>}
      </main>

      <PostFormDialog open={formOpen} onOpenChange={setFormOpen} post={editingPost} onSave={handleSavePost} />
      <ConfirmarBorradoDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        titulo="¿Eliminar este post?"
        descripcion={
          <>
            Se eliminará permanentemente «<strong>{deletingPost?.title}</strong>». Esta acción no se puede deshacer.
          </>
        }
        onConfirm={handleConfirmDelete}
      />
      <ServicioFormDialog open={servicioFormOpen} onOpenChange={setServicioFormOpen} servicio={editingServicio} onSave={handleSaveServicio} />
      <ConfirmarBorradoDialog
        open={deleteServicioOpen}
        onOpenChange={setDeleteServicioOpen}
        titulo="¿Eliminar este servicio?"
        descripcion={
          <>
            Se eliminará «<strong>{deletingServicio?.titulo}</strong>». Si ya tiene citas no se podrá borrar: en ese caso mejor desactívalo.
          </>
        }
        onConfirm={handleConfirmDeleteServicio}
      />
      <CitaFormDialog open={citaFormOpen} onOpenChange={setCitaFormOpen} cita={editingCita} onSave={handleSaveCita} servicios={servicios} />
      <ClienteFormDialog open={clienteFormOpen} onOpenChange={setClienteFormOpen} cliente={editingCliente} onSave={handleSaveCliente} />
      <ConfirmarBorradoDialog
        open={deleteClienteOpen}
        onOpenChange={setDeleteClienteOpen}
        titulo="¿Eliminar este cliente?"
        descripcion={
          <>
            Se eliminará a <strong>{deletingCliente?.nombre || deletingCliente?.correo}</strong>. Solo se puede borrar un cliente sin citas; si tiene historial, consérvalo.
          </>
        }
        onConfirm={handleConfirmDeleteCliente}
      />
      <ConfirmarBorradoDialog
        open={deleteCitaOpen}
        onOpenChange={setDeleteCitaOpen}
        titulo="¿Eliminar esta cita?"
        descripcion={
          <>
            Se eliminará la cita de <strong>{deletingCita?.nombre}</strong>
            {deletingCita?.fecha ? ` del ${fechaCita(deletingCita.fecha)}` : ""}. Si solo quieres anularla, cancélala en lugar de borrarla.
          </>
        }
        onConfirm={handleConfirmDeleteCita}
      />
    </div>
  );
};

export default Admin;
