import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';
import { getMainNavItems, getUserNavItems } from '@/lib/config/navigation';

export function MobileNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuthStore();
  
  const mainNavItems = getMainNavItems(t);
  const userNavItems = getUserNavItems(t);

  const isAllowed = (roles?: string[]) => {
    if (!roles || !user) return true;
    return roles.includes(user.role);
  };

  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      {mainNavItems.map(({ label, href }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            'block px-3 py-2 text-base font-medium rounded-md transition-colors',
            location.pathname === href
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          )}
        >
          {label}
        </Link>
      ))}

      {user && (
        <>
          <div className="border-t border-gray-700 my-2" />
          {userNavItems
            .filter(item => isAllowed(item.roles))
            .map(({ label, href, icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  'flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors',
                  location.pathname === href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                )}
              >
                {icon && <Icon name={icon} className="w-5 h-5 mr-3" />}
                {label}
              </Link>
            ))}
        </>
      )}
    </div>
  );
} 