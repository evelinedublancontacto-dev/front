"use client";

import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  slots: { hora: string; disponible: boolean }[];
  selectedSlot: string | null;
  onSelectSlot: (hora: string) => void;
  loading?: boolean;
  className?: string;
}

export default function TimeSlotPicker({
  slots,
  selectedSlot,
  onSelectSlot,
  loading = false,
  className,
}: TimeSlotPickerProps) {
  const slotsDisponibles = slots.filter((s) => s.disponible);
  const slotsNoDisponibles = slots.filter((s) => !s.disponible);

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-xl shadow-sm border border-gray-200",
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">
          Horarios disponibles
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No hay horarios disponibles para esta fecha</p>
        </div>
      ) : (
        <div className="space-y-4">
          {slotsDisponibles.length > 0 && (
            <div>
              <p className="text-sm text-green-600 font-medium mb-2">
                Disponibles
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slotsDisponibles.map((slot) => (
                  <button
                    key={slot.hora}
                    onClick={() => onSelectSlot(slot.hora)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                      "border border-green-200 text-green-700 hover:bg-green-50",
                      selectedSlot === slot.hora &&
                        "bg-green-600 text-white border-green-600 hover:bg-green-700",
                    )}
                  >
                    {slot.hora}
                  </button>
                ))}
              </div>
            </div>
          )}

          {slotsNoDisponibles.length > 0 && (
            <div>
              <p className="text-sm text-red-500 font-medium mb-2">
                No disponibles
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slotsNoDisponibles.map((slot) => (
                  <div
                    key={slot.hora}
                    className="py-2 px-3 rounded-lg text-sm font-medium text-center text-gray-400 bg-gray-50 border border-gray-100 line-through"
                  >
                    {slot.hora}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSlot && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-primary font-medium">
                Hora seleccionada: {selectedSlot}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
