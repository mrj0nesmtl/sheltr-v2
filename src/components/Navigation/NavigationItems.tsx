import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '../../stores/authStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '../../lib/utils';
import { Menu } from '@headlessui/react';

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
    icon?: string;
    description?: string;
  }[];
  path?: string;
  highlight?: boolean;
}

export function NavigationItems({ mobile, onItemClick, isDark = true }: NavigationItemsProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Main navigation items with dropdown menus
  const navItems: NavItem[] = [
    // Primary Actions - Direct links for core functionality
    {
      label: "Scan & Donate",
      path: '/scan',
      highlight: true
    },
    // Solutions - How the platform works
    {
      label: "Solutions",
      items: [
        { 
          path: '/how-it-works', 
          label: "How It Works",
          icon: 'helpCircle',
          description: "Learn about our innovative approach to helping the homeless"
        },
        { 
          path: '/solutions', 
          label: "Solutions",
          icon: 'settings',
          description: "Discover our comprehensive platform features"
        },
        { 
          path: '/impact', 
          label: "Impact",
          icon: 'trendingUp',
          description: "See the real-world difference we're making together"
        }
      ]
    },
    // Platform - Technical and verification features
    {
      label: "Platform",
      items: [
        { 
          path: '/verify', 
          label: "Verify Donation",
          icon: 'shield',
          description: "Track and verify your contributions"
        },
        { 
          path: '/token', 
          label: "$SHELTR",
          icon: 'wallet',
          description: "Learn about our blockchain token"
        },
        { 
          path: '/analytics', 
          label: "Analytics",
          icon: 'barChart',
          description: "Real-time impact metrics and statistics"
        }
      ]
    },
    // Company - About and resources
    {
      label: "Company",
      items: [
        { 
          path: '/about', 
          label: "About",
          icon: 'info',
          description: "Our mission and the team behind SHELTR"
        },
        { 
          path: '/blog', 
          label: "Blog",
          icon: 'fileText',
          description: "Latest news, updates, and success stories"
        },
        { 
          path: '/whitepaper', 
          label: "Whitepaper",
          icon: 'book',
          description: "Technical details and vision"
        }
      ]
    }
  ];

  const authItems = user ? [
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: `/profile/${user.id}`, label: t('nav.profile') }
  ] : [
    { path: '/signup', label: "Sign Up" },
    { path: '/login', label: "Login", id: 'main-login' }
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
          <Icon name="chevronDown" className="ml-1 h-4 w-4" />
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

  // Render mobile menu items
  const renderMobileItems = () => (
    <div className="space-y-6">
      {/* Primary Action */}
      {navItems.filter(item => item.highlight).map((item) => (
        <Link
          key={item.path}
          to={item.path!}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          onClick={onItemClick}
        >
          <Icon name="qrCode" className="h-4 w-4 mr-2" />
          {item.label}
        </Link>
      ))}

      {/* Navigation Groups */}
      {navItems.filter(item => !item.highlight).map((item) => (
        <div key={item.label} className="space-y-2">
          <div className={cn(
            "px-3 py-2 text-sm font-medium",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {item.label}
          </div>
          <div className="pl-4 space-y-1">
            {item.items?.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm group",
                  isDark
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={onItemClick}
              >
                {subItem.icon && (
                  <Icon 
                    name={subItem.icon as any} 
                    className="h-4 w-4 mr-2 opacity-75" 
                  />
                )}
                <div>
                  <div>{subItem.label}</div>
                  {subItem.description && (
                    <p className="text-xs mt-0.5 opacity-75">
                      {subItem.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
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
        {mobile ? renderMobileItems() : navItems.map(renderDropdown)}
      </div>

      {/* Auth Buttons */}
      <div className={cn(
        "flex items-center",
        mobile ? "flex-col space-y-4 mt-6" : "space-x-4"
      )}>
        {user ? (
          <>
            <Link
              to={`/profile/${user.id}`}
              className={cn(
                "text-sm font-medium",
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "text-sm font-medium",
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className={cn(
                "text-sm font-medium",
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}