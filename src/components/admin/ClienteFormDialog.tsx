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
import type { Cliente } from "@/lib/tipos";

export interface ClienteFormData {
  nombre: string;
  correo: string;
  telefono: string;
  notas: string;
}

interface ClienteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Cliente | null;
  onSave: (data: ClienteFormData) => Promise<void>;
}

const VACIO: ClienteFormData = { nombre: "", correo: "", telefono: "", notas: "" };

export default function ClienteFormDialog({ open, onOpenChange, cliente, onSave }: ClienteFormDialogProps) {
  const [form, setForm] = useState<ClienteFormData>(VACIO);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof ClienteFormData>(k: K, v: ClienteFormData[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  useEffect(() => {
    setForm(cliente ? { nombre: cliente.nombre, correo: cliente.correo, telefono: cliente.telefono, notas: cliente.notas } : VACIO);
  }, [cliente, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving cliente:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{cliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre completo" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Email</Label>
            <Input id="correo" type="email" value={form.correo} onChange={(e) => set("correo", e.target.value)} placeholder="correo@ejemplo.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" type="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="+52 123 456 7890" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notas">Notas</Label>
            <Textarea id="notas" value={form.notas} onChange={(e) => set("notas", e.target.value)} rows={3} className="resize-none" placeholder="Notas internas" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
