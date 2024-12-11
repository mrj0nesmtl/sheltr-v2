import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Icon, type IconName } from '@/components/ui/Icon';

export function MainNav() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const mainNavItems: Array<{
    path: string;
    label: string;
    icon: IconName;
  }> = [
    {
      path: '/how-it-works',
      label: t('nav.solutions_menu.howItWorks'),
      icon: 'info'
    },
    {
      path: '/solutions',
      label: t('nav.solutions_menu.solutions'),
      icon: 'globe'
    },
    {
      path: '/impact',
      label: t('nav.solutions_menu.impact'),
      icon: 'trending-up'
    },
    {
      path: '/scan',
      label: t('nav.scanDonate'),
      icon: 'scan'
    }
  ];

  return (
    <nav className="flex items-center space-x-8">
      {mainNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <Icon name={item.icon} className="h-5 w-5 mr-2" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
} 