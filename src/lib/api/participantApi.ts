import { supabase } from '../supabase';

export async function getParticipantProfile(id: string) {
  const { data, error } = await supabase
    .from('participants')
    .select(`
      id,
      name,
      qr_code,
      total_received,
      housing_fund,
      wallet_balance,
      created_at,
      user_id
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getParticipantDonations(id: string) {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('participant_id', id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTopParticipants(limit = 10) {
  const { data, error } = await supabase
    .from('participants')
    .select(`
      id,
      name,
      total_received,
      housing_fund,
      donations:donations(count)
    `)
    .order('total_received', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data.map(p => ({
    ...p,
    donation_count: p.donations[0].count
  }));
}