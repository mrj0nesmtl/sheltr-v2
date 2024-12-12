import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { analyticsService } from '@/lib/services/analyticsService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DonorStats {
  donorInfo: {
    name: string;
    joinedDate: string;
    totalDonated: number;
    donationCount: number;
  };
  donationHistory: {
    date: string;
    amount: number;
    impact: number;
  }[];
  impactMetrics: {
    peopleHelped: number;
    sheltersSupported: number;
    programsSponsored: number;
  };
}

export function DonorDetailAnalytics() {
  const { donorId } = useParams();
  const [stats, setStats] = React.useState<DonorStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDonorStats = async () => {
      if (!donorId) return;
      try {
        const data = await analyticsService.getDonorAnalytics(donorId);
        setStats(data);
      } catch (error) {
        console.error('Error fetching donor stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorStats();
  }, [donorId]);

  if (loading) return <div>Loading donor analytics...</div>;
  if (!stats) return <div>Error loading donor data</div>;

  return (
    <div className="space-y-8">
      {/* Donor Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">{stats.donorInfo.name}</h1>
        <p className="text-gray-400">Member since {stats.donorInfo.joinedDate}</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="heart" className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-400">People Helped</p>
                <p className="text-2xl font-bold text-white">
                  {stats.impactMetrics.peopleHelped}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Add more impact cards */}
      </div>

      {/* Donation History */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Donation History</h2>
        </Card.Header>
        <Card.Content>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.donationHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="amount" fill="#8B5CF6" />
                <Bar dataKey="impact" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 