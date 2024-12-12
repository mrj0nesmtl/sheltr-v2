import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { analyticsService } from '@/lib/services/analyticsService';
import { PieChart, Pie, LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

interface ShelterOverview {
  totalShelters: number;
  activeShelters: number;
  totalCapacity: number;
  currentOccupancy: number;
  shelterPerformance: {
    name: string;
    successRate: number;
    occupancyRate: number;
    programCount: number;
  }[];
  resourceDistribution: {
    type: string;
    value: number;
  }[];
}

export function ShelterAnalytics() {
  const [overview, setOverview] = React.useState<ShelterOverview | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await analyticsService.getSheltersOverview();
        setOverview(data);
      } catch (error) {
        console.error('Error fetching shelter overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) return <div>Loading shelter analytics...</div>;
  if (!overview) return <div>Error loading shelter data</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Shelter Network Analytics</h1>
        <p className="text-gray-400">Overview of all shelter operations and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="home" className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-400">Active Shelters</p>
                <p className="text-2xl font-bold text-white">
                  {overview.activeShelters}/{overview.totalShelters}
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
                <p className="text-sm text-gray-400">Current Occupancy</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round((overview.currentOccupancy / overview.totalCapacity) * 100)}%
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Add more metrics cards */}
      </div>

      {/* Resource Distribution */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Resource Distribution</h2>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overview.resourceDistribution}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>

      {/* Top Performing Shelters */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-white">Shelter Performance</h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {overview.shelterPerformance.map((shelter) => (
              <div key={shelter.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{shelter.name}</p>
                  <p className="text-sm text-gray-400">{shelter.programCount} active programs</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400">{shelter.successRate}% success rate</p>
                  <p className="text-sm text-gray-400">{shelter.occupancyRate}% occupancy</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 