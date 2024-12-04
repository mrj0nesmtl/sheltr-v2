import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { DonorStats } from './Analytics/DonorStats';
import { DonationHistory } from './Analytics/DonationHistory';
import { ImpactMetrics } from './Analytics/ImpactMetrics';
import { DonationMap } from '../Map/DonationMap';

export function DonorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || user.role !== 'donor') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Sample data - would come from API in real app
  const stats = {
    totalDonated: 2500,
    currentStreak: 7,
    longestStreak: 14,
    impactScore: 450,
    donationCount: 25
  };

  const donationHistory = [
    { date: '2024-01-01', amount: 100 },
    { date: '2024-01-15', amount: 150 },
    { date: '2024-02-01', amount: 200 },
    { date: '2024-02-15', amount: 100 },
    { date: '2024-03-01', amount: 250 }
  ];

  const impactMetrics = {
    directSupport: 2000,
    housingFund: 375,
    operations: 125
  };

  const sampleMarkers = [
    {
      id: '1',
      location: { lat: 40.7128, lng: -74.0060 },
      amount: 50,
      participantName: "John Doe",
      timestamp: new Date().toISOString(),
      type: 'donation' as const
    },
    {
      id: '2',
      location: { lat: 34.0522, lng: -118.2437 },
      amount: 75,
      participantName: "Jane Smith",
      timestamp: new Date().toISOString(),
      type: 'donation' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Donor Dashboard</h1>
          </div>

          {/* Stats Section */}
          <DonorStats stats={stats} className="mb-8" />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DonationHistory donations={donationHistory} />
            <ImpactMetrics metrics={impactMetrics} />
          </div>

          {/* Map Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Impact Map</h3>
            <div className="h-[400px]">
              <DonationMap markers={sampleMarkers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}