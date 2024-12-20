import { Icon, type IconName } from '@/components/ui/Icon';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: IconName;
  label: string;
  path: string;
}

export function SidebarItem({ icon, label, path }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }
      `}
    >
      <Icon name={icon} className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}
