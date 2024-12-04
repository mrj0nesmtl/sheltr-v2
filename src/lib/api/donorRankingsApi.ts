import { supabase } from '../supabase';

interface DonorStats {
  id: string;
  name: string;
  totalDonated: number;
  donationCount: number;
  streak: number;
}

export async function calculateImpactScore(stats: DonorStats): Promise<number> {
  const baseScore = stats.totalDonated * 0.1; // $1 = 0.1 points
  const frequencyBonus = stats.donationCount * 5; // 5 points per donation
  const streakBonus = stats.streak * 10; // 10 points per day streak
  
  return Math.round(baseScore + frequencyBonus + streakBonus);
}

export async function getDonorRankings(timeframe: 'weekly' | 'monthly' | 'allTime') {
  const now = new Date();
  let startDate = new Date();

  switch (timeframe) {
    case 'weekly':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'monthly':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'allTime':
      startDate = new Date(0); // Beginning of time
      break;
  }

  try {
    const { data: rankings, error } = await supabase
      .from('donor_stats')
      .select(`
        donor_id,
        total_donated,
        donation_count,
        current_streak,
        user_profiles:donor_id (
          name
        )
      `)
      .gte('last_donation_date', startDate.toISOString())
      .order('total_donated', { ascending: false });

    if (error) throw error;

    return await Promise.all(
      (rankings || []).map(async (rank) => ({
        id: rank.donor_id,
        name: rank.user_profiles?.name || 'Anonymous',
        totalDonated: rank.total_donated,
        donationCount: rank.donation_count,
        streak: rank.current_streak,
        impactScore: await calculateImpactScore({
          id: rank.donor_id,
          name: rank.user_profiles?.name || 'Anonymous',
          totalDonated: rank.total_donated,
          donationCount: rank.donation_count,
          streak: rank.current_streak
        })
      }))
    );
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
}

export async function updateDonorStreak(donorId: string) {
  const { data: stats, error: statsError } = await supabase
    .from('donor_stats')
    .select('current_streak, last_donation_date')
    .eq('donor_id', donorId)
    .single();

  if (statsError) throw statsError;

  const now = new Date();
  const lastDonation = stats?.last_donation_date ? new Date(stats.last_donation_date) : null;
  const daysSinceLastDonation = lastDonation
    ? Math.floor((now.getTime() - lastDonation.getTime()) / (24 * 60 * 60 * 1000))
    : null;

  let newStreak = 1;
  if (daysSinceLastDonation === 1) {
    newStreak = (stats?.current_streak || 0) + 1;
  }

  const { error: updateError } = await supabase
    .from('donor_stats')
    .update({
      current_streak: newStreak,
      last_donation_date: now.toISOString(),
      updated_at: now.toISOString()
    })
    .eq('donor_id', donorId);

  if (updateError) throw updateError;
}