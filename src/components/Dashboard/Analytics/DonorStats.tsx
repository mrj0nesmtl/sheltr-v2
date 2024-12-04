import React from 'react';
import { DollarSign, TrendingUp, Calendar, Heart } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface DonorStats {
  totalDonated: number;
  currentStreak: number;
  longestStreak: number;
  impactScore: number;
  donationCount: number;
}

interface DonorStatsProps {
  stats: DonorStats;
  className?: string;
}

export function DonorStats({ stats, className }: DonorStatsProps) {
  const getImpactBadge = (score: number) => {
    if (score >= 1000) return { label: 'Champion', color: 'text-yellow-400' };
    if (score >= 500) return { label: 'Hero', color: 'text-purple-400' };
    if (score >= 100) return { label: 'Friend', color: 'text-blue-400' };
    return { label: 'Supporter', color: 'text-indigo-400' };
  };

  const { label, color } = getImpactBadge(stats.impactScore);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Donated</p>
              <p className="text-2xl font-bold text-white">
                ${stats.totalDonated.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Calendar className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-white">
                {stats.currentStreak} days
              </p>
              <p className="text-xs text-gray-400">
                Best: {stats.longestStreak} days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Impact Score</p>
              <p className="text-2xl font-bold text-white">
                {stats.impactScore}
              </p>
              <p className={cn("text-xs font-medium", color)}>
                {label}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Heart className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Donations</p>
              <p className="text-2xl font-bold text-white">
                {stats.donationCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}