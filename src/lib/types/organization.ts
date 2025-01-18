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
  email: string;               // User login email
  organizationEmail: string;   // Organization contact email
  password: string;
  shelterName: string;
  website?: string;
  tax_id: string;
  // ... rest of interface
}

// Form validation schema
export const shelterRegistrationSchema = z.object({
  // User login email
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email address is required')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
  
  // Organization contact email
  organizationEmail: z.string()
    .email('Please enter a valid organization email')
    .min(1, 'Organization email is required')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
  
  // Basic Information Step
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  shelterName: z.string()
    .min(2, 'Shelter name must be at least 2 characters')
    .max(100, 'Shelter name cannot exceed 100 characters'),
  website: z.string()
    .url('Please enter a valid URL')
    .startsWith('https://', 'Website must start with https://')
    .optional()
    .or(z.literal('')),
  tax_id: z.string()
    .min(1, 'Tax ID is required')
    .min(5, 'Tax ID must be at least 5 characters'),

  // Existing fields
  phone: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string().default('Canada'),
  registrationNumber: z.string(),
  capacity: z.coerce.number(),
  services: z.array(z.string()).default([]),
  
  // Administrator validation
  administrator: z.object({
    name: z.string().min(1, 'Administrator name is required'),
    title: z.string().min(1, 'Administrator title is required'),
    phone: z.string().min(1, 'Administrator phone is required')
  }).optional(),

  // System fields with defaults
  status: z.enum(['pending', 'active', 'suspended']).default('pending'),
  verified: z.boolean().default(false),
  current_capacity: z.number().default(0),
  housing_fund_balance: z.string().default('0'),
  token_balance: z.string().default('0'),
  operating_hours: z.record(z.any()).optional(),
  emergency_contacts: z.array(z.any()).default([])
}); 

// Add type for form errors
export type ShelterRegistrationErrors = z.inferFormattedError<typeof shelterRegistrationSchema>; 

// Add debug type
export type EmailValidationResult = z.infer<typeof shelterRegistrationSchema>['email']; 

// Update the step validation schemas to match new structure
const stepValidationSchemas = {
  1: z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    shelterName: z.string().min(1, 'Shelter name is required'),
    website: z.string().optional(),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  }),
  2: z.object({
    administrator: z.object({
      name: z.string().min(1, 'Administrator name is required'),
      title: z.string().min(1, 'Administrator title is required'),
      phone: z.string().min(10, 'Please enter a valid phone number'),
    }),
  }),
  3: z.object({
    organizationEmail: z.string().email('Please enter a valid organization email'),
    tax_id: z.string().min(1, 'Tax ID is required'),
    registrationNumber: z.string(),
    capacity: z.number().min(1, 'Capacity must be at least 1'),
    services: z.array(z.string()).min(1, 'Please select at least one service'),
  }),
}; 