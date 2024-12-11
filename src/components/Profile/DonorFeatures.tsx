import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface DonorStats {
  totalDonated: number;
  impactScore: number;
  participantsHelped: number;
  monthlyDonations: Array<{
    month: string;
    amount: number;
    participants: number;
  }>;
  favoriteParticipants: Array<{
    id: string;
    name: string;
    totalDonated: number;
    lastDonation: string;
  }>;
  donationGoals: {
    current: number;
    target: number;
    deadline: string;
  };
}

export function DonorFeatures({ stats }: { stats: DonorStats }) {
  return (
    <div className="space-y-6">
      {/* Impact Score Card */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Your Impact</h3>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">
                {stats.impactScore}
              </div>
              <div className="text-sm text-gray-400">Impact Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                ${stats.totalDonated.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Donated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {stats.participantsHelped}
              </div>
              <div className="text-sm text-gray-400">Lives Impacted</div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Donation Goals */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Donation Goals</h3>
            <Button variant="outline" size="sm">
              <Icon name="target" className="mr-2 h-4 w-4" />
              Set New Goal
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">
                ${stats.donationGoals.current.toLocaleString()} / 
                ${stats.donationGoals.target.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ 
                  width: `${(stats.donationGoals.current / stats.donationGoals.target) * 100}%` 
                }}
              />
            </div>
            <p className="text-sm text-gray-400">
              Goal deadline: {new Date(stats.donationGoals.deadline).toLocaleDateString()}
            </p>
          </div>
        </Card.Content>
      </Card>

      {/* Donation History Chart */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Monthly Impact</h3>
        </Card.Header>
        <Card.Content>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.monthlyDonations}>
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
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#818CF8"
                  strokeWidth={2}
                  dot={{ fill: '#818CF8' }}
                />
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="#34D399"
                  strokeWidth={2}
                  dot={{ fill: '#34D399' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Content>
      </Card>

      {/* Favorite Participants */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Frequent Recipients</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {stats.favoriteParticipants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="user" className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-white">{participant.name}</p>
                    <p className="text-sm text-gray-400">
                      Last donation: {new Date(participant.lastDonation).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">
                    ${participant.totalDonated.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Total donated</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 