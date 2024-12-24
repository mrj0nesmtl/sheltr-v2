import { useAuthStore } from '@/auth/stores/authStore';

export function SuperAdminDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Super Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Total Shelters</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-white">$0</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400">No recent activity</p>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;