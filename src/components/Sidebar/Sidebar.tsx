import React from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';

export function Sidebar() {
  const { user } = useAuth();

  // If no user, don't render anything
  if (!user) return null;

  return (
    <aside className="w-64 h-full bg-gray-800">
      {/* Your existing sidebar content */}
    </aside>
  );
} 