import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/auth/stores/authStore';

export function ShelterAdminSidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const menuItems = [
    {
      icon: 'dashboard',
      label: t('nav.dashboard'),
      path: '/shelter-admin/dashboard'
    },
    {
      icon: 'users',
      label: t('nav.participants'),
      path: '/shelter-admin/participants'
    },
    {
      icon: 'chart',
      label: t('nav.analytics'),
      path: '/shelter-admin/analytics'
    },
    {
      icon: 'settings',
      label: t('nav.settings'),
      path: '/shelter-admin/settings'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <Logo className="h-8 w-auto" />
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-gray-800">
        <p className="text-sm text-gray-400">Shelter Admin</p>
        <p className="text-sm font-medium text-white truncate">
          {user?.email}
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            {...item}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>
    </div>
  );
}
