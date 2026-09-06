"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Servicio } from "@/lib/tipos";

export interface ServicioFormData {
  titulo: string;
  descripcion: string;
  duracion: number;
  precio: number;
  activo: boolean;
}

interface ServicioFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  servicio: Servicio | null;
  onSave: (data: ServicioFormData) => Promise<void>;
}

export default function ServicioFormDialog({
  open,
  onOpenChange,
  servicio,
  onSave,
}: ServicioFormDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [activo, setActivo] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (servicio) {
      setTitle(servicio.titulo || "");
      setDescription(servicio.descripcion || "");
      setDuration(servicio.duracion?.toString() || "");
      setPrice(servicio.precio?.toString() || "");
      setActivo(servicio.activo !== false);
    } else {
      setTitle("");
      setDescription("");
      setDuration("");
      setPrice("");
      setActivo(true);
    }
  }, [servicio, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        titulo: title,
        descripcion: description,
        duracion: parseInt(duration) || 0,
        precio: parseFloat(price) || 0,
        activo,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving servicio:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="border-b border-border/50 pb-4">
          <DialogTitle className="text-base font-semibold">
            {servicio ? "Editar Servicio" : "Nuevo Servicio"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Título
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Psicoterapia"
              required
              className="font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Descripción
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del servicio"
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="duration"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Duración (min)
              </Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="60"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Precio
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="800"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Switch id="activo" checked={activo} onCheckedChange={setActivo} />
            <Label
              htmlFor="activo"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Activo
            </Label>
          </div>
          <DialogFooter className="border-t border-border/50 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="font-medium text-xs"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="font-medium text-xs"
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
