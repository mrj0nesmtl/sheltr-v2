import { getUserProfile, updateUserProfile } from '@/lib/services/profileService';
import { create } from 'zustand';

interface ProfileState {
  profile: any | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, data: any) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await getUserProfile(userId);
      set({ profile, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch profile', isLoading: false });
    }
  },

  updateProfile: async (userId: string, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProfile = await updateUserProfile(userId, data);
      set({ profile: updatedProfile, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update profile', isLoading: false });
    }
  }
})); 