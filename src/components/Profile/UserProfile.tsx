import { uploadProfileImage } from '@/lib/services/imageService';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import { useEffect } from 'react';
import { AdminFeatures } from './AdminFeatures';
import { DonorFeatures } from './DonorFeatures';
import { FriendActivity } from './FriendActivity';
import { ImageUpload } from './ImageUpload';
import { ParticipantFeatures } from './ParticipantFeatures';
import { SocialLinks } from './SocialLinks';

export function UserProfile() {
  const { user } = useAuthStore();
  const { profile, fetchProfile, updateProfile } = useProfileStore();

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  }, [user?.id]);

  const handleProfileUpdate = async (data: any) => {
    if (user?.id) {
      await updateProfile(user.id, data);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadProfileImage(file);
      await handleProfileUpdate({ profileImage: imageUrl });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const roleComponents = {
    participant: ParticipantFeatures,
    donor: DonorFeatures,
    admin: AdminFeatures
  };

  const RoleSpecificContent = roleComponents[user?.role as keyof typeof roleComponents];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600" />

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="relative p-6">
            {/* Profile Image */}
            <div className="absolute -top-16 left-6">
              <ImageUpload
                currentImage={profile?.profileImage}
                onUpload={handleImageUpload}
                className="h-32 w-32"
              />
            </div>

            {/* Profile Info */}
            <div className="ml-44">
              <h1 className="text-2xl font-bold text-white">
                {profile?.name || user?.name?.split('+')[0]}
              </h1>
              <p className="text-gray-400">{profile?.role}</p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <SocialLinks links={profile?.socialLinks} />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="border-t border-gray-700 p-6">
            <FriendActivity />
          </div>
        </div>
      </div>

      {/* Role-specific content */}
      {RoleSpecificContent && (
        <div className="mt-8">
          <RoleSpecificContent user={user} />
        </div>
      )}
    </div>
  );
}