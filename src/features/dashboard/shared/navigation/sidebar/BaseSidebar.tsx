import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  iconColor?: string;
}

export interface BaseSidebarProps {
  title?: string;
  menuItems: SidebarMenuItem[];
  userInfo?: {
    email?: string;
    role?: string;
    avatar?: string;
  };
  className?: string;
  footer?: React.ReactNode;
  logo?: React.ReactNode;
}

export function BaseSidebar({ 
  title = "Navigation", 
  menuItems, 
  userInfo, 
  className,
  footer,
  logo
}: BaseSidebarProps) {
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "flex h-full flex-col w-64 bg-gray-900",
        "border-r border-gray-800",
        className
      )}
    >
      {/* Logo Section */}
      {logo && (
        <div className="p-6 border-b border-gray-800">
          {logo}
        </div>
      )}

      {/* User Info Section */}
      {userInfo && (
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            {userInfo.avatar && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                {userInfo.avatar}
              </div>
            )}
            <div>
              {userInfo.role && (
                <p className="text-sm text-gray-400">{userInfo.role}</p>
              )}
              {userInfo.email && (
                <p className="text-sm font-medium text-white truncate">
                  {userInfo.email}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-gray-300",
              "hover:text-white hover:bg-gray-700/50 rounded-lg",
              "transition-all duration-200 ease-in-out",
              "cursor-pointer group",
              location.pathname === item.path && "bg-gray-700/70 text-white shadow-lg shadow-gray-900/20"
            )}
          >
            <item.icon 
              className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                "group-hover:scale-110",
                item.iconColor
              )}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {footer ? (
        footer
      ) : (
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      )}
    </aside>
  );
} 