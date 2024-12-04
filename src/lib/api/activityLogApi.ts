import { supabase } from '../supabase';

export async function logActivity(
  userId: string,
  type: 'qr_scan' | 'donation' | 'profile_update' | 'login',
  metadata: Record<string, any> = {}
) {
  try {
    const { error } = await supabase
      .from('activity_log')
      .insert({
        user_id: userId,
        type,
        metadata
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
}

export async function getUserActivity(userId: string, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
}