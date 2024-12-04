import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Participant = Database['public']['Tables']['participants']['Row'];

export async function getParticipantByQRCode(qrCode: string): Promise<Participant | null> {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('qr_code', qrCode)
    .single();

  if (error) throw error;
  return data;
}

export async function updateParticipantBalances(
  participantId: string,
  amount: number
): Promise<void> {
  const { error } = await supabase
    .from('participants')
    .update({
      total_received: supabase.rpc('increment', { x: amount }),
      wallet_balance: supabase.rpc('increment', { x: amount * 0.8 }),
      housing_fund: supabase.rpc('increment', { x: amount * 0.15 })
    })
    .eq('id', participantId);

  if (error) throw error;
}