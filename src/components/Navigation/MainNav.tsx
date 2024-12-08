import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function MainNav() {
  const { t } = useTranslation();
  
  const navigationItems = [
    {
      path: '/scan',
      label: t('nav.scanDonate'),
      icon: 'qr-code',
      highlight: true
    },
    {
      label: t('nav.solutions_menu.title'),
      icon: 'settings',
      items: [
        {
          path: '/how-it-works',
          label: t('nav.solutions_menu.howItWorks'),
          icon: 'help-circle',
          description: t('nav.solutions_menu.howItWorksDesc')
        },
        {
          path: '/solutions',
          label: t('nav.solutions_menu.solutions'),
          icon: 'settings',
          description: t('nav.solutions_menu.solutionsDesc')
        }
      ]
    },
    {
      path: '/about',
      label: t('nav.about'),
      icon: 'info'
    },
    {
      label: t('nav.blockchain.title'),
      icon: 'blocks',
      items: [
        {
          path: '/blockchain/whitepaper',
          label: t('nav.blockchain.menu.whitepaper'),
          icon: 'file-text',
          description: t('nav.blockchain.menu.whitepaperDesc')
        },
        {
          path: '/blockchain/token',
          label: t('nav.blockchain.menu.token'),
          icon: 'coins',
          description: t('nav.blockchain.menu.tokenDesc')
        },
        {
          path: '/blockchain/transactions',
          label: t('nav.blockchain.menu.transactions'),
          icon: 'activity',
          description: t('nav.blockchain.menu.transactionsDesc')
        }
      ]
    },
    {
      path: '/impact',
      label: t('nav.impact'),
      icon: 'trending-up'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white px-3">
        {t('nav.blockchain.title')}
      </h2>
      <p className="text-sm text-gray-400 px-3 mb-4">
        {t('nav.blockchain.desc')}
      </p>
      
      <nav className="space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col px-3 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )
            }
          >
            <div className="flex items-center">
              <Icon name={item.icon} className="mr-3 h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-sm text-gray-400 ml-8">
              {item.description}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
} 