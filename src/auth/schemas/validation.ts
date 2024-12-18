import { z } from 'zod';
import { AUTH_ROLES } from '../types';

// Base schema for common fields
const baseProfileSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

// Role-specific schemas
export const donorSchema = baseProfileSchema.extend({
  role: z.literal(AUTH_ROLES.DONOR),
  city: z.string().min(2, 'City is required'),
  profileImage: z.instanceof(File).optional(),
  totalDonated: z.number().min(0).default(0),
  totalDonations: z.number().min(0).default(0),
  impactScore: z.number().min(0).default(0),
});

export const shelterAdminSchema = baseProfileSchema.extend({
  role: z.literal(AUTH_ROLES.SHELTER_ADMIN),
  registrationNumber: z.string().min(5, 'Valid registration number required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  address: z.string().min(5, 'Valid address required'),
  city: z.string().min(2, 'City is required'),
  profileImage: z.instanceof(File).optional(),
  services: z.array(z.string()).min(1, 'At least one service must be specified'),
});

export const participantSchema = baseProfileSchema.extend({
  role: z.literal(AUTH_ROLES.PARTICIPANT),
  emergencyContact: z.object({
    name: z.string().min(2, 'Contact name required'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    relationship: z.string().min(2, 'Relationship required'),
  }),
  services: z.array(z.string()),
}); 