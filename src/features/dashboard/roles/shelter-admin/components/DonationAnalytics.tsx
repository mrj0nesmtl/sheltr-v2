import { Card } from '@/components/ui/Card'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend
} from 'recharts'

export const DonationAnalytics = () => {
  const mockData = [
    { date: '01/01', total: Math.random() * 5000, },
    { date: '01/07', total: Math.random() * 5000, },
    { date: '01/14', total: Math.random() * 5000, },
    { date: '01/21', total: Math.random() * 5000, },
    { date: '01/28', total: Math.random() * 5000, },
    { date: '02/04', total: Math.random() * 5000, },
    { date: '02/11', total: Math.random() * 5000, },
    { date: '02/18', total: Math.random() * 5000, },
    { date: '02/25', total: Math.random() * 5000, },
    { date: '03/04', total: Math.random() * 5000, },
    { date: '03/11', total: Math.random() * 5000, },
    { date: '03/18', total: Math.random() * 5000, }
  ].map(entry => ({
    date: entry.date,
    operations: entry.total * 0.05,  // 5%
    housing: entry.total * 0.15,     // 15%
    immediate: entry.total * 0.80,   // 80%
    total: entry.total
  }))

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">Donation Overview</h3>
          <p className="text-sm text-gray-400">Smart contract allocation breakdown</p>
        </div>
        <select className="bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-1">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value, name) => [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
          />
          <Line 
            type="monotone"
            dataKey="operations"
            name="5% Operations"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="monotone"
            dataKey="housing"
            name="15% Housing"
            stroke="#6366F1"
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="monotone"
            dataKey="immediate"
            name="80% Immediate"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 