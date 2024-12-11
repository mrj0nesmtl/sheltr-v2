import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { PodcastPreview } from '@/components/Podcast/PodcastPreview';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

// Constants for social links
const SOCIAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/company/arcana-concept/',
  YOUTUBE: 'https://www.youtube.com/@ArcanaConcept/shorts',
  TIKTOK: 'https://www.tiktok.com/@arcanaconcept',
  WEBSITE: 'https://www.arcanaconcept.com/concepts/sheltr',
  SUBSTACK: 'https://substack.com/@arcanaconcept'
} as const;

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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
      href: SOCIAL_LINKS.LINKEDIN,
      label: t('footer.social.linkedin'),
      icon: 'linkedin' as const 
    },
    { 
      href: SOCIAL_LINKS.YOUTUBE,
      label: t('footer.social.youtube'),
      icon: 'youtube' as const 
    },
    { 
      href: SOCIAL_LINKS.TIKTOK,
      label: t('footer.social.tiktok'),
      icon: 'video' as const 
    },
    { 
      href: SOCIAL_LINKS.WEBSITE,
      label: t('footer.social.website'),
      icon: 'external-link' as const 
    },
    { 
      href: SOCIAL_LINKS.SUBSTACK,
      label: t('footer.social.substack'),
      icon: 'file-text' as const 
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">SHELTR</h3>
            <p className="text-gray-300">{t('footer.tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              {resources.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Podcast Preview */}
          <div>
            <PodcastPreview />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              {t('footer.copyright', { year: currentYear })} {t('footer.rights')}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {socialLinks.map(link => (
                <a
                  key={link.icon}
                  href={link.href}
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <Icon name={link.icon} className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}