import { z } from 'zod';

const socialLinksSchema = z.object({
  twitter: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal(''))
});

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const donorSignUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  city: z.string().min(2, 'City is required'),
  address: z.string().optional(),
  annualIncome: z.number().optional(),
  taxReceiptRequired: z.boolean(),
  defaultDonation: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1),
  socialLinks: socialLinksSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const shelterAdminSignUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  organization: z.string().min(2, 'Organization name is required'),
  registrationNumber: z.string().min(5, 'Registration number is required'),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(5, 'Address is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  services: z.array(z.string()).min(1, 'At least one service must be selected'),
  contactPhone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  emergencyContact: z.object({
    name: z.string().min(2, 'Emergency contact name is required'),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
    email: z.string().email('Invalid emergency contact email')
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const participantSignUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shelterId: z.string().uuid('Invalid shelter ID'),
  email: z.string().email('Please enter a valid email address').optional(),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number').optional(),
  emergencyContact: z.object({
    name: z.string().min(2, 'Emergency contact name is required'),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number')
  }).optional()
});

export type DonorSignUpFormData = z.infer<typeof donorSignUpSchema>;
export type ShelterAdminSignUpFormData = z.infer<typeof shelterAdminSignUpSchema>;
export type ParticipantSignUpFormData = z.infer<typeof participantSignUpSchema>;