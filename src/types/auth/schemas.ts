import { z } from 'zod'

// Base user schema for common fields
export const baseUserSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name is required'),
  contact_phone: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
})

// Donor-specific schema
export const donorSignUpSchema = baseUserSchema.extend({
  role: z.literal('donor'),
})

// Shelter-specific schema
export const shelterSignUpSchema = baseUserSchema.extend({
  role: z.literal('shelter'),
  registration_number: z.string().min(1, 'Registration number is required'),
  capacity: z.number().min(0, 'Capacity must be a positive number'),
  services: z.array(z.string()).optional(),
  emergency_contact: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email()
  }).optional()
})

// Export types
export type DonorSignUpForm = z.infer<typeof donorSignUpSchema>
export type ShelterSignUpForm = z.infer<typeof shelterSignUpSchema>
