import { useAuth } from '@/hooks/useAuth';
import { Dialog, Transition } from '@headlessui/react';
import { 
  X,
  HelpCircle,
  Info,
  QrCode,
  BarChart3,
  FileText,
  Link as LinkIcon,
  Activity,
  Wallet,
  Home,
  LogIn,
  UserPlus,
  User
} from 'lucide-react';
import { Fragment, useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Button } from '../ui/Button';
import { SignOutButton } from '../ui/SignOutButton';

// Move navigation items outside component to prevent recreation
const publicNavItems = [
  { path: '/how-it-works', label: 'nav.howItWorks', icon: HelpCircle },
  { path: '/solutions', label: 'nav.solutions', icon: Home },
  { path: '/scan-donate', label: 'nav.scanDonate', icon: QrCode },
  { path: '/impact', label: 'nav.impact', icon: BarChart3 },
  { path: '/about', label: 'nav.about', icon: Info }
] as const;

const blockchainNavItems = [
  { path: '/whitepaper', label: 'nav.whitepaper', icon: FileText },
  { path: '/token', label: 'nav.token', icon: LinkIcon },
  { path: '/transactions', label: 'nav.transactions', icon: Activity },
  { path: '/depot', label: 'nav.depot', icon: Wallet }
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = memo(({ isOpen, onClose }: MobileNavProps) => {
  const { t } = useTranslation('translation', { 
    keyPrefix: 'nav',
    returnObjects: true 
  });
  const { user, isAuthenticated } = useAuth();

  // Memoize navigation links
  const publicNavLinks = useMemo(() => (
    <div className="space-y-1">
      {publicNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
          onClick={onClose}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          <span>{t(item.label)}</span>
        </Link>
      ))}
    </div>
  ), [t, onClose]);

  // Memoize blockchain links
  const blockchainLinks = useMemo(() => (
    <div className="space-y-1">
      <h3 className="px-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        {t('blockchain')}
      </h3>
      {blockchainNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
          onClick={onClose}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          <span>{t(item.label)}</span>
        </Link>
      ))}
    </div>
  ), [t, onClose]);

  // Memoize auth section
  const authSection = useMemo(() => (
    <div className="mt-auto border-t border-gray-800 px-4 py-6">
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-gray-800 rounded text-xs text-gray-400">
          Auth: {isAuthenticated ? 'Yes' : 'No'}
          <br />
          Role: {user?.role || 'None'}
        </div>
      )}

      {!isAuthenticated ? (
        <div className="space-y-3">
          <Link to="/login" className="flex justify-center w-full" onClick={onClose}>
            <Button variant="primary" className="w-full flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              {t('login')}
            </Button>
          </Link>
          <Link to="/signup" className="flex justify-center w-full" onClick={onClose}>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              {t('signUp')}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <Link
            to="/profile"
            className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
            onClick={onClose}
          >
            <User className="h-5 w-5 flex-shrink-0" />
            <span>{t('profile')}</span>
          </Link>
          
          <SignOutButton 
            variant="menu"
            onSignOutComplete={onClose}
          />
        </div>
      )}
    </div>
  ), [isAuthenticated, user?.role, t, onClose]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-900 pb-12 shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <Logo className="h-8 w-auto" />
                <button
                  type="button"
                  className="text-gray-400 hover:text-white"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 px-4 py-6 space-y-6">
                {publicNavLinks}
                {blockchainLinks}
                <div className="px-3">
                  <LanguageToggle />
                </div>
              </div>

              {authSection}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

MobileNav.displayName = 'MobileNav'; 