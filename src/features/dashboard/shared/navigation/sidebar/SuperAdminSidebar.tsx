import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3
} from 'lucide-react';

// Make sure to use named export
export function SuperAdminSidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.email}</span>
            <span className="text-xs text-gray-400">Super Admin</span>
          </div>
        </div>
      </div>

      <nav className="mt-6 space-y-1">
        <NavLink 
          to="/super-admin/dashboard" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/shelters" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <Building2 className="w-5 h-5 mr-3" />
          Shelters
        </NavLink>

        <NavLink 
          to="/users" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <Users className="w-5 h-5 mr-3" />
          Users
        </NavLink>

        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          Analytics
        </NavLink>
      </nav>
    </aside>
  );
}
