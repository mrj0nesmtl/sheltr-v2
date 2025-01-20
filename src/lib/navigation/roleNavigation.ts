import { AUTH_ROLES, ROLE_BASE_PATHS } from '@/auth/types/auth.types';
import { supabase } from '@/lib/supabase';

export const getRoleBasedRedirect = async (role: AUTH_ROLES, userId?: string): Promise<string> => {
  console.log('getRoleBasedRedirect called with:', { role, userId });
  
  switch (role) {
    case AUTH_ROLES.SUPER_ADMIN:
      return '/dashboard/super-admin';
    
    case AUTH_ROLES.DONOR:
      return `/dashboard/donor/${userId}`;
    
    case AUTH_ROLES.PARTICIPANT:
      return `/dashboard/participant/${userId}`;
    
    case AUTH_ROLES.SHELTER_ADMIN:
      try {
        const { data: org, error } = await supabase
          .from('organizations')
          .select('id, status')
          .eq('user_id', userId)
          .single();
        
        if (error) throw error;
        
        if (!org) {
          console.warn('No organization found for shelter user');
          return '/shelter/setup';
        }
        return `/dashboard/shelter/${org.id}`;
      } catch (error) {
        console.error('Error fetching organization:', error);
        return '/shelter/setup';
      }
    
    default:
      console.warn('Unknown role:', role);
      return '/login';
  }
};

export const getDashboardPath = (role: AUTH_ROLES): string => {
  switch (role) {
    case AUTH_ROLES.SUPER_ADMIN:
      return '/dashboard/roles/super-admin';
    case AUTH_ROLES.SHELTER_ADMIN:
      return '/dashboard/roles/shelter-admin';
    case AUTH_ROLES.DONOR:
      return '/dashboard/roles/donor';
    case AUTH_ROLES.PARTICIPANT:
      return '/dashboard/roles/participant';
    default:
      return '/';
  }
};

// Helper to validate if a path matches the role's allowed paths
export const isPathAllowedForRole = (path: string, role: AUTH_ROLES): boolean => {
  const basePath = ROLE_BASE_PATHS[role];
  // Convert route parameter pattern to regex
  const basePathRegex = basePath.replace(':orgId', '[^/]+');
  return new RegExp(`^${basePathRegex}`).test(path);
}; 