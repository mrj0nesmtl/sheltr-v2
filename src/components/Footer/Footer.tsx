import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PodcastPreview } from '../Podcast/PodcastPreview';

export function Footer() {
  const { t } = useTranslation();

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
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white">
                  {t('nav.solutions_menu.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-gray-300 hover:text-white">
                  {t('nav.solutions_menu.solutions')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-white">
                  {t('nav.solutions_menu.impact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  {t('footer.terms')}
                </Link>
              </li>
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
              © {new Date().getFullYear()} SHELTR. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                {t('footer.social.linkedin')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                {t('footer.social.youtube')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                {t('footer.social.tiktok')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 