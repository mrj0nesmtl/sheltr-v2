import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { BaseProfile } from '@/components/Profile/BaseProfile';
import { useProfileStore } from '@/stores/profileStore';

export function DonorProfile() {
  const { t } = useTranslation();
  const { profile } = useProfileStore();

  const DonorSections = () => (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold text-white">
            {t('donor.profile.donationHistory')}
          </h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">
                  {t('donor.profile.totalDonated')}
                </label>
                <p className="text-2xl font-bold text-white">
                  ${profile?.donor_stats?.total_donated || 0}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">
                  {t('donor.profile.impactScore')}
                </label>
                <p className="text-2xl font-bold text-emerald-400">
                  {profile?.donor_stats?.impact_score || 0}
                </p>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </>
  );

  return <BaseProfile role="donor" additionalSections={<DonorSections />} />;
} 