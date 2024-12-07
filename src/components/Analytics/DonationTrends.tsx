import React from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useTranslation } from 'react-i18next';

interface DonationData {
  date: string;
  amount: number;
  immediateNeeds: number;
  housing: number;
  operations: number;
}

const data: DonationData[] = [
  {
    date: '12/31/2023',
    amount: 14000,
    immediateNeeds: 11200,
    housing: 2100,
    operations: 700
  },
  {
    date: '1/31/2024',
    amount: 21000,
    immediateNeeds: 16800,
    housing: 3150,
    operations: 1050
  },
  {
    date: '2/29/2024',
    amount: 28000,
    immediateNeeds: 22400,
    housing: 4200,
    operations: 1400
  }
];

export function DonationTrends() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[400px] p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-6">{t('impact.donationTrends')}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="immediateNeeds" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="housing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="operations" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#9ca3af"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [`$${value}`, '']}
          />
          <Area
            type="monotone"
            dataKey="immediateNeeds"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#immediateNeeds)"
            name="Immediate Needs (80%)"
          />
          <Area
            type="monotone"
            dataKey="housing"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#housing)"
            name="Housing (15%)"
          />
          <Area
            type="monotone"
            dataKey="operations"
            stroke="#eab308"
            fillOpacity={1}
            fill="url(#operations)"
            name="Operations (5%)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 