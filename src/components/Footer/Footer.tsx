import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { PodcastPreview } from '@/components/PodcastPreview/PodcastPreview';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useState, useEffect } from 'react';

interface FooterProps {
  isDark?: boolean;
}

export function Footer({ isDark = true }: FooterProps) {
  const { t, i18n } = useTranslation();
  const [showPodcast, setShowPodcast] = useState(false);
  
  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/@ArcanaConcept', icon: 'youtube' as const },
    { name: 'Podcast', url: 'https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs', icon: 'headphones' as const },
    { name: 'TikTok', url: 'https://www.tiktok.com/@arcanaconcept', icon: 'tiktok' as const },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/arcana-concept', icon: 'linkedin' as const },
    { name: 'Website', url: 'https://www.arcanaconcept.com/concepts/sheltr', icon: 'globe' as const }
  ] as const;

  // Add debug logging
  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('All translations:', i18n.store.data);
    console.log('FR translations:', i18n.store.data.fr?.translation);
    console.log('Footer structure:', {
      blockchain: i18n.store.data.fr?.translation?.footer?.blockchain,
      links: i18n.store.data.fr?.translation?.footer?.links,
    });
  }, [i18n.language]);

  return (
    <footer className="bg-gray-900 sticky bottom-0 w-full z-50 border-t border-gray-800">
      {/* Main Content - Made more compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Brand Column - First */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-lg font-bold text-white">SHELTR</h2>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              {t('footer.tagline')}
            </p>
            
            {/* Podcast Preview Button */}
            <button
              onClick={() => setShowPodcast(true)}
              className="mt-4 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="headphones" className="h-5 w-5 mr-2" />
              <span>Latest Episode</span>
            </button>

            {/* Social Links */}
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name={link.icon} className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column - Second */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.solutions')}
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.scanDonate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Blockchain Column - Now in the middle */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t('footer.blockchain')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link to="/token" className="text-gray-400 hover:text-white transition-colors">
                  $SHELTR
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.verify')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column - Now on the right */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {t('footer.resources')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.blog')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - More compact */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <LanguageSwitcher />
            <div className="text-sm text-gray-400">
              © 2024 SHELTR. {t('footer.rights')}
            </div>
          </div>
        </div>
      </div>

      {/* Podcast Preview Modal */}
      {showPodcast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">Latest Episode</h3>
              <button
                onClick={() => setShowPodcast(false)}
                className="text-gray-400 hover:text-white"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>
            <PodcastPreview
              url="https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs"
              title="SHELTR: Tech for Good"
              duration="Latest Episode • 28:45"
            />
          </div>
        </div>
      )}
    </footer>
  );
} 