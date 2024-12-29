export enum AUTH_ROLES {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

export interface AccessControl {
  view: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
}

export const RolePermissions: Record<AUTH_ROLES, AccessControl> = {
  [AUTH_ROLES.SUPER_ADMIN]: {
    view: true,
    edit: true,
    delete: true,
    manage: true
  },
  [AUTH_ROLES.SHELTER_ADMIN]: {
    view: true,
    edit: true,
    delete: false,
    manage: true
  },
  [AUTH_ROLES.DONOR]: {
    view: true,
    edit: false,
    delete: false,
    manage: false
  },
  [AUTH_ROLES.PARTICIPANT]: {
    view: true,
    edit: false,
    delete: false,
    manage: false
  }
};

export function isValidRole(role: string): role is AUTH_ROLES {
  return Object.values(AUTH_ROLES).includes(role as AUTH_ROLES);
}

export interface BaseProfile {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  metadata: UserMetadata;
}

export interface ShelterProfile extends BaseProfile {
  name: string;
  address: string;
  city: string;
  contact_phone: string;
  registration_number: string;
  capacity: number;
  services: string[];
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  };
  current_occupancy: number;
  verified: boolean;
}

export interface DonorProfile extends BaseProfile {
  total_donated: number;
  total_donations: number;
  impact_score: number;
  last_donation_at?: Date;
  donation_frequency?: 'one-time' | 'monthly' | 'quarterly';
  preferred_causes: string[];
  anonymous: boolean;
}

export interface ParticipantProfile extends BaseProfile {
  shelter_id: string;
  program_type: string[];
  status: 'active' | 'inactive' | 'graduated';
  join_date: Date;
  needs_assessment: string[];
  goals: string[];
  progress_metrics: Record<string, number>;
}

export interface User {
  id: string;
  email: string;
  role: AUTH_ROLES;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  profileComplete: boolean;
  profile?: ShelterProfile | DonorProfile | ParticipantProfile;
}

export interface UserMetadata {
  last_updated: string;
  update_count: number;
  last_activity: string;
  activity_score: number;
  activity_status: string;
  profile_created: string;
  activity_metrics: {
    status: string;
    activity_history: Record<string, string>;
    activity_threshold: number;
    last_status_update: string;
    days_since_last_activity: number;
  };
  engagement_level: string;
  last_engagement_update: string;
}

export interface UserProfile extends User {
  name: string;
  verified: boolean;
  profile_image: string | null;
  total_donated: string;
  total_donations: number;
  impact_score: number;
  contact_phone: string | null;
  city: string | null;
  address: string | null;
  registration_number: string | null;
  capacity: number | null;
  services: string[];
  emergency_contact: Record<string, any> | null;
  metadata: UserMetadata;
  settings: Record<string, any>;
  activity_score: number;
  last_activity_at: string;
  engagement_score: number;
}

// Auth related interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  role: AUTH_ROLES | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: AUTH_ROLES;
  firstName?: string;
  lastName?: string;
  terms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: number;
}

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

export interface EnhancedAuthError extends AuthError {
  severity: ErrorSeverity;
  handled: boolean;
  retryCount?: number;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}

export enum AuthActionType {
  LOGIN_START = 'LOGIN_START',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  UPDATE_USER = 'UPDATE_USER',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR'
}

export interface AuthAction {
  type: AuthActionType;
  payload: unknown;
}

export const ROLE_ROUTES = {
  [AUTH_ROLES.SUPER_ADMIN]: '/super-admin/dashboard',
  [AUTH_ROLES.SHELTER_ADMIN]: '/shelter-admin/dashboard',
  [AUTH_ROLES.DONOR]: '/donor/dashboard',
  [AUTH_ROLES.PARTICIPANT]: '/participant/dashboard'
} as const;

export function getRoleBasedRoute(role: AUTH_ROLES): string {
  return ROLE_ROUTES[role] || '/dashboard';
} 