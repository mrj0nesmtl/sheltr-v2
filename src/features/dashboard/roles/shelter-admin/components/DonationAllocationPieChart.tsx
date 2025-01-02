import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

const ALLOCATION_DATA = [
  { 
    name: 'Immediate Aid', 
    value: 80, 
    color: '#22C55E',  // Vibrant green
  },
  { 
    name: 'Housing', 
    value: 15, 
    color: '#6366F1',  // Vibrant indigo
  },
  { 
    name: 'Operations', 
    value: 5, 
    color: '#F59E0B',  // Vibrant amber
  }
]

export const DonationAllocationPieChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[300px] w-full"
    >
      <h3 className="text-lg font-medium text-white mb-2">Donation Allocation</h3>
      <p className="text-sm text-gray-400 mb-4">Smart contract fund distribution</p>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ALLOCATION_DATA}
            cx="50%"
            cy="50%"
            innerRadius={0}  // Changed to 0 to make it a full pie
            outerRadius={100}
            paddingAngle={0}  // Removed padding between sections
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
          >
            {ALLOCATION_DATA.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="#1F2937"  // Dark border to separate sections
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null
              const data = payload[0]
              return (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
                  <p className="text-white font-medium">{data.name}</p>
                  <p className="text-sm text-gray-400">{`${data.value}% of funds`}</p>
                </div>
              )
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            content={({ payload }) => (
              <div className="flex justify-center gap-6 mt-4">
                {payload.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-2"
                      style={{ backgroundColor: ALLOCATION_DATA[index].color }}
                    />
                    <span className="text-slate-300 text-sm">
                      {entry.value} ({ALLOCATION_DATA[index].value}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
} 