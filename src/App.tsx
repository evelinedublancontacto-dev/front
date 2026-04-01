import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Psicoterapia from "./pages/Psicoterapia.tsx";
import SanacionEnergetica from "./pages/SanacionEnergetica.tsx";
import CuencosTibetanos from "./pages/CuencosTibetanos.tsx";
import Meditaciones from "./pages/Meditaciones.tsx";
import SanacionAnimales from "./pages/SanacionAnimales.tsx";
import SesionCumpleanos from "./pages/SesionCumpleanos.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import LuzDeLuna from "./pages/LuzDeLuna.tsx";
import CuarzosYCristales from "./pages/CuarzosYCristales.tsx";
import Cursos from "./pages/Cursos.tsx";
import CursoDetalle from "./pages/CursoDetalle.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicios/psicoterapia" element={<Psicoterapia />} />
            <Route path="/servicios/sanacion-energetica" element={<SanacionEnergetica />} />
            <Route path="/servicios/cuencos-tibetanos" element={<CuencosTibetanos />} />
            <Route path="/servicios/sanacion-para-animales" element={<SanacionAnimales />} />
            <Route path="/servicios/sesion-de-cumpleanos" element={<SesionCumpleanos />} />
            <Route path="/meditaciones" element={<Meditaciones />} />
            <Route path="/luz-de-luna" element={<LuzDeLuna />} />
            <Route path="/luz-de-luna/cuarzos-y-cristales" element={<CuarzosYCristales />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/cursos/:slug" element={<CursoDetalle />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
