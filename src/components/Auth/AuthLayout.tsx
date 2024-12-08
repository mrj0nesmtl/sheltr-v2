import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/ui/Footer';
import { Layout } from '@/components/Layout';

export function AuthLayout() {
  return (
    <Layout>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </Layout>
  );
}