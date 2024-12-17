export enum UserRole {
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

export const RolePermissions: Record<UserRole, AccessControl> = {
  [UserRole.SUPER_ADMIN]: {
    view: true,
    edit: true,
    delete: true,
    manage: true
  },
  [UserRole.SHELTER_ADMIN]: {
    view: true,
    edit: true,
    delete: false,
    manage: true
  },
  [UserRole.DONOR]: {
    view: true,
    edit: false,
    delete: false,
    manage: false
  },
  [UserRole.PARTICIPANT]: {
    view: true,
    edit: false,
    delete: false,
    manage: false
  }
};

// Type guard for role validation
export function isValidRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  profileComplete: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
}

// Form-specific types
export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  terms: boolean;
}

// Response types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Error types
export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// Session types
export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}

// Auth action types for state management
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
  payload?: any;
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