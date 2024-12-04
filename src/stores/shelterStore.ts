import { create } from 'zustand';
import { 
  createShelterProfile, 
  getShelterProfile,
  updateShelterProfile,
  verifyShelter,
  getAllShelters 
} from '../lib/api/shelterApi';
import type { ShelterProfile } from '../lib/types/shelter';

interface ShelterState {
  shelters: ShelterProfile[];
  currentShelter: ShelterProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchShelters: () => Promise<void>;
  fetchShelterProfile: (id: string) => Promise<void>;
  createShelter: (data: Parameters<typeof createShelterProfile>[0]) => Promise<void>;
  updateShelter: (id: string, updates: Parameters<typeof updateShelterProfile>[1]) => Promise<void>;
  verifyShelter: (id: string) => Promise<void>;
}

export const useShelterStore = create<ShelterState>((set, get) => ({
  shelters: [],
  currentShelter: null,
  isLoading: false,
  error: null,

  fetchShelters: async () => {
    set({ isLoading: true, error: null });
    try {
      const shelters = await getAllShelters();
      set({ shelters, isLoading: false });
    } catch (error) {
      console.error('Error fetching shelters:', error);
      set({ error: 'Failed to load shelters', isLoading: false });
    }
  },

  fetchShelterProfile: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const shelter = await getShelterProfile(id);
      set({ currentShelter: shelter, isLoading: false });
    } catch (error) {
      console.error('Error fetching shelter profile:', error);
      set({ error: 'Failed to load shelter profile', isLoading: false });
    }
  },

  createShelter: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await createShelterProfile(data);
      await get().fetchShelters();
    } catch (error) {
      console.error('Error creating shelter:', error);
      set({ error: 'Failed to create shelter', isLoading: false });
      throw error;
    }
  },

  updateShelter: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await updateShelterProfile(id, updates);
      await get().fetchShelterProfile(id);
    } catch (error) {
      console.error('Error updating shelter:', error);
      set({ error: 'Failed to update shelter', isLoading: false });
      throw error;
    }
  },

  verifyShelter: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await verifyShelter(id);
      const shelters = get().shelters.map(shelter =>
        shelter.id === id ? { ...shelter, verified: true } : shelter
      );
      set({ shelters, isLoading: false });
    } catch (error) {
      console.error('Error verifying shelter:', error);
      set({ error: 'Failed to verify shelter', isLoading: false });
      throw error;
    }
  }
}));