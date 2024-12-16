import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';

interface AuthState {
  user: any | null;
  profile: any | null;
  loading: boolean;
  error: Error | null;
  setUser: (user: any) => void;
  setProfile: (profile: any) => void;
  setError: (error: Error | null) => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,
  
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setError: (error) => set({ error }),
  
  fetchProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ user: null, profile: null, loading: false });
        return;
      }

      // Debug log
      console.log('Fetching profile for user:', user.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }

      // Debug log
      console.log('Profile fetched:', profile);
      
      set({ user, profile, loading: false });
    } catch (error) {
      console.error('Auth store error:', error);
      set({ error: error as Error, loading: false });
    }
  },
}));