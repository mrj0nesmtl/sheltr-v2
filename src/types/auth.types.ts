export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

// Type helper for role strings
export type UserRoleType = `${UserRole}`;

// Type guard for role validation
export function isValidRole(role: string): role is UserRoleType {
  return Object.values(UserRole).includes(role as UserRole);
} 