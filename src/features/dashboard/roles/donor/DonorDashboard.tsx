import React, { useState, useEffect } from 'react';
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
import { Heart, Award, Star, Camera, Info, Settings, Users, Bell, Share2, UserCircle, Globe, Shield } from 'lucide-react';
import { SignOutButton } from '@/components/ui/SignOutButton';
import { useAuthStore } from '@/auth/stores/authStore';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { DashboardHeader } from '@/features/dashboard/shared/components/DashboardHeader';
import { MobileNav } from '@/components/Navigation/MobileNav';
// import { Dialog } from '@/components/ui/Dialog';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { supabase } from '@/lib/supabase';
import type { 
  DonorProfile as DonorProfileType,
  DonorStatistics,
  DonorSocialConnections 
} from '@/features/donor/types';

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

// New Profile Settings Dialog Component
const ProfileSettingsDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  profile: DonorProfileType;
  stats: DonorStatistics;
  socialConnections: DonorSocialConnections;
}> = ({ open, onClose, profile, stats, socialConnections }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
        
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">
              <UserCircle className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="social">
              <Users className="w-4 h-4 mr-2" />
              Social
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            {/* Profile Settings */}
            <div className="space-y-4">
              <Input
                label="Display Name"
                defaultValue={profile.display_name}
                className="bg-gray-800"
              />
              <Input
                label="Website"
                defaultValue={profile.website || ''}
                className="bg-gray-800"
              />
              <textarea
                placeholder="Bio"
                defaultValue={profile.bio || ''}
                className="w-full bg-gray-800 rounded-md p-2"
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-4">
            {/* Donation & Notification Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Donation Preferences</h3>
              <div className="flex items-center justify-between">
                <span>Anonymous Donations</span>
                <Switch
                  checked={stats.anonymous_donations}
                  onCheckedChange={(checked) => {
                    // Update anonymous donations preference
                  }}
                />
              </div>
              
              <h3 className="text-lg font-medium text-white mt-6">Notification Settings</h3>
              <select
                value={stats.notification_frequency}
                onChange={(e) => {
                  // Update notification frequency
                }}
                className="w-full bg-gray-800 rounded-md"
              >
                <option value="daily">Daily Updates</option>
                <option value="weekly">Weekly Digest</option>
                <option value="monthly">Monthly Summary</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-4">
            {/* Social Connections Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Social Links</h3>
              {Object.entries(profile.social_links || {}).map(([platform, url]) => (
                <Input
                  key={platform}
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  defaultValue={url}
                  className="bg-gray-800"
                />
              ))}

              <h3 className="text-lg font-medium text-white mt-6">Impact Circle</h3>
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">
                  {socialConnections.impact_circle.length} members in your impact circle
                </p>
                {/* Add member management UI here */}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-4">
            {/* Privacy Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Public Profile</span>
                <Switch
                  checked={profile.visibility === 'public'}
                  onCheckedChange={(checked) => {
                    // Update profile visibility
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Show Impact Score</span>
                <Switch
                  checked={true}
                  onCheckedChange={(checked) => {
                    // Update impact score visibility
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Allow Connection Requests</span>
                <Switch
                  checked={true}
                  onCheckedChange={(checked) => {
                    // Update connection settings
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Dialog>
  );
};

const DonorDashboard: React.FC<DonorDashboardProps> = ({ userId }) => {
  const { user, updateProfile, isAuthenticated } = useAuthStore();
  const dashboardUserId = userId || user?.id;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profile, setProfile] = useState<DonorProfileType | null>(null);
  const [stats, setStats] = useState<DonorStatistics | null>(null);
  const [socialConnections, setSocialConnections] = useState<DonorSocialConnections | null>(null);

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

  // Fetch donor data
  useEffect(() => {
    const fetchDonorData = async () => {
      if (!dashboardUserId) return;

      const [profileData, statsData, socialData] = await Promise.all([
        supabase
          .from('donor_profiles')
          .select('*')
          .eq('user_id', dashboardUserId)
          .single(),
        supabase
          .from('donor_stats')
          .select('*')
          .eq('donor_id', dashboardUserId)
          .single(),
        supabase
          .from('donor_social_connections')
          .select('*')
          .eq('donor_id', dashboardUserId)
          .single()
      ]);

      setProfile(profileData.data);
      setStats(statsData.data);
      setSocialConnections(socialData.data);
    };

    fetchDonorData();
  }, [dashboardUserId]);

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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <SignOutButton variant="header" />
          </div>
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

      {/* Profile Settings Dialog */}
      {profile && stats && socialConnections && (
        <ProfileSettingsDialog
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          profile={profile}
          stats={stats}
          socialConnections={socialConnections}
        />
      )}
    </div>
  );
};

export { DonorDashboard };
export default DonorDashboard; 