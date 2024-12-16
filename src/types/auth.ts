export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
} 