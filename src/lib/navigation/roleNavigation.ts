import type { UserRole } from '@/lib/types/auth';
import type { IconName } from '@/components/ui/Icon';

interface NavItem {
  path: string;
  label: string;
  icon: IconName;
  roles?: UserRole[];
}

export const getNavigation = (role: UserRole): NavItem[] => {
  const baseNavigation: NavItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: 'home'
    }
  ];

  const roleNavigation: Record<UserRole, NavItem[]> = {
    super_admin: [
      {
        path: '/admin/dashboard',
        label: 'Admin Dashboard',
        icon: 'layout-dashboard',
        roles: ['super_admin']
      }
    ],
    donor: [
      {
        path: '/scan',
        label: 'Scan & Donate',
        icon: 'qr-code',
        roles: ['donor']
      },
      {
        path: '/donations',
        label: 'My Donations',
        icon: 'history',
        roles: ['donor']
      }
    ],
    shelter_admin: [
      {
        path: '/shelter/dashboard',
        label: 'Shelter Dashboard',
        icon: 'layout-dashboard',
        roles: ['shelter_admin']
      }
    ],
    participant: [
      {
        path: '/services',
        label: 'Available Services',
        icon: 'list',
        roles: ['participant']
      }
    ],
    guest: []
  };

  return [...baseNavigation, ...roleNavigation[role]];
}; 