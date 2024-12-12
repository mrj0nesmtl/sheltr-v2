interface UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  error: Error | null;
  loading: boolean;
} 