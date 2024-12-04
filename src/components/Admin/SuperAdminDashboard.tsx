import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useShelterStore } from '../../stores/shelterStore';
import { Icon } from '@/components/ui/Icon';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { cn } from '@/lib/utils';

const COLORS = {
  primary: '#6366F1',    // Indigo
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Yellow
  error: '#EF4444',      // Red
  purple: '#8B5CF6',     // Purple
  blue: '#3B82F6',       // Blue
  pink: '#EC4899',       // Pink
  orange: '#F97316',     // Orange
  teal: '#14B8A6',       // Teal
  violet: '#8B5CF6'      // Violet
};

interface SuperAdminStats {
  totalShelters: number;
  verifiedShelters: number;
  totalParticipants: number;
  totalDonations: number;
  regionalData: Array<{
    region: string;
    shelters: number;
    participants: number;
    donations: number;
    successRate: number;
  }>;
  serviceMetrics: Array<{
    service: string;
    usage: number;
    success: number;
    impact: number;
  }>;
  shelterPerformance: Array<{
    name: string;
    participants: number;
    donations: number,
    efficiency: number
  }>;
  impactMetrics: Array<{
    metric: string;
    value: number;
    maximum: number;
  }>;
  topShelters: Array<{
    name: string;
    totalRaised: number;
    participantCount: number;
    avgDonationSize: number;
    growthRate: number;
  }>;
}

export function SuperAdminDashboard() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { shelters, isLoading, fetchShelters } = useShelterStore();

  const [stats, setStats] = useState<SuperAdminStats>({
    totalShelters: 0,
    verifiedShelters: 0,
    totalParticipants: 0,
    totalDonations: 0,
    regionalData: [
      { region: 'North', shelters: 12, participants: 450, donations: 125000, successRate: 78 },
      { region: 'South', shelters: 15, participants: 580, donations: 168000, successRate: 82 },
      { region: 'East', shelters: 8, participants: 320, donations: 98000, successRate: 75 },
      { region: 'West', shelters: 10, participants: 410, donations: 145000, successRate: 80 }
    ],
    serviceMetrics: [
      { service: 'Emergency Housing', usage: 85, success: 75, impact: 90 },
      { service: 'Food Services', usage: 95, success: 85, impact: 88 },
      { service: 'Medical Care', usage: 65, success: 80, impact: 85 },
      { service: 'Job Training', usage: 75, success: 70, impact: 82 },
      { service: 'Mental Health', usage: 60, success: 72, impact: 78 }
    ],
    shelterPerformance: [
      { name: 'Shelter A', participants: 120, donations: 45000, efficiency: 89 },
      { name: 'Shelter B', participants: 85, donations: 32000, efficiency: 92 },
      { name: 'Shelter C', participants: 150, donations: 55000, efficiency: 87 },
      { name: 'Shelter D', participants: 95, donations: 38000, efficiency: 90 }
    ],
    impactMetrics: [
      { metric: 'Housing Success', value: 82, maximum: 100 },
      { metric: 'Job Placement', value: 68, maximum: 100 },
      { metric: 'Healthcare Access', value: 75, maximum: 100 },
      { metric: 'Food Security', value: 90, maximum: 100 },
      { metric: 'Community Integration', value: 85, maximum: 100 }
    ],
    topShelters: [
      { name: 'Hope Center', totalRaised: 285000, participantCount: 145, avgDonationSize: 750, growthRate: 23 },
      { name: 'New Beginnings', totalRaised: 245000, participantCount: 120, avgDonationSize: 680, growthRate: 18 },
      { name: 'Harmony House', totalRaised: 198000, participantCount: 95, avgDonationSize: 620, growthRate: 15 },
      { name: 'Fresh Start', totalRaised: 176000, participantCount: 85, avgDonationSize: 590, growthRate: 12 },
      { name: 'Unity Shelter', totalRaised: 154000, participantCount: 75, avgDonationSize: 550, growthRate: 10 }
    ]
  });

  useEffect(() => {
    if (!user || user.role !== 'super_admin') {
      navigate('/login');
      return;
    }

    fetchShelters();
  }, [user, navigate, fetchShelters]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/10 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-white/10 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Super Admin Dashboard</h1>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ... Stat cards similar to AdminDashboard */}
        </div>

        {/* Advanced Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Performance Radar Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Service Performance Matrix</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.serviceMetrics}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="service" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Radar
                    name="Usage"
                    dataKey="usage"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Success"
                    dataKey="success"
                    stroke={COLORS.success}
                    fill={COLORS.success}
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Impact"
                    dataKey="impact"
                    stroke={COLORS.warning}
                    fill={COLORS.warning}
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Shelter Performance Scatter Plot */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Shelter Performance Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="participants" 
                    name="Participants" 
                    stroke="#9CA3AF"
                    label={{ value: 'Participants', position: 'bottom', fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    dataKey="donations" 
                    name="Donations" 
                    stroke="#9CA3AF"
                    label={{ value: 'Donations ($)', angle: -90, position: 'left', fill: '#9CA3AF' }}
                  />
                  <ZAxis 
                    dataKey="efficiency" 
                    range={[50, 400]} 
                    name="Efficiency"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem'
                    }}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Scatter
                    data={stats.shelterPerformance}
                    fill={COLORS.purple}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Regional Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Add more visualizations */}
        </div>

        {/* Quick Stats Quadrant */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Shelters Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Icon name="building" className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Shelters</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">{stats.totalShelters}</p>
                  <span className="text-sm text-green-400">+12%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full" 
                style={{ width: `${(stats.verifiedShelters / stats.totalShelters) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {stats.verifiedShelters} verified shelters
            </p>
          </div>

          {/* Active Participants Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Icon name="users" className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Participants</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">{stats.totalParticipants}</p>
                  <span className="text-sm text-green-400">+8%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Icon name="trendingUp" className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-400">
                {Math.round((stats.totalParticipants / stats.totalShelters))} avg. per shelter
              </span>
            </div>
          </div>

          {/* Total Donations Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Icon name="dollarSign" className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Donations</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">
                    ${(stats.totalDonations / 1000000).toFixed(1)}M
                  </p>
                  <span className="text-sm text-green-400">+15%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Icon name="barChart" className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-400">
                ${Math.round(stats.totalDonations / stats.totalParticipants)} per participant
              </span>
            </div>
          </div>

          {/* Success Rate Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Icon name="barChart" className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">78%</p>
                  <span className="text-sm text-green-400">+5%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Icon name="checkCircle" className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-400">
                Above industry average
              </span>
            </div>
          </div>
        </div>

        {/* Top Performing Shelters Leaderboard */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <h3 className="text-lg font-medium text-white mb-6">Top Performing Shelters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Shelter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Raised</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Donation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {stats.topShelters.map((shelter, index) => (
                  <tr key={shelter.name} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        index === 0 && "bg-yellow-500/20 text-yellow-300",
                        index === 1 && "bg-gray-400/20 text-gray-300",
                        index === 2 && "bg-orange-500/20 text-orange-300"
                      )}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                      {shelter.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${shelter.totalRaised.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {shelter.participantCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${shelter.avgDonationSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <Icon name="trendingUp" className="h-4 w-4" />
                        {shelter.growthRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}