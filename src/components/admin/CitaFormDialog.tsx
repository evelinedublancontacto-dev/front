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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESTADOS_CITA, ETIQUETA_ESTADO, type Cita, type EstadoCita, type Servicio } from "@/lib/tipos";

export interface CitaFormData {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
  notas: string;
}

interface CitaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cita: Cita | null;
  onSave: (data: CitaFormData) => Promise<void>;
  servicios?: Servicio[];
}

const VACIA: CitaFormData = {
  nombre: "",
  email: "",
  telefono: "",
  servicio: "",
  fecha: "",
  hora: "",
  estado: "confirmada",
  notas: "",
};

export default function CitaFormDialog({
  open,
  onOpenChange,
  cita,
  onSave,
  servicios = [],
}: CitaFormDialogProps) {
  const [form, setForm] = useState<CitaFormData>(VACIA);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof CitaFormData>(k: K, v: CitaFormData[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  useEffect(() => {
    setForm(
      cita
        ? {
            nombre: cita.nombre,
            email: cita.email,
            telefono: cita.telefono,
            servicio: cita.servicio,
            fecha: cita.fecha,
            hora: cita.hora,
            estado: cita.estado,
            notas: cita.notas,
          }
        : VACIA,
    );
  }, [cita, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving cita:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-border/50 pb-4">
          <DialogTitle className="text-base font-semibold">
            {cita ? "Editar Cita" : "Nueva Cita"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Cliente
              </Label>
              <Input id="nombre" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre del cliente" required className="font-medium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="correo@ejemplo.com" required disabled={!!cita} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Teléfono
              </Label>
              <Input id="telefono" type="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="+52 123 456 7890" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicio" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Servicio
              </Label>
              <Select value={form.servicio} onValueChange={(v) => set("servicio", v)}>
                <SelectTrigger className="font-medium">
                  <SelectValue placeholder="Seleccionar servicio" />
                </SelectTrigger>
                <SelectContent>
                  {servicios.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fecha
              </Label>
              <Input id="fecha" type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hora" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Hora
              </Label>
              <Input id="hora" type="time" step={900} value={form.hora} onChange={(e) => set("hora", e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estado
            </Label>
            <Select value={form.estado} onValueChange={(v) => set("estado", v as EstadoCita)}>
              <SelectTrigger className="font-medium">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {ESTADOS_CITA.map((e) => (
                  <SelectItem key={e} value={e}>
                    {ETIQUETA_ESTADO[e]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notas" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Notas
            </Label>
            <Textarea id="notas" value={form.notas} onChange={(e) => set("notas", e.target.value)} placeholder="Notas adicionales" rows={3} className="resize-none" />
          </div>
          <DialogFooter className="border-t border-border/50 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="font-medium text-xs">
              Cancelar
            </Button>
            <Button type="submit" disabled={saving || !form.servicio} className="font-medium text-xs">
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
