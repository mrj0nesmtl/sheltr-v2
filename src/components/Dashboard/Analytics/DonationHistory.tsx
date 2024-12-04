import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../../lib/utils';

interface DonationData {
  date: string;
  amount: number;
}

interface DonationHistoryProps {
  donations: DonationData[];
  className?: string;
}

export function DonationHistory({ donations, className }: DonationHistoryProps) {
  return (
    <div className={cn("bg-white/10 backdrop-blur-lg rounded-xl p-6", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">Donation History</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={donations}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              stroke="#9CA3AF"
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff'
              }}
            />
            <Bar dataKey="amount" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}