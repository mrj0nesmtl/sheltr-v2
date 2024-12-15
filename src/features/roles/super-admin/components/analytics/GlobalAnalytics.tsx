import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { analyticsService } from '@/lib/services/analyticsService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GlobalStats {
  platformStats: {
    totalShelters: number;
    activeParticipants: number;
    totalDonations: number;
    successRate: number;
  };
  trends: {
    date: string;
    donations: number;
    participants: number;
  }[];
}

export function GlobalAnalytics() {
  const [analytics, setAnalytics] = React.useState<GlobalStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await analyticsService.getGlobalAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching global analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (!analytics) return <div>Error loading analytics</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Platform Analytics</h1>
        <p className="text-gray-400">Comprehensive overview of platform performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="building" className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-400">Total Shelters</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.platformStats.totalShelters}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="users" className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Active Participants</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.platformStats.activeParticipants}
                </p>
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
                  ${analytics.platformStats.totalDonations.toLocaleString()}
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
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.platformStats.successRate}%
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Platform Trends</h2>
        </Card.Header>
        <Card.Content>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="participants"
                  stroke="#60A5FA"
                  fill="#60A5FA"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 