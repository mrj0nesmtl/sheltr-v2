import { supabase } from '../supabase';

export interface OrganizationStats {
  totalParticipants: number;
  activeParticipants: number;
  totalDonations: number;
  averageDonation: number;
}

export interface DonationStats {
  totalAmount: number;
  count: number;
  averageAmount: number;
  trends: Array<{
    date: string;
    amount: number;
  }>;
}

export const analyticsService = {
  async getOrganizationStats(organizationId: string): Promise<OrganizationStats> {
    const { data, error } = await supabase.rpc('get_organization_stats', {
      org_id: organizationId
    });

    if (error) throw error;
    return data;
  },

  async getParticipantStats(participantId: string) {
    const { data, error } = await supabase
      .from('participants')
      .select(`
        total_received,
        housing_fund,
        wallet_balance,
        donations:donations(
          amount,
          created_at
        )
      `)
      .eq('id', participantId)
      .single();

    if (error) throw error;
    return data;
  },

  async getDonorStats(donorId: string): Promise<DonationStats> {
    const { data, error } = await supabase.rpc('get_donor_stats', {
      donor_id: donorId
    });

    if (error) throw error;
    return data;
  },

  async getImpactMetrics(organizationId: string) {
    const { data, error } = await supabase.rpc('get_impact_metrics', {
      org_id: organizationId
    });

    if (error) throw error;
    return {
      directSupport: data.direct_support,
      housingFund: data.housing_fund,
      operations: data.operations
    };
  }
}; 