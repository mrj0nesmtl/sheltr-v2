# 🌳 SHELTR Features Structure
*Generated: 2025-01-20 13:21:41*
\n## Directory Structure
./src/features
├── auth
│   ├── components
│   │   └── index.ts
│   ├── hooks
│   ├── store
│   ├── utils
│   └── index.ts
├── dashboard
│   ├── layouts
│   │   ├── participant
│   │   ├── shelter
│   │   ├── super-admin
│   │   ├── DashboardLayout.tsx
│   │   └── index.ts
│   ├── roles
│   │   ├── donor
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── profile
│   │   │   ├── DonorDashboard.tsx
│   │   │   └── index.ts
│   │   ├── participant
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── profile
│   │   │   ├── ParticipantDashboard.tsx
│   │   │   ├── ParticipantDetailAnalytics.tsx
│   │   │   └── index.ts
│   │   ├── shelter-admin
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── management
│   │   │   ├── profile
│   │   │   ├── src
│   │   │   ├── ShelterAdminDashboard.tsx
│   │   │   └── index.ts
│   │   └── super-admin
│   │       ├── analytics
│   │       ├── components
│   │       ├── profile
│   │       ├── settings
│   │       ├── AlertsAndIncidents.tsx
│   │       ├── DonationAnalytics.tsx
│   │       ├── QuickStatCard.tsx
│   │       ├── ShelterPerformanceChart.tsx
│   │       ├── SuperAdminDashboard.tsx
│   │       ├── SystemHealthMonitor.tsx
│   │       └── index.ts
│   ├── shared
│   │   ├── analytics
│   │   │   ├── charts
│   │   │   ├── maps
│   │   │   ├── metrics
│   │   │   ├── DonationHistory.tsx
│   │   │   ├── DonorStats.tsx
│   │   │   ├── PlatformStatusSection.tsx
│   │   │   ├── clear
│   │   │   └── index.ts
│   │   ├── components
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── ParticipantLeaderboard.tsx
│   │   │   ├── ParticipantRegistrationModal.tsx
│   │   │   └── index.ts
│   │   ├── navigation
│   │   │   ├── sidebar
│   │   │   ├── DashboardNav.tsx
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   ├── BaseProfile.tsx
│   │   │   ├── EditProfileModal.tsx
│   │   │   ├── ProfileLayout.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── index.ts
│   │   ├── widgets
│   │   │   ├── charts
│   │   │   ├── DonorLeaderboard.tsx
│   │   │   ├── ImpactMetrics.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── index.ts
│   │   └── types.ts
│   ├── store
│   ├── utils
│   └── index.ts
├── donor
│   ├── types
│   │   └── donor.ts
│   └── validation
│       └── donorValidation.ts
├── profile
│   ├── components
│   │   └── index.ts
│   ├── hooks
│   ├── store
│   ├── utils
│   └── index.ts
└── shared
    ├── analytics
    │   ├── charts
    │   │   ├── AreaChart.tsx
    │   │   ├── BarChart.tsx
    │   │   ├── LineChart.tsx
    │   │   ├── PieChart.tsx
    │   │   ├── ProgressMetrics.tsx
    │   │   ├── ResourceUtilization.tsx
    │   │   └── index.ts
    │   ├── hooks
    │   │   └── useAnalytics.ts
    │   ├── maps
    │   │   └── DonationMap.tsx
    │   ├── metrics
    │   │   └── MetricCard.tsx
    │   ├── tables
    │   │   ├── ServiceHistory.tsx
    │   │   └── index.ts
    │   ├── types
    │   │   └── index.ts
    │   ├── utils
    │   │   └── theme.ts
    │   ├── DonationHistory.tsx
    │   ├── DonorStats.tsx
    │   ├── index.ts
    │   ├── theme.ts
    │   └── types.ts
    ├── components
    │   └── index.ts
    ├── hooks
    ├── maps
    │   └── utils.ts
    ├── store
    ├── utils
    └── index.ts

66 directories, 66 files
