import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useShelterStore } from '../../stores/shelterStore';
import { ShelterOverview } from './Analytics/ShelterOverview';
import { ShelterMap } from './Analytics/ShelterMap';
import { ShelterTable } from './Analytics/ShelterTable';

export function SuperAdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { shelters, isLoading, error, fetchShelters, verifyShelter } = useShelterStore();

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-200">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Super Admin Dashboard</h1>
          </div>

          {/* Analytics Overview */}
          <ShelterOverview shelters={shelters} className="mb-8" />

          {/* Map and Table Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Map */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Shelter Locations</h3>
              <div className="h-[400px]">
                <ShelterMap shelters={shelters} className="h-full" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {shelters.slice(0, 5).map((shelter) => (
                  <div key={shelter.id} className="flex items-center gap-4 bg-white/5 rounded-lg p-4">
                    <div className="flex-1">
                      <p className="font-medium text-white">{shelter.organization}</p>
                      <p className="text-sm text-gray-400">
                        {shelter.participantCount || 0} participants • {shelter.city}
                      </p>
                    </div>
                    <div className="text-sm">
                      {shelter.verified ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shelter Table */}
          <ShelterTable 
            shelters={shelters} 
            onVerify={verifyShelter}
          />
        </div>
      </div>
    </div>
  );
}