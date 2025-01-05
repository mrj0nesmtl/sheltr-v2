import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardShell } from '@/layouts/dashboard/shared/DashboardShell';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { DonationHistory } from '@/features/shared/analytics/DonationHistory';
import { DonorStats } from '@/features/shared/analytics/DonorStats';
import { MapComponent } from '@/components/ui/Charts/MapComponent';
import { DonationAllocationPieChart } from '@/components/ui/Charts/DonationAllocationPieChart';
import { Badge } from '@/components/ui/Badge';
import { UserBadge } from '@/components/UserBadge/UserBadge';
import { Heart, Award, Star, Camera, Info } from 'lucide-react';
import { SignOutButton } from '@/components/ui/SignOutButton';
import { useAuthStore } from '@/auth/stores/authStore';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { DashboardHeader } from '@/features/dashboard/shared/components/DashboardHeader';
import { MobileNav } from '@/components/Navigation/MobileNav';

interface DonorDashboardProps {
  userId?: string;
}

interface AvatarUploadProps {
  currentUrl?: string;
  onUpload: (file: File) => Promise<void>;
  userEmail?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentUrl, onUpload, userEmail }) => {
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar 
        src={currentUrl} 
        fallback={userEmail?.[0].toUpperCase() || 'D'} 
        className="h-16 w-16 ring-2 ring-indigo-500/50 cursor-pointer transition-all duration-200"
        onClick={() => inputRef.current?.click()}
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
             onClick={() => inputRef.current?.click()}>
          <Camera className="h-6 w-6 text-white" />
        </div>
      )}
      <input 
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-900"></span>
    </div>
  );
};

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ userId }) => {
  const { user, updateProfile, isAuthenticated } = useAuthStore();
  const dashboardUserId = userId || user?.id;

  // Add debug logging
  console.log('DonorDashboard State:', { 
    user, 
    isAuthenticated 
  });

  const handleAvatarUpload = async (file: File) => {
    try {
      // Create a loading toast
      toast.loading('Updating profile picture...');

      // Create FormData and append file
      const formData = new FormData();
      formData.append('avatar', file);

      // Upload to your API
      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload avatar');

      const { avatarUrl } = await response.json();

      // Update user profile in auth store
      await updateProfile({ avatar_url: avatarUrl });

      // Show success toast
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Avatar upload failed:', error);
      toast.error('Failed to update profile picture');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Enhanced Header Section with responsive design */}
      <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <DashboardHeader title="Donor Dashboard" user={user} />
            {/* Add Badges Section */}
            <div className="flex items-center gap-2 flex-wrap">
              <UserBadge role="donor" />
              <Badge variant="success" size="sm" className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                7 Day Streak
              </Badge>
              <Badge variant="info" size="sm" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Top 10% Donor
              </Badge>
              <Badge variant="warning" size="sm" className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                Impact Level 3
              </Badge>
            </div>
          </div>
          <SignOutButton variant="header" />
        </div>
      </div>

      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Impact
              </h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                $0
              </p>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                People Helped
              </h3>
              <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                0
              </p>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Donations
              </h3>
              <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                0
              </p>
            </div>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Donation History
            </h3>
            <DonationHistory userId={dashboardUserId} />
          </Card>
          <Card className="bg-gray-800/50 backdrop-blur-lg p-6 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-white">
                  Impact Distribution
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => {/* Add info modal handler */}}
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>

              {/* Stats Grid - Clean Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Food Programs */}
                <div className="bg-blue-950/40 rounded-xl p-4 flex flex-col justify-between border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Food Programs</span>
                    <span className="text-blue-400 font-semibold text-lg">35%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">$45,000</p>
                </div>

                {/* Shelter Operations */}
                <div className="bg-orange-950/40 rounded-xl p-4 flex flex-col justify-between border border-orange-500/20 hover:border-orange-500/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Shelter Operations</span>
                    <span className="text-orange-400 font-semibold text-lg">30%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">$38,000</p>
                </div>

                {/* Medical Aid */}
                <div className="bg-green-950/40 rounded-xl p-4 flex flex-col justify-between border border-green-500/20 hover:border-green-500/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Medical Aid</span>
                    <span className="text-green-400 font-semibold text-lg">20%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">$25,000</p>
                </div>

                {/* Education */}
                <div className="bg-purple-950/40 rounded-xl p-4 flex flex-col justify-between border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Education</span>
                    <span className="text-purple-400 font-semibold text-lg">15%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">$15,000</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Map View */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Your Impact Map
          </h3>
          <div className="h-[400px]">
            <MapComponent userId={dashboardUserId} />
          </div>
        </Card>
      </div>
    </div>
  );
}; 