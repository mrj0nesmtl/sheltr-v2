import { useLocation } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';

export function ParticipantSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/participant/dashboard'
    },
    {
      icon: 'user',
      label: 'My Profile',
      path: '/participant/profile'
    },
    {
      icon: 'calendar',
      label: 'Services',
      path: '/participant/services'
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
