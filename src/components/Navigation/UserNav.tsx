import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/auth/stores/authStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function UserNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <Avatar
          src={user?.profileImage}
          fallback={user?.name?.[0] || 'U'}
          className="h-8 w-8 cursor-pointer"
        />
        <span className="text-sm text-gray-200">
          {user?.name?.split('+')?.[0] || 'User'}
        </span>
        <Icon name="chevron-down" className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              <Icon name="user" className="mr-3 h-4 w-4" />
              {t('nav.profile')}
            </button>

            <button
              onClick={() => {
                navigate('/settings');
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              <Icon name="settings" className="mr-3 h-4 w-4" />
              {t('nav.settings')}
            </button>

            <div className="border-t border-gray-700 my-1" />

            <button
              onClick={async () => {
                try {
                  await logout();
                  setIsOpen(false);
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
            >
              <Icon name="log-out" className="mr-3 h-4 w-4" />
              {t('nav.signOut')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 