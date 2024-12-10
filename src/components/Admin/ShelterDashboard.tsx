import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { SystemAlerts } from './SystemAlerts';
import { ParticipantManagementTable } from './ParticipantManagementTable';
import { ParticipantLeaderboard } from './ParticipantLeaderboard';
import { DonorList } from './DonorList';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export function ShelterDashboard() {
  const { t } = useTranslation();
  
  // System Alerts
  const [alerts] = useState([
    {
      id: '1',
      type: 'info' as const,
      message: 'System maintenance scheduled for tonight at 2 AM EST',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning' as const,
      message: 'Low balance alert for housing fund',
      timestamp: new Date()
    }
  ]);

  // Sample participant data with QR codes and login tokens
  const participants = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active' as const,
      joinDate: new Date('2024-01-15'),
      totalReceived: 2500,
      qrCode: 'PART-001-JD',
      loginToken: 'TKN-123-456',
      services: ['Housing', 'Job Training'],
      nextAppointment: new Date('2024-03-20')
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'pending' as const,
      joinDate: new Date('2024-02-20'),
      totalReceived: 1800,
      qrCode: 'PART-002-JS',
      loginToken: 'TKN-789-012',
      services: ['Food Services', 'Medical Care'],
      nextAppointment: new Date('2024-03-22')
    }
  ];

  // Sample donor data
  const donors = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      totalDonated: 5000,
      lastDonation: new Date('2024-03-10'),
      frequency: 'monthly' as const,
      status: 'active' as const,
      impactScore: 85,
      preferredServices: ['Housing', 'Medical Care']
    },
    {
      id: '2',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      totalDonated: 3000,
      lastDonation: new Date('2024-03-15'),
      frequency: 'one-time' as const,
      status: 'active' as const,
      impactScore: 72,
      preferredServices: ['Job Training']
    }
  ];

  // Monthly trends data
  const monthlyData = [
    { month: 'Jan', participants: 140, donations: 180 },
    { month: 'Feb', participants: 150, donations: 190 },
    { month: 'Mar', participants: 145, donations: 185 },
    { month: 'Apr', participants: 210, donations: 250 },
    { month: 'May', participants: 220, donations: 260 },
    { month: 'Jun', participants: 280, donations: 320 }
  ];

  // Service distribution data
  const serviceData = [
    { name: 'Emergency Shelter', value: 40, color: '#818CF8' },
    { name: 'Food Services', value: 25, color: '#34D399' },
    { name: 'Medical Care', value: 20, color: '#F87171' },
    { name: 'Job Training', value: 15, color: '#FBBF24' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header with Sign Out */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome, Joel Yaffe
          </h1>
          <p className="text-gray-400">
            Tableau de Bord Administrateur
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300">
            <Icon name="building" className="inline-block mr-2" />
            Shelter Admin
          </div>
          <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-500/10">
            Déconnexion
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      <div className="mb-8">
        <SystemAlerts alerts={alerts} onDismiss={(id) => console.log('Dismiss alert:', id)} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Participant Management Section */}
        <ParticipantManagementTable
          participants={participants}
          onViewDetails={(id) => console.log('View participant:', id)}
        />

        {/* Top Performers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParticipantLeaderboard participants={topParticipants} />
          <DonorList donors={donors} onViewDetails={(id) => console.log('View donor:', id)} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Monthly Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="participants"
                    stroke="#34D399"
                    fillOpacity={1}
                    fill="url(#colorParticipants)"
                  />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stroke="#818CF8"
                    fillOpacity={1}
                    fill="url(#colorDonations)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Distribution */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Service Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 