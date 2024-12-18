import { createClient } from '@supabase/supabase-js';

// Create and export Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Use the client
const { data, error } = await supabase
  .from('participants')
  .select('*');

export const participantService = {
  async getParticipantsByOrganization(organizationId: string) {
    const { data, error } = await supabase
      .from('participants')
      .select(`
        *,
        user:user_profiles(
          id,
          email,
          name,
          role
        )
      `)
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createParticipant(organizationId: string, userData: {
    email: string;
    name: string;
    password: string;
  }) {
    // Create auth user
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    });

    if (authError) throw authError;
    if (!user) throw new Error('No user created');

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        email: userData.email,
        name: userData.name,
        role: 'participant'
      });

    if (profileError) throw profileError;

    // Create participant record
    const { data: participant, error: participantError } = await supabase
      .from('participants')
      .insert({
        user_id: user.id,
        organization_id: organizationId,
        name: userData.name,
        qr_code: `SHELTR-${user.id.slice(0, 8)}`,
        status: 'active'
      })
      .select()
      .single();

    if (participantError) throw participantError;
    return participant;
  }
}; 