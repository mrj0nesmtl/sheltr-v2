import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { SignOutButton } from '@/components/ui/SignOutButton';

export function DonorDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Format currency helper
  const formatCurrency = (amount: number = 0) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <SignOutButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {t('dashboard.donor.title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Donated Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Icon name="dollarSign" className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('dashboard.totalDonated')}</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(user?.totalDonated)}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Score Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Icon name="heart" className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('dashboard.impactScore')}</p>
                <p className="text-2xl font-bold text-white">
                  {user?.impactScore?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>

          {/* Total Donations Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Icon name="barChart" className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('dashboard.totalDonations')}</p>
                <p className="text-2xl font-bold text-white">
                  {user?.totalDonations?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 