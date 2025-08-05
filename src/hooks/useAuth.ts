import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const { toast } = useToast();

  const checkAdminStatus = async (userEmail: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('email', userEmail)
        .single();

      if (error || !data) {
        setIsAdmin(false);
        setAdminRole(null);
        return false;
      }

      setIsAdmin(true);
      setAdminRole(data.role);
      return true;
    } catch (error) {
      setIsAdmin(false);
      setAdminRole(null);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user?.email) {
          // Check admin status when user logs in
          setTimeout(() => {
            checkAdminStatus(session.user.email!);
          }, 0);
        } else {
          setIsAdmin(false);
          setAdminRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user?.email) {
        checkAdminStatus(session.user.email);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/admin`;
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsAdmin(false);
      setAdminRole(null);
    }
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