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
  type AuthError,
  type EnhancedAuthError,
  type ErrorSeverity
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

interface SessionState {
  status: 'idle' | 'authenticating' | 'authenticated' | 'error';
  expiresAt: number | null;
  lastChecked: number | null;
}

interface AuthState {
  user: AuthUser | null;
  role: AUTH_ROLES | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: EnhancedAuthError | null;
  session: SessionState;
  sessionError: EnhancedAuthError | null;
  lastError: EnhancedAuthError | null;
}

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setRole: (role: AUTH_ROLES) => void;
  clearAuth: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  handleError: (error: Error | AuthError, severity: ErrorSeverity) => void;
}

// Add session management utilities
const SESSION_CHECK_INTERVAL = 4 * 60 * 1000; // 4 minutes
const SESSION_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

// Error handling utilities
const createAuthError = (
  error: Error | AuthError,
  severity: ErrorSeverity = 'error'
): EnhancedAuthError => ({
  code: (error as AuthError).code || 'UNKNOWN_ERROR',
  message: error.message,
  details: (error as AuthError).details || {},
  severity,
  handled: false,
  timestamp: Date.now()
});

export const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isLoading: true,
      isAuthenticated: false,
      error: null,
      session: {
        status: 'idle',
        expiresAt: null,
        lastChecked: null
      },
      sessionError: null,
      lastError: null,
      
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
          error: null,
          sessionError: null,
          session: {
            status: 'idle',
            expiresAt: null,
            lastChecked: null
          }
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
          
          if (error) {
            get().handleError(error, 'warning');
            throw error;
          }
          
          get().clearAuth();
        } catch (error) {
          get().handleError(error as Error, 'error');
          throw error;
        }
      },

      login: async (credentials: LoginCredentials) => {
        try {
          set({ 
            isLoading: true, 
            error: null,
            session: { ...get().session, status: 'authenticating' }
          });

          const { data, error } = await supabase.auth.signInWithPassword(credentials);
          
          if (error) {
            get().handleError(error, 'error');
            throw error;
          }
          
          if (data.user) {
            // Try to get role from organization_staff
            const { data: staffData } = await supabase
              .from('organization_staff')
              .select('role')
              .eq('user_id', data.user.id)
              .maybeSingle(); // Use maybeSingle() instead of single()

            const userRole = staffData?.role || 
                            data.user.user_metadata?.role || 
                            AUTH_ROLES.DONOR;

            console.log('Login role resolution:', { staffData, userRole, metadata: data.user.user_metadata });

            set({ 
              user: data.user as User,
              role: userRole as AUTH_ROLES,
              isAuthenticated: true,
              isLoading: false,
              session: {
                status: 'authenticated',
                expiresAt: new Date(data.session!.expires_at!).getTime(),
                lastChecked: Date.now()
              },
              error: null,
              sessionError: null
            });
          }
        } catch (error) {
          console.error('Login error:', error);
          get().handleError(error as Error, 'error');
          throw error;
        }
      },

      refreshSession: async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Session error:', error);
            get().handleError(error, 'warning');
            get().clearAuth();
            return;
          }
          
          if (!session) {
            console.log('No session found');
            get().clearAuth();
            return;
          }

          // First try to get role from organization_staff
          const { data: staffData, error: staffError } = await supabase
            .from('organization_staff')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle(); // Use maybeSingle() instead of single()

          // If no staff record found, try to get role from user metadata
          const userRole = staffData?.role || 
                          session.user.user_metadata?.role || 
                          AUTH_ROLES.DONOR; // Default to DONOR if no role found

          console.log('Role resolution:', { staffData, userRole, metadata: session.user.user_metadata });

          set({
            user: session.user as User,
            role: userRole as AUTH_ROLES,
            isAuthenticated: true,
            isLoading: false,
            session: {
              status: 'authenticated',
              expiresAt: new Date(session.expires_at!).getTime(),
              lastChecked: Date.now()
            },
            error: null,
            sessionError: null
          });

        } catch (error) {
          console.error('Session refresh error:', error);
          get().handleError(error as Error, 'error');
          get().clearAuth();
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
      },

      // New method to check session validity
      checkSession: async () => {
        const state = get();
        const now = Date.now();
        
        // Check if we need to refresh
        if (
          state.session.expiresAt && 
          state.session.lastChecked &&
          now - state.session.lastChecked < SESSION_CHECK_INTERVAL
        ) {
          return; // Skip if checked recently
        }

        // Check if session is expiring soon
        if (
          state.session.expiresAt && 
          state.session.expiresAt - now < SESSION_REFRESH_THRESHOLD
        ) {
          await get().refreshSession();
        }
      },

      handleError: (error: Error | AuthError, severity: ErrorSeverity = 'error') => {
        const enhancedError = createAuthError(error, severity);
        
        set((state) => ({
          error: enhancedError,
          lastError: state.error,
          isLoading: false,
          session: {
            ...state.session,
            status: severity === 'fatal' ? 'error' : state.session.status
          }
        }));

        // Handle fatal errors
        if (severity === 'fatal') {
          get().clearAuth();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        session: {
          status: state.session.status,
          expiresAt: state.session.expiresAt
        }
      })
    }
  )
);