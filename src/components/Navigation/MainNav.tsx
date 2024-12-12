import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { getMainNavItems } from '@/lib/config/navigation';

export function MainNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const navItems = getMainNavItems(t);

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            'text-sm font-medium transition-colors',
            location.pathname === href
              ? 'text-white'
              : 'text-gray-300 hover:text-white'
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
} 