import { create } from 'zustand';
import axios from 'axios';

// Define our own User interface matching Supabase's requirements
interface User {
  id: string;
  app_metadata: any;
  user_metadata: any;
  aud: string;
  created_at: string;
  email?: string;
  role?: string;
  // Add any other fields you need
}

export interface ShelterFormType {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  description?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  role: string | null;
  setUser: (user: User | null) => void;
  setRole: (role: string | null) => void;
  clearAuth: () => void;
  signUpShelter: (data: ShelterFormType) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  
  setUser: (user: User | null) => set({ user }),
  setRole: (role: string | null) => set({ role }),
  
  clearAuth: () => set({ user: null, role: null }),
  
  signUpShelter: async (data: ShelterFormType) => {
    try {
      const response = await axios.post('/api/auth/shelter/signup', {
        ...data,
        role: 'shelter'
      });
      if (response.data) {
        set({ user: response.data as User, role: 'shelter' });
      }
    } catch (error) {
      console.error('Shelter signup error:', error);
      throw error;
    }
  }
}));