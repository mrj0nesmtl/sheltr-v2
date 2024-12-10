import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getCurrentSession, getUserProfile } from '@/lib/auth/authService';
import type { UserProfile } from '@/lib/types/auth';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  initialized: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await getCurrentSession();
        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          setUser(profile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          setUser(profile);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Attempting sign in for:', email);
      
      const { data: { user: authUser }, error: signInError } = 
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) throw signInError;
      if (!authUser) throw new Error('No user returned after sign in');

      console.log('Auth user:', authUser);
      
      const profile = await getUserProfile(authUser.id);
      console.log('User profile:', profile);
      
      if (!profile) throw new Error('No profile found');

      setUser(profile);
      return profile;
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        initialized,
        error,
        signIn,
        signOut
      }}
    >
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