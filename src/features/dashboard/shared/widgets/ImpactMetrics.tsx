import { Card } from '@/components/ui/Card'
import { useEffect, useState } from 'react'

interface ImpactMetricsProps {
  userId?: string
}

export const ImpactMetrics = ({ userId }: ImpactMetricsProps) => {
  const [metrics, setMetrics] = useState({
    totalImpact: 0,
    peopleHelped: 0,
    donationsCount: 0
  })

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Your Impact</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Impact</p>
          <p className="text-2xl font-bold">${metrics.totalImpact}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">People Helped</p>
          <p className="text-2xl font-bold">{metrics.peopleHelped}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Donations</p>
          <p className="text-2xl font-bold">{metrics.donationsCount}</p>
        </div>
      </div>
    </Card>
  )
} 