import { WikiData } from '@/pages/Wiki/types';

export const mockWikiData: WikiData = {
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
  metrics: {
    totalDonations: 1234,
    activeShelters: 45,
    peopleHelped: 789,
    successRate: 92
  },
  systemStatus: {
    api: 'healthy',
    database: 'healthy',
    payments: 'healthy'
  },
  currentSprint: {
    number: 8,
    startDate: '2024-01-01',
    endDate: '2024-01-14',
    progress: 65
  },
  sprintTasks: [
    { id: 1, title: 'API Integration', status: 'completed' },
    { id: 2, title: 'Dashboard Updates', status: 'in-progress' },
    { id: 3, title: 'Security Audit', status: 'pending' }
  ]
}; 