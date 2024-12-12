import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import { 
  Info, 
  Lightbulb, 
  QrCode, 
  BarChart3, 
  LogOut 
} from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { t } = useTranslation();

  const mainNavItems = [
    { 
      label: t('nav.howItWorks'), 
      path: '/how-it-works',
      icon: <Info className="w-4 h-4" />
    },
    { 
      label: t('nav.solutions'), 
      path: '/solutions',
      icon: <Lightbulb className="w-4 h-4" />
    },
    { 
      label: t('nav.scanDonate'), 
      path: '/scan-donate',
      icon: <QrCode className="w-4 h-4" />
    },
    { 
      label: t('nav.impact'), 
      path: '/impact',
      icon: <BarChart3 className="w-4 h-4" />
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-b border-gray-800 z-50">
      <div className="h-16 px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo with both text and icon */}
        <Link 
          to="/" 
          className="flex-shrink-0 flex items-center space-x-2"
          aria-label="SHELTR Home"
        >
          <img 
            src="/images/icon.svg" 
            alt="" 
            className="h-8 w-8"
            aria-hidden="true"
          />
          <img 
            src="/images/logo.svg" 
            alt="SHELTR" 
            className="h-6 w-auto hidden sm:block"
          />
        </Link>

        {/* Rest of the header remains the same */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                {t('nav.signUp')}
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                {user.name || user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 text-gray-300 hover:text-white text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('common.signOut')}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-gray-800">
        <div className="flex justify-around px-2 py-3">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white"
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}