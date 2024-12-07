import React from 'react';
import { DonationTrends } from './DonationTrends';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function PublicDashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: 'home',
      value: '15',
      label: 'Participants Housed',
      color: 'text-indigo-500'
    },
    {
      icon: 'mapPin',
      value: '3',
      label: 'Cities & Towns',
      color: 'text-green-500'
    },
    {
      icon: 'trendingUp',
      value: '12%',
      label: 'Increase in Donations',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 flex items-center"
          >
            <div className={`rounded-full p-3 ${stat.color} bg-opacity-10 mr-4`}>
              <Icon name={stat.icon} className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <DonationTrends />
    </div>
  );
}