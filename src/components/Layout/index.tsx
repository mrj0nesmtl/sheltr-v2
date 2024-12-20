import { Outlet } from 'react-router-dom';
import { PageLayout } from './PageLayout';

export { PageLayout };

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Outlet />
    </div>
  );
}
