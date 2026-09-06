"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { Usuario } from "@/lib/tipos";

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  login: (correo: string, contrasena: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* La sesión vive en una cookie httpOnly: el navegador no puede leerla,
     así que se le pregunta al back quién soy. */
  useEffect(() => {
    api
      .obtener<{ usuario: Usuario | null }>("/v1/auth/yo")
      .then((r) => setUser(r.usuario))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (correo: string, contrasena: string) => {
    const r = await api.enviar<{ usuario: Usuario }>("/v1/auth/entrar", { correo, contrasena });
    setUser(r.usuario);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.enviar("/v1/auth/salir");
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: user !== null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
