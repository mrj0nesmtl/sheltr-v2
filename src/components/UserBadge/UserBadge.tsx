import React from 'react';
import { Shield, Building2, Heart, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { UserRole } from '../../lib/types/auth';

interface UserBadgeProps {
  role: UserRole;
  verified?: boolean;
  className?: string;
}

export function UserBadge({ role, verified, className }: UserBadgeProps) {
  const getBadgeConfig = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return {
          icon: Shield,
          label: 'Super Admin',
          colors: 'bg-red-500/20 text-red-300 border-red-500/50'
        };
      case 'admin':
        return {
          icon: Building2,
          label: 'Shelter Admin',
          colors: 'bg-purple-500/20 text-purple-300 border-purple-500/50'
        };
      case 'shelter_admin':
        return {
          icon: Building2,
          label: verified ? 'Verified Shelter' : 'Shelter Admin',
          colors: verified 
            ? 'bg-green-500/20 text-green-300 border-green-500/50'
            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
        };
      case 'donor':
        return {
          icon: Heart,
          label: 'Donor',
          colors: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
        };
      case 'participant':
        return {
          icon: User,
          label: 'Participant',
          colors: 'bg-blue-500/20 text-blue-300 border-blue-500/50'
        };
      default:
        return {
          icon: User,
          label: 'User',
          colors: 'bg-gray-500/20 text-gray-300 border-gray-500/50'
        };
    }
  };

  const { icon: Icon, label, colors } = getBadgeConfig(role);

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1",
        "rounded-full border",
        colors,
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}