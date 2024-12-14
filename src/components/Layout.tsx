import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Header } from './Layout/Header';
import { NavigationItems } from './Navigation/NavigationItems';
import { Footer } from './Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16">
        <div className="flex">
          {user && (
            <aside className="hidden md:block fixed left-0 w-64 h-full bg-gray-800">
              <NavigationItems />
            </aside>
          )}
          <main className={`flex-1 ${user ? 'ml-0 md:ml-64' : ''} p-6`}>
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}