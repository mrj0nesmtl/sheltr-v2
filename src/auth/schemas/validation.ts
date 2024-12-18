import { z } from 'zod';
import { AUTH_ROLES } from '../types/auth.types';

// Base metadata schema
const metadataSchema = z.object({
  last_updated: z.string(),
  update_count: z.number(),
  last_activity: z.string(),
  activity_score: z.number(),
  activity_status: z.string(),
  profile_created: z.string(),
  activity_metrics: z.object({
    status: z.string(),
    activity_history: z.record(z.string()),
    activity_threshold: z.number(),
    last_status_update: z.string(),
    days_since_last_activity: z.number()
  }),
  engagement_level: z.string(),
  last_engagement_update: z.string()
});

// Base profile schema for common fields
const baseProfileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  metadata: metadataSchema
});

// Role-specific schemas
export const donorProfileSchema = baseProfileSchema.extend({
  role: z.literal(AUTH_ROLES.DONOR),
  total_donated: z.number().min(0),
  total_donations: z.number().min(0),
  impact_score: z.number().min(0),
  last_donation_at: z.date().optional(),
  donation_frequency: z.enum(['one-time', 'monthly', 'quarterly']).optional(),
  preferred_causes: z.array(z.string()),
  anonymous: z.boolean(),
  profile_image: z.instanceof(File).optional()
});

export const shelterProfileSchema = baseProfileSchema.extend({
  role: z.literal(AUTH_ROLES.SHELTER_ADMIN),
  name: z.string().min(2, 'Organization name is required'),
  address: z.string().min(5, 'Valid address required'),
  city: z.string().min(2, 'City is required'),
  contact_phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  registration_number: z.string().min(5, 'Valid registration number required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  current_occupancy: z.number().min(0),
  services: z.array(z.string()).min(1, 'At least one service must be specified'),
  emergency_contact: z.object({
    name: z.string().min(2, 'Contact name required'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    relationship: z.string().min(2, 'Relationship required')
  }),
  verified: z.boolean(),
  profile_image: z.instanceof(File).optional()
});

export const participantProfileSchema = baseProfileSchema.extend({
  role: z.literal(AUTH_ROLES.PARTICIPANT),
  shelter_id: z.string().uuid(),
  program_type: z.array(z.string()),
  status: z.enum(['active', 'inactive', 'graduated']),
  join_date: z.date(),
  needs_assessment: z.array(z.string()),
  goals: z.array(z.string()),
  progress_metrics: z.record(z.number()),
  emergency_contact: z.object({
    name: z.string().min(2, 'Contact name required'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    relationship: z.string().min(2, 'Relationship required')
  })
});

// Auth related schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.nativeEnum(AUTH_ROLES),
  firstName: z.string().min(2, 'First name is too short').optional(),
  lastName: z.string().min(2, 'Last name is too short').optional(),
  terms: z.boolean().refine(val => val === true, 'Terms must be accepted')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Helper function to validate profile based on role
export function getProfileSchema(role: AUTH_ROLES) {
  switch (role) {
    case AUTH_ROLES.DONOR:
      return donorProfileSchema;
    case AUTH_ROLES.SHELTER_ADMIN:
      return shelterProfileSchema;
    case AUTH_ROLES.PARTICIPANT:
      return participantProfileSchema;
    default:
      throw new Error(`No validation schema for role: ${role}`);
  }
} 