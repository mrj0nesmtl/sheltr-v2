import { Card } from './Card'
import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  trend?: string
  trendUp?: boolean
  className?: string
}

export const MetricCard = ({
  title,
  value,
  trend,
  trendUp,
  className
}: MetricCardProps) => {
  return (
    <Card className={cn("p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700", className)}>
      <div className="space-y-2">
        <p className="text-sm text-gray-400">{title}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {trend && (
            <div className={cn(
              "flex items-center space-x-1",
              trendUp ? "text-green-500" : "text-red-500"
            )}>
              {trendUp ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 