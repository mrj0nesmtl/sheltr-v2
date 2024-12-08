import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole } from '@/lib/types/auth';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
  isDonor: () => boolean;
  isSuperAdmin: () => boolean;
  canAccessFeature: (feature: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  initialized: false,

  checkUser: async () => {
    set({ isLoading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        if (profile) {
          // Ensure role is valid
          if (!['super_admin', 'shelter_admin', 'donor', 'participant', 'guest'].includes(profile.role)) {
            throw new Error('Invalid user role');
          }
          set({ user: profile, error: null });
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ error: 'Failed to check auth status', user: null });
    } finally {
      set({ isLoading: false, initialized: true });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!user) throw new Error('No user returned');

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('No profile found');

      set({ user: profile });
      return profile;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      set({ error: message, user: null });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Sign out failed:', error);
      set({ error: 'Failed to sign out' });
    }
  },

  isDonor: () => get().user?.role === 'donor',
  isSuperAdmin: () => get().user?.role === 'super_admin',
  
  canAccessFeature: (feature: string) => {
    const { user } = get();
    if (!user) return false;

    const featureAccess: Record<string, UserRole[]> = {
      'scan': ['donor'],
      'admin': ['super_admin'],
      'shelter': ['shelter_admin'],
      'services': ['participant']
    };

    return featureAccess[feature]?.includes(user.role) ?? false;
  }
}));

// Helper function to get dashboard path based on role
export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'super_admin':
      return '/super-admin/dashboard';
    case 'shelter_admin':
      return '/shelter/dashboard';
    case 'donor':
      return '/donor/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/';
  }
};