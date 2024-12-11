import { z } from 'zod';

// Common validation patterns
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
const NAME_REGEX = /^[a-zA-Z\s-']+$/;

export const participantSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(NAME_REGEX, 'Please enter a valid name'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(NAME_REGEX, 'Please enter a valid name'),
  dateOfBirth: z.string()
    .refine((date) => {
      const age = (new Date().getFullYear() - new Date(date).getFullYear());
      return age >= 18 && age <= 120;
    }, 'Participant must be at least 18 years old'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  
  // Contact Information
  email: z.string()
    .email('Please enter a valid email address')
    .optional(),
  phone: z.string()
    .regex(PHONE_REGEX, 'Please enter a valid phone number')
    .optional(),
  
  // Emergency Contact
  emergencyContact: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    phone: z.string()
      .regex(PHONE_REGEX, 'Please enter a valid phone number'),
    relationship: z.string()
      .min(2, 'Please specify the relationship')
  }),

  // Status and Needs
  housingStatus: z.enum([
    'emergency',
    'transitional',
    'at_risk',
    'permanent_supportive',
    'rapid_rehousing',
    'shelter',
    'street'
  ]),
  employmentStatus: z.enum([
    'unemployed',
    'part_time',
    'full_time',
    'self_employed',
    'unable_to_work',
    'retired'
  ]),
  specialNeeds: z.array(z.string()).optional(),
  
  // Identification
  identification: z.object({
    type: z.enum([
      'state_id',
      'drivers_license',
      'passport',
      'birth_certificate',
      'other'
    ]),
    number: z.string()
      .min(4, 'ID number must be at least 4 characters')
      .max(50, 'ID number must be less than 50 characters'),
    expiryDate: z.string().optional(),
    issuingAuthority: z.string().optional()
  })
}); 