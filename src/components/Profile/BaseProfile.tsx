import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/auth/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'

interface BaseProfileProps {
  children?: React.ReactNode
}

export const BaseProfile = ({ children }: BaseProfileProps) => {
  const { user } = useAuthStore()
  const { profile } = useProfileStore()

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold">{profile?.name || user?.email}</h2>
            <p className="text-gray-500">{profile?.role || user?.role}</p>
          </div>
        </div>
        
        {children}
      </div>
    </Card>
  )
} 