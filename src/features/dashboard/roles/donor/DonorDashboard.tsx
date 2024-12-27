import React from 'react';
import { DonationHistory } from '@/features/dashboard/shared/analytics/DonationHistory';
import { DonorStats } from '@/features/dashboard/shared/analytics/DonorStats';
import { ImpactMetrics } from '@/features/dashboard/shared/widgets/ImpactMetrics';

interface DonorDashboardProps {
  userId: string;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ userId }) => {
  console.log('DonorDashboard rendering for userId:', userId);
  
  return (
    <div className="donor-dashboard">
      <DonorStats userId={userId} />
      <DonationHistory userId={userId} />
      <ImpactMetrics userId={userId} />
    </div>
  );
}; 