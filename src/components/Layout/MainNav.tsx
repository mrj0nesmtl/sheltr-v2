import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export function MainNav() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/how-it-works" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('nav.howItWorks')}
            </Link>
            <Link 
              to="/solutions" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('nav.solutions')}
            </Link>
            <Link 
              to="/scan-donate" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('nav.scanDonate')}
            </Link>
            <Link 
              to="/impact" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t('nav.impact')}
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {t('nav.signUp')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 