import { MetricCard } from '@/features/shared/analytics'

export const ShelterMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Current Occupancy"
        value="85%"
        trend="+5%"
        status="success"
      />
      <MetricCard
        title="Resource Usage"
        value="92%"
        trend="+2%"
        status="warning"
      />
      <MetricCard
        title="Staff Present"
        value="8/10"
        label="staff"
        status="info"
      />
    </div>
  )
} 