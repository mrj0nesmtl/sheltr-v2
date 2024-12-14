import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../ui/Logo';
import { LanguageToggle } from '../ui/LanguageToggle';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-gray-400">{t('common.tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.solutions_menu.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.solutions_menu.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.solutions_menu.solutions')}
                </Link>
              </li>
              <li>
                <Link to="/scan-donate" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.scanDonate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.company_menu.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.company_menu.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.company_menu.blog')}
                </Link>
              </li>
              <li>
                <LanguageToggle className="footer-link text-gray-400 hover:text-white" />
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.blockchain.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/whitepaper" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.blockchain.menu.whitepaper')}
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="footer-link text-gray-400 hover:text-white">
                  {t('nav.blockchain.menu.transactions')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} SHELTR. {t('nav.footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
} 