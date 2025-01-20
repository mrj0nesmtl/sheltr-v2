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

interface AuthState {
  user: AuthUser | null;
  role: AUTH_ROLES | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: EnhancedAuthError | null;
  session: {
    status: 'idle' | 'authenticating' | 'authenticated' | 'error';
    expiresAt: number | null;
    lastChecked: number | null;
  };
  sessionError: EnhancedAuthError | null;
  lastError: EnhancedAuthError | null;
  hasInitialized: boolean;
  isInitializing: boolean;
}

// Separate actions from state
interface AuthActions {
  setUser: (user: User | null) => void;
  setRole: (role: AUTH_ROLES) => void;
  clearAuth: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  handleError: (error: Error | AuthError, severity: ErrorSeverity) => void;
  setLoading: (isLoading: boolean) => void;
  setInitializing: (isInitializing: boolean) => void;
  setInitialized: (hasInitialized: boolean) => void;
  batchUpdate: (updates: Partial<AuthState>) => void;
  initialize: () => Promise<void>;
}

// Combine for store type
type AuthStore = AuthState & AuthActions;

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

const DEBUG = false // Toggle this for development

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
      session: {
        status: 'idle',
        expiresAt: null,
        lastChecked: null
      },
      sessionError: null,
      lastError: null,
      hasInitialized: false,
      isInitializing: false,
      
      setLoading: (isLoading: boolean) => set({ isLoading }),
      
      setUser: (user) => {
        const currentState = get();
        // Only update if values actually changed
        if (
          currentState.user?.id !== user?.id || 
          currentState.role !== user?.role ||
          currentState.isAuthenticated !== !!user
        ) {
          set({ 
            user: convertUser(user),
            role: user?.role || null,
            isAuthenticated: !!user 
          });
        }
      },
      
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
          isInitializing: false,
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
        if (get().isInitializing) return;
        
        try {
          get().batchUpdate({ 
            isLoading: true,
            isInitializing: true,
            error: null,
            session: { ...get().session, status: 'authenticating' }
          });

          console.log('🚀 Starting auth process...');
          const { data, error } = await supabase.auth.signInWithPassword(credentials);
          
          if (error) {
            console.error('❌ Auth Error:', error);
            get().handleError(error, 'error');
            throw error;
          }
          
          if (!data.user || !data.session) {
            throw new Error('No user data received from authentication');
          }

          console.log('✅ Auth successful, fetching profile...');
          
          // Fetch profile data including role
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role, first_name, last_name')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            console.error('❌ Profile Error:', profileError);
            get().handleError(profileError, 'error');
            throw profileError;
          }

          // Determine user role with fallback chain
          const userRole = profileData?.role || 
                          data.user.user_metadata?.role || 
                          AUTH_ROLES.DONOR;

          console.log('✅ Profile fetched, updating store...', {
            role: userRole,
            userId: data.user.id
          });

          // Update store with all user data
          get().batchUpdate({
            user: {
              ...data.user,
              role: userRole,
              firstName: profileData?.first_name,
              lastName: profileData?.last_name
            } as User,
            role: userRole as AUTH_ROLES,
            isAuthenticated: true,
            isLoading: false,
            isInitializing: false,
            hasInitialized: true,
            session: {
              status: 'authenticated',
              expiresAt: new Date(data.session.expires_at!).getTime(),
              lastChecked: Date.now()
            },
            error: null,
            sessionError: null
          });

          console.log('✅ Auth store updated successfully');

        } catch (error) {
          console.error('❌ Login error:', error);
          get().handleError(error as Error, 'error');
          throw error; // Re-throw for the form to handle
        } finally {
          get().batchUpdate({
            isLoading: false,
            isInitializing: false
          });
        }
      },

      refreshSession: async () => {
        const currentState = get();
        const now = Date.now();
        
        if (
          currentState.isInitializing || 
          (currentState.session.lastChecked && 
           now - currentState.session.lastChecked < SESSION_CHECK_INTERVAL)
        ) {
          return;
        }

        set({ isInitializing: true });

        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            get().handleError(error, 'warning');
            get().clearAuth();
            return;
          }
          
          if (!session) {
            get().clearAuth();
            return;
          }

          // Only fetch role if user or role has changed
          if (!currentState.user || session.user.id !== currentState.user.id) {
            const { data: staffData } = await supabase
              .from('organization_staff')
              .select('role')
              .eq('user_id', session.user.id)
              .maybeSingle();

            const userRole = staffData?.role || 
                           session.user.user_metadata?.role || 
                           AUTH_ROLES.DONOR;

            set({
              user: session.user as User,
              role: userRole as AUTH_ROLES,
              isAuthenticated: true,
              isLoading: false,
              session: {
                status: 'authenticated',
                expiresAt: new Date(session.expires_at!).getTime(),
                lastChecked: now
              },
              error: null,
              sessionError: null
            });
          } else {
            // Just update session timestamp if user hasn't changed
            set(state => ({
              session: {
                ...state.session,
                lastChecked: now,
                expiresAt: new Date(session.expires_at!).getTime()
              }
            }));
          }

        } catch (error) {
          console.error('Session refresh error:', error);
          get().handleError(error as Error, 'error');
          get().clearAuth();
        } finally {
          set({ isInitializing: false });
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

      checkSession: async () => {
        const state = get();
        const now = Date.now();
        
        // Skip check if recently checked
        if (
          state.session.lastChecked &&
          now - state.session.lastChecked < SESSION_CHECK_INTERVAL
        ) {
          return;
        }

        // Only refresh if session is expiring soon or missing
        if (
          !state.session.expiresAt ||
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

      setInitializing: (isInitializing: boolean) => 
        set({ isInitializing }),

      setInitialized: (hasInitialized: boolean) => 
        set({ hasInitialized }),

      batchUpdate: (updates: Partial<AuthState>) => {
        const currentState = get();
        const hasChanges = Object.entries(updates).some(
          ([key, value]) => currentState[key as keyof AuthState] !== value
        );
        
        if (hasChanges) {
          set(updates);
        }
      },

      initialize: async () => {
        const store = get()
        
        if (store.isInitializing || store.hasInitialized) {
          DEBUG && console.log('🔄 Auth already initialized or initializing')
          return
        }

        set({ isInitializing: true })
        DEBUG && console.log('🚀 Starting auth initialization...')

        try {
          const { data: { session } } = await supabase.auth.getSession()
          
          if (!session) {
            DEBUG && console.log('ℹ️ No session found')
            set({ 
              hasInitialized: true,
              isInitializing: false,
              isAuthenticated: false,
              user: null
            })
            return
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('role, user_id')
            .eq('user_id', session.user.id)
            .single()

          set({
            hasInitialized: true,
            isInitializing: false,
            isAuthenticated: true,
            user: {
              ...session.user,
              role: profile?.role || null
            }
          })
        } catch (error) {
          console.error('❌ Auth initialization failed:', error)
          set({ 
            hasInitialized: true,
            isInitializing: false,
            error: error as Error,
            isAuthenticated: false,
            user: null
          })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        hasInitialized: state.hasInitialized
      })
    }
  )
);