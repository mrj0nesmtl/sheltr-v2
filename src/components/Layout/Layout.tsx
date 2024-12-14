import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';

export function Layout() {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        {user ? (
          <div className="flex">
            <div className="flex-1 ml-0 md:ml-64">
              <Outlet />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
} 