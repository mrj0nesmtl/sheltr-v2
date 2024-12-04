import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrCode, Wallet, Shield, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: QrCode,
      key: 'scan',
      title: t('howItWorks.steps.scan.title'),
      description: t('howItWorks.steps.scan.description')
    },
    {
      icon: Wallet,
      key: 'allocation',
      title: t('howItWorks.steps.allocation.title'),
      description: t('howItWorks.steps.allocation.description')
    },
    {
      icon: Shield,
      key: 'processing',
      title: t('howItWorks.steps.processing.title'),
      description: t('howItWorks.steps.processing.description')
    },
    {
      icon: Home,
      key: 'housing',
      title: t('howItWorks.steps.housing.title'),
      description: t('howItWorks.steps.housing.description')
    }
  ];

  const transparencyFeatures = [
    {
      key: 'blockchain',
      title: t('howItWorks.transparency.blockchain.title'),
      description: t('howItWorks.transparency.blockchain.description')
    },
    {
      key: 'contracts',
      title: t('howItWorks.transparency.contracts.title'),
      description: t('howItWorks.transparency.contracts.description')
    },
    {
      key: 'tracking',
      title: t('howItWorks.transparency.tracking.title'),
      description: t('howItWorks.transparency.tracking.description')
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="relative flex-grow">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-gray-300">{description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              {t('howItWorks.transparency.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transparencyFeatures.map(({ key, title, description }) => (
                <div key={key}>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-gray-300">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('howItWorks.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {t('howItWorks.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup/donor"
                className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Become a Donor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup/shelter"
                className="inline-flex items-center px-8 py-3 border border-white text-lg font-medium rounded-md text-white hover:bg-white/10"
              >
                Partner with Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}