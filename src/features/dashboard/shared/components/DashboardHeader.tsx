import { User } from '@/auth/types/auth.types'
import { SignOutButton } from '@/components/ui/SignOutButton'
import { Badge } from '@/components/ui/Badge'

interface DashboardHeaderProps {
  title: string
  user?: User
  actions?: React.ReactNode
  badges?: {
    label: string
    variant?: 'default' | 'success' | 'warning' | 'error'
  }[]
}

export const DashboardHeader = ({ title, user, actions, badges }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75 border-b border-gray-800">
      <div className="px-6 py-4">
        {/* Title and Badges Row */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <SignOutButton variant="header" />
          </div>

          {/* Badges Row */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <Badge 
                  key={index}
                  variant={badge.variant || 'default'}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="mt-4 flex items-center space-x-4">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
} 