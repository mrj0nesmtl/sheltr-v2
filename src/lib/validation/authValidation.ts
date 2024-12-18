import { z } from 'zod';

export const donorSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  name: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  taxReceiptRequired: z.boolean(),
  defaultDonation: z.number().min(0),
  socialLinks: z.object({
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional()
  }).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const shelterAdminSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  name: z.string().optional(),
  organization: z.string(),
  registrationNumber: z.string(),
  city: z.string(),
  address: z.string(),
  capacity: z.number().min(1),
  services: z.array(z.string()),
  contactPhone: z.string(),
  emergencyContact: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email()
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type DonorSignUpFormData = z.infer<typeof donorSignUpSchema>;
export type ShelterAdminSignUpFormData = z.infer<typeof shelterAdminSignUpSchema>;