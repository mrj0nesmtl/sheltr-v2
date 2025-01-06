import { ArrowRight, BarChart, Heart, Home, QrCode, Shield, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageBackground } from './ui/PageBackground';
import { motion } from 'framer-motion';

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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <Link
                    to="/scan-donate"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-600/50 focus:outline-none transition-all duration-200 ease-in-out"
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    {t('hero.cta.scan')}
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white border-2 border-white/20 rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-white/30 focus:outline-none transition-all duration-200 ease-in-out group"
                  >
                    {t('hero.cta.learnMore')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
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