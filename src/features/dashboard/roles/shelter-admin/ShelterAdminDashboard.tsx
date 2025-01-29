import { useAuthStore } from '@/auth/stores/authStore'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { DashboardHeader } from '@/features/dashboard/shared/components/DashboardHeader';
import { Card } from '@/components/ui/Card'
import { MetricCard } from '@/features/shared/analytics/metrics/MetricCard'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SignOutButton } from '@/components/ui/SignOutButton'
import { UserBadge } from '@/components/UserBadge/UserBadge'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

// Import all dashboard components
import {
  ParticipantList,
  ProgramsList,
  DonationAnalytics,
  DisbursementTracker,
  ShelterMetrics,
  ShelterDonationMap,
  ResourceManagement,
  DonationAllocationPieChart,
  GlobalDonationMap
} from './components'

export function ShelterAdminDashboard() {
  const { user } = useAuthStore()
  const { shelterId } = useParams()
  const [shelterData, setShelterData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Debug render count
  console.log('RENDER: ShelterAdminDashboard', { loading, hasData: !!shelterData })

  useEffect(() => {
    const loadShelterData = async () => {
      if (!shelterId || !user?.id) return;
      
      try {
        // First get organization and its participants
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select(`
            *,
            organization_staff (
              user_id,
              role
            ),
            organization_participants (
              participant_id,
              participants (*)
            )
          `)
          .eq('id', shelterId)
          .single();

        if (orgError) throw orgError;

        // Get donations through participant_id relationship
        const participantIds = orgData.organization_participants.map(
          (op: any) => op.participant_id
        );

        const { data: donationsData, error: donationsError } = await supabase
          .from('donations')
          .select('*')
          .in('participant_id', participantIds);

        if (donationsError) {
          console.warn('Could not load donations:', donationsError);
        }

        // Combine all data
        setShelterData({
          ...orgData,
          donations: donationsData || []
        });

      } catch (err) {
        console.error('Error loading shelter:', err);
        setError('Failed to load shelter data');
      } finally {
        setLoading(false);
      }
    };

    loadShelterData();
  }, [shelterId, user?.id]);

  if (loading) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-900 pt-16">
          {/* Header Section */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg mb-6 sticky top-16 z-10">
            <div className="flex justify-between items-center">
              <div className="space-y-4">
                <DashboardHeader title="Shelter Dashboard" user={user} />
                <div className="flex items-center gap-2 flex-wrap">
                  <UserBadge role="shelter_admin" />
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <Icon name="check-circle" className="w-3 h-3" />
                    Status: {shelterData?.status || 'Active'}
                  </Badge>
                  <Badge variant="info" size="sm" className="flex items-center gap-1">
                    <Icon name="users" className="w-3 h-3" />
                    Capacity: {shelterData?.current_capacity || 0}/{shelterData?.total_capacity || 0}
                  </Badge>
                </div>
              </div>
              <SignOutButton variant="header" />
            </div>
          </div>

          {/* Rest of your dashboard content */}
          <div className="container mx-auto px-4 space-y-6 pb-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Participants"
                value={shelterData?.organization_participants?.length || 0}
                trend="up"
              />
              <MetricCard
                title="Total Donations"
                value={shelterData?.donations?.length || 0}
                trend="up"
              />
              <MetricCard
                title="Available Capacity"
                value={shelterData?.current_capacity || 0}
                trend="neutral"
              />
              <MetricCard
                title="Status"
                value={shelterData?.status || 'Unknown'}
                variant={shelterData?.status === 'active' ? 'success' : 'warning'}
              />
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Donation Analytics</h2>
                <DonationAnalytics shelterId={shelterId!} />
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Resource Allocation</h2>
                <DonationAllocationPieChart shelterId={shelterId!} />
              </Card>
            </div>

            {/* Maps Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Local Impact</h2>
                <ShelterDonationMap shelterId={shelterId!} />
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Global Reach</h2>
                <GlobalDonationMap shelterId={shelterId!} />
              </Card>
            </div>

            {/* Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Programs</h2>
                <ProgramsList shelterId={shelterId!} />
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Participants</h2>
                <ParticipantList shelterId={shelterId!} />
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Resource Management</h2>
                <ResourceManagement shelterId={shelterId!} />
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Disbursement Tracking</h2>
                <DisbursementTracker shelterId={shelterId!} />
              </Card>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 pt-16">
        {/* Header Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg mb-6 sticky top-16 z-10">
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              <DashboardHeader title="Shelter Dashboard" user={user} />
              <div className="flex items-center gap-2 flex-wrap">
                <UserBadge role="shelter_admin" />
                <Badge variant="success" size="sm" className="flex items-center gap-1">
                  <Icon name="check-circle" className="w-3 h-3" />
                  Status: {shelterData?.status || 'Active'}
                </Badge>
                <Badge variant="info" size="sm" className="flex items-center gap-1">
                  <Icon name="users" className="w-3 h-3" />
                  Capacity: {shelterData?.current_capacity || 0}/{shelterData?.total_capacity || 0}
                </Badge>
              </div>
            </div>
            <SignOutButton variant="header" />
          </div>
        </div>

        {/* Rest of your dashboard content */}
        <div className="container mx-auto px-4 space-y-6 pb-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Participants"
              value={shelterData?.organization_participants?.length || 0}
              trend="up"
            />
            <MetricCard
              title="Total Donations"
              value={shelterData?.donations?.length || 0}
              trend="up"
            />
            <MetricCard
              title="Available Capacity"
              value={shelterData?.current_capacity || 0}
              trend="neutral"
            />
            <MetricCard
              title="Status"
              value={shelterData?.status || 'Unknown'}
              variant={shelterData?.status === 'active' ? 'success' : 'warning'}
            />
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Donation Analytics</h2>
              <DonationAnalytics shelterId={shelterId!} />
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Resource Allocation</h2>
              <DonationAllocationPieChart shelterId={shelterId!} />
            </Card>
          </div>

          {/* Maps Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Local Impact</h2>
              <ShelterDonationMap shelterId={shelterId!} />
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Global Reach</h2>
              <GlobalDonationMap shelterId={shelterId!} />
            </Card>
          </div>

          {/* Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Programs</h2>
              <ProgramsList shelterId={shelterId!} />
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Participants</h2>
              <ParticipantList shelterId={shelterId!} />
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Resource Management</h2>
              <ResourceManagement shelterId={shelterId!} />
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Disbursement Tracking</h2>
              <DisbursementTracker shelterId={shelterId!} />
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
} 