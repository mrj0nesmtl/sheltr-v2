import { memo, useState, useMemo, useCallback } from 'react';
import { mainNavigation } from '@/lib/navigation/config';
import { Menu, LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { cn } from '@/lib/utils';

export const Navigation = memo(() => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Memoize dashboard path
  const dashboardPath = useMemo(() => 
    user?.role ? getDashboardPath(user.role) : '/',
    [user?.role]
  );

  // Memoize mobile menu handler
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Memoize navigation items
  const navigationLinks = useMemo(() => 
    mainNavigation.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium"
      >
        {item.icon && (
          <item.icon 
            className={cn(
              "w-4 h-4",
              item.path === '/how-it-works' && "text-blue-400 group-hover:text-blue-300",
              item.path === '/solutions' && "text-purple-400 group-hover:text-purple-300",
              item.path === '/scan-and-donate' && "text-emerald-400 group-hover:text-emerald-300",
              item.path === '/impact' && "text-amber-400 group-hover:text-amber-300",
              item.path === '/about' && "text-rose-400 group-hover:text-rose-300",
              item.iconClassName
            )} 
          />
        )}
        {t(item.label)}
      </Link>
    )),
    [t]
  );

  // Memoize auth buttons
  const authButtons = useMemo(() => 
    isAuthenticated ? (
      <Link to={dashboardPath}>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {t('nav.dashboard')}
        </Button>
      </Link>
    ) : (
      <>
        <Link to="/login">
          <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            {t('nav.login')}
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            {t('nav.signUp')}
          </Button>
        </Link>
      </>
    ),
    [isAuthenticated, dashboardPath, t]
  );

  // Memoize mobile menu items
  const mobileMenu = useMemo(() => 
    isMobileMenuOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              {item.icon && (
                <item.icon 
                  className={cn(
                    "w-4 h-4",
                    item.path === '/how-it-works' && "text-blue-400",
                    item.path === '/solutions' && "text-purple-400",
                    item.path === '/scan-and-donate' && "text-emerald-400",
                    item.path === '/impact' && "text-amber-400",
                    item.path === '/about' && "text-rose-400"
                  )}
                />
              )}
              {t(item.label)}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="block px-3 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                onClick={toggleMobileMenu}
              >
                {t('nav.dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                  onClick={toggleMobileMenu}
                >
                  <LogIn className="w-4 h-4" />
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-3 py-2 mt-1 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  onClick={toggleMobileMenu}
                >
                  <UserPlus className="w-4 h-4" />
                  {t('nav.signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    ),
    [isMobileMenuOpen, t, isAuthenticated, dashboardPath, toggleMobileMenu]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {authButtons}
          </div>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
});

Navigation.displayName = 'Navigation';