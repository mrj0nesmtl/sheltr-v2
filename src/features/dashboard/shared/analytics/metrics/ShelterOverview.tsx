import { Building2, MapPin, TrendingUp, Users } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { ShelterProfile } from '../../../lib/types/shelter';
import { cn } from '../../../lib/utils';

interface ShelterOverviewProps {
  shelters: ShelterProfile[];
  className?: string;
}

export function ShelterOverview({ shelters, className }: ShelterOverviewProps) {
  const totalCapacity = shelters.reduce((sum, s) => sum + (s.capacity || 0), 0);
  const verifiedCount = shelters.filter(s => s.verified).length;
  const avgCapacity = Math.round(totalCapacity / shelters.length) || 0;
  const totalParticipants = shelters.reduce((sum, s) => sum + (s.participantCount || 0), 0);

  // Calculate service distribution
  const serviceStats = shelters.reduce((acc, shelter) => {
    (shelter.services || []).forEach(service => {
      acc[service] = (acc[service] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(serviceStats)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / shelters.length) * 100)
    }))
    .sort((a, b) => b.value - a.value);

  const COLORS = [
    '#6366F1', // Indigo
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#8B5CF6', // Purple
    '#14B8A6', // Teal
    '#F43F5E', // Rose
    '#6B7280'  // Gray
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Building2 className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Shelters</p>
              <p className="text-2xl font-bold text-white">{shelters.length}</p>
              <p className="text-xs text-indigo-300">
                {verifiedCount} verified
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Users className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Participants</p>
              <p className="text-2xl font-bold text-white">{totalParticipants}</p>
              <p className="text-xs text-emerald-300">
                Across all shelters
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <MapPin className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Cities Served</p>
              <p className="text-2xl font-bold text-white">
                {new Set(shelters.map(s => s.city)).size}
              </p>
              <p className="text-xs text-amber-300">
                Active locations
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-500/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Average Capacity</p>
              <p className="text-2xl font-bold text-white">{avgCapacity}</p>
              <p className="text-xs text-rose-300">
                Per shelter
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {pieData.map((_, index) => (
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

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Shelter Distribution</h3>
          <div className="space-y-4">
            {Array.from(new Set(shelters.map(s => s.city))).map(city => {
              const cityShelters = shelters.filter(s => s.city === city);
              const cityParticipants = cityShelters.reduce((sum, s) => sum + (s.participantCount || 0), 0);
              const verifiedInCity = cityShelters.filter(s => s.verified).length;

              return (
                <div key={city} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-indigo-400" />
                      <h4 className="font-medium text-white">{city}</h4>
                    </div>
                    <span className="text-sm text-gray-400">
                      {cityShelters.length} shelters
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="h-4 w-4 text-emerald-400" />
                      <span>{cityParticipants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Building2 className="h-4 w-4 text-amber-400" />
                      <span>{verifiedInCity} verified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}