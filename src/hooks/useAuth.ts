import { createContext, useContext, useEffect, useMemo, useState, ReactNode, createElement } from 'react';
import { toast } from 'sonner';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  adminRole: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshAdmin = async (u: User | null) => {
    if (!u) { setIsAdmin(false); return; }
    try {
      const { data, error } = await supabase.rpc('get_is_admin');
      if (error) {
        
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data));
      }
    } catch (e) {
      
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => { refreshAdmin(s.user); }, 0);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) { refreshAdmin(session.user); }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message || 'Sign in failed');
      setIsLoading(false);
      return { error };
    }
    toast.success('Signed in');
    setIsLoading(false);
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });
    if (error) {
      toast.error(error.message || 'Sign up failed');
      setIsLoading(false);
      return { error };
    }
    toast.success('Check your email to confirm your account');
    setIsLoading(false);
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    toast.success('Signed out');
  };

  const adminRole = useMemo(() => (isAdmin ? 'admin' : null), [isAdmin]);

  return {
    user,
    session,
    isLoading,
    isAdmin,
    adminRole,
    signIn,
    signUp,
    signOut,
  };
}
