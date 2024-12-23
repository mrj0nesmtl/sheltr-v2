import { useLocation } from 'react-router-dom';
import { SidebarItem } from '@/layouts/specialized/dashboard/Sidebar/SidebarItem';

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
      icon: 'heart',
      label: 'Donations',
      path: '/shelter-admin/donations'
    },
    {
      icon: 'chart',
      label: 'Analytics',
      path: '/shelter-admin/analytics'
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

export default ShelterAdminSidebar;
