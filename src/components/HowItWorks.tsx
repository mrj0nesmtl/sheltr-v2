import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { QrCode, Wallet, Shield, Home, ArrowRight } from 'lucide-react';

const STEP_ICONS = {
  scan: QrCode,
  allocation: Wallet,
  processing: Shield,
  housing: Home
} as const;

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('howItWorks.steps.scan.title'),
      description: t('howItWorks.steps.scan.description'),
      icon: 'scan'
    },
    {
      title: t('howItWorks.steps.allocation.title'),
      description: t('howItWorks.steps.allocation.description'),
      icon: 'allocation'
    },
    {
      title: t('howItWorks.steps.processing.title'),
      description: t('howItWorks.steps.processing.description'),
      icon: 'processing'
    },
    {
      title: t('howItWorks.steps.housing.title'),
      description: t('howItWorks.steps.housing.description'),
      icon: 'housing'
    }
  ] as const;

  return (
    <div className="space-y-16">
      {/* Steps Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-white"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mr-4">
                  <Icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-300">{step.description}</p>
            </div>
          );
        })}
      </div>

      {/* Transparency Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          {t('howItWorks.transparency.title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">
              {t('howItWorks.transparency.blockchain.title')}
            </h3>
            <p className="text-gray-300">
              {t('howItWorks.transparency.blockchain.description')}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">
              {t('howItWorks.transparency.contracts.title')}
            </h3>
            <p className="text-gray-300">
              {t('howItWorks.transparency.contracts.description')}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">
              {t('howItWorks.transparency.tracking.title')}
            </h3>
            <p className="text-gray-300">
              {t('howItWorks.transparency.tracking.description')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t('howItWorks.cta.title')}
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          {t('howItWorks.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup/donor"
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {t('common.cta.becomeDonor')} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/signup/shelter"
            className="inline-flex items-center px-8 py-3 border border-white text-lg font-medium rounded-md text-white hover:bg-white/10"
          >
            {t('common.cta.partnerWithUs')} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}