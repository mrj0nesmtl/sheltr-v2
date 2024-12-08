import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, type IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { useState } from 'react';

interface NavItem {
  path?: string;
  label: string;
  icon?: IconName;
  highlight?: boolean;
  items?: {
    path: string;
    label: string;
    icon?: IconName;
    description?: string;
  }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export function MobileMenu({ isOpen, onClose, isDark = true }: MobileMenuProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus(current => 
      current.includes(label) 
        ? current.filter(item => item !== label)
        : [...current, label]
    );
  };

  // Define all navigation items including dropdowns
  const navigationItems: NavItem[] = [
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
      label: t('nav.company_menu.title'),
      icon: 'building',
      items: [
        {
          path: '/about',
          label: t('nav.company_menu.about'),
          icon: 'info',
          description: t('nav.company_menu.aboutDesc')
        },
        {
          path: '/blog',
          label: t('nav.company_menu.blog'),
          icon: 'file-text',
          description: t('nav.company_menu.blogDesc')
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
    }
  ];

  // Add role-specific items
  if (user) {
    if (user.role === 'super_admin') {
      navigationItems.push({
        label: t('nav.platform_menu.title'),
        icon: 'layout-dashboard',
        items: [
          {
            path: '/super-admin/dashboard',
            label: t('nav.platform_menu.dashboard'),
            icon: 'layout-dashboard',
            description: t('nav.platform_menu.dashboardDesc')
          },
          {
            path: '/super-admin/users',
            label: t('nav.platform_menu.userManagement'),
            icon: 'users',
            description: t('nav.platform_menu.userManagementDesc')
          }
        ]
      });
    }
  }

  // Add profile navigation when user is logged in
  if (user) {
    navigationItems.unshift({  // Add at the beginning of the array
      label: t('nav.profile_menu.title'),
      icon: 'user',
      items: [
        {
          path: '/profile',
          label: t('nav.profile_menu.profile'),
          icon: 'user',
          description: t('nav.profile_menu.profileDesc')
        },
        {
          path: '/profile/settings',
          label: t('nav.profile_menu.settings'),
          icon: 'settings',
          description: t('nav.profile_menu.settingsDesc')
        }
      ]
    });
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transform transition-all duration-300 ease-in-out lg:hidden',
        isDark ? 'bg-gray-900' : 'bg-white',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-800">
          <div className="flex items-center">
            <Logo className="h-8 w-auto" />
            {user && (
              <Link 
                to="/profile"
                className="ml-4 flex items-center hover:bg-gray-800 rounded-lg px-2 py-1 transition-colors"
                onClick={onClose}
              >
                <Avatar 
                  src={user.avatar} 
                  fallback={user.name?.[0] || '?'}
                  className="h-8 w-8"
                />
                <span className="ml-2 text-sm font-medium text-white">
                  {user.name || user.email}
                </span>
              </Link>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <Icon name="x" className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-2 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-base font-medium",
                      isDark 
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      item.highlight && "bg-green-600 hover:bg-green-700 text-white"
                    )}
                    onClick={onClose}
                  >
                    {item.icon && <Icon name={item.icon} className="h-5 w-5 mr-3 text-gray-400" />}
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium",
                        isDark 
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                      onClick={() => toggleMenu(item.label)}
                    >
                      <div className="flex items-center">
                        {item.icon && <Icon name={item.icon} className="h-5 w-5 mr-3 text-gray-400" />}
                        {item.label}
                      </div>
                      <Icon 
                        name={openMenus.includes(item.label) ? 'chevron-up' : 'chevron-down'} 
                        className="h-5 w-5 text-gray-400" 
                      />
                    </button>
                    {item.items && openMenus.includes(item.label) && (
                      <div className="mt-1 ml-4 space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-lg text-sm",
                              isDark 
                                ? "text-gray-400 hover:bg-gray-800 hover:text-white" 
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            )}
                            onClick={onClose}
                          >
                            {subItem.icon && (
                              <Icon name={subItem.icon} className="h-4 w-4 mr-3 text-gray-400" />
                            )}
                            <div>
                              <div className="font-medium">{subItem.label}</div>
                              {subItem.description && (
                                <p className="mt-1 text-xs text-gray-500">{subItem.description}</p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Auth Section */}
        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="space-y-3">
            {user ? (
              <button
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className="flex items-center justify-center w-full px-4 py-2.5 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon name="log-out" className="h-5 w-5 mr-2" />
                {t('nav.signOut')}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-2.5 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={onClose}
                >
                  <Icon name="log-in" className="h-5 w-5 mr-2" />
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center w-full px-4 py-2.5 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={onClose}
                >
                  <Icon name="user-plus" className="h-5 w-5 mr-2" />
                  {t('nav.signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}