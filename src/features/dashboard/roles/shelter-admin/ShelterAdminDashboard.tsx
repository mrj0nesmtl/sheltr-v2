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

export const ShelterAdminDashboard = () => {
  const { user } = useAuthStore()

  const shelterData = {
    name: "Downtown Shelter",
    lat: 45.5017,
    lng: -73.5673,
    totalDonations: 124500
  };

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Enhanced Header Section with Badges */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <DashboardHeader title="Shelter Admin Dashboard" user={user} />
                {/* Badges Section */}
                <div className="flex items-center gap-2 flex-wrap">
                  <UserBadge role="shelter_admin" verified={true} />
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <Icon name="check-circle" className="w-3 h-3" />
                    Verified Status
                  </Badge>
                  <Badge variant="info" size="sm" className="flex items-center gap-1">
                    <Icon name="users" className="w-3 h-3" />
                    24 Active Participants
                  </Badge>
                  <Badge variant="warning" size="sm" className="flex items-center gap-1">
                    <Icon name="wallet" className="w-3 h-3" />
                    $9,250 Donations
                  </Badge>
                  <Badge variant="error" size="sm" className="flex items-center gap-1">
                    <Icon name="clock" className="w-3 h-3" />
                    3 Pending Reviews
                  </Badge>
                </div>
              </div>
              <SignOutButton variant="header" />
            </div>
          </div>

          {/* Metrics Overview - 3 column grid on desktop, stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Active Participants" value="24" trend="+12%" trendUp={true} />
            <MetricCard title="Total Donations" value="$9,250" trend="+23%" trendUp={true} />
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