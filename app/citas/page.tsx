import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import {
  CalendarDays,
  Clock,
  User,
  Sparkles,
  Heart,
  Moon,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CitasPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-section pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[hsl(270_30%_12%)] via-[hsl(270_25%_18%)] to-background py-24">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-[hsl(42_70%_48%)]/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />

            {/* Stars decoration */}
            <div className="absolute top-20 left-[15%] animate-twinkle">
              <Star className="w-4 h-4 text-[hsl(42_80%_62%)]/60" />
            </div>
            <div
              className="absolute top-32 right-[20%] animate-twinkle"
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="w-3 h-3 text-[hsl(42_80%_62%)]/40" />
            </div>
            <div
              className="absolute top-40 left-[30%] animate-twinkle"
              style={{ animationDelay: "1s" }}
            >
              <Sparkles className="w-5 h-5 text-primary/40" />
            </div>
            <div
              className="absolute top-16 right-[35%] animate-twinkle"
              style={{ animationDelay: "1.5s" }}
            >
              <Star className="w-4 h-4 text-[hsl(42_80%_62%)]/50" />
            </div>
            <div
              className="absolute bottom-40 left-[10%] animate-twinkle"
              style={{ animationDelay: "0.8s" }}
            >
              <Sparkles className="w-3 h-3 text-primary/30" />
            </div>
            <div
              className="absolute bottom-32 right-[15%] animate-twinkle"
              style={{ animationDelay: "2s" }}
            >
              <Star className="w-5 h-5 text-[hsl(42_80%_62%)]/45" />
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(275_55%_45%_/_0.03)_0%,_transparent_50%)]" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2.5 mb-8 animate-float">
              <CalendarDays className="w-4 h-4 text-[hsl(42_80%_62%)]" />
              <span className="text-sm font-medium text-white/90">
                Agenda tu cita
              </span>
              <Heart className="w-3.5 h-3.5 text-primary animate-pulse" />
            </div>

            {/* Title */}
            <div className="relative mb-6">
              <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-gold leading-tight">
                Reserva tu Sesión
              </h1>
              {/* Subtle glow behind title */}
              <div className="absolute inset-0 bg-gradient-gold blur-3xl opacity-20 -z-10 scale-110" />
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
              <Moon className="w-5 h-5 text-primary/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              Selecciona el servicio, fecha y hora que mejor se adapte a ti.
              <span className="text-[hsl(42_70%_48%)] font-medium">
                {" "}
                Estamos aquí para acompañarte en tu camino de sanación.
              </span>
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/50">
                <Sparkles className="w-4 h-4 text-[hsl(42_70%_48%)]" />
                <span className="text-sm">Terapia Holística</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm">Atención Personalizada</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Moon className="w-4 h-4 text-[hsl(42_70%_48%)]" />
                <span className="text-sm">Espacio Seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-card rounded-xl p-6 border-glow text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Servicios Personalizados
              </h3>
              <p className="text-sm text-muted-foreground">
                Cada sesión es adaptada a tus necesidades específicas
              </p>
            </div>
            <div className="bg-gradient-card rounded-xl p-6 border-glow text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Horarios Flexibles
              </h3>
              <p className="text-sm text-muted-foreground">
                Disponibilidad de lunes a viernes en horarios cómodos
              </p>
            </div>
            <div className="bg-gradient-card rounded-xl p-6 border-glow text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Atención Cálida
              </h3>
              <p className="text-sm text-muted-foreground">
                Espacio seguro y confidencial para tu bienestar
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AppointmentCalendar />
        </div>
      </div>
      <Footer />
    </>
  );
}
