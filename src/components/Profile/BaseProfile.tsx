import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function BaseProfile({ 
  role,
  additionalSections 
}: { 
  role: 'super_admin' | 'shelter_admin' | 'donor' | 'participant',
  additionalSections?: React.ReactNode
}) {
  const { t } = useTranslation();
  const { profile, isLoading } = useProfileStore();
  const { user } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              {profile?.profile_image ? (
                <img 
                  src={profile.profile_image} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Icon name="user" className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {profile?.name}
              </h1>
              <p className="text-indigo-200">{role}</p>
            </div>
          </div>
        </div>

        {/* Common Profile Sections */}
        <div className="p-6 space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold text-white">
                {t('profile.personalInfo')}
              </h2>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">
                    {t('profile.email')}
                  </label>
                  <p className="text-white">{profile?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">
                    {t('profile.joinDate')}
                  </label>
                  <p className="text-white">
                    {new Date(profile?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Role-specific sections */}
          {additionalSections}

          {/* Preferences */}
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold text-white">
                {t('profile.preferences')}
              </h2>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">
                    {t('profile.language')}
                  </label>
                  <select 
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                    value={profile?.preferences?.language || 'en'}
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">
                    {t('profile.theme')}
                  </label>
                  <select 
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                    value={profile?.preferences?.theme || 'system'}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
} 