import React from 'react';
import { formatDistance } from 'date-fns';
import { QrCode, DollarSign, UserCog, LogIn } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Activity {
  id: string;
  type: 'qr_scan' | 'donation' | 'profile_update' | 'login';
  metadata: Record<string, any>;
  created_at: string;
}

interface ActivityLogProps {
  activities: Activity[];
  className?: string;
}

export function ActivityLog({ activities, className }: ActivityLogProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'qr_scan':
        return <QrCode className="h-4 w-4 text-blue-400" />;
      case 'donation':
        return <DollarSign className="h-4 w-4 text-green-400" />;
      case 'profile_update':
        return <UserCog className="h-4 w-4 text-purple-400" />;
      case 'login':
        return <LogIn className="h-4 w-4 text-indigo-400" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'qr_scan':
        return `Scanned QR code for ${activity.metadata.participant_name}`;
      case 'donation':
        return `Donated $${activity.metadata.amount} to ${activity.metadata.participant_name}`;
      case 'profile_update':
        return 'Updated profile information';
      case 'login':
        return 'Logged in to account';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-400">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 bg-white/5 rounded-lg p-3"
            >
              <div className="p-2 bg-white/10 rounded-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <p className="text-white">{getActivityText(activity)}</p>
                <p className="text-sm text-gray-400">
                  {formatDistance(new Date(activity.created_at), new Date(), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}