import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '../../stores/authStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '../../lib/utils';

interface NavigationItemsProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function NavigationItems({ mobile, onItemClick }: NavigationItemsProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/how-it-works', label: t('nav.howItWorks') },
    { path: '/solutions', label: t('nav.solutions') },
    { path: '/scan', label: t('nav.scanDonate') },
    { path: '/impact', label: t('nav.impact') },
  ];

  const authItems = user ? [
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: `/profile/${user.id}`, label: t('nav.profile') }
  ] : [
    { path: '/signup', label: t('nav.signUp') },
    { path: '/login', label: t('nav.login'), id: 'main-login' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className={cn(
      "w-full",
      mobile ? "flex flex-col space-y-4" : "flex items-center justify-between"
    )}>
      {/* Center Nav Links */}
      <div className={cn(
        mobile ? "flex flex-col space-y-4" : "flex-1 flex justify-center space-x-8"
      )}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
              location.pathname === item.path && "bg-gray-900 text-white"
            )}
            onClick={onItemClick}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className={cn(
        "flex items-center",
        mobile ? "flex-col space-y-4" : "space-x-4"
      )}>
        {user ? (
          <>
            <Link
              to={`/profile/${user.id}`}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.profile')}
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.dashboard')}
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              {t('nav.signOut')}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.signUp')}
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {t('nav.login')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}