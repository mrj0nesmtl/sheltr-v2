import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from '@/components/ui/QRCode';

export function ParticipantProfile({ participant }) {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {participant.firstName} {participant.lastName}
              </h1>
              <p className="text-indigo-200">ID: {participant.id}</p>
            </div>
            <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-lg">
              <QRCode
                value={participant.qrCode}
                size={112}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('participant.profile.personalInfo')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Add profile fields */}
            </div>
          </section>

          {/* Services & Progress */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('participant.profile.services')}
            </h2>
            {/* Add services and progress information */}
          </section>
        </div>
      </div>
    </div>
  );
}