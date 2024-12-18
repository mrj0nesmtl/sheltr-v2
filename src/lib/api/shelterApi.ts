import { supabase } from '../supabase';
import type { EmergencyContact, ShelterProfile } from '../types/shelter';

export async function createShelterProfile(data: {
  email: string;
  name: string;
  organization: string;
  registrationNumber: string;
  contactPhone: string;
  city: string;
  address: string;
  capacity: number;
  services: string[];
  emergencyContact: EmergencyContact;
}) {
  const { error } = await supabase
    .from('user_profiles')
    .insert({
      email: data.email,
      name: data.name,
      role: 'shelter_admin',
      organization: data.organization,
      registration_number: data.registrationNumber,
      contact_phone: data.contactPhone,
      city: data.city,
      address: data.address,
      capacity: data.capacity,
      services: data.services,
      emergency_contact: data.emergencyContact,
      verified: false
    });

  if (error) throw error;
}

export async function getShelterProfile(id: string): Promise<ShelterProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select(`
      id,
      email,
      role,
      name,
      organization,
      registration_number,
      contact_phone,
      city,
      address,
      capacity,
      services,
      verified,
      emergency_contact,
      created_at,
      participants:participants(count)
    `)
    .eq('id', id)
    .eq('role', 'shelter_admin')
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    name: data.name,
    organization: data.organization,
    registrationNumber: data.registration_number,
    contactPhone: data.contact_phone,
    city: data.city,
    address: data.address,
    capacity: data.capacity,
    services: data.services,
    verified: data.verified,
    emergencyContact: data.emergency_contact,
    createdAt: data.created_at,
    participantCount: data.participants?.[0]?.count || 0
  };
}

export async function updateShelterProfile(
  id: string,
  updates: Partial<Omit<ShelterProfile, 'id' | 'email' | 'role' | 'createdAt'>>
) {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      name: updates.name,
      organization: updates.organization,
      registration_number: updates.registrationNumber,
      contact_phone: updates.contactPhone,
      city: updates.city,
      address: updates.address,
      capacity: updates.capacity,
      services: updates.services,
      emergency_contact: updates.emergencyContact
    })
    .eq('id', id)
    .eq('role', 'shelter_admin');

  if (error) throw error;
}

export async function verifyShelter(id: string) {
  const { error } = await supabase
    .from('user_profiles')
    .update({ verified: true })
    .eq('id', id)
    .eq('role', 'shelter_admin');

  if (error) throw error;
}

export async function getAllShelters() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select(`
      id,
      email,
      name,
      organization,
      registration_number,
      contact_phone,
      city,
      address,
      capacity,
      services,
      verified,
      emergency_contact,
      created_at,
      participants:participants(count)
    `)
    .eq('role', 'shelter_admin')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(shelter => ({
    id: shelter.id,
    email: shelter.email,
    name: shelter.name,
    organization: shelter.organization,
    registrationNumber: shelter.registration_number,
    contactPhone: shelter.contact_phone,
    city: shelter.city,
    address: shelter.address,
    capacity: shelter.capacity,
    services: shelter.services,
    verified: shelter.verified,
    emergencyContact: shelter.emergency_contact,
    createdAt: shelter.created_at,
    participantCount: shelter.participants?.[0]?.count || 0
  }));
}