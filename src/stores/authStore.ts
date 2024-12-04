import { create } from 'zustand';
import { 
  getCurrentSession,
  signInWithEmail,
  signOutUser,
  signUpWithEmail
} from '../lib/auth/sessionService';
import { getUserProfile, createUserProfile } from '../lib/auth/profileService';
import type { AuthState, UserRole } from '../lib/types/auth';

interface SignUpData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  profileImage?: string;
  defaultDonation?: number;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const useAuthStore = create<AuthState & {
  signUp: (data: SignUpData) => Promise<void>;
}>((set) => ({
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
            name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
            role: session.user.user_metadata?.role || 'user',
            profileImage: session.user.user_metadata?.profileImage,
            defaultDonation: session.user.user_metadata?.defaultDonation,
            socialLinks: session.user.user_metadata?.socialLinks
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
      const user = await signInWithEmail(email, password);
      if (user) {
        const profile = await getUserProfile(user.id);
        if (profile) {
          set({ user: profile, isLoading: false, error: null });
          return profile;
        } else {
          set({ user: null, isLoading: false, error: 'Unable to load user profile' });
          throw new Error('Unable to load user profile');
        }
      }
      throw new Error('Sign in failed');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      set({ error: message, isLoading: false, user: null });
      throw error;
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOutUser();
      set({ user: null, isLoading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign out failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  signUp: async (data: SignUpData) => {
    set({ isLoading: true, error: null });
    try {
      const user = await signUpWithEmail(data.email, data.password, {
        name: data.name,
        role: data.role || 'user',
        profileImage: data.profileImage,
        defaultDonation: data.defaultDonation,
        socialLinks: data.socialLinks
      });
      
      if (user) {
        const profile = await createUserProfile(user.id, {
          email: data.email,
          name: data.name,
          role: data.role || 'user',
          profileImage: data.profileImage,
          defaultDonation: data.defaultDonation,
          socialLinks: data.socialLinks
        });
        
        if (profile) {
          set({ user: profile, isLoading: false, error: null });
          return;
        }
      }
      throw new Error('Sign up failed');
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
      return '/admin/dashboard';
    case 'shelter_admin':
      return '/admin/dashboard';
    case 'donor':
      return '/donor/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/dashboard';
  }
}