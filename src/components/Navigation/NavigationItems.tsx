import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '../../stores/authStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '../../lib/utils';
import { Menu } from '@headlessui/react';
import { UserRole } from '@/lib/types/auth';
import { Avatar } from '@/components/ui/Avatar';
import { IconName } from '@/components/ui/Icon';

interface NavigationItemsProps {
  mobile?: boolean;
  onItemClick?: () => void;
  isDark?: boolean;
}

interface NavItem {
  label: string;
  items?: {
    path: string;
    label: string;
    icon?: IconName;
    description?: string;
    roles?: UserRole[];
  }[];
  path?: string;
  icon?: IconName;
  highlight?: boolean;
  roles?: UserRole[];
}

export function NavigationItems({ mobile, onItemClick, isDark = true }: NavigationItemsProps) {
  const { t } = useTranslation();
  const { user, signOut, canAccessFeature } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Move navigationItems inside the component to access t
  const navigationItems = [
    // Primary navigation items
    {
      label: t('nav.solutions_menu.title'),
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
      items: [
        {
          path: '/about',
          label: t('nav.company_menu.about'),
          icon: 'info',
          description: t('nav.company_menu.aboutDesc')
        },
        {
          path: '/whitepaper',
          label: t('nav.company_menu.whitepaper'),
          icon: 'book',
          description: t('nav.company_menu.whitepaperDesc')
        }
      ]
    },
    // Top level items
    {
      path: '/scan',
      label: t('nav.scanDonate'),
      icon: 'qr-code',
      highlight: true
    },
    {
      path: '/impact',
      label: t('nav.impact'),
      icon: 'trending-up'
    },
    {
      path: '/blog',
      label: t('nav.blog'),
      icon: 'file-text'
    },
    {
      label: t('nav.blockchain.title'),
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

  // Define role-based navigation items
  const getNavItems = (): NavItem[] => {
    const items: NavItem[] = [
      // Public items - available to all
      {
        label: t('nav.scanDonate'),
        path: '/scan',
        highlight: true
      },
      // Solutions menu - available to all
      {
        label: t('nav.solutions_menu.title'),
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
          },
          { 
            path: '/impact', 
            label: t('nav.solutions_menu.impact'),
            icon: 'trending-up',
            description: t('nav.solutions_menu.impactDesc')
          }
        ]
      },
      // Company menu - available to all
      {
        label: t('nav.company_menu.title'),
        items: [
          {
            path: '/about',
            label: t('nav.company_menu.about'),
            icon: 'info',
            description: t('nav.company_menu.aboutDesc')
          },
          {
            path: '/whitepaper',
            label: t('nav.company_menu.whitepaper'),
            icon: 'book',
            description: t('nav.company_menu.whitepaperDesc')
          }
        ]
      },
      // Add Blockchain menu
      {
        label: t('nav.blockchain.title'),
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

    // Add role-specific items only when authenticated
    if (user) {
      switch (user.role) {
        case 'super_admin':
          items.push({
            label: t('nav.platform_menu.title'),
            items: [
              {
                path: '/admin/dashboard',
                label: t('nav.platform_menu.dashboard'),
                icon: 'layout-dashboard',
                description: t('nav.platform_menu.dashboardDesc'),
                roles: ['super_admin']
              },
              {
                path: '/admin/users',
                label: t('nav.platform_menu.userManagement'),
                icon: 'users',
                description: t('nav.platform_menu.userManagementDesc'),
                roles: ['super_admin']
              },
              {
                path: '/admin/settings',
                label: t('nav.platform_menu.systemSettings'),
                icon: 'settings',
                description: t('nav.platform_menu.systemSettingsDesc'),
                roles: ['super_admin']
              }
            ]
          });
          break;
        case 'admin':
          items.push({
            label: t('nav.platform_menu.title'),
            items: [
              {
                path: '/shelter/dashboard',
                label: t('nav.platform_menu.shelterDashboard'),
                icon: 'home',
                description: t('nav.platform_menu.shelterDashboardDesc')
              },
              {
                path: '/shelter/residents',
                label: t('nav.platform_menu.residentManagement'),
                icon: 'users',
                description: t('nav.platform_menu.residentManagementDesc')
              }
            ]
          });
          break;
        case 'donor':
          items.push({
            label: t('nav.donor_menu.title'),
            items: [
              {
                path: '/donations/history',
                label: t('nav.donor_menu.donationHistory'),
                icon: 'history',
                description: t('nav.donor_menu.donationHistoryDesc')
              },
              {
                path: '/impact/personal',
                label: t('nav.donor_menu.personalImpact'),
                icon: 'bar-chart',
                description: t('nav.donor_menu.personalImpactDesc')
              }
            ]
          });
          break;
        case 'participant':
          items.push({
            label: t('nav.participant_menu.title'),
            items: [
              {
                path: '/services/available',
                label: t('nav.participant_menu.availableServices'),
                icon: 'helping-hand',
                description: t('nav.participant_menu.availableServicesDesc')
              },
              {
                path: '/services/history',
                label: t('nav.participant_menu.serviceHistory'),
                icon: 'history',
                description: t('nav.participant_menu.serviceHistoryDesc')
              }
            ]
          });
          break;
      }
    }

    return items;
  };

  const navItems = getNavItems();

  const authItems = user ? [
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: `/profile/${user.id}`, label: t('nav.profile') }
  ] : [
    { path: '/signup', label: t('nav.signUp') },
    { path: '/login', label: t('nav.login'), id: 'main-login' }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Render dropdown menu for desktop
  const renderDropdown = (item: NavItem) => {
    // If it's a direct link
    if (item.path) {
      return (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            item.highlight && "bg-green-600 hover:bg-green-700 text-white",
            !item.highlight && isDark 
              ? "text-gray-300 hover:text-white" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {item.label}
        </Link>
      );
    }

    // If it's a dropdown menu
    return (
      <Menu as="div" className="relative" key={item.label}>
        <Menu.Button
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium inline-flex items-center",
            isDark 
              ? "text-gray-300 hover:text-white" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {item.label}
          <Icon name="chevron-down" className="ml-1 h-4 w-4" />
        </Menu.Button>
        <Menu.Items
          className={cn(
            "absolute left-0 mt-2 w-72 rounded-md shadow-lg py-1 z-50",
            isDark
              ? "bg-gray-800 ring-1 ring-black ring-opacity-5"
              : "bg-white ring-1 ring-black ring-opacity-5"
          )}
        >
          {item.items?.map((subItem) => (
            <Menu.Item key={subItem.path}>
              {({ active }: { active: boolean }) => (
                <Link
                  to={subItem.path}
                  className={cn(
                    "block px-4 py-3 text-sm group",
                    isDark
                      ? active ? "bg-gray-700" : ""
                      : active ? "bg-gray-50" : "",
                  )}
                  onClick={onItemClick}
                >
                  <div className="flex items-center">
                    {subItem.icon && (
                      <Icon 
                        name={subItem.icon as any} 
                        className={cn(
                          "h-5 w-5 mr-3",
                          isDark ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-900"
                        )} 
                      />
                    )}
                    <div>
                      <div className={cn(
                        "font-medium",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {subItem.label}
                      </div>
                      {subItem.description && (
                        <p className={cn(
                          "text-xs mt-0.5",
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}>
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    );
  };

  // Add user profile section for mobile
  const renderMobileUserProfile = () => {
    if (!user) return null;

    return (
      <div className="px-4 py-5 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Avatar
            src={user.profileImage}
            fallback={user.name?.[0] || user.email[0]}
            size="lg"
            className="ring-2 ring-green-500"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.name || user.email}
            </p>
            <p className="text-sm text-gray-400 truncate">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ')}
            </p>
          </div>
          <Link
            to={`/profile/${user.id}`}
            className="inline-flex items-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            onClick={onItemClick}
          >
            <Icon name="settings" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  };

  // Render mobile menu items
  const renderMobileItems = () => (
    <div className="flex flex-col h-full">
      {/* User Profile Section */}
      {renderMobileUserProfile()}

      {/* Main Navigation */}
      <div className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
        {/* Primary Action */}
        {navItems.filter(item => item.highlight).map((item) => (
          <Link
            key={item.path}
            to={item.path!}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={onItemClick}
          >
            <Icon name="qr-code" className="h-4 w-4 mr-2" />
            {item.label}
          </Link>
        ))}

        {/* Navigation Groups */}
        {navItems.filter(item => !item.highlight).map((item) => {
          // Skip items that don't match user's role
          if (item.roles && (!user || !item.roles.includes(user.role))) {
            return null;
          }

          return (
            <div key={item.label} className="space-y-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="space-y-1">
                {item.items?.map((subItem) => {
                  // Skip sub-items that don't match user's role
                  if (subItem.roles && (!user || !subItem.roles.includes(user.role))) {
                    return null;
                  }

                  return (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="flex items-center px-3 py-2 rounded-md text-sm group text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={onItemClick}
                    >
                      {subItem.icon && (
                        <Icon 
                          name={subItem.icon as any} 
                          className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-300" 
                        />
                      )}
                      <div>
                        <div className="font-medium">{subItem.label}</div>
                        {subItem.description && (
                          <p className="text-xs text-gray-400 group-hover:text-gray-300">
                            {subItem.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-700 p-4">
        {user ? (
          <button
            onClick={async () => {
              await handleSignOut();
              onItemClick?.();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md"
          >
            <Icon name="log-out" className="h-4 w-4 mr-2" />
            {t('nav.signOut')}
          </button>
        ) : (
          <div className="space-y-2">
            <Link
              to="/signup"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              onClick={onItemClick}
            >
              <Icon name="user-plus" className="h-4 w-4 mr-2" />
              {t('nav.signUp')}
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              onClick={onItemClick}
            >
              <Icon name="log-in" className="h-4 w-4 mr-2" />
              {t('nav.login')}
            </Link>
          </div>
        )}

        {/* Language Switcher */}
        <div className="mt-4">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );

  // Render desktop navigation
  const renderDesktopNav = () => (
    <div className="hidden lg:flex items-center space-x-4">
      {/* Primary Action - Scan & Donate */}
      {navigationItems.filter(item => item.highlight).map(item => (
        <Link
          key={item.path}
          to={item.path!}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center"
        >
          {item.icon && <Icon name={item.icon} className="h-4 w-4 mr-2" />}
          {item.label}
        </Link>
      ))}

      {/* Dropdown Menus */}
      {navigationItems.filter(item => item.items).map(renderDropdown)}

      {/* Impact - Top Level */}
      {navigationItems.filter(item => !item.highlight && !item.items).map(item => (
        <Link
          key={item.path}
          to={item.path!}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium flex items-center",
            isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
          )}
        >
          {item.icon && <Icon name={item.icon} className="h-4 w-4 mr-2" />}
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <div className={cn(
      "w-full",
      mobile ? "flex flex-col space-y-4" : "flex items-center justify-between"
    )}>
      {/* Navigation Links */}
      <div className={cn(
        mobile ? "flex flex-col" : "flex-1 flex justify-center space-x-8"
      )}>
        {mobile ? renderMobileItems() : renderDesktopNav()}
      </div>

      {/* Desktop Auth Buttons */}
      {!mobile && (
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Menu as="div" className="relative">
                <Menu.Button className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                  isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}>
                  <Icon name="user" className="h-4 w-4" />
                  <span>{user.name || user.email}</span>
                  <Icon name="chevron-down" className="h-4 w-4" />
                </Menu.Button>
                <Menu.Items className={cn(
                  "absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50",
                  isDark
                    ? "bg-gray-800 ring-1 ring-black ring-opacity-5"
                    : "bg-white ring-1 ring-black ring-opacity-5"
                )}>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/profile/${user.id}`}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          active ? "bg-gray-100" : "",
                          isDark ? "text-white" : "text-gray-700"
                        )}
                      >
                        {t('nav.profile')}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={cn(
                          "block w-full text-left px-4 py-2 text-sm",
                          active ? "bg-gray-100" : "",
                          "text-red-600"
                        )}
                      >
                        {t('nav.signOut')}
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {t('nav.signUp')}
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                {t('nav.login')}
              </Link>
            </>
          )}
          <LanguageSwitcher />
        </div>
      )}
    </div>
  );
}