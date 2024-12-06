import { create } from 'zustand';
import { 
  getCurrentSession,
  signInWithEmail,
  signOutUser,
  signUpWithEmail
} from '../lib/auth/sessionService';
import { getUserProfile, createUserProfile } from '../lib/auth/profileService';
import { UserProfile, UserRole, SignUpData } from '../lib/types/auth';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: UserProfile | null;
  error: string | null;
  isLoading: boolean;
  checkUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserProfile | null>;
  signUp: (data: SignUpData) => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  checkUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const session = await getCurrentSession();
      
      if (session?.user) {
        const profile = await getUserProfile(session.user.id);
        if (profile) {
          set({ user: profile, isLoading: false, error: null });
        } else {
          // Try to create profile if it doesn't exist
          const newProfile = await createUserProfile(session.user.id, {
            email: session.user.email!,
            role: session.user.user_metadata?.role || 'user',
            name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
          });
          
          if (newProfile) {
            set({ user: newProfile, isLoading: false, error: null });
          } else {
            set({ user: null, isLoading: false, error: 'Unable to load or create user profile' });
          }
        }
      } else {
        set({ user: null, isLoading: false, error: null });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ 
        user: null,
        error: 'Authentication check failed',
        isLoading: false 
      });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Step 1: Basic auth
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error('Authentication error:', authError);
        throw new Error('Invalid email or password');
      }

      if (!user) {
        throw new Error('No user found');
      }

      // Step 2: Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new Error('Unable to load user profile');
      }

      if (!profile) {
        throw new Error('User profile not found');
      }

      // Step 3: Handle super admin verification
      if (profile.role === 'super_admin') {
        const { data: verified, error: verifyError } = await supabase
          .rpc('verify_super_admin_role', { user_id: user.id });

        if (verifyError) {
          console.error('Super admin verification failed:', verifyError);
          throw new Error('Failed to verify admin status');
        }

        if (!verified) {
          throw new Error('Unauthorized access attempt');
        }
      }

      // Step 4: Set user state and return
      set({ user: profile, isLoading: false, error: null });
      return profile;

    } catch (error) {
      console.error('Sign in error:', error);
      const message = error instanceof Error ? error.message : 'Sign in failed';
      set({ error: message, isLoading: false, user: null });
      throw error;
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
      // Clear any other auth-related state
      localStorage.removeItem('sheltr-user');
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error };
    }
  },

  signUp: async (data: SignUpData) => {
    set({ isLoading: true, error: null });
    try {
      const user = await signUpWithEmail(data.email, data.password, {
        name: data.name || '',
        role: data.role,
      });
      
      if (user) {
        const profile = await createUserProfile(user.id, {
          email: data.email,
          name: data.name || '',
          role: data.role,
        });
        
        if (profile) {
          set({ user: profile, isLoading: false, error: null });
          return profile;
        }
      }
      return null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      set({ error: message, isLoading: false, user: null });
      throw error;
    }
  }
}));

export function getDashboardPath(role?: UserRole): string {
  switch (role) {
    case 'super_admin':
      return '/super-admin/dashboard';
    case 'admin':
    case 'shelter_admin':
      return '/admin/dashboard';
    case 'donor':
      return '/donor/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/login';
  }
}