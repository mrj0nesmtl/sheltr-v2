import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { 
  Youtube, 
  Linkedin, 
  BookOpen, 
  Newspaper,
  Music,
  Video
} from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Youtube className="h-5 w-5" />,
      url: 'https://youtube.com/@ArcanaConcept/shorts',
      label: t('nav.footer.social.youtube')
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://www.linkedin.com/company/arcana-concept/',
      label: t('nav.footer.social.linkedin')
    },
    {
      icon: <Video className="h-5 w-5" />,
      url: 'https://www.tiktok.com/@arcanaconcept',
      label: t('nav.footer.social.tiktok')
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      url: 'https://www.arcanaconcept.com/blog',
      label: t('nav.footer.social.website')
    },
    {
      icon: <Newspaper className="h-5 w-5" />,
      url: 'https://substack.com/@arcanaconcept',
      label: t('nav.footer.social.substack')
    },
    {
      icon: <Music className="h-5 w-5" />,
      url: 'https://open.spotify.com/playlist/2OOwTrX6t82bCjAB0dSGYs',
      label: t('nav.footer.podcast.listenOn')
    }
  ];

  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo className="h-8 w-auto" />
            <p className="text-gray-400 text-sm">
              {t('nav.footer.tagline')}
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-white font-medium mb-3">
              {t('nav.solutions_menu.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/how-it-works" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.footer.links.howItWorks')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.footer.links.solutions')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/scan-donate" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.footer.links.scanDonate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-medium mb-3">
              {t('nav.company_menu.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.company_menu.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.company_menu.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Blockchain Links */}
          <div>
            <h3 className="text-white font-medium mb-3">
              {t('nav.blockchain.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/whitepaper" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.blockchain.menu.whitepaper')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/transactions" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('nav.blockchain.menu.transactions')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} SHELTR
          </p>
        </div>
      </div>
    </footer>
  );
}