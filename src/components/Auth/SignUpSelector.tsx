import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export function SignUpSelector() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            {t('signUp.title')}
          </h1>
          <p className="text-xl text-gray-300">
            {t('signUp.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donor Sign Up Option */}
          <Link
            to="/signup/donor"
            className={cn(
              "bg-white/10 backdrop-blur-lg rounded-xl p-8",
              "hover:bg-white/15 transition-colors",
              "flex flex-col items-center text-center"
            )}
          >
            <Icon name="heart" className="h-16 w-16 text-indigo-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('signUp.donor.title')}
            </h2>
            <p className="text-gray-300 mb-6">
              {t('signUp.donor.description')}
            </p>
            <span className="inline-flex items-center text-indigo-400">
              {t('common.cta.getStarted')} <Icon name="arrowRight" className="ml-2 h-5 w-5" />
            </span>
          </Link>

          {/* Shelter Admin Sign Up Option */}
          <Link
            to="/signup/shelter"
            className={cn(
              "bg-white/10 backdrop-blur-lg rounded-xl p-8",
              "hover:bg-white/15 transition-colors",
              "flex flex-col items-center text-center"
            )}
          >
            <Icon name="building2" className="h-16 w-16 text-indigo-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('signUp.shelter.title')}
            </h2>
            <p className="text-gray-300 mb-6">
              {t('signUp.shelter.description')}
            </p>
            <span className="inline-flex items-center text-indigo-400">
              {t('common.cta.partnerNow')} <Icon name="arrowRight" className="ml-2 h-5 w-5" />
            </span>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            {t('signUp.haveAccount')}{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
              {t('signUp.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}