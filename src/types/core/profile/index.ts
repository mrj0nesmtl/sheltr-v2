import { AUTH_ROLES } from "../auth";

export interface ProfileData {
  id: string;
  userId: string;
  role: AUTH_ROLES;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  contactEmail?: string;
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  theme: "light" | "dark" | "system";
  language: string;
}
