import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface Donor {
  id: string;
  name: string;
  email: string;
  totalDonated: number;
  lastDonation: Date;
  frequency: 'one-time' | 'monthly' | 'quarterly';
  status: 'active' | 'inactive';
}

interface DonorListProps {
  donors: Donor[];
  onViewDetails: (id: string) => void;
}

export function DonorList({ donors, onViewDetails }: DonorListProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">
          {t('admin.shelter.donors.title')}
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Icon name="download" className="h-4 w-4 mr-2" />
            {t('admin.shelter.donors.export')}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="pb-4">{t('admin.shelter.donors.name')}</th>
              <th className="pb-4">{t('admin.shelter.donors.totalDonated')}</th>
              <th className="pb-4">{t('admin.shelter.donors.lastDonation')}</th>
              <th className="pb-4">{t('admin.shelter.donors.frequency')}</th>
              <th className="pb-4">{t('admin.shelter.donors.status')}</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border-t border-gray-700/50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center">
                      {donor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{donor.name}</div>
                      <div className="text-sm text-gray-400">{donor.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-300">
                  ${donor.totalDonated.toLocaleString()}
                </td>
                <td className="py-4 text-gray-300">
                  {new Date(donor.lastDonation).toLocaleDateString()}
                </td>
                <td className="py-4">
                  <span className="text-gray-300">
                    {t(`admin.shelter.donors.frequencies.${donor.frequency}`)}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    donor.status === 'active' 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {t(`admin.shelter.donors.statuses.${donor.status}`)}
                  </span>
                </td>
                <td className="py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(donor.id)}
                  >
                    <Icon name="eye" className="h-4 w-4 mr-2" />
                    {t('admin.shelter.donors.viewDetails')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 