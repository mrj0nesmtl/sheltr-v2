import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Layout } from '../Layout/Layout';

export function AuthLayout() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col bg-gray-900">
        <main className="flex-1 flex items-center justify-center p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Layout>
  );
}