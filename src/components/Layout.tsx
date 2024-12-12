import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Header } from './Layout/Header';
import { NavigationItems } from './Navigation/NavigationItems';
import { Footer } from '@/components/ui/Footer';

export function Layout() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16">
        <div className="flex">
          {user && <NavigationItems />}
          <main className={`flex-1 ${user ? 'ml-64' : ''} p-6`}>
            <Outlet />
          </main>
        </div>
      </div>

      {!user && <Footer />}
    </div>
  );
}