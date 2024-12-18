import { useAuthStore } from '@/auth/stores/authStore';
import { Footer } from '@/components/Footer/Footer';
import { Navigation } from '@/components/Navigation/Navigation';
import { Toaster } from "@/components/ui/Toaster";
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        {children}
      </div>

      <Footer />
      <Toaster />
    </div>
  );
} 