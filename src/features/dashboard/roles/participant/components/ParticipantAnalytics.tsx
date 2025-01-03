import React from 'react';
import { Card } from '@/components/ui';
import { DonationMap } from '@/features/shared/analytics/maps/DonationMap';
import { formatCurrency } from '@/lib/utils/format';

interface ParticipantAnalyticsProps {
  participantId: string;
}

interface DonationStats {
  totalReceived: number;
  walletBalance: number;
  housingFund: number;
  shelterFees: number;
  recentLocations: Array<{
    lat: number;
    lng: number;
    amount: number;
    date: string;
  }>;
}

// Mock data - replace with real API call
const mockStats: DonationStats = {
  totalReceived: 2500.00,
  walletBalance: 1875.00,
  housingFund: 375.00,
  shelterFees: 125.00,
  recentLocations: [
    { lat: 47.6062, lng: -122.3321, amount: 20, date: '2024-01-05' },
    { lat: 47.6092, lng: -122.3344, amount: 15, date: '2024-01-03' },
    // Add more location data points
  ]
};

export const ParticipantAnalytics = ({ participantId }: ParticipantAnalyticsProps) => {
  return (
    <div className="grid gap-6">
      {/* Financial Overview Table */}
      <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-100">
          Financial Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-100">
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-slate-700/50">
                <td className="py-3 px-4">Total Donations Received</td>
                <td className="py-3 px-4 text-right font-medium text-green-400">
                  {formatCurrency(mockStats.totalReceived)}
                </td>
              </tr>
              <tr className="hover:bg-slate-700/50">
                <td className="py-3 px-4">Current Wallet Balance</td>
                <td className="py-3 px-4 text-right font-medium text-blue-400">
                  {formatCurrency(mockStats.walletBalance)}
                </td>
              </tr>
              <tr className="hover:bg-slate-700/50">
                <td className="py-3 px-4">Housing Fund Balance</td>
                <td className="py-3 px-4 text-right font-medium text-purple-400">
                  {formatCurrency(mockStats.housingFund)}
                </td>
              </tr>
              <tr className="hover:bg-slate-700/50">
                <td className="py-3 px-4">Shelter Fees Paid</td>
                <td className="py-3 px-4 text-right font-medium text-gray-400">
                  {formatCurrency(mockStats.shelterFees)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Donation Location Map */}
      <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-100">
          Recent Donation Locations
        </h3>
        <div className="h-[300px] w-full rounded-lg overflow-hidden">
          <DonationMap 
            locations={mockStats.recentLocations}
            className="w-full h-full"
          />
        </div>
      </Card>
    </div>
  );
}; 