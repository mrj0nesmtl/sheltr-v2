import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  
  socialLinks: z.object({
    twitter: z.string()
      .url('Please enter a valid URL')
      .optional()
      .or(z.literal('')),
    linkedin: z.string()
      .url('Please enter a valid URL')
      .optional()
      .or(z.literal('')),
    website: z.string()
      .url('Please enter a valid URL')
      .optional()
      .or(z.literal(''))
  }).optional(),
  
  preferences: z.object({
    notifications: z.boolean().optional(),
    language: z.enum(['en', 'fr', 'es']).optional(),
    theme: z.enum(['light', 'dark', 'system']).optional()
  }).optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>; 