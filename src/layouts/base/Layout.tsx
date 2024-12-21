import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
} 