import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { TransactionList } from '@/components/Transactions/TransactionList';
import { CustomerSupport } from '@/components/CustomerSupport';
import { ImageUpload } from '@/components/ui/ImageUpload';

export function UserProfile() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile image handling
  const handleProfileImageSave = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profile_image', file);
      
      const response = await fetch(`/api/users/${user?.id}/profile-image`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to upload image');
      
      // Update local user state with new image URL
      const { imageUrl } = await response.json();
      // Update user profile image in state
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-indigo-600 to-purple-600">
        <button 
          className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          onClick={() => setIsEditing(true)}
        >
          <Icon name="camera" className="h-5 w-5" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="relative">
          {/* Profile Image */}
          <div className="absolute -top-16 left-4">
            <div className="relative">
              <ImageUpload
                currentImage={user?.profileImage}
                onSave={handleProfileImageSave}
                className="h-32 w-32 rounded-full border-4 border-gray-900 bg-gray-800"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="ml-40 pt-4">
            <h1 className="text-2xl font-bold text-white">
              {user?.name || 'Anonymous User'}
            </h1>
            <p className="text-gray-400">{user?.email}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400">
                {t(`roles.${user?.role}`)}
              </span>
              {user?.verified && (
                <span className="inline-flex items-center text-green-400">
                  <Icon name="checkCircle" className="h-4 w-4 mr-1" />
                  {t('profile.verified')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Transactions */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {t('profile.recentTransactions')}
              </h2>
              <TransactionList userId={user?.id} limit={5} />
            </div>

            {/* Activity Feed or Other Sections */}
            {/* Add more sections as needed */}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats Card */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                {t('profile.stats')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {user?.totalDonations || 0}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t('profile.totalDonations')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    ${user?.totalAmount || 0}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t('profile.totalAmount')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support CTA */}
        <div className="mt-12 mb-8">
          <CustomerSupport />
        </div>
      </div>
    </div>
  );
}