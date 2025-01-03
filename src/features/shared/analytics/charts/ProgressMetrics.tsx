import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui';

interface ProgressMetricsProps {
  showTrendline?: boolean;
  enablePredictions?: boolean;
  className?: string;
}

export const ProgressMetrics: React.FC<ProgressMetricsProps> = ({
  showTrendline = true,
  enablePredictions = false,
  className
}) => {
  // Mock data - replace with real data fetching
  const data = [
    { name: 'Jan', progress: 30, goal: 40 },
    { name: 'Feb', progress: 45, goal: 50 },
    { name: 'Mar', progress: 55, goal: 60 },
    { name: 'Apr', progress: 65, goal: 70 },
  ];

  return (
    <Card className={className}>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="progress" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
            {showTrendline && (
              <Line 
                type="monotone" 
                dataKey="goal" 
                stroke="#82ca9d" 
                strokeDasharray="5 5" 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}; 