import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { PodcastPreview } from '@/components/PodcastPreview/PodcastPreview';

const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@ArcanaConcept',
    icon: 'youtube',
    ariaLabel: 'footer.social.youtube'
  },
  {
    name: 'Podcast',
    url: 'https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs',
    rss: '',
    icon: 'headphones',
    ariaLabel: 'footer.social.podcast'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@arcanaconcept',
    icon: 'tiktok',
    ariaLabel: 'footer.social.tiktok'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/arcana-concept',
    icon: 'linkedin',
    ariaLabel: 'footer.social.linkedin'
  },
  {
    name: 'Arcana Concept',
    url: 'https://www.arcanaconcept.com/concepts/sheltr',
    icon: 'globe2',
    ariaLabel: 'footer.social.website'
  },
] as const;

const footerLinks = {
  quickLinks: [
    { key: 'howItWorks', path: '/how-it-works', label: 'nav.howItWorks' },
    { key: 'solutions', path: '/solutions', label: 'nav.solutions' },
    { key: 'scanDonate', path: '/scan', label: 'nav.scanDonate' },
    { key: 'about', path: '/about', label: 'nav.about' }
  ],
  resources: [
    { key: 'blog', path: '/blog', label: 'footer.blog' },
    { key: 'privacy', path: '/privacy', label: 'footer.privacy' },
    { key: 'terms', path: '/terms', label: 'footer.terms' }
  ]
};

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
              {footerLinks.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.connect')}</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
                    aria-label={t(link.ariaLabel)}
                  >
                    <Icon 
                      name={link.icon} 
                      className="h-6 w-6" 
                    />
                  </a>
                  {link.name === 'Podcast' && <PodcastPreview />}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a 
                href="mailto:support@arcanaconcept.com" 
                className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center"
              >
                <Icon name="mail" className="h-4 w-4 mr-2" />
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
              {t('footer.language')}
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