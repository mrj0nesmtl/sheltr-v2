import { create } from 'zustand';
import axios from 'axios';
import { 
  AUTH_ROLES,
  type User,
  type AuthUser,
  type AuthState,
  type AllowedRole,
  type ShelterAdminSignUpFormData,
  type AuthResponse
} from '@/types/core/auth';

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
  setRole: (role: AllowedRole) => void;
  clearAuth: () => void;
  signUp: (data: ShelterAdminSignUpFormData) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  role: null,
  loading: false,
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
  
  clearAuth: () => set({ 
    user: null,
    role: null,
    isAuthenticated: false,
    error: null
  }),

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

  // Implement required AuthState methods
  login: async () => { /* implement login logic */ },
  logout: async () => { /* implement logout logic */ },
  refreshSession: async () => { /* implement refresh logic */ },
  updateProfile: async () => { /* implement update logic */ }
}));