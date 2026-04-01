import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { RecordModel } from 'pocketbase';
import { Loader2 } from 'lucide-react';

interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: RecordModel | null;
  onSave: (data: PostFormData) => Promise<void>;
}

export const POST_CATEGORIES = [
  { value: 'psicoterapia', label: 'Psicoterapia' },
  { value: 'meditacion', label: 'Meditación' },
  { value: 'sanacion-energetica', label: 'Sanación Energética' },
  { value: 'cristales-y-cuarzos', label: 'Cristales y Cuarzos' },
] as const;

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  published: boolean;
}

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const PostFormDialog = ({ open, onOpenChange, post, onSave }: PostFormDialogProps) => {
  const [form, setForm] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: post.image || '',
        category: post.category || '',
        published: post.published || false,
      });
      setAutoSlug(false);
    } else {
      setForm({ title: '', slug: '', excerpt: '', content: '', image: '', category: '', published: false });
      setAutoSlug(true);
    }
  }, [post, open]);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: autoSlug ? generateSlug(value) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return;
    setSaving(true);
    try {
      await onSave(form);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {post ? 'Editar Post' : 'Nuevo Post'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título del post"
              required
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setAutoSlug(false);
                setForm((prev) => ({ ...prev, slug: e.target.value }));
              }}
              placeholder="url-del-post"
              required
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Extracto</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Breve descripción del post"
              rows={2}
              maxLength={500}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {POST_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                placeholder="https://ejemplo.com/imagen.jpg"
                maxLength={500}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={form.published}
              onCheckedChange={(checked) => setForm((prev) => ({ ...prev, published: checked }))}
            />
            <Label htmlFor="published">Publicado</Label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving || !form.title.trim()}>
              {saving && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              {post ? 'Guardar Cambios' : 'Crear Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormDialog;
