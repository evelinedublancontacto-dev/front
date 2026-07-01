"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import pb from "@/lib/pocketbase";
import type { RecordModel } from "pocketbase";
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
  UserPlus,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PostFormDialog, {
  type PostFormData,
  POST_CATEGORIES,
} from "@/components/admin/PostFormDialog";
import DeletePostDialog from "@/components/admin/DeletePostDialog";
import ServicioFormDialog from "@/components/admin/ServicioFormDialog";
import CitaFormDialog from "@/components/admin/CitaFormDialog";
import serviciosData from "@/data/services.json";
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
  const [users, setUsers] = useState<RecordModel[]>([]);
  const [posts, setPosts] = useState<RecordModel[]>([]);
  const [servicios, setServicios] = useState<RecordModel[]>([]);
  const [citas, setCitas] = useState<RecordModel[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingServicios, setLoadingServicios] = useState(false);
  const [loadingCitas, setLoadingCitas] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [servicioFormOpen, setServicioFormOpen] = useState(false);
  const [citaFormOpen, setCitaFormOpen] = useState(false);
  const [deleteServicioOpen, setDeleteServicioOpen] = useState(false);
  const [deleteCitaOpen, setDeleteCitaOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<RecordModel | null>(null);
  const [deletingPost, setDeletingPost] = useState<RecordModel | null>(null);
  const [editingServicio, setEditingServicio] = useState<RecordModel | null>(
    null,
  );
  const [deletingServicio, setDeletingServicio] = useState<RecordModel | null>(
    null,
  );
  const [editingCliente, setEditingCliente] = useState<RecordModel | null>(
    null,
  );
  const [deletingCliente, setDeletingCliente] = useState<RecordModel | null>(
    null,
  );
  const [editingCita, setEditingCita] = useState<RecordModel | null>(null);
  const [deletingCita, setDeletingCita] = useState<RecordModel | null>(null);

  // Service categories for the dropdown
  const serviceCategories = [
    { value: "psicoterapia", label: "Psicoterapia" },
    { value: "sanacion-energetica", label: "Sanación Energética" },
    { value: "cuencos-tibetanos", label: "Cuencos Tibetanos" },
    { value: "meditacion-guiada", label: "Meditación Guiada" },
    { value: "terapia-parejas", label: "Terapia de Parejas" },
    { value: "sesion-cumpleanos", label: "Sesión de Cumpleaños" },
  ];

  // Appointment status options
  const appointmentStatuses = [
    { value: "disponible", label: "Disponible" },
    { value: "confirmada", label: "Confirmada" },
    { value: "cancelada", label: "Cancelada" },
    { value: "completada", label: "Completada" },
  ];

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const result = await pb
        .collection("users")
        .getFullList({ sort: "-created" });
      setUsers(result);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("No se pudieron cargar los usuarios.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const result = await pb
        .collection("posts")
        .getFullList({ sort: "-created" });
      setPosts(result);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.info(
        'No se encontró la colección "posts". Créala en tu panel de PocketBase.',
      );
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchServicios = async () => {
    setLoadingServicios(true);
    try {
      // Servicios se cargan desde el archivo JSON
      setServicios(serviciosData as unknown as RecordModel[]);
    } catch (err) {
      console.error("Error fetching servicios:", err);
      toast.error("No se pudieron cargar los servicios.");
    } finally {
      setLoadingServicios(false);
    }
  };

  const fetchCitas = async () => {
    setLoadingCitas(true);
    try {
      const response = await fetch("/api/citas");
      const data = await response.json();
      setCitas(data.citas || []);
    } catch (err) {
      console.error("Error fetching citas:", err);
      toast.error("No se pudieron cargar las citas.");
    } finally {
      setLoadingCitas(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchServicios();
    fetchCitas();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setFormOpen(true);
  };

  const handleEditPost = (post: RecordModel) => {
    setEditingPost(post);
    setFormOpen(true);
  };

  const handleDeletePost = (post: RecordModel) => {
    setDeletingPost(post);
    setDeleteOpen(true);
  };

  const handleSavePost = async (data: PostFormData) => {
    try {
      if (editingPost) {
        await pb.collection("posts").update(editingPost.id, data);
        toast.success("Post actualizado correctamente.");
      } else {
        await pb.collection("posts").create(data);
        toast.success("Post creado correctamente.");
      }
      fetchPosts();
    } catch (err) {
      console.error("Error saving post:", err);
      toast.error(
        'Error al guardar el post. Verifica que la colección "posts" exista con los campos correctos.',
      );
      throw err;
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingPost) return;
    try {
      await pb.collection("posts").delete(deletingPost.id);
      toast.success("Post eliminado correctamente.");
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Error al eliminar el post.");
      throw err;
    }
  };

  // Servicios CRUD
  const handleNewServicio = () => {
    setEditingServicio(null);
    setServicioFormOpen(true);
  };

  const handleEditServicio = (servicio: RecordModel) => {
    setEditingServicio(servicio);
    setServicioFormOpen(true);
  };

  const handleDeleteServicio = (servicio: RecordModel) => {
    setDeletingServicio(servicio);
    setDeleteServicioOpen(true);
  };

  const handleSaveServicio = async (data: Record<string, unknown>) => {
    try {
      if (editingServicio) {
        await pb.collection("servicios").update(editingServicio.id, data);
        toast.success("Servicio actualizado correctamente.");
      } else {
        await pb.collection("servicios").create(data);
        toast.success("Servicio creado correctamente.");
      }
      fetchServicios();
    } catch (err) {
      console.error("Error saving servicio:", err);
      toast.error("Error al guardar el servicio.");
      throw err;
    }
  };

  const handleConfirmDeleteServicio = async () => {
    if (!deletingServicio) return;
    try {
      await pb.collection("servicios").delete(deletingServicio.id);
      toast.success("Servicio eliminado correctamente.");
      fetchServicios();
    } catch (err) {
      console.error("Error deleting servicio:", err);
      toast.error("Error al eliminar el servicio.");
      throw err;
    }
  };

  // Citas CRUD
  const handleNewCita = () => {
    setEditingCita(null);
    setCitaFormOpen(true);
  };

  const handleEditCita = (cita: RecordModel) => {
    setEditingCita(cita);
    setCitaFormOpen(true);
  };

  const handleDeleteCita = (cita: RecordModel) => {
    setDeletingCita(cita);
    setDeleteCitaOpen(true);
  };

  const handleSaveCita = async (data: Record<string, unknown>) => {
    try {
      if (editingCita) {
        const response = await fetch(`/api/citas`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCita.id, ...data }),
        });
        if (!response.ok) throw new Error("Error al actualizar la cita");
        toast.success("Cita actualizada correctamente.");
      } else {
        const response = await fetch("/api/citas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Error al crear la cita");
        toast.success("Cita creada correctamente.");
      }
      fetchCitas();
      setCitaFormOpen(false);
    } catch (err) {
      console.error("Error saving cita:", err);
      toast.error("Error al guardar la cita.");
    }
  };

  const handleConfirmDeleteCita = async () => {
    if (!deletingCita) return;
    try {
      const response = await fetch(`/api/citas?id=${deletingCita.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la cita");
      toast.success("Cita eliminada correctamente.");
      fetchCitas();
      setDeleteCitaOpen(false);
    } catch (err) {
      console.error("Error deleting cita:", err);
      toast.error("Error al eliminar la cita.");
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
                {user?.email}
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
                  Usuarios
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {users.length}
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
              value="users"
              className="flex items-center gap-2 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold text-xs"
            >
              <Users className="w-4 h-4" /> Usuarios
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
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-gradient-to-r from-card to-muted/20 py-4">
                <CardTitle className="text-base font-semibold">
                  Lista de Usuarios
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchUsers}
                  disabled={loadingUsers}
                  className="font-medium text-xs h-8"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 mr-1 ${loadingUsers ? "animate-spin" : ""}`}
                  />{" "}
                  Actualizar
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {loadingUsers ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay usuarios registrados aún.
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
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground text-center">
                            Verificado
                          </TableHead>
                          <TableHead className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
                            Fecha de Registro
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.id} className="hover:bg-muted/20">
                            <TableCell className="font-medium text-sm">
                              {u.name || u.username || "—"}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {u.email}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant={u.verified ? "default" : "secondary"}
                                className="text-[11px] font-semibold"
                              >
                                {u.verified ? "Sí" : "No"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(u.created).toLocaleDateString("es-ES")}
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
                      No hay posts aún. Crea la colección "posts" en PocketBase
                      con campos: title, slug, content, excerpt, image,
                      published.
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
                              {new Date(post.created).toLocaleDateString(
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
                      No hay servicios aún. Crea la colección "servicios" en
                      PocketBase con campos: titulo, descripcion, duracion,
                      precio, activo.
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
                      No hay citas aún. Crea la colección "citas" en PocketBase
                      con campos: nombre, email, telefono, servicio, fecha,
                      hora, estado, notas.
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
                                {servicioSeleccionado?.titulo ||
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
                                    cita.estado === "confirmada"
                                      ? "default"
                                      : cita.estado === "completada"
                                        ? "default"
                                        : cita.estado === "cancelada"
                                          ? "destructive"
                                          : "secondary"
                                  }
                                  className="text-[11px] font-semibold"
                                >
                                  {cita.estado
                                    ? cita.estado.charAt(0).toUpperCase() +
                                      cita.estado.slice(1)
                                    : "—"}
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
