export type UserRole = 
  | 'super_admin'
  | 'shelter_admin'
  | 'admin'
  | 'donor'
  | 'participant'
  | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
} 