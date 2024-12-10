import React from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-6">{t('impact.donationTrends')}</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
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
              height={50}
              tick={{ fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
              width={80}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
                fontSize: '14px',
                padding: '12px'
              }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              iconSize={12}
              iconType="circle"
              wrapperStyle={{
                fontSize: '14px',
                paddingBottom: '20px'
              }}
            />
            <Area
              type="monotone"
              dataKey="immediateNeeds"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#immediateNeeds)"
              name="Immediate Needs (80%)"
            />
            <Area
              type="monotone"
              dataKey="housing"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#housing)"
              name="Housing (15%)"
            />
            <Area
              type="monotone"
              dataKey="operations"
              stroke="#eab308"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#operations)"
              name="Operations (5%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 