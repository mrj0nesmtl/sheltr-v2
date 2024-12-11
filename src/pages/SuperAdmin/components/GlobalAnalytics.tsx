import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { PieChart, Pie, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface DonationTrend {
  month: string;
  amount: number;
  donorCount: number;
}

interface FundAllocation {
  category: string;
  value: number;
  color: string;
}

interface Donor {
  id: string;
  name: string;
  location: string;
  total_donated: number;
  donation_count: number;
}

interface Participant {
  id: string;
  name: string;
  program: string;
  success_rate: number;
  milestones: number;
}

interface AnalyticsData {
  monthlyTrends: DonationTrend[];
  fundAllocation: FundAllocation[];
  topDonors: Donor[];
  topParticipants: Participant[];
}

export function GlobalAnalytics() {
  const [donationData, setDonationData] = useState<AnalyticsData>({
    monthlyTrends: [],
    fundAllocation: [],
    topDonors: [],
    topParticipants: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Fetch monthly trends
    const { data: trends } = await supabase
      .from('donation_trends')
      .select('*')
      .order('month', { ascending: true });

    // Fetch fund allocation
    const { data: allocation } = await supabase
      .from('fund_allocation')
      .select('*');

    // Fetch top donors
    const { data: donors } = await supabase
      .from('donors')
      .select('*')
      .order('total_donated', { ascending: false })
      .limit(5);

    // Fetch top participants
    const { data: participants } = await supabase
      .from('participants')
      .select('*')
      .order('success_rate', { ascending: false })
      .limit(5);

    setDonationData({
      monthlyTrends: trends || [],
      fundAllocation: allocation || [],
      topDonors: donors || [],
      topParticipants: participants || []
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trends */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Global Monthly Trends</h3>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationData.monthlyTrends}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="amount"
                  stroke="#818CF8"
                  fillOpacity={1}
                  fill="url(#colorDonations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>

      {/* Fund Allocation */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Global Fund Allocation</h3>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donationData.fundAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>

      {/* Top Donors */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Top Donors</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {donationData.topDonors.map((donor, index) => (
              <div key={donor.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-indigo-500/20 rounded-lg text-indigo-400">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white">{donor.name}</p>
                    <p className="text-sm text-gray-400">{donor.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400">${donor.total_donated.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">{donor.donation_count} donations</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Top Participants */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Top Participants</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {donationData.topParticipants.map((participant, index) => (
              <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-purple-500/20 rounded-lg text-purple-400">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white">{participant.name}</p>
                    <p className="text-sm text-gray-400">{participant.program}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400">{participant.success_rate}% Success</p>
                  <p className="text-sm text-gray-400">{participant.milestones} milestones</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 