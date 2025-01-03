import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockGrowthData = [
  { month: 'Jan', users: 120, donations: 45000, shelters: 12 },
  { month: 'Feb', users: 168, donations: 52000, shelters: 15 },
  { month: 'Mar', users: 245, donations: 68000, shelters: 18 },
  { month: 'Apr', users: 350, donations: 85000, shelters: 22 },
  { month: 'May', users: 420, donations: 98000, shelters: 25 }
];

const mockUserActivity = {
  activeToday: 156,
  weeklyActive: 892,
  topLocations: [
    { city: 'Montreal', users: 234 },
    { city: 'Toronto', users: 189 },
    { city: 'Vancouver', users: 145 }
  ]
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'donation',
    user: 'Anonymous',
    action: 'Donated $500 to Hope Haven',
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'shelter',
    user: 'Mercy House',
    action: 'Updated facility capacity',
    timestamp: '15 minutes ago'
  },
  {
    id: 3,
    type: 'user',
    user: 'John Doe',
    action: 'Registered as volunteer',
    timestamp: '1 hour ago'
  }
];

export function DetailedAnalytics() {
  return (
    <div className="space-y-6 p-4">
      {/* Growth Trends */}
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Growth Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockGrowthData}>
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#E5E7EB'
                }}
              />
              <Line type="monotone" dataKey="users" stroke="#60A5FA" />
              <Line type="monotone" dataKey="donations" stroke="#34D399" />
              <Line type="monotone" dataKey="shelters" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">User Activity</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400">Active Today</p>
            <p className="text-3xl font-bold text-gray-200">{mockUserActivity.activeToday}</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400">Weekly Active</p>
            <p className="text-3xl font-bold text-gray-200">{mockUserActivity.weeklyActive}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Top Locations</h4>
          {mockUserActivity.topLocations.map((location, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-gray-300">{location.city}</span>
              <span className="text-gray-400">{location.users} users</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'donation' ? 'bg-green-400' :
                  activity.type === 'shelter' ? 'bg-blue-400' : 'bg-yellow-400'
                }`} />
                <div>
                  <p className="text-gray-300">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 