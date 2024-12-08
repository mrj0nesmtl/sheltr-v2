import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function SignUpSelector() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              {t('signUp.title')}
            </h1>
            <p className="mt-3 text-xl text-gray-300">
              {t('signUp.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Donor Card */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-indigo-500 transition-colors">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-500/10 mb-6">
                <Icon name="heart" className="h-8 w-8 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                {t('signUp.donor.title')}
              </h2>
              <p className="text-gray-300 mb-8">
                {t('signUp.donor.description')}
              </p>
              <Link
                to="/signup/donor"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {t('common.cta.getStarted')}
              </Link>
            </div>

            {/* Shelter Card */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-colors">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-green-500/10 mb-6">
                <Icon name="building" className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                {t('signUp.shelter.title')}
              </h2>
              <p className="text-gray-300 mb-8">
                {t('signUp.shelter.description')}
              </p>
              <Link
                to="/signup/shelter"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('common.cta.partnerNow')}
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              {t('signUp.haveAccount')}{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
                {t('signUp.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}