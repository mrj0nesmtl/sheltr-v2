import { useAuthStore } from '@/auth/stores/authStore'
import { Card } from '@/components/ui/Card'
import { DonationHistory } from '@/features/shared/analytics/DonationHistory'
import { DonorStats } from '@/features/shared/analytics/DonorStats'

export const DonorAnalytics = () => {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <Card>
        <DonorStats userId={user?.id} />
      </Card>
      <Card>
        <DonationHistory userId={user?.id} />
      </Card>
    </div>
  )
} 