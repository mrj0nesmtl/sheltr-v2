import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function MainNav() {
  const { t } = useTranslation();

  // Primary navigation items
  const mainNavItems = [
    {
      path: '/about',
      label: t('nav.about'),
      icon: 'info'
    },
    {
      label: t('nav.solutions'),
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
      path: '/impact',
      label: t('nav.impact'),
      icon: 'trending-up'
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
        },
        {
          path: '/blockchain/depot',
          label: t('nav.blockchain.menu.depot'),
          icon: 'shopping-bag',
          description: t('nav.blockchain.menu.depotDesc')
        }
      ]
    },
    {
      path: '/blog',
      label: t('nav.blog'),
      icon: 'file-text'
    }
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {mainNavItems.map((item) => (
        item.items ? (
          <div key={item.label} className="relative group">
            <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <span>{item.label}</span>
              <Icon name="chevron-down" className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-gray-800 px-5 py-6">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-700"
                    >
                      <Icon name={subItem.icon} className="h-5 w-5 text-indigo-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-white">
                          {subItem.label}
                        </p>
                        {subItem.description && (
                          <p className="text-xs text-gray-400">
                            {subItem.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={item.path}
            to={item.path}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        )
      ))}
    </nav>
  );
} 