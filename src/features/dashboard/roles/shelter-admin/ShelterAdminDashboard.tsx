import { useAuthStore } from '@/auth/stores/authStore'
import { DashboardHeader } from '@/features/dashboard/shared/components'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ParticipantList } from './components/ParticipantList'
import { ProgramsList } from './components/ProgramsList'
import { DonationAnalytics } from './components/DonationAnalytics'
import { DisbursementTracker } from './components/DisbursementTracker'
import { MetricCard } from '@/components/ui/MetricCard'
import { DonationAllocationPieChart } from './components/DonationAllocationPieChart'
import { GlobalDonationMap } from './components/GlobalDonationMap'

export const ShelterAdminDashboard = () => {
  const { user } = useAuthStore()

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Section */}
          <DashboardHeader title="Shelter Admin Dashboard" user={user} />

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
                <GlobalDonationMap />
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