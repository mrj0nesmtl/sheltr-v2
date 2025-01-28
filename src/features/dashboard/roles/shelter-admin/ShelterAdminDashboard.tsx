import { useAuthStore } from '@/auth/stores/authStore'
import { DashboardHeader } from '@/features/dashboard/shared/components'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SignOutButton } from '@/components/ui/SignOutButton'
import { UserBadge } from '@/components/UserBadge/UserBadge'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { ParticipantList } from './components/ParticipantList'
import { ProgramsList } from './components/ProgramsList'
import { DonationAnalytics } from './components/DonationAnalytics'
import { DisbursementTracker } from './components/DisbursementTracker'
import { MetricCard } from '@/components/ui/MetricCard'
import { DonationAllocationPieChart } from './components/DonationAllocationPieChart'
import { GlobalDonationMap } from './components/GlobalDonationMap'
import { ShelterDonationMap } from './components/ShelterDonationMap'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const ShelterAdminDashboard = () => {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { orgId } = useParams()
  const [shelterData, setShelterData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.debug('Auth state lost, redirecting to login', { isAuthenticated, user });
      navigate('/login', { replace: true });
      return;
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const loadShelterData = async () => {
      if (!orgId || !user?.id) return;

      try {
        console.debug('Loading shelter data:', { orgId, userId: user?.id });
        
        const { data: accessData, error: accessError } = await supabase
          .from('organization_staff')
          .select('organization_id')
          .eq('user_id', user.id)
          .eq('organization_id', orgId)
          .eq('role', 'shelter_admin')
          .eq('status', 'active')
          .single();

        if (accessError || !accessData) {
          throw new Error('Access verification failed');
        }

        const { data, error } = await supabase
          .from('organizations')
          .select(`
            *,
            organization_staff!inner (
              user_id,
              role,
              status
            )
          `)
          .eq('id', orgId)
          .single();

        if (error) throw error;

        console.debug('Loaded shelter data:', data);
        setShelterData(data);
      } catch (err) {
        console.error('Error loading shelter:', err);
        setError('Failed to load shelter data');
      } finally {
        setLoading(false);
      }
    };

    loadShelterData();
  }, [orgId, user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !shelterData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-red-500">{error || 'Failed to load shelter'}</div>
      </div>
    )
  }

  const participantData = [
    {
      id: "1",
      name: "John D.",
      lat: 45.5025,
      lng: -73.5685,
      lastDonation: 50,
      totalDonations: 500
    },
    // Add more participants as needed
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900">
        <div className="fixed top-0 right-0 p-2 text-xs text-gray-500">
          Auth: {isAuthenticated ? 'Yes' : 'No'} | User: {user?.id}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Enhanced Header Section with Badges */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <DashboardHeader 
                  title={`${shelterData.name} Dashboard`} 
                  user={user} 
                />
                {/* Badges Section */}
                <div className="flex items-center gap-2 flex-wrap">
                  <UserBadge role="shelter_admin" verified={true} />
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <Icon name="check-circle" className="w-3 h-3" />
                    Verified Status
                  </Badge>
                  <Badge variant="info" size="sm" className="flex items-center gap-1">
                    <Icon name="users" className="w-3 h-3" />
                    {shelterData.current_capacity || 0} Active Participants
                  </Badge>
                  <Badge variant="warning" size="sm" className="flex items-center gap-1">
                    <Icon name="wallet" className="w-3 h-3" />
                    ${shelterData.total_donations || 0} Donations
                  </Badge>
                </div>
              </div>
              <SignOutButton variant="header" />
            </div>
          </div>

          {/* Metrics Overview - 3 column grid on desktop, stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Active Participants" value={shelterData.current_capacity || 0} trend="+12%" trendUp={true} />
            <MetricCard title="Total Donations" value={`$${shelterData.total_donations || 0}`} trend="+23%" trendUp={true} />
            <MetricCard title="Successful Disbursements" value="18" trend="+8%" trendUp={true} />
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Analytics Section - Full width */}
            <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
              <DonationAnalytics />
            </Card>

            {/* Visualization Section - 2 column grid on desktop, stack on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
                <DonationAllocationPieChart />
              </Card>
              <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
                <ShelterDonationMap 
                  shelterLocation={shelterData}
                  participants={participantData}
                />
              </Card>
            </div>

            {/* Tables Section - Full width tables stacked */}
            <div className="space-y-6">
              <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
                <ParticipantList />
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
                <ProgramsList />
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
                <DisbursementTracker />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
} 