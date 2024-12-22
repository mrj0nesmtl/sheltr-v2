import { useLocation } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';

export function DonorSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/donor/dashboard'
    },
    {
      icon: 'heart',
      label: 'My Donations',
      path: '/donor/donations'
    },
    {
      icon: 'trophy',
      label: 'Impact',
      path: '/donor/impact'
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

export default DonorSidebar;
