import { create } from 'zustand';
import { User, UserRole } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  error: string | null;
  checkUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  getDefaultRoute: (role: UserRole) => string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,
  error: null,

  checkUser: async () => {
    set({ isLoading: true });
    try {
      // Check local storage or session for existing auth
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      set({ isLoading: false, initialized: true });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Your sign in logic here
      const user = { id: '1', email, role: 'super_admin' as UserRole, name: 'Admin' };
      set({ user, isAuthenticated: true, error: null });
      return user;
    } catch (error) {
      set({ error: 'Authentication failed' });
      return null;
    } finally {
      set({ isLoading: false, initialized: true });
    }
  },

  signOut: async () => {
    set({ user: null, isAuthenticated: false });
  },

  getDefaultRoute: (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return '/super-admin/dashboard';
      case 'shelter_admin':
        return '/shelter/dashboard';
      case 'donor':
        return '/donor/dashboard';
      case 'participant':
        return '/participant/dashboard';
      default:
        return '/';
    }
  }
}));

// Export the dashboard path helper function
export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'super_admin':
      return '/super-admin/dashboard';
    case 'shelter_admin':
    case 'admin':
      return '/shelter/dashboard';
    case 'donor':
      return '/donor/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/';
  }
}