import { create } from 'zustand';
import axios from 'axios';
import { 
  AUTH_ROLES,
  type ShelterAdminSignUpFormData 
} from '@/types/core/auth';

// Updated AuthResponse interface
interface AuthResponse {
  user: User;
  session: any; // You can type this more specifically if needed
}

// Updated User interface to match Supabase
interface User {
  id: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at: string;
  email?: string;
  role?: AUTH_ROLES;
}

interface AuthState {
  user: User | null;
  role: AUTH_ROLES | null; // Updated to use AUTH_ROLES
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setRole: (role: AUTH_ROLES | null) => void;
  clearAuth: () => void;
  signUp: (data: ShelterAdminSignUpFormData) => Promise<void>;
  signUpShelter: (data: ShelterAdminSignUpFormData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: false,
  error: null,
  
  setUser: (user: User | null) => set({ user }),
  setRole: (role: AUTH_ROLES | null) => set({ role }),
  
  clearAuth: () => set({ user: null, role: null }),
  
  logout: () => {
    set({ user: null, role: null });
  },

  signUp: async (data: ShelterAdminSignUpFormData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post<AuthResponse>('/api/auth/signup', data);
      if (response.data.user) {
        set({ 
          user: response.data.user, 
          role: response.data.user.role || null,
          isLoading: false 
        });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Signup failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  signUpShelter: async (data: ShelterAdminSignUpFormData) => {
    try {
      const response = await axios.post<AuthResponse>('/api/auth/shelter/signup', {
        ...data,
        role: AUTH_ROLES.SHELTER_ADMIN
      });
      if (response.data.user) {
        set({ 
          user: response.data.user, 
          role: AUTH_ROLES.SHELTER_ADMIN 
        });
      }
    } catch (error) {
      console.error('Shelter signup error:', error);
      throw error;
    }
  }
}));