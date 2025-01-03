import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui';

interface ResourceUtilizationProps {
  timeframe?: 'daily' | 'weekly' | 'monthly';
  showGoals?: boolean;
  className?: string;
}

export const ResourceUtilization: React.FC<ResourceUtilizationProps> = ({
  timeframe = 'weekly',
  showGoals = true,
  className
}) => {
  // Mock data - replace with real data fetching
  const data = [
    { name: 'Week 1', usage: 4, goal: 5 },
    { name: 'Week 2', usage: 3, goal: 5 },
    { name: 'Week 3', usage: 5, goal: 5 },
    { name: 'Week 4', usage: 6, goal: 5 },
  ];

  return (
    <Card className={className}>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="usage" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.3} 
            />
            {showGoals && (
              <Area 
                type="monotone" 
                dataKey="goal" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.3} 
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}; 