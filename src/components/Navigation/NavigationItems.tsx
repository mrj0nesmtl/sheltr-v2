import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/auth/stores/authStore';
import { cn } from '@/lib/utils';
import { getNavigationConfig } from '@/lib/utils/navigation';

export function NavigationItems() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuthStore();
  const navConfig = getNavigationConfig(t);

  const isAllowed = (roles?: string[]) => {
    if (!roles || !user) return true;
    return roles.includes(user.role);
  };

  return (
    <div className="flex flex-col space-y-1">
      {/* Public Navigation */}
      {navConfig.public.items.map(({ label, href }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
            location.pathname === href
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          )}
        >
          {label}
        </Link>
      ))}

      {/* User Navigation */}
      {user && (
        <>
          <div className="h-px bg-gray-700 my-2" />
          {navConfig.user.items
            .filter(item => isAllowed(item.roles))
            .map(({ label, href, icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                  location.pathname === href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                {icon && <Icon name={icon} className="w-4 h-4 mr-2" />}
                {label}
              </Link>
            ))}
        </>
      )}
    </div>
  );
}