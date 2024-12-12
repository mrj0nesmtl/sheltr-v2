import { useLocation } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';

export function ShelterAdminSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/shelter-admin/dashboard'
    },
    {
      icon: 'users',
      label: 'Participants',
      path: '/shelter-admin/participants'
    },
    {
      icon: 'chart',
      label: 'Analytics',
      path: '/shelter-admin/analytics'
    },
    {
      icon: 'map',
      label: 'Shelter Map',
      path: '/shelter-admin/map'
    }
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-900 p-4 border-r border-gray-800">
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
