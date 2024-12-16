export enum UserRole {
  super_admin = 'super_admin',
  shelter_admin = 'shelter_admin',
  donor = 'donor',
  participant = 'participant'
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

// Role-based permissions
export interface RolePermissions {
  [UserRole.super_admin]: string[];
  [UserRole.shelter_admin]: string[];
  [UserRole.donor]: string[];
  [UserRole.participant]: string[];
}

export const DEFAULT_PERMISSIONS: RolePermissions = {
  [UserRole.super_admin]: ['*'],
  [UserRole.shelter_admin]: [
    'manage_shelter',
    'view_analytics',
    'manage_participants',
    'view_reports'
  ],
  [UserRole.donor]: [
    'make_donations',
    'view_history',
    'view_impact',
    'manage_profile'
  ],
  [UserRole.participant]: [
    'view_services',
    'manage_profile',
    'view_history'
  ]
};

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