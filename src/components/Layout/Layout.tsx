import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/Navigation/Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
} 