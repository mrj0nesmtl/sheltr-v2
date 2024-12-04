import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '../../../lib/utils';

interface ImpactMetrics {
  directSupport: number;
  housingFund: number;
  operations: number;
}

interface ImpactMetricsProps {
  metrics: ImpactMetrics;
  className?: string;
}

export function ImpactMetrics({ metrics, className }: ImpactMetricsProps) {
  const data = [
    { name: 'Direct Support', value: metrics.directSupport },
    { name: 'Housing Fund', value: metrics.housingFund },
    { name: 'Operations', value: metrics.operations }
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B'];

  return (
    <div className={cn("bg-white/10 backdrop-blur-lg rounded-xl p-6", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">Impact Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}