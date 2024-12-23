import React from 'react';
import { DonationHistory } from '../common/DonationHistory';
import { ImpactMetrics } from '../common/ImpactMetrics';
import { DonorStats } from '@/components/shared/analytics/DonorStats';

interface DonorDashboardProps {
  userId: string;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ userId }) => {
  return (
    <div className="donor-dashboard">
      <DonorStats userId={userId} />
      <DonationHistory userId={userId} />
      <ImpactMetrics userId={userId} />
    </div>
  );
}; 