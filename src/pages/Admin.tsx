import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbase';
import type { RecordModel } from 'pocketbase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, FileText, LayoutDashboard, RefreshCw, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import PostFormDialog, { type PostFormData, POST_CATEGORIES } from '@/components/admin/PostFormDialog';
import DeletePostDialog from '@/components/admin/DeletePostDialog';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<RecordModel[]>([]);
  const [posts, setPosts] = useState<RecordModel[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // CRUD state
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<RecordModel | null>(null);
  const [deletingPost, setDeletingPost] = useState<RecordModel | null>(null);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const result = await pb.collection('users').getFullList({ sort: '-created' });
      setUsers(result);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('No se pudieron cargar los usuarios.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const result = await pb.collection('posts').getFullList({ sort: '-created' });
      setPosts(result);
    } catch (err) {
      console.error('Error fetching posts:', err);
      toast.info('No se encontró la colección "posts". Créala en tu panel de PocketBase.');
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        await pb.collection('posts').update(editingPost.id, data);
        toast.success('Post actualizado correctamente.');
      } else {
        await pb.collection('posts').create(data);
        toast.success('Post creado correctamente.');
      }
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err);
      toast.error('Error al guardar el post. Verifica que la colección "posts" exista con los campos correctos.');
      throw err;
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingPost) return;
    try {
      await pb.collection('posts').delete(deletingPost.id);
      toast.success('Post eliminado correctamente.');
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Error al eliminar el post.');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-serif font-bold text-foreground">Panel Administrativo</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Usuarios</p>
                <p className="text-2xl font-bold text-foreground">{users.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Posts del Blog</p>
                <p className="text-2xl font-bold text-foreground">{posts.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog Posts
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Lista de Usuarios</CardTitle>
                <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loadingUsers}>
                  <RefreshCw className={`w-4 h-4 mr-1 ${loadingUsers ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No hay usuarios registrados aún.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Verificado</TableHead>
                          <TableHead>Fecha de Registro</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.name || u.username || '—'}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>
                              <Badge variant={u.verified ? 'default' : 'secondary'}>
                                {u.verified ? 'Sí' : 'No'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(u.created).toLocaleDateString('es-ES')}
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

          {/* Posts Tab */}
          <TabsContent value="posts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Posts del Blog</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={fetchPosts} disabled={loadingPosts}>
                    <RefreshCw className={`w-4 h-4 mr-1 ${loadingPosts ? 'animate-spin' : ''}`} />
                    Actualizar
                  </Button>
                  <Button size="sm" onClick={handleNewPost}>
                    <Plus className="w-4 h-4 mr-1" />
                    Nuevo Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingPosts ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-muted-foreground">
                      No hay posts aún. Crea la colección "posts" en PocketBase con campos: title, slug, content, excerpt, image, published.
                    </p>
                    <Button onClick={handleNewPost}>
                      <Plus className="w-4 h-4 mr-1" />
                      Crear Primer Post
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell className="text-muted-foreground">{post.slug}</TableCell>
                            <TableCell>
                              <Badge variant={post.published ? 'default' : 'outline'}>
                                {post.published ? 'Publicado' : 'Borrador'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(post.created).toLocaleDateString('es-ES')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)} title="Editar">
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post)} title="Eliminar" className="text-destructive hover:text-destructive">
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
        </Tabs>
      </main>

      {/* Dialogs */}
      <PostFormDialog open={formOpen} onOpenChange={setFormOpen} post={editingPost} onSave={handleSavePost} />
      <DeletePostDialog open={deleteOpen} onOpenChange={setDeleteOpen} post={deletingPost} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default Admin;
