import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { 
  Youtube, 
  Linkedin, 
  BookOpen, 
  Newspaper,
  Music,
  Video,
  Github
} from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Youtube className="h-5 w-5" />,
      url: 'https://youtube.com/@ArcanaConcept/shorts',
      label: t('nav.footer.social.youtube'),
      hoverColor: 'hover:text-red-500'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://www.linkedin.com/company/arcana-concept/',
      label: t('nav.footer.social.linkedin'),
      hoverColor: 'hover:text-blue-500'
    },
    {
      icon: <Video className="h-5 w-5" />,
      url: 'https://www.tiktok.com/@arcanaconcept',
      label: t('nav.footer.social.tiktok'),
      hoverColor: 'hover:text-pink-500'
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      url: 'https://www.arcanaconcept.com/blog',
      label: t('nav.footer.social.website'),
      hoverColor: 'hover:text-purple-500'
    },
    {
      icon: <Newspaper className="h-5 w-5" />,
      url: 'https://substack.com/@arcanaconcept',
      label: t('nav.footer.social.substack'),
      hoverColor: 'hover:text-emerald-500'
    },
    {
      icon: <Music className="h-5 w-5" />,
      url: 'https://open.spotify.com/show/3Q2RpnzF9sUv26yPMP9tWI',
      label: t('nav.footer.podcast.listenOn'),
      hoverColor: 'hover:text-green-500'
    }
  ];

  const linkStyles = {
    theHack: "text-gray-400 hover:text-indigo-400 transition-colors duration-200",
    operations: "text-gray-400 hover:text-cyan-400 transition-colors duration-200",
    blockchain: "text-gray-400 hover:text-purple-400 transition-colors duration-200"
  };

  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Logo className="h-8 w-auto" />
            <p className="text-gray-400 text-sm">
              {t('nav.footer.tagline')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-200 ${link.hoverColor}`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">
              The Hack
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className={linkStyles.theHack}>
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/solutions" className={linkStyles.theHack}>
                  Our Solution
                </Link>
              </li>
              <li>
                <Link to="/scan-donate" className={linkStyles.theHack}>
                  Scan Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">
              Operations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={linkStyles.operations}>
                  Whois
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/mrj0nesmtl/sheltr-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkStyles.operations} inline-flex items-center gap-1`}
                >
                  Github <Github className="h-4 w-4" />
                </a>
              </li>
              <li>
                <Link to="/blog" className={linkStyles.operations}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">
              Blockchain
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/whitepaper" className={linkStyles.blockchain}>
                  Sheltr Whitepaper
                </Link>
              </li>
              <li>
                <Link to="/token" className={linkStyles.blockchain}>
                  $SHELTR
                </Link>
              </li>
              <li>
                <Link to="/transactions" className={linkStyles.blockchain}>
                  Transactions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} SHELTR
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/wiki" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            📚 Project Wiki
          </Link>
        </div>
      </div>
    </footer>
  );
}