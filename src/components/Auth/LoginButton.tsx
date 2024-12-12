import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '../../stores/authStore';
import { cn } from '../../lib/utils';

export function LoginButton() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (user) {
    return (
      <Link
        to={getDashboardPath(user.role)}
        className={cn(
          "flex items-center gap-2 bg-indigo-600 text-white px-4 py-2",
          "rounded-md hover:bg-indigo-700 transition-colors"
        )}
      >
        <Icon name="user" className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      className={cn(
        "flex items-center gap-2 text-gray-300 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
    >
      <Icon name="login" className="h-5 w-5" />
      <span>Login</span>
    </Link>
  );
}
function getDashboardPath(role: string): string {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return '/admin/dashboard';
    case 'user':
      return '/user/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/';
  }
}
