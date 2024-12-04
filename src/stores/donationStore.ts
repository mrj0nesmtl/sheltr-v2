import { create } from 'zustand';
import { processDonation as processDonationService } from '../lib/services/donationService';

interface DonationState {
  isLoading: boolean;
  error: string | null;
  processDonation: (participantId: string, amount: number, email?: string) => Promise<void>;
}

export const useDonationStore = create<DonationState>((set) => ({
  isLoading: false,
  error: null,
  processDonation: async (participantId: string, amount: number, email?: string) => {
    set({ isLoading: true, error: null });
    try {
      await processDonationService(participantId, amount, email);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));