import React from 'react';
import { ShelterDashboard } from '@/components/Admin/ShelterDashboard';

export function ShelterAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Shelter Admin Dashboard</h1>
        <p className="text-gray-400">Welcome to your shelter management portal</p>
      </div>

      <ShelterDashboard />
    </div>
  );
} 