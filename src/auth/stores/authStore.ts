import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import { 
  User, 
  UserRole, 
  AuthState, 
  LoginCredentials, 
  SignUpFormData,
  AuthError,
  isValidRole
} from '../types/auth.types';
import { Toast } from '@/components/ui/Toast';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User | null>;
  signOut: () => Promise<void>;
  clearAuth: () => void;
  signUpDonor: (data: SignUpFormData) => Promise<void>;
  signUpShelter: (data: SignUpFormData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  validateRole: (role: string) => role is UserRole;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    
    try {
      // Clear existing state
      set({ user: null, role: null, isAuthenticated: false });
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData?.user?.id) throw new Error('Authentication failed');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profile not found');
      if (!profile.role) throw new Error('No role assigned');

      if (!isValidRole(profile.role)) {
        throw new Error('Invalid user role');
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        role: profile.role as UserRole,
        firstName: profile.first_name,
        lastName: profile.last_name,
        createdAt: new Date(profile.created_at),
        updatedAt: new Date(profile.updated_at),
        lastLogin: new Date(),
        isActive: true,
        profileComplete: Boolean(profile.profile_completed)
      };

      set({
        user,
        role: user.role,
        isAuthenticated: true,
        loading: false,
      });

      Toast.success('Successfully logged in!');
      return user;
    } catch (error) {
      const authError: AuthError = {
        code: 'AUTH_ERROR',
        message: error instanceof Error ? error.message : 'Login failed'
      };
      
      Toast.error(authError.message);
      
      set({ 
        error: authError.message,
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
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        error: null
      });
      localStorage.removeItem('auth');
      Toast.success('Successfully logged out!');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      Toast.error('Error logging out. Please try again.');
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

  signUpDonor: async (data: SignUpFormData) => {
    if (data.role !== UserRole.DONOR) throw new Error('Invalid role for donor signup');
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: UserRole.DONOR,
          firstName: data.firstName,
          lastName: data.lastName
        }
      }
    });

    if (authError) throw authError;

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user?.id,
        email: data.email,
        role: UserRole.DONOR,
        first_name: data.firstName,
        last_name: data.lastName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile_completed: false
      });

    if (profileError) throw profileError;
  },

  signUpShelter: async (data: SignUpFormData) => {
    if (data.role !== UserRole.SHELTER_ADMIN) throw new Error('Invalid role for shelter signup');
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: UserRole.SHELTER_ADMIN,
          firstName: data.firstName,
          lastName: data.lastName
        }
      }
    });

    if (authError) throw authError;

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user?.id,
        email: data.email,
        role: UserRole.SHELTER_ADMIN,
        first_name: data.firstName,
        last_name: data.lastName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile_completed: false
      });

    if (profileError) throw profileError;
  },

  updateProfile: async (data: Partial<User>) => {
    const { user } = get();
    if (!user?.id) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;

    set({
      user: { ...user, ...data }
    });
  },

  validateRole: isValidRole
}));

// Auth state change listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    useAuthStore.getState().clearAuth();
  }
  if (event === 'SIGNED_IN' && session) {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data: profile, error }) => {
        if (!error && profile) {
          const user: User = {
            id: profile.id,
            email: profile.email,
            role: profile.role as UserRole,
            firstName: profile.first_name,
            lastName: profile.last_name,
            createdAt: new Date(profile.created_at),
            updatedAt: new Date(profile.updated_at),
            lastLogin: new Date(),
            isActive: true,
            profileComplete: Boolean(profile.profile_completed)
          };
          
          useAuthStore.setState({
            user,
            role: user.role,
            isAuthenticated: true
          });

          Toast.success(`Welcome back, ${user.firstName}!`);
        }
      })
      .catch((error) => {
        Toast.error('Error loading profile. Please refresh the page.');
        console.error('Profile fetch error:', error);
      });
  }
});