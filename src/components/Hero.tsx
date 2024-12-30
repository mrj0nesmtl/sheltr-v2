import { ArrowRight, BarChart, Heart, Home, QrCode, Shield, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageBackground } from './ui/PageBackground';

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="relative flex-1">
        <PageBackground
          imagePath="/images/backgrounds/hero-bg.jpg"
          alt={t('hero.backgroundAlt')}
          opacity={20}
          overlay={true}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/scan-donate"
                className="rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {t('hero.cta.scan')}
              </Link>
              <Link
                to="/how-it-works"
                className="text-lg font-semibold leading-6 text-white hover:text-indigo-200"
              >
                {t('hero.cta.learnMore')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Heart className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('hero.features.impact.title')}</h3>
              <p className="text-gray-300">{t('hero.features.impact.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Wallet className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('hero.features.allocation.title')}</h3>
              <p className="text-gray-300">{t('hero.features.allocation.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Home className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('hero.features.housing.title')}</h3>
              <p className="text-gray-300">{t('hero.features.housing.description')}</p>
            </div>
          </div>

          {/* Technology Features */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <QrCode className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('hero.features.qr.title')}</h3>
              <p className="text-gray-300">{t('hero.features.qr.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Shield className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('hero.features.security.title')}</h3>
              <p className="text-gray-300">{t('hero.features.security.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <BarChart className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('hero.features.tracking.title')}</h3>
              <p className="text-gray-300">{t('hero.features.tracking.description')}</p>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('hero.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {t('hero.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {t('common.cta.becomeDonor')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center px-8 py-3 border border-white text-lg font-medium rounded-md text-white hover:bg-white/10"
              >
                {t('common.cta.partnerWithUs')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}