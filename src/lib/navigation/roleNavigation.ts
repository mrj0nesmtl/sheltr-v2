import { AUTH_ROLES, ROLE_BASE_PATHS } from '@/auth/types/auth.types';
import { supabase } from '@/lib/supabase';

export const getRoleBasedRedirect = async (role: AUTH_ROLES, userId?: string): Promise<string> => {
  console.log('getRoleBasedRedirect called with:', { role, userId });
  
  if (role === AUTH_ROLES.SHELTER_ADMIN) {
    // Debug log the organization lookup
    const { data: org, error } = await supabase
      .from('organizations')
      .select('id, status')
      .eq('user_id', userId)
      .single();
      
    console.log('Organization lookup result:', { org, error });

    if (!org) {
      console.warn('No organization found for user');
      return '/shelter/setup';
    }

    return `/shelter/${org.id}/dashboard`;
  }
  
  return '/login';
};

// Add the missing getDashboardPath export
export const getDashboardPath = (role: AUTH_ROLES, orgId?: string): string => {
  switch (role) {
    case AUTH_ROLES.SHELTER_ADMIN:
      return orgId 
        ? `/shelter/${orgId}/dashboard`
        : '/registration-confirmation';
    case AUTH_ROLES.SUPER_ADMIN:
      return '/super-admin/dashboard';
    case AUTH_ROLES.DONOR:
      return '/donor/dashboard';
    case AUTH_ROLES.PARTICIPANT:
      return '/participant/dashboard';
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