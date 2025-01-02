import { User } from '@/auth/types/auth.types'

interface DashboardHeaderProps {
  title: string
  user?: User
}

export const DashboardHeader = ({ title, user }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {user && (
          <p className="text-gray-400">
            Welcome back, {user.name || user.email}
          </p>
        )}
      </div>
    </div>
  )
} 