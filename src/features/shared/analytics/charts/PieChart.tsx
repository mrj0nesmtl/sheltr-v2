import { ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Tooltip } from 'recharts';
import { analyticsTheme } from '../utils/theme';
import { ChartDataPoint } from '../types';

interface PieChartProps {
  data: ChartDataPoint[];
  height?: number;
  showLabels?: boolean;
  error?: string | null;
}

export function PieChart({ 
  data, 
  height = 300, 
  showLabels = false,
  error = null 
}: PieChartProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center text-red-400" style={{ height }}>
        <p>Failed to load chart data</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPie>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={analyticsTheme.colors.primary[0]}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={analyticsTheme.colors.primary[index % analyticsTheme.colors.primary.length]} 
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ 
            backgroundColor: analyticsTheme.charts.tooltip.background,
            borderColor: analyticsTheme.charts.tooltip.border
          }}
        />
      </RechartsPie>
    </ResponsiveContainer>
  );
} 