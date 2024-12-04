import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Donation = Database['public']['Tables']['donations']['Row'];

export async function createDonation(
  participantId: string,
  amount: number,
  email: string | undefined,
  transactionId: string
): Promise<Donation> {
  const { data, error } = await supabase
    .from('donations')
    .insert({
      participant_id: participantId,
      amount,
      donor_email: email,
      transaction_id: transactionId,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDonationStatus(
  transactionId: string,
  status: 'completed' | 'failed'
): Promise<void> {
  const { error } = await supabase
    .from('donations')
    .update({ status })
    .eq('transaction_id', transactionId);

  if (error) throw error;
}