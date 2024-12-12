import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { QRCode } from '@/components/ui/QRCode';
import { BaseProfile } from '@/components/Profile/BaseProfile';
import { useProfileStore } from '@/stores/profileStore';

export function ParticipantProfile() {
  const { t } = useTranslation();
  const { profile } = useProfileStore();

  const ParticipantSections = () => (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold text-white">
            {t('participant.profile.qrCode')}
          </h2>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-lg">
              <QRCode
                value={profile?.qr_code}
                size={168}
                className="w-full h-full"
              />
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold text-white">
            {t('participant.profile.progress')}
          </h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">
                {t('participant.profile.housingStatus')}
              </label>
              <p className="text-white">{profile?.housing_status}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">
                {t('participant.profile.employmentStatus')}
              </label>
              <p className="text-white">{profile?.employment_status}</p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </>
  );

  return <BaseProfile role="participant" additionalSections={<ParticipantSections />} />;
} 