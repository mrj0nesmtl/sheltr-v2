import { UserProfile } from './auth';

export interface EmergencyContact {
  name: string;
  phone: string;
  email: string;
}

export interface ShelterService {
  name: string;
  description?: string;
  active: boolean;
}

export interface ShelterProfile extends UserProfile {
  registrationNumber: string;
  contactPhone: string;
  city: string;
  address: string;
  capacity: number;
  services: string[];
  verified: boolean;
  emergencyContact: EmergencyContact;
  participantCount?: number;
}

export const VALID_SHELTER_SERVICES = [
  'Emergency Shelter',
  'Transitional Housing',
  'Food Services',
  'Medical Care',
  'Mental Health Services',
  'Job Training',
  'Case Management',
  'Substance Abuse Treatment'
] as const;

export type ValidShelterService = typeof VALID_SHELTER_SERVICES[number];