import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Layout } from '../Layout/Layout';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        {children}
      </div>
    </div>
  );
};