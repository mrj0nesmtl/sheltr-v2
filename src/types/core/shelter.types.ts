import type { AUTH_ROLES } from '@auth/types/auth.types';

export interface ShelterProfile {
  id: string;
  name: string;
  email: string;
  role: AUTH_ROLES;
  capacity: number;
  registration_number: string;
  services?: string[];
  emergency_contact: {
    name?: string;
    email?: string;
    phone?: string;
  };
  address?: string;
  city?: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
} 