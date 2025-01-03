import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/auth/stores/authStore';
import { useTranslation } from 'react-i18next';
import { DashboardHeader } from '@/features/dashboard/shared/components/DashboardHeader';
import { DashboardAnalytics } from '@/features/shared/analytics';
import { MetricCard, Card, SignOutButton } from '@/components/ui';
import { ResourceUtilization, ProgressMetrics } from '@/features/shared/analytics/charts';
import { ServiceHistory } from '@/features/shared/analytics/tables';
import { LoadingSpinner } from '@/components/ui';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AUTH_ROLES } from '@/auth/types';

export const ParticipantDashboard = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load participant data:', error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6 text-gray-100">
        <div className="flex justify-between items-center">
          <DashboardHeader 
            title={t('dashboard.participant.title')} 
            user={user}
          />
          <SignOutButton variant="header" />
        </div>

        {/* Metric Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title={t('dashboard.participant.metrics.progress')}
            value="75%"
            trend="up"
            change={5}
          />
          <MetricCard
            title={t('dashboard.participant.metrics.resources')}
            value="12"
            trend="up"
            change={2}
          />
          <MetricCard
            title={t('dashboard.participant.metrics.events')}
            value="3"
            label={t('dashboard.participant.metrics.upcoming')}
          />
          <MetricCard
            title={t('dashboard.participant.metrics.achievements')}
            value="8"
            trend="up"
            change={1}
          />
        </div>

        {/* Analytics Section */}
        <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <DashboardAnalytics 
            role={AUTH_ROLES.PARTICIPANT}
            components={{
              ResourceUtilization,
              ProgressMetrics
            }}
          />
        </Card>

        {/* Activity & Resources */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">
              {t('dashboard.participant.activity.title')}
            </h3>
            <ServiceHistory 
              limit={5}
              className="w-full"
            />
          </Card>
          
          <Card className="p-6 bg-slate-800/50 backdrop-blur-lg border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">
              {t('dashboard.participant.resources.title')}
            </h3>
            <ResourceUtilization 
              timeframe="weekly"
              showGoals
              className="w-full"
            />
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ParticipantDashboard;