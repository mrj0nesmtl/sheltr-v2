import { NavLink } from 'react-router-dom';

export function SuperAdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">SHELTR</h2>
      </div>
      
      <nav className="mt-6 space-y-1">
        <NavLink 
          to="/super-admin/dashboard" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/shelters" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Shelters
        </NavLink>

        <NavLink 
          to="/users" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Users
        </NavLink>

        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Analytics
        </NavLink>
      </nav>
    </aside>
  );
}
