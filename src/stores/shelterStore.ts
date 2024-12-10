import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Organization } from '@/lib/types/organization';

interface ShelterState {
  shelters: Organization[];
  isLoading: boolean;
  error: string | null;
  fetchShelters: () => Promise<void>;
  getShelterById: (id: string) => Organization | undefined;
}

export const useShelterStore = create<ShelterState>((set, get) => ({
  shelters: [],
  isLoading: false,
  error: null,

  fetchShelters: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      set({ shelters: data || [], error: null });
    } catch (error) {
      console.error('Error fetching shelters:', error);
      set({ error: 'Failed to fetch shelters' });
    } finally {
      set({ isLoading: false });
    }
  },

  getShelterById: (id: string) => {
    return get().shelters.find(shelter => shelter.id === id);
  }
}));