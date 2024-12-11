import { create } from 'zustand';
import type { UserRole } from '@/lib/i18n/types';
import { supabase } from '@/lib/supabase';
import { getDefaultRoute } from '@/lib/navigation/roleNavigation';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  initialized: boolean;
  error: string | null;
  checkUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  initialized: false,
  error: null,

  checkUser: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              role: profile.role,
              name: profile.name,
              avatar: profile.avatar
            }
          });
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      set({ isLoading: false, initialized: true });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { user: authUser }, error: signInError } = 
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) throw signInError;
      if (!authUser) throw new Error('No user returned after sign in');

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (!profile) throw new Error('No profile found');

      const user = {
        id: authUser.id,
        email: authUser.email!,
        role: profile.role as UserRole,
        name: profile.name,
        avatar: profile.avatar
      };

      set({ user, error: null });
      
      const dashboardPath = getDashboardPath(user.role);
      console.log('Redirecting to:', dashboardPath);
      window.location.href = dashboardPath;
      
      return user;
    } catch (error: any) {
      set({ error: error.message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'super_admin':
      return '/super-admin/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'donor':
      return '/donor/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/login';
  }
};