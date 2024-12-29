import { AUTH_ROLES } from '@/auth/types/auth.types';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  roles: AUTH_ROLES[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    roles: [AUTH_ROLES.SUPER_ADMIN, AUTH_ROLES.SHELTER_ADMIN, AUTH_ROLES.DONOR, AUTH_ROLES.PARTICIPANT]
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    roles: [AUTH_ROLES.SUPER_ADMIN, AUTH_ROLES.SHELTER_ADMIN]
  },
  {
    label: 'Participants',
    href: '/dashboard/participants',
    roles: [AUTH_ROLES.SUPER_ADMIN, AUTH_ROLES.SHELTER_ADMIN]
  },
  {
    label: 'Donations',
    href: '/dashboard/donations',
    roles: [AUTH_ROLES.DONOR, AUTH_ROLES.SUPER_ADMIN]
  }
];

interface DashboardNavigationProps {
  role: AUTH_ROLES;
}

export const DashboardNavigation = ({ role }: DashboardNavigationProps) => {
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(role)
  );

  return (
    <nav className="w-64 bg-muted p-4">
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-colors"
            )}
          >
            {item.icon && <item.icon />}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};
