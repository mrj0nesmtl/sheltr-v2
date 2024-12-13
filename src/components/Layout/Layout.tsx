import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';

export function Layout() {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <a href="/" className="text-white font-bold text-xl">SHELTR</a>
              
              {/* Main Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <a href="/how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
                <a href="/solutions" className="text-gray-300 hover:text-white">Solutions</a>
                <a href="/scan-donate" className="text-gray-300 hover:text-white">Scan & Donate</a>
                <a href="/impact" className="text-gray-300 hover:text-white">Impact</a>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <a href="/login" className="text-gray-300 hover:text-white">Sign In</a>
              <a 
                href="/signup" 
                className="bg-indigo-600 px-4 py-2 rounded-md text-white hover:bg-indigo-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {!user && <Footer />}
    </div>
  );
} 