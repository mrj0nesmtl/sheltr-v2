import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  icon: IconName;
  color: string;
}

export function Hero() {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      title: 'QR Technology',
      description: t('hero.qrTechnology'),
      icon: 'qrCode' as const,
      color: 'bg-purple-500'
    },
    {
      title: 'Direct Impact',
      description: t('hero.directImpact'),
      icon: 'heart' as const,
      color: 'bg-rose-500'
    },
    {
      title: 'Smart Allocation',
      description: t('hero.smartAllocation'),
      icon: 'wallet' as const,
      color: 'bg-emerald-500'
    },
    {
      title: 'Housing Focus',
      description: t('hero.housingFocus'),
      icon: 'home' as const,
      color: 'bg-blue-500'
    },
    {
      title: 'Blockchain Security',
      description: t('hero.blockchainSecurity'),
      icon: 'shield' as const,
      color: 'bg-indigo-500'
    },
    {
      title: 'Impact Tracking',
      description: t('hero.impactTracking'),
      icon: 'lineChart' as const,
      color: 'bg-cyan-500'
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(17, 24, 39, 0.9),
              rgba(17, 24, 39, 0.7)
            ),
            url('/images/hero-bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 space-y-12 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {t('hero.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            {t('hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/scan"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Icon name="qrCode" className="mr-2 h-5 w-5" />
              {t('hero.scanDonate')}
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            >
              {t('hero.learnMore')}
              <Icon name="arrowRight" className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-800/70 transition-colors group"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-lg" />
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "p-2 rounded-lg bg-gray-900/50 ring-1 ring-white/10 group-hover:ring-white/20 transition-all",
                  feature.color
                )}>
                  <Icon name={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-white/90">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-300 group-hover:text-gray-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          
          <h2 className="relative text-2xl font-bold text-white mb-4">
            {t('hero.joinMovement')}
          </h2>
          <p className="relative text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('hero.joinDescription')}
          </p>
          <div className="relative flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <Icon name="userPlus" className="h-5 w-5" />
                <span>{t('hero.becomeDonor')}</span>
              </span>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <Icon name="handshake" className="h-5 w-5" />
                <span>{t('hero.partnerWithUs')}</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 