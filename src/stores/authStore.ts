import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole } from '@/lib/types/auth';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<UserProfile | null>;
  signUp: (data: SignUpData) => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
  checkRole: (allowedRoles: UserRole[]) => boolean;
}

interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  organization_id?: string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: authData, error: authError } = await supabase.auth
        .signInWithPassword({ email, password });

      if (authError) throw authError;

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      set({ user: profile, isLoading: false });
      return profile;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true, error: null });

      const { data: authData, error: authError } = await supabase.auth
        .signUp({ email: data.email, password: data.password });

      if (authError) throw authError;

      const profile = {
        id: authData.user!.id,
        email: data.email,
        role: data.role,
        first_name: data.first_name,
        last_name: data.last_name,
        organization_id: data.organization_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([profile]);

      if (profileError) throw profileError;

      set({ user: profile, isLoading: false });
      return profile;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  checkRole: (allowedRoles: UserRole[]) => {
    const { user } = get();
    return user ? allowedRoles.includes(user.role) : false;
  }
}));
