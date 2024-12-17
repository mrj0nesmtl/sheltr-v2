import { supabase } from '../supabase';

// Define clear interfaces for each analytics level
export interface GlobalAnalytics {
  platformStats: PlatformStats;
  shelterMetrics: ShelterMetrics[];
  donorLeaderboard: DonorMetrics[];
  participantSuccess: ParticipantMetrics[];
}

export interface ShelterAnalytics {
  shelterStats: ShelterStats;
  participantMetrics: ParticipantMetrics[];
  donorActivity: DonorActivity[];
  programSuccess: ProgramMetrics[];
}

export interface ParticipantAnalytics {
  personalProgress: ProgressMetrics;
  shelterServices: ServiceMetrics[];
  donorSupport: SupportMetrics[];
}

export interface DonorAnalytics {
  impactMetrics: ImpactStats;
  leaderboardPosition: LeaderboardStats;
  achievementBadges: BadgeMetrics[];
  donationTrends: TrendMetrics[];
}

// Make sure the type is properly defined
interface PlatformStats {
  // Add your type definitions here
  // Example:
  totalDonations?: number;
  activeUsers?: number;
  // ... other stats
}

export const analyticsService = {
  // Super Admin Level
  async getGlobalAnalytics(): Promise<GlobalAnalytics> {
    const { data, error } = await supabase.rpc('get_global_analytics');
    if (error) throw error;
    return data;
  },

  // Shelter Admin Level
  async getShelterAnalytics(shelterId: string): Promise<ShelterAnalytics> {
    const { data, error } = await supabase.rpc('get_shelter_analytics', {
      shelter_id: shelterId
    });
    if (error) throw error;
    return data;
  },

  // Participant Level
  async getParticipantAnalytics(participantId: string): Promise<ParticipantAnalytics> {
    const { data, error } = await supabase.rpc('get_participant_analytics', {
      participant_id: participantId
    });
    if (error) throw error;
    return data;
  },

  // Donor Level
  async getDonorAnalytics(donorId: string): Promise<DonorAnalytics> {
    const { data, error } = await supabase.rpc('get_donor_analytics', {
      donor_id: donorId
    });
    if (error) throw error;
    return data;
  }
}; 