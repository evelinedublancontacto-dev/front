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
import type { RecordModel } from "pocketbase";

interface CitaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cita: RecordModel | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  servicios?: RecordModel[];
}

export default function CitaFormDialog({
  open,
  onOpenChange,
  cita,
  onSave,
  servicios = [],
}: CitaFormDialogProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [notas, setNotas] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cita) {
      setNombre(cita.nombre || "");
      setEmail(cita.email || "");
      setTelefono(cita.telefono || "");
      setServicio(cita.servicio || "");
      setFecha(cita.fecha || "");
      setHora(cita.hora || "");
      setEstado(cita.estado || "disponible");
      setNotas(cita.notas || "");
    } else {
      setNombre("");
      setEmail("");
      setTelefono("");
      setServicio("");
      setFecha("");
      setHora("");
      setEstado("disponible");
      setNotas("");
    }
  }, [cita, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        nombre,
        email,
        telefono,
        servicio,
        fecha,
        hora,
        estado,
        notas,
      });
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
              <Label
                htmlFor="nombre"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Cliente
              </Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del cliente"
                required
                className="font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="telefono"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+52 123 456 7890"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="servicio"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Servicio
              </Label>
              <Select value={servicio} onValueChange={setServicio}>
                <SelectTrigger className="font-medium">
                  <SelectValue placeholder="Seleccionar servicio" />
                </SelectTrigger>
                <SelectContent>
                  {servicios.map((s) => (
                    <SelectItem key={s.id} value={s.titulo || s.id}>
                      {s.titulo || "Sin título"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="fecha"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Fecha
              </Label>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="hora"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Hora
              </Label>
              <Input
                id="hora"
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="estado"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Estado
            </Label>
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger className="font-medium">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="notas"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Notas
            </Label>
            <Textarea
              id="notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Notas adicionales"
              rows={3}
              className="resize-none"
            />
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
