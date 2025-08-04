import React from 'react';
import { useAuthProvider } from '@/hooks/useAuth';

const AuthContext = React.createContext<ReturnType<typeof useAuthProvider> | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthContext };