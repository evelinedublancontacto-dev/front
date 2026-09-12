"use client";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titulo: string;
  descripcion: React.ReactNode;
  /** Debe lanzar si falla: el diálogo solo se cierra cuando el borrado sale bien. */
  onConfirm: () => Promise<void>;
}

/* Confirmación de borrado común a posts, servicios, clientes y citas. */
export default function ConfirmarBorradoDialog({ open, onOpenChange, titulo, descripcion, onConfirm }: Props) {
  const [borrando, setBorrando] = useState(false);

  const confirmar = async () => {
    setBorrando(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      /* El error ya se avisó con un toast; el diálogo se queda abierto. */
    } finally {
      setBorrando(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={borrando ? () => {} : onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{descripcion}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={borrando}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={confirmar} disabled={borrando}>
            {borrando ? <Loader2 className="animate-spin" /> : <Trash2 />}
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
