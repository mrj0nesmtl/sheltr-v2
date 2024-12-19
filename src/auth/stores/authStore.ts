import { create } from 'zustand';
import axios from 'axios';
import { 
  AUTH_ROLES,
  type User,
  type AuthUser,
  type AuthState,
  type AllowedRole
} from '@/types/core/auth';

// Helper function to convert Supabase User to AuthUser
const convertUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email || '', // Handle potentially undefined email
    role: user.role || AUTH_ROLES.DONOR // Provide default role if needed
  };
};

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setRole: (role: AllowedRole) => void;
  clearAuth: () => void;
  signUp: (data: any) => Promise<void>; // Type this properly based on your needs
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ 
    user: convertUser(user),
    isAuthenticated: !!user 
  }),
  
  setRole: (role) => set((state) => ({
    user: state.user ? { ...state.user, role } : null
  })),
  
  clearAuth: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),

  signUp: async (data) => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      if (response.data.user) {
        set({ 
          user: convertUser(response.data.user),
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }
}));