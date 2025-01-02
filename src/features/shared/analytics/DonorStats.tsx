import { Card } from '@/components/ui/Card'

interface DonorStatsProps {
  userId?: string
}

export const DonorStats = ({ userId }: DonorStatsProps) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Donor Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Donations</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Impact Score</p>
          <p className="text-2xl font-bold">-</p>
        </div>
      </div>
    </div>
  )
} 