import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <footer className="bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="text-white text-xl font-bold">SHELTR</Link>
            <p className="mt-2 text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-white">{t('nav.solutions')}</Link></li>
              <li><Link to="/scan" className="text-gray-400 hover:text-white">{t('nav.scanDonate')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white">{t('footer.blog')}</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">{t('footer.terms')}</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.connect')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="instagram" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="linkedin" className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <a href="mailto:support@arcanaconcept.com" className="text-gray-400 hover:text-white text-sm">
                support@arcanaconcept.com
              </a>
            </div>
          </div>
        </div>

        {/* Language and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="text-gray-400 hover:text-white flex items-center transition-colors"
            >
              <Icon name="globe" className="h-5 w-5 mr-2" />
              {i18n.language === 'en' ? 'Français' : 'English'}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            © {currentYear} SHELTR. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
} 