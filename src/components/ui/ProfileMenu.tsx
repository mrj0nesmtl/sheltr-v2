import { useAuthStore } from '@/stores/authStore';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

export function ProfileMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
          {user?.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Icon name="user" className="w-4 h-4 text-purple-300" />
          )}
        </div>
        <Icon name="chevron-down" className="w-4 h-4 text-gray-400" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-1 z-50">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => navigate('/profile')}
              className={`${
                active ? 'bg-gray-700' : ''
              } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-200`}
            >
              <Icon name="user" className="w-4 h-4" />
              Profile Settings
            </button>
          )}
        </Menu.Item>
        
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => navigate('/account/security')}
              className={`${
                active ? 'bg-gray-700' : ''
              } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-200`}
            >
              <Icon name="shield" className="w-4 h-4" />
              Security
            </button>
          )}
        </Menu.Item>

        <div className="border-t border-gray-700 my-1" />
        
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={signOut}
              className={`${
                active ? 'bg-gray-700' : ''
              } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400`}
            >
              <Icon name="log-out" className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
} 