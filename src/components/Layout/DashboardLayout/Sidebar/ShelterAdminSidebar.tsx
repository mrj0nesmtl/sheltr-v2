import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SidebarItem } from './SidebarItem';

export function ShelterAdminSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

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
    <div className="flex flex-col w-64 bg-gray-900 p-4 border-r border-gray-800">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white px-4">
          {t('nav.shelterAdmin')}
        </h2>
      </div>
      
      {menuItems.map((item) => (
        <SidebarItem
          key={item.path}
          {...item}
          isActive={location.pathname === item.path}
        />
      ))}
    </div>
  );
}
