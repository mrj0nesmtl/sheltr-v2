import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Mail, Link as LinkIcon, DollarSign, Calendar } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { ImageUpload } from './ImageUpload';
import { UserBadge } from '../UserBadge/UserBadge';
import { cn } from '../../lib/utils';

export function UserProfile() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<typeof user>>({});

  const isOwnProfile = user?.id === id;

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Show 404 if trying to view someone else's profile
  if (!isOwnProfile) {
    return (
      <div className="min-h-screen pt-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
            <p className="text-gray-300">The requested profile does not exist or you don't have permission to view it.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      // TODO: Implement profile update
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          {/* Profile Section */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              {/* Profile Image */}
              <ImageUpload
                currentImage={user.profileImage}
                onUpload={async (file) => {
                  // TODO: Implement image upload
                  console.log('Upload image:', file);
                }}
                className="mb-4 sm:mb-0"
              />

              {/* Profile Info */}
              <div className="sm:ml-6 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <UserBadge 
                    role={user.role} 
                    verified={user.role === 'shelter_admin' && user.verified}
                  />
                </div>
                <div className="flex items-center justify-center sm:justify-start mt-2 text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* Edit Button */}
              <div className="sm:ml-auto mt-4 sm:mt-0">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Rest of profile content remains the same */}
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
}