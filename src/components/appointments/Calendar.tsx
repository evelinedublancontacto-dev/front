"use client";

import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { isBefore, startOfToday } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  markedDates?: Date[];
  className?: string;
}

export default function Calendar({
  selectedDate,
  onSelectDate,
  markedDates = [],
  className,
}: CalendarProps) {
  const today = startOfToday();
  const disabledDays = { before: today };

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-xl shadow-sm border border-gray-200",
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">
          Selecciona una fecha
        </h2>
      </div>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        locale={es}
        disabled={disabledDays}
        modifiers={{
          marked: markedDates,
        }}
        modifiersClassNames={{
          marked: "bg-primary/20 font-bold text-primary",
          selected: "bg-primary text-white hover:bg-primary",
        }}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-gray-900",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-600",
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-gray-100 text-gray-700",
          ),
          day_selected:
            "bg-primary text-white hover:bg-primary focus:bg-primary font-bold",
          day_today: "bg-gray-100 text-primary font-bold",
          day_outside: "text-gray-400 opacity-50",
          day_disabled: "text-gray-300 opacity-50 cursor-not-allowed",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
        showOutsideDays
      />
    </div>
  );
}
