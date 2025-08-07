// TEMPORARY STUB - Phase 1 Cleanup
// This file contains stub implementations to prevent TypeScript errors
// Will be replaced with full implementation in Phase 2

import { createContext, useContext, useState, ReactNode, createElement } from 'react';
import { toast } from "sonner";
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  adminRole: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();
  return createElement(AuthContext.Provider, { value: auth }, children);
}

function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    console.warn('Database is empty - authentication will be implemented in Phase 2');
    toast.error('Authentication temporarily disabled during database rebuild');
    return { error: new Error('Authentication disabled during database rebuild') };
  };

  const signOut = async () => {
    console.warn('Database is empty - sign out will be implemented in Phase 2');
    toast.error('Sign out temporarily disabled during database rebuild');
  };

  return {
    user,
    session,
    isLoading,
    isAdmin,
    adminRole,
    signIn,
    signOut,
  };
}