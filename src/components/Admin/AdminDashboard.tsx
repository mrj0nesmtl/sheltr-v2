import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useShelterStore } from '../../stores/shelterStore';
import { Icon } from '@/components/ui/Icon';
import { cn } from '../../lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const COLORS = {
  primary: '#6366F1',    // Indigo
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Yellow
  error: '#EF4444',      // Red
  purple: '#8B5CF6',     // Purple
  blue: '#3B82F6',       // Blue
  pink: '#EC4899',       // Pink
  orange: '#F97316'      // Orange
};

interface AdminStats {
  totalDonations: number;
  totalParticipants: number;
  totalAmount: number;
  participantGrowth: Array<{
    date: string;
    count: number;
  }>;
  donationsByService: Array<{
    service: string;
    count: number;
  }>;
  recentDonations: Array<{
    id: string;
    amount: number;
    created_at: string;
    participant?: { name: string };
  }>;
  monthlyStats: Array<{
    month: string;
    donations: number;
    participants: number;
    amount: number;
  }>;
  serviceDistribution: Array<{
    name: string;
    value: number;
  }>;
}

export function AdminDashboard() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { fetchShelters } = useShelterStore();
  const [stats, setStats] = useState<AdminStats>({
    totalDonations: 0,
    totalParticipants: 0,
    totalAmount: 0,
    participantGrowth: [],
    donationsByService: [],
    recentDonations: [],
    monthlyStats: [
      { month: 'Jan', donations: 145, participants: 89, amount: 12500 },
      { month: 'Feb', donations: 178, participants: 102, amount: 15800 },
      { month: 'Mar', donations: 165, participants: 118, amount: 14200 },
      { month: 'Apr', donations: 234, participants: 132, amount: 19500 },
      { month: 'May', donations: 256, participants: 145, amount: 22000 },
      { month: 'Jun', donations: 278, participants: 160, amount: 24500 }
    ],
    serviceDistribution: [
      { name: 'Emergency Shelter', value: 35 },
      { name: 'Food Services', value: 25 },
      { name: 'Medical Care', value: 15 },
      { name: 'Job Training', value: 25 }
    ]
  });

  useEffect(() => {
    if (!user || !['admin', 'shelter_admin'].includes(user.role)) {
      navigate('/login');
      return;
    }
    fetchShelters();
  }, [user, navigate, fetchShelters]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Icon name="dollarSign" className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Donations</p>
                <p className="text-2xl font-bold text-white">
                  ${stats.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Icon name="users" className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Participants</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalParticipants.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Icon name="barChart" className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalDonations.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Icon name="users" className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Participant Growth</p>
                <p className="text-2xl font-bold text-white">
                  {stats.participantGrowth.length.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Monthly Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.monthlyStats}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.success} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stroke={COLORS.primary}
                    fillOpacity={1}
                    fill="url(#colorDonations)"
                  />
                  <Area
                    type="monotone"
                    dataKey="participants"
                    stroke={COLORS.success}
                    fillOpacity={1}
                    fill="url(#colorParticipants)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Distribution */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Service Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.serviceDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {stats.serviceDistribution.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: Object.values(COLORS)[index % Object.values(COLORS).length] }}
                    />
                    <span className="text-sm text-gray-300">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ... More charts */}
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Recent Donations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Participant
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {stats.recentDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${donation.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {donation.participant?.name}
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