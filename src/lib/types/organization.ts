import { z } from 'zod';

export interface Organization {
  id: string;
  name: string;
  registrationNumber: string;
  status: 'pending' | 'active' | 'suspended';
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Organization Details
  address?: string;
  city?: string;
  postalCode?: string;
  country: string;
  phone?: string;
  email: string;
  website?: string;
  
  // Capacity Management
  totalCapacity: number;
  currentCapacity: number;
  
  // Compliance
  taxId?: string;
  verificationDate?: string;
  verifiedBy?: string;
  lastAuditDate?: string;
  
  // Services
  services: string[];
  metadata: Record<string, any>;
  logoUrl?: string;
  
  // Add new fields
  emergencyContacts: EmergencyContact[];
  operatingHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  documents?: {
    type: string;
    url: string;
    uploadedAt: string;
    status: 'pending' | 'verified' | 'rejected';
  }[];
}

export interface OrganizationStaff {
  id: string;
  organizationId: string;
  userId: string;
  role: 'admin' | 'staff' | 'volunteer';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  permissions: Record<string, boolean>;
}

export interface ExtendedParticipant {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  total_received?: number;
  last_activity?: string;
}

// Base contact interface for reuse
interface ContactPerson {
  name: string;
  title: string;
  email: string;
  phone: string;
}

// Administrator specific interface extending base contact
interface Administrator extends ContactPerson {
  name: string;      // Required
  title: string;     // Required
  email: string;     // Required
  phone: string;     // Required
}

// Secondary contact interface extending base contact
interface SecondaryContact extends ContactPerson {
  name?: string;     // Optional
  title?: string;    // Optional
  email?: string;    // Optional
  phone?: string;    // Optional
}

// Main registration form interface
export interface ShelterRegistrationFormData {
  // Basic Information
  email: string;
  password: string;
  shelterName: string;

  // Contact Information
  phone?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  country: string;

  // Shelter Details
  registrationNumber: string;
  capacity: number;
  services: string[];
  taxId?: string;

  // Contact Persons
  administrator: Administrator;
  secondaryContact?: SecondaryContact;

  // Documents
  documents?: {
    registration?: File;
    tax?: File;
    insurance?: File;
  };
  logo?: File;
}

// Form validation schema
export const shelterRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  shelterName: z.string().min(2),
  phone: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string().default('Canada'),
  registrationNumber: z.string(),
  capacity: z.coerce.number(),
  services: z.array(z.string()).default([]),
  administrator: z.object({
    name: z.string(),
    title: z.string(),
    phone: z.string()
  }).optional(),
  status: z.enum(['pending', 'active', 'suspended']).default('pending'),
  verified: z.boolean().default(false),
  current_capacity: z.number().default(0),
  housing_fund_balance: z.string().default('0'),
  token_balance: z.string().default('0'),
  operating_hours: z.record(z.any()).optional(),
  emergency_contacts: z.array(z.any()).default([])
}); 