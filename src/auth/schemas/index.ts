import { z } from 'zod';
import { AUTH_ROLES } from '../types/auth.types';

// Donor Sign Up Schema
export const donorSignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.literal(AUTH_ROLES.DONOR),
  terms: z.boolean().refine((val) => val === true, 'Terms must be accepted')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Shelter Sign Up Schema
export const shelterSignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.literal(AUTH_ROLES.SHELTER_ADMIN),
  terms: z.boolean().refine((val) => val === true, 'Terms must be accepted')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Add the missing schema export
export const shelterAdminSignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  shelterName: z.string().min(2, "Shelter name must be at least 2 characters"),
  shelterAddress: z.string().min(5, "Address must be at least 5 characters"),
  shelterPhone: z.string().min(10, "Phone must be at least 10 digits")
});

export type DonorSignUpForm = z.infer<typeof donorSignUpSchema>;
export type ShelterSignUpForm = z.infer<typeof shelterSignUpSchema>;