import { useAuthStore } from '@/auth/stores/authStore';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface UserNavProps {
  user: {
    name?: string;
    email: string;
    avatar_url?: string;
  };
}

export function UserNav({ user }: UserNavProps) {
  const { t } = useTranslation();
  const { signOut } = useAuthStore();
  const { roleNavItems } = useNavigation();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <div className="flex items-center space-x-2 text-gray-300">
            {user.avatar_url ? (
              <img className="h-8 w-8 rounded-full" src={user.avatar_url} alt="" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <span className="hidden md:inline-block">{user.name || user.email}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Role-based Navigation Items */}
          {roleNavItems.map((item) => (
            <Menu.Item key={item.path}>
              {({ active }) => (
                <Link
                  to={item.path}
                  className={cn(
                    active ? 'bg-gray-700' : '',
                    'block px-4 py-2 text-sm text-gray-300'
                  )}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {t(item.label)}
                  </div>
                </Link>
              )}
            </Menu.Item>
          ))}
          
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signOut}
                className={cn(
                  active ? 'bg-gray-700' : '',
                  'block w-full text-left px-4 py-2 text-sm text-gray-300'
                )}
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.signOut')}
                </div>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 