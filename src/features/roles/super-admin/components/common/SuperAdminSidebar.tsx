import { useLocation } from 'react-router-dom';
import { SidebarItem } from '@/layouts/specialized/dashboard/Sidebar/SidebarItem';

export function SuperAdminSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/super-admin/dashboard'
    },
    {
      icon: 'building',
      label: 'Shelters',
      path: '/super-admin/shelters'
    },
    {
      icon: 'users',
      label: 'Users',
      path: '/super-admin/users'
    },
    {
      icon: 'chart',
      label: 'Analytics',
      path: '/super-admin/analytics'
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
