import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import CitasHero from "@/components/appointments/CitasHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CitasPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <CitasHero />

        <div id="agendar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 scroll-mt-24">
          <AppointmentCalendar />
        </div>
      </div>
      <Footer />
    </>
  );
}
