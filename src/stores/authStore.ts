import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import type { Profile, UserRole } from '@/lib/types/auth';
import type { DonorSignUpForm, ShelterSignUpForm } from '@/types/auth/schemas';

interface AuthState {
  user: Profile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  profile: Profile | null;
  login: (credentials: { email: string; password: string }) => Promise<Profile | null>;
  signOut: () => Promise<void>;
  clearAuth: () => void;
  signUpDonor: (data: DonorSignUpForm) => Promise<void>;
  signUpShelter: (data: ShelterSignUpForm) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  profile: null,

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    
    try {
      // First clear any existing state
      set({ user: null, role: null, isAuthenticated: false });
      
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData?.user?.id) throw new Error('Authentication failed');

      // 2. Fetch user profile with role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profile not found');
      if (!profile.role) throw new Error('No role assigned to user');

      set({
        user: profile,
        role: profile.role,
        isAuthenticated: true,
        loading: false,
      });

      return profile;
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false,
        isAuthenticated: false,
        user: null,
        role: null
      });
      return null;
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      // Clear all auth state
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        profile: null
      });
      // Force clear local storage
      localStorage.clear();
      // Force reload the page to clear any cached state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  clearAuth: () => {
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  },

  signUpDonor: async (data: DonorSignUpForm) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: 'donor',
          name: data.name,
          contact_phone: data.contact_phone,
          city: data.city,
          address: data.address,
        }
      }
    })

    if (authError) throw authError

    // Use existing profileStore if available
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user?.id,
        email: data.email,
        role: 'donor',
        name: data.name,
        contact_phone: data.contact_phone,
        city: data.city,
        address: data.address,
        total_donated: 0,
        total_donations: 0,
        impact_score: 0
      })

    if (profileError) throw profileError
  },

  signUpShelter: async (data: ShelterSignUpForm) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: 'shelter',
          ...data
        }
      }
    })

    if (authError) throw authError

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user?.id,
        email: data.email,
        role: 'shelter',
        ...data,
        verified: false
      })

    if (profileError) throw profileError
  },
}));

// Add listener for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    useAuthStore.getState().clearAuth();
  }
  if (event === 'SIGNED_IN' && session) {
    // Fetch and set user profile when session changes
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data: profile, error }) => {
        if (!error && profile) {
          useAuthStore.setState({
            user: profile,
            role: profile.role,
            isAuthenticated: true
          });
        }
      });
  }
});
