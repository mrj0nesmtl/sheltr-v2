import { Building2, CheckCircle, Users, XCircle } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { ShelterProfile } from '../../../lib/types/shelter';
import { cn } from '../../../lib/utils';

interface ShelterStatsProps {
  shelters: ShelterProfile[];
  className?: string;
}

export function ShelterStats({ shelters, className }: ShelterStatsProps) {
  // Handle empty shelters array
  if (!shelters.length) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Total Shelters', 'Verified Shelters', 'Pending Verification', 'Average Capacity'].map((label) => (
            <div key={label} className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-500/20 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{label}</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalCapacity = shelters.reduce((sum, s) => sum + (s.capacity || 0), 0);
  const verifiedCount = shelters.filter(s => s.verified).length;
  const avgCapacity = Math.round(totalCapacity / shelters.length) || 0;

  const serviceStats = shelters.reduce((acc, shelter) => {
    (shelter.services || []).forEach(service => {
      acc[service] = (acc[service] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(serviceStats)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value
    }));

  const COLORS = [
    '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
    '#F59E0B', '#10B981', '#3B82F6', '#6B7280'
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Building2 className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Shelters</p>
              <p className="text-2xl font-bold text-white">{shelters.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Verified Shelters</p>
              <p className="text-2xl font-bold text-white">{verifiedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <XCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Verification</p>
              <p className="text-2xl font-bold text-white">
                {shelters.length - verifiedCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Capacity</p>
              <p className="text-2xl font-bold text-white">{avgCapacity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Distribution Chart */}
      {pieData.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Services Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}