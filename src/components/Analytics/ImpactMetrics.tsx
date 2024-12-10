import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line
} from 'recharts';

const monthlyGrowth = [
  { month: 'Jan', participants: 45, donations: 89, amount: 12500 },
  { month: 'Feb', participants: 52, donations: 102, amount: 15800 },
  { month: 'Mar', participants: 58, donations: 118, amount: 14200 },
  { month: 'Apr', participants: 65, donations: 132, amount: 19500 },
  { month: 'May', participants: 72, donations: 145, amount: 22000 },
  { month: 'Jun', participants: 80, donations: 160, amount: 24500 }
];

const successMetrics = [
  { category: 'Housing Placement', success: 85, target: 100 },
  { category: 'Job Placement', success: 72, target: 100 },
  { category: 'Financial Stability', success: 68, target: 100 },
  { category: 'Healthcare Access', success: 92, target: 100 }
];

export function ImpactMetrics() {
  const { t } = useTranslation();

  return (
    <>
      {/* Monthly Growth Chart */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          {t('impact.metrics.monthlyGrowth')}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          {t('impact.metrics.successRates')}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={successMetrics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="category" type="category" stroke="#9CA3AF" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Bar dataKey="success" fill="#818CF8">
                {successMetrics.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.success >= 80 ? '#34D399' : '#818CF8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          {t('impact.metrics.communityImpact')}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={successMetrics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="success"
              >
                {successMetrics.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.success >= 80 ? '#34D399' : '#818CF8'}
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
    </>
  );
}