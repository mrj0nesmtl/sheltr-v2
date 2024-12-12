import React from 'react';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Outlet />
    </div>
  );
}
