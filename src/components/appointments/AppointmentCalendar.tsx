'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { CalendarDays, CheckCircle, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import Calendar from './Calendar';
import TimeSlotPicker from './TimeSlotPicker';
import AppointmentForm from './AppointmentForm';
import { cn } from '@/lib/utils';

interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number;
  precio: number;
}

type Step = 'servicio' | 'fecha' | 'hora' | 'confirmacion';

export default function AppointmentCalendar() {
  const [step, setStep] = useState<Step>('servicio');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [servicioId, setServicioId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<{ hora: string; disponible: boolean }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Cargar servicios
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('/api/servicios');
        const data = await response.json();
        setServicios(data.servicios || []);
        if (data.servicios?.length > 0) {
          setServicioId(data.servicios[0].id);
        }
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      } finally {
        setLoadingServicios(false);
      }
    };
    fetchServicios();
  }, []);

  // Cargar disponibilidad cuando cambia la fecha
  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    const fetchDisponibilidad = async () => {
      setLoadingSlots(true);
      setSelectedSlot(null);
      try {
        const fechaStr = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(`/api/disponibilidad?fecha=${fechaStr}`);
        const data = await response.json();
        setSlots(data.slots || []);
      } catch (error) {
        console.error('Error al cargar disponibilidad:', error);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchDisponibilidad();
  }, [selectedDate]);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  }, []);

  const handleSlotSelect = useCallback((hora: string) => {
    setSelectedSlot(hora);
  }, []);

  const handleBookingSuccess = useCallback(() => {
    setBookingSuccess(true);
    setStep('confirmacion');
  }, []);

  const goNext = () => {
    if (step === 'servicio' && servicioId) setStep('fecha');
    else if (step === 'fecha' && selectedDate) setStep('hora');
    else if (step === 'hora' && selectedSlot) setStep('confirmacion');
  };

  const goBack = () => {
    if (step === 'fecha') {
      setStep('servicio');
    } else if (step === 'hora') {
      setStep('fecha');
    } else if (step === 'confirmacion') {
      if (bookingSuccess) {
        // Reset after successful booking
        setSelectedDate(undefined);
        setSelectedSlot(null);
        setBookingSuccess(false);
        setStep('fecha');
      } else {
        setStep('hora');
      }
    }
  };

  const canProceed = () => {
    if (step === 'servicio') return !!servicioId;
    if (step === 'fecha') return !!selectedDate;
    if (step === 'hora') return !!selectedSlot;
    return false;
  };

  const steps: { key: Step; label: string; icon: typeof CalendarDays }[] = [
    { key: 'servicio', label: 'Servicio', icon: Sparkles },
    { key: 'fecha', label: 'Fecha', icon: CalendarDays },
    { key: 'hora', label: 'Hora', icon: CalendarDays },
    { key: 'confirmacion', label: 'Confirmar', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  if (loadingServicios) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (servicios.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No hay servicios disponibles
        </h3>
        <p className="text-gray-500">
          Por favor, contacta directamente para agendar una cita.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress bar background */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
          {/* Progress bar active */}
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={s.key} className="relative flex flex-col items-center z-10">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    isCompleted && 'bg-primary text-white',
                    isActive && 'bg-primary text-white ring-4 ring-primary/20',
                    !isActive && !isCompleted && 'bg-gray-200 text-gray-500'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isActive && 'text-primary',
                    isCompleted && 'text-primary',
                    !isActive && !isCompleted && 'text-gray-400'
                  )}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 'servicio' && 'Selecciona un servicio'}
                {step === 'fecha' && 'Selecciona una fecha'}
                {step === 'hora' && 'Selecciona un horario'}
                {step === 'confirmacion' &&
                  (bookingSuccess ? '¡Cita agendada!' : 'Confirma tu cita')}
              </h2>
              <p className="text-gray-500 mt-1">
                {step === 'servicio' && 'Elige el tipo de sesión que necesitas'}
                {step === 'fecha' && 'Selecciona el día que prefieras'}
                {step === 'hora' && 'Elige el horario disponible'}
                {step === 'confirmacion' &&
                  (bookingSuccess
                    ? 'Tu cita ha sido reservada exitosamente'
                    : 'Completa tus datos para reservar')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {step !== 'servicio' && (
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Step: Servicio */}
          {step === 'servicio' && (
            <div className="grid gap-4">
              {servicios.map((servicio) => (
                <button
                  key={servicio.id}
                  onClick={() => setServicioId(servicio.id)}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    servicioId === servicio.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{servicio.titulo}</h3>
                      <p className="text-sm text-gray-500 mt-1">{servicio.descripcion}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="text-gray-500">{servicio.duracion} min</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        ${servicio.precio}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step: Fecha */}
          {step === 'fecha' && (
            <div className="flex justify-center">
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                className="max-w-md"
              />
            </div>
          )}

          {/* Step: Hora */}
          {step === 'hora' && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Horarios para el{' '}
                <span className="font-medium text-primary">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })
                    : ''}
                </span>
              </p>
              <TimeSlotPicker
                slots={slots}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSlotSelect}
                loading={loadingSlots}
              />
            </div>
          )}

          {/* Step: Confirmación */}
          {step === 'confirmacion' && !bookingSuccess && selectedDate && selectedSlot && (
            <AppointmentForm
              fecha={format(selectedDate, 'yyyy-MM-dd')}
              hora={selectedSlot}
              servicioId={servicioId}
              servicios={servicios}
              onSuccess={handleBookingSuccess}
            />
          )}

          {/* Step: Éxito */}
          {step === 'confirmacion' && bookingSuccess && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Tu cita ha sido agendada!
              </h3>
              <p className="text-gray-500 mb-8">
                Te hemos enviado un correo de confirmación con los detalles de tu cita.
              </p>
              <button
                onClick={() => {
                  setSelectedDate(undefined);
                  setSelectedSlot(null);
                  setBookingSuccess(false);
                  setStep('fecha');
                }}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Agendar otra cita
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'confirmacion' && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2',
                canProceed()
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              Continuar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
