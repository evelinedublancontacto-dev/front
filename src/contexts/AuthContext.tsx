import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import pb from '@/lib/pocketbase';
import type { RecordModel } from 'pocketbase';

interface AuthContextType {
  user: RecordModel | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<RecordModel | null>(pb.authStore.record);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record);
    });

    setIsLoading(false);
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await pb.collection('users').authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: pb.authStore.isValid,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
