
import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users pour la démonstration
const mockUsers: User[] = [
  { id: '1', email: 'admin@sources-sciences.fr', name: 'Directeur Martin', role: 'admin' },
  { id: '2', email: 'prof@sources-sciences.fr', name: 'Prof. Dubois', role: 'professor' },
  { id: '3', email: 'eleve@sources-sciences.fr', name: 'Marie Durand', role: 'student' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'authentification
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
