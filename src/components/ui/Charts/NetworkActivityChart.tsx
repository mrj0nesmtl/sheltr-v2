import React from 'react';

const mockNetworkData = {
  currentLoad: 42,
  peakToday: 78,
  averageResponse: 120,
  activeNodes: 15,
  recentActivity: [
    { time: '1h ago', connections: 156, status: 'normal' },
    { time: '2h ago', connections: 142, status: 'normal' },
    { time: '3h ago', connections: 168, status: 'high' },
    { time: '4h ago', connections: 130, status: 'normal' }
  ]
};

export function NetworkActivityChart() {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Network Activity</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/40 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Current Load</p>
            <p className="text-2xl font-semibold text-gray-200">{mockNetworkData.currentLoad}%</p>
          </div>
          <div className="bg-gray-800/40 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Active Nodes</p>
            <p className="text-2xl font-semibold text-gray-200">{mockNetworkData.activeNodes}</p>
          </div>
        </div>
        <div className="bg-gray-800/40 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Activity</h4>
          <div className="space-y-2">
            {mockNetworkData.recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-400">{activity.time}</span>
                <span className="text-gray-300">{activity.connections} connections</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.status === 'high' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 