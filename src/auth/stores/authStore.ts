import { create } from 'zustand';
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { AuthState, LoginCredentials, UserRole } from '../../lib/auth/types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: true,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ loading: true });
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) throw error;
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        set({
          user,
          role: profile?.role as UserRole,
          isAuthenticated: true,
          loading: false
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      set({ error: error as Error, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        loading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({ error: error as Error, loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ user: null, role: null, isAuthenticated: false, loading: false });
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      set({ 
        user, 
        role: profile.role as UserRole,
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      console.error('Auth store error:', error);
      set({ error: error as Error, loading: false });
    }
  }
}));