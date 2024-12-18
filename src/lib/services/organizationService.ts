import { supabase } from '../supabase';
import type { ExtendedParticipant, Organization, OrganizationStaff } from '../types/organization';

export const organizationService = {
  // Organization Management
  async createOrganization(data: Partial<Organization>) {
    const { data: org, error } = await supabase
      .from('organizations')
      .insert([data])
      .select()
      .single();
      
    if (error) throw error;
    return org;
  },

  async getOrganizationById(id: string) {
    const { data, error } = await supabase
      .from('organizations')
      .select(`
        *,
        staff:organization_staff(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  // Staff Management
  async addStaffMember(organizationId: string, userId: string, role: OrganizationStaff['role']) {
    const { data, error } = await supabase
      .from('organization_staff')
      .insert([{
        organization_id: organizationId,
        user_id: userId,
        role
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // Participant Management
  async getOrganizationParticipants(organizationId: string) {
    const { data, error } = await supabase
      .from('participants')
      .select(`
        *,
        user:user_profiles(*)
      `)
      .eq('organization_id', organizationId);
      
    if (error) throw error;
    return data;
  },

  async addParticipant(organizationId: string, participantData: Partial<ExtendedParticipant>) {
    const { data, error } = await supabase
      .from('participants')
      .insert([{
        organization_id: organizationId,
        ...participantData
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async getOrganizationStats(organizationId: string) {
    const { data, error } = await supabase.rpc('get_organization_stats', {
      org_id: organizationId
    });

    if (error) throw error;
    return data;
  }
}; 