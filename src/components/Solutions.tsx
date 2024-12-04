import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building, Users, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Solutions() {
  const { t } = useTranslation();

  const renderFeatureList = (features: string[]) => (
    <ul className="space-y-4 text-gray-300">
      {Array.isArray(features) && features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <ArrowRight className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );

  const sections = [
    {
      icon: Building,
      title: t('solutions.sections.shelters.title'),
      features: t('solutions.sections.shelters.features', { returnObjects: true })
    },
    {
      icon: Users,
      title: t('solutions.sections.residents.title'),
      features: t('solutions.sections.residents.features', { returnObjects: true })
    },
    {
      icon: BarChart,
      title: t('solutions.sections.tracking.title'),
      features: t('solutions.sections.tracking.features', { returnObjects: true })
    }
  ];

  const benefits = [
    {
      title: t('solutions.benefits.technology.title'),
      features: t('solutions.benefits.technology.features', { returnObjects: true })
    },
    {
      title: t('solutions.benefits.support.title'),
      features: t('solutions.benefits.support.features', { returnObjects: true })
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="relative flex-grow">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              {t('solutions.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('solutions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sections.map(({ icon: Icon, title, features }) => (
              <div key={title} className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
                <Icon className="h-12 w-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
                {renderFeatureList(features as string[])}
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Partnership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map(({ title, features }) => (
                <div key={title}>
                  <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
                  {renderFeatureList(features as string[])}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('solutions.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {t('solutions.cta.description')}
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
      </div>
    </div>
  );
}