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
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DetailedAnalytics } from '@/components/shared/analytics/DetailedAnalytics';
import { DonorSidebar } from '@/features/dashboard/shared/navigation/sidebar/DonorSidebar';

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

const DonorDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [donorProfile, setDonorProfile] = useState<DonorProfileType | null>(null);

  // Generate donor badges based on profile
  const getDonorBadges = () => {
    const badges = [
      {
        label: 'Donor',
        variant: 'default' as const
      }
    ];

    // Add conditional badges based on donor status
    if (donorProfile?.total_donated && donorProfile.total_donated > 1000) {
      badges.push({
        label: 'Premium Donor',
        variant: 'success' as const
      });
    }

    if (donorProfile?.impact_score && donorProfile.impact_score > 50) {
      badges.push({
        label: `Impact Score: ${donorProfile.impact_score}`,
        variant: 'success' as const
      });
    }

    return badges;
  };

  useEffect(() => {
    const loadDonorProfile = async () => {
      try {
        if (!user?.id) {
          throw new Error('No user ID available');
        }

        const { data, error: profileError } = await supabase
          .from('donor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;
        if (!data) throw new Error('No donor profile found');

        setDonorProfile(data);
      } catch (err) {
        console.error('Failed to load donor profile:', err);
      }
    };

    loadDonorProfile();
  }, [user?.id]);

  // Show loading state
  if (!donorProfile) {
    return (
      <DashboardShell sidebar={<DonorSidebar />}>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardShell>
    );
  }

  // Main dashboard render
  return (
    <DashboardShell sidebar={<DonorSidebar />}>
      <DashboardHeader 
        title={`Welcome ${user?.name || 'Donor'} - Community Member`}
        user={user}
        badges={[
          {
            label: 'Donor',
            variant: 'default'
          },
          ...(donorProfile.total_donated > 1000 ? [{
            label: 'Premium Donor',
            variant: 'success' as const
          }] : []),
          ...(donorProfile.impact_score > 50 ? [{
            label: `Impact Score: ${donorProfile.impact_score}`,
            variant: 'success' as const
          }] : [])
        ]}
        actions={
          donorProfile.shelters_helped ? (
            <Badge variant="success">
              {donorProfile.shelters_helped} Shelters Supported
            </Badge>
          ) : undefined
        }
      />
      
      <main className="flex-1 p-6 pt-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <h3 className="text-sm font-medium text-gray-400">Total Donated</h3>
            <p className="text-2xl font-bold text-white mt-2">
              ${donorProfile.total_donated || '0'}
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
            <h3 className="text-sm font-medium text-gray-400">Impact Score</h3>
            <p className="text-2xl font-bold text-white mt-2">
              {donorProfile.impact_score || '0'}
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
            <h3 className="text-sm font-medium text-gray-400">Shelters Helped</h3>
            <p className="text-2xl font-bold text-white mt-2">
              {donorProfile.shelters_helped || '0'}
            </p>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Your Impact</h2>
            <DetailedAnalytics />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Recent activity content */}
            </div>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Donation History</h2>
            {/* Donation history chart/list */}
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Impact Breakdown</h2>
            {/* Impact metrics visualization */}
          </Card>
        </div>
      </main>
    </DashboardShell>
  );
};

// Make sure to export both as default and named
export { DonorDashboard };
export default DonorDashboard; 