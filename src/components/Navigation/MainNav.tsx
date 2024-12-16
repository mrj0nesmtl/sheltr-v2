import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';

export function MainNav() {
  const { t } = useTranslation();
  const { publicNavItems, isActiveRoute } = useNavigation();

  return (
    <nav className="hidden md:flex space-x-8">
      {publicNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors",
            isActiveRoute(item.path)
              ? "text-white"
              : "text-gray-300 hover:text-white"
          )}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{t(item.label)}</span>
        </Link>
      ))}
    </nav>
  );
} 