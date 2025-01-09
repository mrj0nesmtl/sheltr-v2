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
  // Basic Information
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  shelterName: z.string().min(2, 'Shelter name is required'),

  // Contact Information
  phone: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string(),

  // Shelter Details
  registrationNumber: z.string().min(1, 'Registration number is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  taxId: z.string().optional(),

  // Administrator (required)
  administrator: z.object({
    name: z.string().min(2, 'Administrator name is required'),
    title: z.string().min(2, 'Administrator title is required'),
    email: z.string().email('Valid administrator email is required'),
    phone: z.string().min(10, 'Valid administrator phone is required')
  }),

  // Secondary Contact (optional)
  secondaryContact: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    email: z.string().email('Valid email is required').optional(),
    phone: z.string().optional()
  }).optional(),

  // Documents
  documents: z.object({
    registration: z.instanceof(File).optional(),
    tax: z.instanceof(File).optional(),
    insurance: z.instanceof(File).optional()
  }).optional(),
  logo: z.instanceof(File).optional()
}); 