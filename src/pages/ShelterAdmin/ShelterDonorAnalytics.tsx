import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { analyticsService } from '@/lib/services/analyticsService';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DonorMetrics {
  totalDonors: number;
  totalDonations: number;
  averageDonation: number;
  recurringDonors: number;
  monthlyTrends: {
    month: string;
    amount: number;
    donors: number;
  }[];
  topDonors: {
    name: string;
    totalDonated: number;
    lastDonation: string;
    frequency: 'one-time' | 'monthly' | 'quarterly';
  }[];
  impactMetrics: {
    shelterSupport: number;
    mealsProvided: number;
    housingAssistance: number;
  };
}

export function ShelterDonorAnalytics() {
  const [metrics, setMetrics] = React.useState<DonorMetrics | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await analyticsService.getDonorMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching donor metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div>Loading donor analytics...</div>;
  if (!metrics) return <div>Error loading donor data</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Shelter Donor Analytics</h1>
        <p className="text-gray-400">Analysis of donor engagement and impact</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="users" className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-400">Total Donors</p>
                <p className="text-2xl font-bold text-white">{metrics.totalDonors}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="repeat" className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Recurring Donors</p>
                <p className="text-2xl font-bold text-white">{metrics.recurringDonors}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="dollar-sign" className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Total Donations</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.totalDonations.toLocaleString()}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="trending-up" className="w-8 h-8 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-400">Average Donation</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.averageDonation.toLocaleString()}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Donation Trends */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Monthly Donation Trends</h2>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>

      {/* Top Donors */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Top Donors</h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {metrics.topDonors.map((donor) => (
              <div key={donor.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{donor.name}</p>
                  <p className="text-sm text-gray-400">Last donation: {donor.lastDonation}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400">${donor.totalDonated.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">{donor.frequency} donor</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Impact Metrics */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Donation Impact</h2>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Icon name="home" className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${metrics.impactMetrics.shelterSupport.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Shelter Support</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Icon name="coffee" className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{metrics.impactMetrics.mealsProvided.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Meals Provided</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <Icon name="key" className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${metrics.impactMetrics.housingAssistance.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Housing Assistance</p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 