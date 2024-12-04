import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { path: '/how-it-works', label: 'nav.howItWorks', icon: 'info' },
  { path: '/solutions', label: 'nav.solutions', icon: 'puzzle' },
  { path: '/scan', label: 'nav.scanDonate', icon: 'qrCode' },
  { path: '/impact', label: 'nav.impact', icon: 'trendingUp' },
  { path: '/about', label: 'nav.about', icon: 'book' }
] as const;

const socialLinks = [
  { name: 'YouTube', url: 'https://www.youtube.com/@ArcanaConcept', icon: 'youtube' },
  { name: 'Podcast', url: 'https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs', icon: 'headphones' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@arcanaconcept', icon: 'tiktok' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/arcana-concept', icon: 'linkedin' },
  { name: 'Website', url: 'https://www.arcanaconcept.com/concepts/sheltr', icon: 'globe2' }
] as const;

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">{t('nav.menu')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <Icon name="x" className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-4">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-800/50 transition-all"
                  onClick={onClose}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                  <span className="text-lg font-medium">{t(item.label)}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="mt-8 space-y-4 px-3">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all transform hover:scale-[1.02]"
              onClick={onClose}
            >
              <Icon name="logIn" className="h-5 w-5" />
              <span className="font-medium">{t('nav.login')}</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center justify-center space-x-2 w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all transform hover:scale-[1.02]"
              onClick={onClose}
            >
              <Icon name="userPlus" className="h-5 w-5" />
              <span className="font-medium">{t('nav.signUp')}</span>
            </Link>
          </div>
        </nav>

        {/* Social Links */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                aria-label={link.name}
              >
                <Icon name={link.icon} className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}