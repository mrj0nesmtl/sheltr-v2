import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavigationItem } from '@/lib/navigation/config';

interface MainNavProps {
  items: NavigationItem[];
}

export function MainNav({ items }: MainNavProps) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex space-x-8">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
            location.pathname === item.path
              ? 'text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{t(item.label)}</span>
        </Link>
      ))}
    </nav>
  );
} 