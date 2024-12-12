import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../ui/Logo';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-gray-400">{t('footer.tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white">
                  {t('footer.links.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-gray-400 hover:text-white">
                  {t('footer.links.solutions')}
                </Link>
              </li>
              <li>
                <Link to="/scan-donate" className="text-gray-400 hover:text-white">
                  {t('footer.links.scanDonate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  {t('footer.links.blog')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  {t('footer.links.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  {t('footer.links.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.connect')}</h3>
            <div className="space-y-4">
              {/* Social Links */}
              <div className="flex space-x-4">
                {/* Add social icons/links here */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} SHELTR. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
} 