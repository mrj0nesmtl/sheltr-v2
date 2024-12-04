import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  QrCode, 
  Info, 
  Building,
  UserPlus,
  LogIn,
  LayoutDashboard,
  User,
  BarChart,
  LogOut,
  Shield
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore, getDashboardPath } from '../../stores/authStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '../../lib/utils';

interface NavigationItemsProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function NavigationItems({ mobile = false, onItemClick = () => {} }: NavigationItemsProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();

  const mainLinks = [
    { to: "/how-it-works", icon: Info, label: t('nav.howItWorks') },
    { to: "/solutions", icon: Building, label: t('nav.solutions') },
    { to: "/scan", icon: QrCode, label: t('nav.scanDonate') },
    { to: "/analytics", icon: BarChart, label: t('nav.impact') }
  ];

  const authLinks = user ? [
    { to: `/profile/${user.id}`, icon: User, label: t('nav.profile') },
    { 
      to: getDashboardPath(user.role),
      icon: user.role === 'super_admin' ? Shield : LayoutDashboard,
      label: user.role === 'super_admin' ? 'Admin Dashboard' : t('nav.dashboard')
    },
    { 
      to: "/login", 
      icon: LogOut, 
      label: t('nav.signOut'),
      onClick: async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
          await signOut();
          onItemClick();
        } catch (error) {
          console.error('Sign out failed:', error);
        }
      }
    }
  ] : [
    { to: "/signup", icon: UserPlus, label: t('nav.signUp') },
    { to: "/login", icon: LogIn, label: t('nav.login') }
  ];

  const renderLink = ({ to, icon: Icon, label, onClick }: { 
    to: string; 
    icon: any; 
    label: string;
    onClick?: (e: React.MouseEvent) => Promise<void>;
  }) => (
    <Link
      key={to}
      to={to}
      onClick={async (e) => {
        if (onClick) {
          await onClick(e);
        }
        onItemClick();
      }}
      className={cn(
        mobile 
          ? "block px-3 py-2 rounded-md text-base font-medium w-full" 
          : "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium",
        "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors",
        location.pathname === to && "bg-gray-700 text-white"
      )}
    >
      <Icon className="h-5 w-5 mr-2" />
      <span>{label}</span>
    </Link>
  );

  if (mobile) {
    return (
      <div className="flex flex-col space-y-1">
        {mainLinks.map(renderLink)}
        <div className="my-2 border-t border-gray-700" />
        {authLinks.map(renderLink)}
        <div className="my-2 border-t border-gray-700" />
        <LanguageSwitcher className="w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:flex lg:items-center lg:space-x-1">
        {mainLinks.map(renderLink)}
      </div>
      <div className="hidden lg:flex lg:items-center lg:space-x-1 lg:ml-4">
        {authLinks.map(renderLink)}
        <LanguageSwitcher className="ml-2" />
      </div>
    </>
  );
}