export function FundAllocationChart({ data }: { data: typeof allocationData }) {
  return (
    <div className="h-[500px]"> {/* Increased height */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}  // Larger inner radius
            outerRadius={160}  // Larger outer radius
            paddingAngle={2}
            dataKey="value"
            label={({ name, value }) => `${name} (${value}%)`}
            labelLine={{ stroke: '#6B7280', strokeWidth: 1 }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.category][Object.keys(COLORS[entry.category])[index % 3]]}
                stroke="#1F2937"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const data = payload[0].payload;
              return (
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                  <p className="font-semibold text-white">{data.name}</p>
                  <p className="text-gray-300">{data.value}% of total funds</p>
                  <p className="text-sm text-gray-400 mt-1">
                    ${(data.value * stats.totalDonations / 100).toLocaleString()}
                  </p>
                </div>
              );
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            content={({ payload }) => (
              <div className="flex flex-col space-y-2">
                {payload?.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-300">{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 