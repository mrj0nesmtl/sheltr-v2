import { Card } from '@/components/ui/Card'

interface DonationHistoryProps {
  userId?: string
}

export const DonationHistory = ({ userId }: DonationHistoryProps) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Donation History</h3>
      {/* Basic structure - we'll add real data later */}
      <div className="space-y-4">
        {/* Placeholder for donation history */}
        <p className="text-gray-500">Loading donation history...</p>
      </div>
    </div>
  )
} 