import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Create the store
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: async (email: string, password: string) => {
    set({ isAuthenticated: true, user: { id: '1', email } });
  },
  signOut: () => {
    set({ isAuthenticated: false, user: null });
  },
}));

// Export the hook
export const useAuth = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuthStore();
  return { isAuthenticated, user, signIn, signOut };
}; 