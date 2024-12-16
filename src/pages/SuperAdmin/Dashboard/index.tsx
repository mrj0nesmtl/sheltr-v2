import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

console.log('🚀 SuperAdminDashboard component loading...');

export default function SuperAdminDashboard() {
  console.log('🎯 SuperAdminDashboard rendering...');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Super Admin Dashboard</h1>
      <div className="bg-gray-800 p-4 rounded">
        <p className="text-white">Test Content</p>
      </div>
    </div>
  );
}