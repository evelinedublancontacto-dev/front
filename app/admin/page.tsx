"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, ErrorApi, mensajeDeError } from "@/lib/api";
import type { Cita, Cliente, Post, Servicio } from "@/lib/tipos";
import { ETIQUETA_ESTADO } from "@/lib/tipos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut,
  Users,
  FileText,
  LayoutDashboard,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PostFormDialog, {
  type PostFormData,
  POST_CATEGORIES,
} from "@/components/admin/PostFormDialog";
import DeletePostDialog from "@/components/admin/DeletePostDialog";
import ServicioFormDialog, { type ServicioFormData } from "@/components/admin/ServicioFormDialog";
import CitaFormDialog, { type CitaFormData } from "@/components/admin/CitaFormDialog";
import ClienteFormDialog, { type ClienteFormData } from "@/components/admin/ClienteFormDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Admin = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingServicios, setLoadingServicios] = useState(false);
  const [loadingCitas, setLoadingCitas] = useState(false);
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

  useEffect(() => {
    fetchClientes();
    fetchPosts();
    fetchServicios();
    fetchCitas();
  }, [fetchClientes, fetchPosts, fetchServicios, fetchCitas]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
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
        toast.success("Post actualizado correctamente.");
      } else {
        await api.enviar("/v1/admin/posts", data);
        toast.success("Post creado correctamente.");
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
      toast.success("Post eliminado correctamente.");
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
        toast.success("Servicio actualizado correctamente.");
      } else {
        await api.enviar("/v1/admin/servicios", cuerpo);
        toast.success("Servicio creado correctamente.");
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
      toast.success("Servicio eliminado correctamente.");
      fetchServicios();
    } catch (err) {
      reportar(err, "Error al eliminar el servicio. Si tiene citas, desactívalo.");
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
        toast.success("Cliente actualizado correctamente.");
      } else {
        await api.enviar("/v1/admin/clientes", data);
        toast.success("Cliente creado correctamente.");
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
      toast.success("Cliente eliminado correctamente.");
      fetchClientes();
    } catch (err) {
      reportar(err, "Error al eliminar el cliente. Si tiene citas, no se puede borrar.");
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
        toast.success("Cita actualizada correctamente.");
      } else {
        await api.enviar("/v1/admin/citas", data);
        toast.success("Cita creada correctamente.");
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
      toast.success("Cita eliminada correctamente.");
      fetchCitas();
      setDeleteCitaOpen(false);
    } catch (err) {
      reportar(err, "Error al eliminar la cita.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(275_55%_35%)] flex items-center justify-center shadow-md">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Panel de Administración
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Gestión integral de tu negocio
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-foreground">
                {user?.correo}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                Administrador
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="font-medium"
            >
              <LogOut className="w-4 h-4 mr-1" /> Salir
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Clientes
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {clientes.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Posts del Blog
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {posts.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Servicios
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {servicios.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Citas
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {citas.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl h-12 bg-muted/50 p-1">
            <TabsTrigger
              value="clientes"
              className="flex items-center gap-2 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold text-xs"
            >
              <Users className="w-4 h-4" /> Clientes
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="flex items-center gap-2 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold text-xs"
            >
              <FileText className="w-4 h-4" /> Blog Posts
            </TabsTrigger>
            <TabsTrigger
              value="servicios"
              className="flex items-center gap-2 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold text-xs"
            >
              <Briefcase className="w-4 h-4" /> Servicios
            </TabsTrigger>
            <TabsTrigger
              value="citas"
              className="flex items-center gap-2 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold text-xs"
            >
              <Calendar className="w-4 h-4" /> Citas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="clientes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-gradient-to-r from-card to-muted/20 py-4">
                <CardTitle className="text-base font-semibold">
                  Clientes
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchClientes}
                    disabled={loadingClientes}
                    className="font-medium text-xs h-8"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 mr-1 ${loadingClientes ? "animate-spin" : ""}`}
                    />{" "}
                    Actualizar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNewCliente}
                    className="font-medium text-xs h-8"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Nuevo Cliente
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loadingClientes ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : clientes.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Aún no hay clientes. Se crean solos al reservar una cita.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Nombre
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Email
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Teléfono
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Desde
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-right">
                            Acciones
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientes.map((c) => (
                          <TableRow key={c.id} className="hover:bg-muted/20">
                            <TableCell className="font-medium text-sm">
                              {c.nombre || "—"}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {c.correo}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {c.telefono || "—"}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(c.creado_en).toLocaleDateString("es-ES")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditCliente(c)}
                                  title="Editar"
                                  className="h-8 w-8"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteCliente(c)}
                                  title="Eliminar"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="posts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-gradient-to-r from-card to-muted/20 py-4">
                <CardTitle className="text-base font-semibold">
                  Posts del Blog
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchPosts}
                    disabled={loadingPosts}
                    className="font-medium text-xs h-8"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 mr-1 ${loadingPosts ? "animate-spin" : ""}`}
                    />{" "}
                    Actualizar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNewPost}
                    className="font-medium text-xs h-8"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Nuevo Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loadingPosts ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-muted-foreground">
                      No hay posts aún.
                    </p>
                    <Button onClick={handleNewPost}>
                      <Plus className="w-4 h-4 mr-1" /> Crear Primer Post
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Título
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Categoría
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-center">
                            Estado
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Fecha
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-right">
                            Acciones
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post.id} className="hover:bg-muted/20">
                            <TableCell className="font-medium text-sm">
                              {post.title}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className="text-[11px] font-semibold"
                              >
                                {POST_CATEGORIES.find(
                                  (c) => c.value === post.category,
                                )?.label ||
                                  post.category ||
                                  "—"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant={post.published ? "default" : "outline"}
                                className="text-[11px] font-semibold"
                              >
                                {post.published ? "Publicado" : "Borrador"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(post.date || post.created || Date.now()).toLocaleDateString(
                                "es-ES",
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditPost(post)}
                                  title="Editar"
                                  className="h-8 w-8"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeletePost(post)}
                                  title="Eliminar"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="servicios">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-gradient-to-r from-card to-muted/20 py-4">
                <CardTitle className="text-base font-semibold">
                  Servicios
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchServicios}
                    disabled={loadingServicios}
                    className="font-medium text-xs h-8"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 mr-1 ${loadingServicios ? "animate-spin" : ""}`}
                    />{" "}
                    Actualizar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNewServicio}
                    className="font-medium text-xs h-8"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Nuevo Servicio
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loadingServicios ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : servicios.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-muted-foreground">
                      No hay servicios aún.
                    </p>
                    <Button onClick={handleNewServicio}>
                      <Plus className="w-4 h-4 mr-1" /> Crear Primer Servicio
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Título
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Descripción
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-center">
                            Duración
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-right">
                            Precio
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-center">
                            Activo
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-right">
                            Acciones
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servicios.map((servicio) => (
                          <TableRow
                            key={servicio.id}
                            className="hover:bg-muted/20"
                          >
                            <TableCell className="font-semibold text-sm">
                              {servicio.titulo || "—"}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {servicio.descripcion || "—"}
                            </TableCell>
                            <TableCell className="text-center text-sm text-muted-foreground">
                              {servicio.duracion
                                ? `${servicio.duracion} min`
                                : "—"}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-sm">
                              ${servicio.precio || "0"}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant={
                                  servicio.activo !== false
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-[11px] font-semibold"
                              >
                                {servicio.activo !== false ? "Sí" : "No"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditServicio(servicio)}
                                  title="Editar"
                                  className="h-8 w-8"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteServicio(servicio)}
                                  title="Eliminar"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="citas">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-gradient-to-r from-card to-muted/20 py-4">
                <CardTitle className="text-base font-semibold">
                  Citas Agendadas
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchCitas}
                    disabled={loadingCitas}
                    className="font-medium text-xs h-8"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 mr-1 ${loadingCitas ? "animate-spin" : ""}`}
                    />{" "}
                    Actualizar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNewCita}
                    className="font-medium text-xs h-8"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Nueva Cita
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loadingCitas ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : citas.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-muted-foreground">
                      No hay citas aún.
                    </p>
                    <Button onClick={handleNewCita}>
                      <Plus className="w-4 h-4 mr-1" /> Crear Primera Cita
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Cliente
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Email
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Servicio
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Fecha
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-center">
                            Hora
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-center">
                            Estado
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-right">
                            Acciones
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {citas.map((cita) => {
                          const servicioSeleccionado = servicios.find(
                            (s) => s.id === cita.servicio,
                          );
                          return (
                            <TableRow
                              key={cita.id}
                              className="hover:bg-muted/20"
                            >
                              <TableCell className="font-semibold text-sm">
                                {cita.nombre || "—"}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {cita.email || "—"}
                              </TableCell>
                              <TableCell className="text-sm">
                                {cita.servicioNombre ||
                                  servicioSeleccionado?.titulo ||
                                  cita.servicio ||
                                  "—"}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {cita.fecha
                                  ? new Date(
                                      cita.fecha + "T00:00:00",
                                    ).toLocaleDateString("es-ES")
                                  : "—"}
                              </TableCell>
                              <TableCell className="text-center text-sm text-muted-foreground">
                                {cita.hora || "—"}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant={
                                    cita.estado === "confirmada" || cita.estado === "completada"
                                      ? "default"
                                      : cita.estado === "cancelada"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                  className="text-[11px] font-semibold"
                                >
                                  {ETIQUETA_ESTADO[cita.estado] ?? cita.estado}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditCita(cita)}
                                    title="Editar"
                                    className="h-8 w-8"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteCita(cita)}
                                    title="Eliminar"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <PostFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        post={editingPost}
        onSave={handleSavePost}
      />
      <DeletePostDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        post={deletingPost}
        onConfirm={handleConfirmDelete}
      />
      <ServicioFormDialog
        open={servicioFormOpen}
        onOpenChange={setServicioFormOpen}
        servicio={editingServicio}
        onSave={handleSaveServicio}
      />
      <AlertDialog
        open={deleteServicioOpen}
        onOpenChange={setDeleteServicioOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará este servicio
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteServicio}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CitaFormDialog
        open={citaFormOpen}
        onOpenChange={setCitaFormOpen}
        cita={editingCita}
        onSave={handleSaveCita}
        servicios={servicios}
      />
      <ClienteFormDialog
        open={clienteFormOpen}
        onOpenChange={setClienteFormOpen}
        cliente={editingCliente}
        onSave={handleSaveCliente}
      />
      <AlertDialog open={deleteClienteOpen} onOpenChange={setDeleteClienteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              Solo se puede borrar un cliente sin citas. Si tiene historial,
              consérvalo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteCliente}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={deleteCitaOpen} onOpenChange={setDeleteCitaOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará esta cita
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteCita}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
