import { Card } from '@/components/ui/Card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function ShelterPerformanceChart() {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium text-white">Shelter Performance</h3>
      </Card.Header>
      <Card.Content>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <defs>
                {/* Add gradients */}
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
              <Line
                type="monotone"
                dataKey="participants"
                stroke="#818CF8"
                strokeWidth={2}
                dot={{ fill: '#818CF8' }}
              />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#34D399"
                strokeWidth={2}
                dot={{ fill: '#34D399' }}
              />
              <Line
                type="monotone"
                dataKey="success_rate"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: '#F59E0B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>
    </Card>
  );
} 