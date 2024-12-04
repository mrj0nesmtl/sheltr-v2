import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Transaction = Database['public']['Tables']['transactions']['Row'];

export async function createTransaction(
  participantId: string,
  amount: number,
  type: 'donation' | 'withdrawal' | 'housing',
  metadata: Record<string, any>
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      participant_id: participantId,
      amount,
      type,
      status: 'completed',
      metadata
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}