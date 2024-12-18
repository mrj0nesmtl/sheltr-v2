import type { Database } from '../database.types';
import { supabase } from '../supabase';

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

interface Database {
  transactions: {
    id: string;
    amount: number;
    // ... other transaction properties
  }[];
  // ... other database properties
}