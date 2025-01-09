import { z } from 'zod';
import { UserRole } from '@/auth/types';

// Zod Schemas
export const donationPreferencesSchema = z.object({
  preferred_causes: z.array(z.string()).optional(),
  notification_frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  anonymous_donations: z.boolean().optional(),
  auto_share: z.boolean().optional(),
});

export const socialConnectionsSchema = z.object({
  connected_donors: z.array(z.string()).optional(),
  followed_shelters: z.array(z.string()).optional(),
  impact_circle: z.array(z.string()).optional(),
});

export const donorImpactStatsSchema = z.object({
  total_donated: z.number().default(0),
  impact_score: z.number().default(0),
  donation_streak: z.number().default(0),
  people_helped: z.number().default(0),
  total_donations: z.number().default(0),
});

export const donorSignUpSchema = z.object({
  // Step 1: Basic Information
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  display_name: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters'),
    
  // Step 2: Contact Preferences
  phone: z.string().optional(),
  notification_preferences: z.array(z.string()).optional(),
  
  // Step 3: Donation Preferences
  donation_preferences: donationPreferencesSchema.optional(),
  
  // Step 4: Social & Impact
  social_connections: socialConnectionsSchema.optional(),
});

// Types derived from schemas
export type DonationPreferences = z.infer<typeof donationPreferencesSchema>;
export type SocialConnections = z.infer<typeof socialConnectionsSchema>;
export type DonorImpactStats = z.infer<typeof donorImpactStatsSchema>;
export type DonorSignUpFormData = z.infer<typeof donorSignUpSchema>;

// Main Profile Interface
export interface DonorProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  email: string;
  role: UserRole.DONOR;
  donation_preferences?: DonationPreferences;
  social_connections?: SocialConnections;
  impact_stats: DonorImpactStats;
  created_at: string;
  updated_at: string;
}

// Registration Data Interface
export interface DonorRegistrationData {
  email: string;
  password: string;
  display_name: string;
  donation_preferences?: DonationPreferences;
  social_connections?: SocialConnections;
} 