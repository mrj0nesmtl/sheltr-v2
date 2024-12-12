import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { analyticsService } from '@/lib/services/analyticsService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ParticipantMetrics {
  totalParticipants: number;
  activePrograms: number;
  successfulTransitions: number;
  averageStayDuration: number;
  programSuccess: {
    programName: string;
    participants: number;
    successRate: number;
    averageDuration: number;
  }[];
  demographicData: {
    ageGroup: string;
    count: number;
  }[];
}

export function ShelterParticipantAnalytics() {
  const [metrics, setMetrics] = React.useState<ParticipantMetrics | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await analyticsService.getParticipantMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching participant metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div>Loading participant analytics...</div>;
  if (!metrics) return <div>Error loading participant data</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Participant Analytics</h1>
        <p className="text-gray-400">Comprehensive view of participant progress and outcomes</p>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="users" className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Total Participants</p>
                <p className="text-2xl font-bold text-white">{metrics.totalParticipants}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="award" className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Successful Transitions</p>
                <p className="text-2xl font-bold text-white">{metrics.successfulTransitions}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Add more metric cards */}
      </div>

      {/* Program Success Rates */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Program Success Rates</h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {metrics.programSuccess.map((program) => (
              <div key={program.programName} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">{program.programName}</h3>
                  <span className="text-emerald-400">{program.successRate}% success</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{program.participants} participants</span>
                  <span>Avg. {program.averageDuration} days</span>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Demographic Distribution */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Participant Demographics</h2>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.demographicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="ageGroup" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 