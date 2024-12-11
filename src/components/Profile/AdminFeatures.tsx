import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface AdminStats {
  shelterMetrics: {
    totalParticipants: number;
    activeParticipants: number;
    totalDonations: number;
    successRate: number;
  };
  monthlyStats: Array<{
    month: string;
    participants: number;
    donations: number;
    placements: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'registration' | 'donation' | 'placement' | 'service';
    description: string;
    timestamp: string;
  }>;
}

export function AdminFeatures({ stats }: { stats: AdminStats }) {
  return (
    <div className="space-y-6">
      {/* Shelter Metrics */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Shelter Overview</h3>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">
                {stats.shelterMetrics.totalParticipants}
              </div>
              <div className="text-sm text-gray-400">Total Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {stats.shelterMetrics.activeParticipants}
              </div>
              <div className="text-sm text-gray-400">Active Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                ${stats.shelterMetrics.totalDonations.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Donations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {stats.shelterMetrics.successRate}%
              </div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Monthly Performance */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Monthly Performance</h3>
            <Button variant="outline" size="sm">
              <Icon name="download" className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyStats}>
                <defs>
                  <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
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
                  dataKey="participants"
                  stroke="#818CF8"
                  fillOpacity={1}
                  fill="url(#colorParticipants)"
                />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#34D399"
                  fillOpacity={1}
                  fill="url(#colorDonations)"
                />
                <Area
                  type="monotone"
                  dataKey="placements"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorPlacements)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Recent Activity</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={
                      activity.type === 'registration' ? 'user-plus' :
                      activity.type === 'donation' ? 'dollar-sign' :
                      activity.type === 'placement' ? 'home' :
                      'check-circle'
                    }
                    className="h-5 w-5 text-indigo-400"
                  />
                  <div>
                    <p className="text-white">{activity.description}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 