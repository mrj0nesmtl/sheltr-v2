// Core type definitions for SHELTR application
import { ReactNode } from 'react';

// Icon types used throughout the application
export type IconType = 
  | "key" | "filter" | "phone" | "user" | "search" 
  | "x" | "menu" | "chevron-down" | "chevron-right" 
  | "chevron-up" | "arrow-right" | "arrow-left" 
  | "external-link" | "user-plus" | "file-text" 
  | "hash" | "settings" | "log-out" | "home" 
  | "users" | "dollar-sign" | "bar-chart" | "map-pin"
  | "alert-circle" | "check-circle" | "info" | "help-circle"
  | "calendar" | "clock" | "mail" | "phone-call"
  | "shield" | "star" | "heart" | "trending-up";

// Base profile interface
export interface BaseProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  avatar?: string;
}

// Shelter profile interface
export interface ShelterProfile extends BaseProfile {
  address: string;
  phone: string;
  capacity: number;
  services: string[];
  operatingHours: {
    open: string;
    close: string;
    timezone: string;
  };
  status: 'active' | 'inactive' | 'pending';
  verificationStatus: 'verified' | 'unverified' | 'pending';
}

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Authentication related types
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  profile: BaseProfile;
}

export type UserRole = 'admin' | 'shelter' | 'donor' | 'participant';

// Export all related types
export * from './auth';
export * from './ui.types';
export * from './shelter.types';

// Analytics types
export interface AnalyticsData {
  timestamp: Date;
  metric: string;
  value: number;
  category: string;
}

// Error handling types
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Response types
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  status: 'success' | 'error';
} 