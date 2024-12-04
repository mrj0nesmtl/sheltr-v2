import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavigationItems } from '../Navigation/NavigationItems';
import { MobileMenu } from '../Navigation/MobileMenu';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Logo } from '../Logo';
import { Icon } from '@/components/ui/Icon';

export function AuthLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Fixed Header */}
      <nav className="bg-gray-800/50 backdrop-blur-lg fixed w-full z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo className="text-white" />
            </div>

            <NavigationItems />

            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <NavigationItems
                mobile
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
            </MobileMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo className="text-white h-6" />
              </div>
              <p className="text-gray-300">{t('common.tagline')}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/how-it-works" className="text-gray-300 hover:text-white">
                    {t('footer.links.howItWorks')}
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="text-gray-300 hover:text-white">
                    {t('footer.links.solutions')}
                  </Link>
                </li>
                <li>
                  <Link to="/scan" className="text-gray-300 hover:text-white">
                    {t('footer.links.scanDonate')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {t('footer.resources')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white">
                    {t('footer.links.blog')}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white">
                    {t('footer.links.privacy')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white">
                    {t('footer.links.terms')}
                  </Link>
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {t('footer.connect')}
              </h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <Icon name="facebook" className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Icon name="twitter" className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Icon name="instagram" className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Icon name="linkedin" className="h-6 w-6" />
                </a>
              </div>
              <a href="mailto:support@arcanaconcept.com" className="text-gray-300 hover:text-white">
                support@arcanaconcept.com
              </a>
            </div>
          </div>

          <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}