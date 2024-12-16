import { useAuth } from './useAuth';
import { useLocation } from 'react-router-dom';
import { 
  NavigationItem, 
  getNavigationByRole, 
  navigationConfig, 
  userNavigation 
} from '@/lib/navigation/config';
import { UserRole } from '@/auth/types/auth.types';
import { IconName } from '@/components/ui/Icon';

interface NavItem {
  path: string;
  label: string;
  iconName: IconName;
}

export function useNavigation() {
  const { user, role } = useAuth();
  const location = useLocation();

  // Get public navigation items with icon names
  const publicNavItems: NavItem[] = [
    {
      path: '/about',
      label: 'nav.about',
      iconName: 'info'
    },
    {
      path: '/how-it-works',
      label: 'nav.howItWorks',
      iconName: 'help-circle'
    },
    {
      path: '/solutions',
      label: 'nav.solutions',
      iconName: 'layers'
    },
    {
      path: '/impact',
      label: 'nav.impact',
      iconName: 'trending-up'
    }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return {
    publicNavItems,
    isActiveRoute,
    role,
    isAuthenticated: !!user
  };
} 