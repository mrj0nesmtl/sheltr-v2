import { Card } from '@/components/ui/Card';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function DonationAnalytics() {
  const data = useMemo(() => [
    { month: 'Jan', donations: 45000, donors: 120, avgDonation: 375 },
    { month: 'Feb', donations: 52000, donors: 145, avgDonation: 358 },
    { month: 'Mar', donations: 61000, donors: 168, avgDonation: 363 },
    // Add more data points...
  ], []);

  return (
    <Card>
      <Card.Header className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Donation Analytics</h3>
        <div className="flex gap-2">
          <span className="text-sm text-emerald-400">+23.5% vs last month</span>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="donations"
                stroke="#818CF8"
                fillOpacity={1}
                fill="url(#donationGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>
    </Card>
  );
} 