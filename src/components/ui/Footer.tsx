import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

export function Footer() {
  const { t, i18n } = useTranslation();
  
  // All hooks must be called unconditionally at the top
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Single useEffect to handle both initialization checks
  useEffect(() => {
    if (i18n.isInitialized) {
      setIsReady(true);
      setMounted(true);
    }
  }, [i18n.isInitialized]);

  // Define all data before any conditional returns
  const quickLinks = [
    { path: '/how-it-works', label: t('footer.links.howItWorks') },
    { path: '/solutions', label: t('footer.links.solutions') },
    { path: '/scan', label: t('footer.links.scanDonate') }
  ];

  const resources = [
    { path: '/blog', label: t('footer.links.blog') },
    { path: '/privacy', label: t('footer.links.privacy') },
    { path: '/terms', label: t('footer.links.terms') }
  ];

  const socialLinks = [
    { 
      href: 'https://arcanaconcept.com',
      icon: 'globe',
      label: t('footer.social.website'),
      color: 'hover:text-indigo-400'
    },
    { 
      href: 'https://linkedin.com/company/sheltr',
      icon: 'linkedin',
      label: t('footer.social.linkedin'),
      color: 'hover:text-[#0A66C2]'
    },
    { 
      href: 'https://youtube.com/@arcanaconcept',
      icon: 'youtube',
      label: t('footer.social.youtube'),
      color: 'hover:text-[#FF0000]'
    },
    { 
      href: 'https://open.spotify.com/show/arcanaconcept',
      icon: 'headphones',
      label: t('footer.social.spotify'),
      color: 'hover:text-[#1DB954]'
    },
    { 
      href: 'https://tiktok.com/@arcanaconcept',
      icon: 'video',
      label: t('footer.social.tiktok'),
      color: 'hover:text-[#00F2EA]'
    },
    { 
      href: 'mailto:support@arcanaconcept.com',
      icon: 'mail',
      label: t('footer.social.email'),
      color: 'hover:text-purple-400'
    }
  ];

  // Single conditional return
  if (!isReady || !mounted) {
    return null;
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.tagline')}
            </p>
            
            {/* Podcast Preview */}
            <a
              href="https://open.spotify.com/show/arcanaconcept"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-[#1DB954] transition-colors group"
            >
              <Icon 
                name="headphones" 
                className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" 
              />
              <span className="text-sm">Listen to our latest podcast</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              {resources.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              {t('footer.connect')}
            </h3>
            <div className="space-y-4">
              {/* Social Icons - Single Row with adjusted spacing */}
              <div className="flex items-center space-x-6">
                {socialLinks.map(({ href, icon, label, color }) => (
                  <a
                    key={href}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-gray-400 transition-all duration-200",
                      "hover:scale-110 transform",
                      "hover:-translate-y-0.5",
                      color
                    )}
                  >
                    <Icon name={icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {/* Language Toggle */}
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
                className="flex items-center text-gray-400 hover:text-white transition-colors mt-6"
              >
                <Icon name="globe" className="h-4 w-4 mr-2" />
                <span>{i18n.language === 'en' ? 'Français' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}