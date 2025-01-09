import type { 
  Organization, 
  OrganizationStaff, 
  ExtendedParticipant,
  EmergencyContact 
} from '../types/organization';
import { supabase } from '../supabase';

export const organizationService = {
  // Organization Registration & Management
  async createOrganization(data: {
    name: string;
    email: string;
    registration_number: string;
    phone?: string;
    address?: string;
    city?: string;
    total_capacity: number;
    services: string[];
    emergency_contacts: EmergencyContact[];
  }) {
    const { data: org, error } = await supabase
      .from('organizations')
      .insert([{
        name: data.name,
        email: data.email,
        registration_number: data.registration_number,
        phone: data.phone,
        address: data.address,
        city: data.city,
        total_capacity: data.total_capacity,
        current_capacity: 0,
        services: data.services,
        emergency_contacts: data.emergency_contacts,
        status: 'pending',
        verified: false
      }])
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

  async updateOrganization(id: string, data: Partial<Organization>) {
    const { data: org, error } = await supabase
      .from('organizations')
      .update(data)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return org;
  },

  // Staff Management
  async addStaffMember(organizationId: string, userId: string, role: OrganizationStaff['role']) {
    const { data, error } = await supabase
      .from('organization_staff')
      .insert([{
        organization_id: organizationId,
        user_id: userId,
        role,
        status: 'active'
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async getOrganizationStaff(organizationId: string) {
    const { data, error } = await supabase
      .from('organization_staff')
      .select(`
        *,
        user:profiles(*)
      `)
      .eq('organization_id', organizationId);
      
    if (error) throw error;
    return data;
  },

  // Participant Management
  async getOrganizationParticipants(organizationId: string) {
    const { data, error } = await supabase
      .from('organization_participants')
      .select(`
        *,
        participant:profiles(*)
      `)
      .eq('organization_id', organizationId);
      
    if (error) throw error;
    return data;
  },

  async addParticipant(organizationId: string, participantData: Partial<ExtendedParticipant>) {
    const { data, error } = await supabase
      .from('organization_participants')
      .insert([{
        organization_id: organizationId,
        participant_id: participantData.id,
        status: 'active'
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // Document Management
  async uploadDocument(organizationId: string, file: File, type: string) {
    const fileName = `${organizationId}/${type}/${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('organization-documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: org, error: updateError } = await supabase
      .from('organizations')
      .update({
        documents: supabase.sql`array_append(documents, jsonb_build_object(
          'type', ${type},
          'url', ${uploadData.path},
          'uploadedAt', ${new Date().toISOString()},
          'status', 'pending'
        ))`
      })
      .eq('id', organizationId)
      .select()
      .single();

    if (updateError) throw updateError;
    return org;
  },

  // Statistics & Analytics
  async getOrganizationStats(organizationId: string) {
    const { data, error } = await supabase.rpc('get_organization_stats', {
      org_id: organizationId
    });

    if (error) throw error;
    return data;
  },

  // Verification Management
  async updateVerificationStatus(
    organizationId: string, 
    status: 'pending' | 'active' | 'suspended',
    verifiedBy?: string
  ) {
    const { data, error } = await supabase
      .from('organizations')
      .update({
        status,
        verified: status === 'active',
        verification_date: status === 'active' ? new Date().toISOString() : null,
        verified_by: verifiedBy
      })
      .eq('id', organizationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}; 