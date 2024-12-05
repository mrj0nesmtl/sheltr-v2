import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

const navigationItems = [
  { path: '/how-it-works', label: 'nav.howItWorks', icon: 'helpCircle' },
  { path: '/solutions', label: 'nav.solutions', icon: 'settings' },
  { path: '/scan', label: 'nav.scanDonate', icon: 'qrCode' },
  { path: '/impact', label: 'nav.impact', icon: 'trendingUp' },
  { path: '/about', label: 'nav.about', icon: 'info' }
] as const;

const socialLinks = [
  { name: 'YouTube', url: 'https://www.youtube.com/@ArcanaConcept', icon: 'youtube' },
  { name: 'Podcast', url: 'https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs', icon: 'headphones' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@arcanaconcept', icon: 'tiktok' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/arcana-concept', icon: 'linkedin' },
  { name: 'Website', url: 'https://www.arcanaconcept.com/concepts/sheltr', icon: 'globe' }
] as const;

export function MobileMenu({ isOpen, onClose, isDark = true }: MobileMenuProps) {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    // Add debugging for mobile menu
    console.log('MobileMenu - Current language:', i18n.language);
    console.log('MobileMenu - Nav translations:', i18n.store.data[i18n.language]?.translation?.nav);
  }, [i18n.language]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transform transition-all duration-300 ease-in-out lg:hidden',
        isDark ? 'bg-gray-900' : 'bg-white',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header - Simplified */}
        <div className={cn(
          "flex items-center justify-between px-4 h-16 border-b",
          isDark ? "border-gray-800" : "border-gray-200"
        )}>
          <h2 className={cn(
            "text-lg font-semibold",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {t('nav.menu')}
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-md",
              isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
            )}
            aria-label="Close menu"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links - Better spacing */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 pt-2 pb-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isDark 
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    onClick={onClose}
                  >
                    <Icon name={item.icon} className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium">{t(item.label)}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            <div className="mt-6 px-3">
              <div className="pt-6 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      onClick={onClose}
                    >
                      <Icon name="layoutDashboard" className="h-4 w-4 mr-2" />
                      {t('nav.dashboard')}
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        onClose();
                      }}
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      <Icon name="logout" className="h-4 w-4 mr-2" />
                      {t('nav.signOut')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      onClick={onClose}
                    >
                      <Icon name="login" className="h-4 w-4 mr-2" />
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      onClick={onClose}
                    >
                      <Icon name="userPlus" className="h-4 w-4 mr-2" />
                      {t('nav.signUp')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Social Links - Compact footer */}
        <div className={cn(
          "px-4 py-4 border-t",
          isDark ? "border-gray-800" : "border-gray-200"
        )}>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 rounded-md transition-colors",
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}
                aria-label={link.name}
              >
                <Icon name={link.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}