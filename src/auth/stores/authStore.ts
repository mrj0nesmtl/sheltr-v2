import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { supabase } from '@/lib/supabase/client';
import { 
  type User,
  type AuthUser,
  type AuthState,
  type AllowedRole,
  type ShelterAdminSignUpFormData,
  type AuthResponse,
  type LoginCredentials,
  type AuthError
} from '@/types/core/auth';
import { AUTH_ROLES } from '@/auth/types/auth.types';

// Helper function to convert Supabase User to AuthUser
const convertUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email || '',
    role: user.role || AUTH_ROLES.DONOR,
    app_metadata: user.app_metadata,
    user_metadata: user.user_metadata,
    created_at: user.created_at,
    updated_at: user.updated_at,
    aud: user.aud
  };
};

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setRole: (role: AUTH_ROLES) => void;
  clearAuth: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      role: null,
      isLoading: true,
      isAuthenticated: false,
      error: null,
      
      setUser: (user) => set({ 
        user: convertUser(user),
        role: user?.role || null,
        isAuthenticated: !!user 
      }),
      
      setRole: (role) => set((state) => ({
        user: state.user ? { ...state.user, role } : null,
        role
      })),
      
      clearAuth: () => {
        set({ 
          user: null,
          role: null,
          isAuthenticated: false,
          error: null
        });
      },

      signUp: async (data) => {
        try {
          const response = await axios.post<AuthResponse>('/api/auth/signup', data);
          if (response.data.data.user) {
            set({ 
              user: convertUser(response.data.data.user),
              isAuthenticated: true 
            });
          }
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        }
      },

      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          // Clear auth state but don't redirect
          set({ 
            user: null,
            role: null,
            isAuthenticated: false,
            error: null,
            session: null // Clear session
          });
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        }
      },

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          const { data, error } = await supabase.auth.signInWithPassword(credentials);
          
          if (error) throw error;
          
          if (data.user) {
            // Store both user and session
            set({ 
              user: data.user as User,
              role: data.user.role as AUTH_ROLES,
              isAuthenticated: true,
              isLoading: false,
              session: data.session // Add session storage
            });
          }
        } catch (error) {
          set({ 
            error: (error as AuthError).message,
            isLoading: false 
          });
          throw error;
        }
      },

      refreshSession: async () => {
        try {
          set({ isLoading: true });
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (session?.user) {
            set({
              user: session.user as User,
              role: session.user.role as AUTH_ROLES,
              isAuthenticated: true,
              isLoading: false,
              session // Store session
            });
          } else {
            // No valid session found
            set({
              user: null,
              role: null,
              isAuthenticated: false,
              isLoading: false,
              session: null
            });
          }
        } catch (error) {
          set({ 
            error: (error as AuthError).message,
            isLoading: false 
          });
          throw error;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true });
          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', data.id);
          
          if (error) throw error;
          
          set(state => ({
            user: state.user ? { ...state.user, ...data } : null,
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: (error as AuthError).message,
            isLoading: false 
          });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage', // storage key
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        session: state.session
      })
    }
  )
);