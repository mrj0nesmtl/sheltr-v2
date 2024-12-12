import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { analyticsService } from '@/lib/services/analyticsService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ShelterStats {
  shelterInfo: {
    name: string;
    location: string;
    capacity: number;
    occupancy: number;
  };
  metrics: {
    activeParticipants: number;
    totalDonations: number;
    successRate: number;
    programCount: number;
  };
  participantTrends: {
    date: string;
    count: number;
    successRate: number;
  }[];
}

export function ShelterDetailAnalytics() {
  const { shelterId } = useParams();
  const [stats, setStats] = React.useState<ShelterStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchShelterStats = async () => {
      if (!shelterId) return;
      try {
        const data = await analyticsService.getShelterAnalytics(shelterId);
        setStats(data);
      } catch (error) {
        console.error('Error fetching shelter stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelterStats();
  }, [shelterId]);

  if (loading) return <div>Loading shelter analytics...</div>;
  if (!stats) return <div>Error loading shelter data</div>;

  return (
    <div className="space-y-8">
      {/* Shelter Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">{stats.shelterInfo.name}</h1>
        <p className="text-gray-400">{stats.shelterInfo.location}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="users" className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Active Participants</p>
                <p className="text-2xl font-bold text-white">
                  {stats.metrics.activeParticipants}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Add more stat cards */}
      </div>

      {/* Participant Trends */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Participant Trends</h2>
        </Card.Header>
        <Card.Content>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.participantTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="successRate"
                  stroke="#60A5FA"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 