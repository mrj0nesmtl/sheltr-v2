# 🌳 SHELTR Layouts Structure
*Last Updated: December 28, 2024 22:45 EST*
*Version: 0.5.0*
*Status: Active Development* 🟡

## Overview
SHELTR implements a hierarchical layout system with base layouts, specialized dashboard layouts, and role-specific components.

## Directory Structure
```
./src/layouts
├── base
│   ├── Layout.tsx             # Root layout wrapper
│   └── PageLayout.tsx         # Standard page structure
├── components
│   └── Header.tsx            # Global header component
├── dashboard
│   ├── base
│   │   └── UnifiedDashboard.tsx    # Core dashboard layout
│   ├── navigation
│   │   └── DashboardNavigation.tsx # Dashboard nav system
│   ├── roles
│   │   ├── components             # Role-specific components
│   │   │   ├── DonorDashboard.tsx
│   │   │   ├── ParticipantDashboard.tsx
│   │   │   ├── ShelterDashboard.tsx
│   │   │   └── SuperAdminDashboard.tsx
│   │   └── RoleRouter.tsx        # Role-based routing
│   └── shared
│       ├── analytics            # Shared analytics components
│       └── DashboardShell.tsx   # Dashboard container
├── specialized
│   └── dashboard
│       ├── Sidebar             # Specialized sidebar components
│       ├── components          # Custom dashboard components
│       └── index.ts
├── PageLayout.tsx              # Default page layout
├── index.ts                    # Layout exports
└── types.ts                    # Layout type definitions
```

## Layout Components

### Base Layouts
```typescript
interface BaseLayouts {
  core: {
    Layout: {
      purpose: 'Root layout wrapper',
      features: ['Error boundary', 'Theme provider', 'Auth context'],
      status: 'IMPLEMENTED'
    },
    PageLayout: {
      purpose: 'Standard page structure',
      features: ['Header', 'Footer', 'Navigation'],
      status: 'IMPLEMENTED'
    }
  },
  status: 'STABLE'
}
```

### Dashboard Layouts
```typescript
interface DashboardLayouts {
  unified: {
    base: 'UnifiedDashboard.tsx',
    navigation: 'DashboardNavigation.tsx',
    shell: 'DashboardShell.tsx',
    status: 'IMPLEMENTED'
  },
  roleSpecific: {
    donor: 'DonorDashboard.tsx',
    participant: 'ParticipantDashboard.tsx',
    shelter: 'ShelterDashboard.tsx',
    superAdmin: 'SuperAdminDashboard.tsx',
    status: 'IN_PROGRESS'
  },
  shared: {
    analytics: ['AnalyticsPanel', 'MetricsDisplay'],
    components: ['Sidebar', 'Header', 'Footer'],
    status: 'IMPLEMENTED'
  }
}
```

## Implementation Status

### Completed Components ✅
- Base Layout System
- Page Layout Structure
- Dashboard Shell
- Navigation Components
- Role Router

### In Progress 🟡
- Role-specific Dashboards
- Analytics Integration
- Specialized Components
- Performance Optimization

### Planned 🔵
- Advanced Analytics Layout
- Real-time Updates Integration
- Mobile-responsive Layouts
- Custom Theme Support

## Layout Guidelines

### 1. Structure Principles
```typescript
interface LayoutPrinciples {
  hierarchy: 'Clear component hierarchy',
  reusability: 'Maximize component reuse',
  consistency: 'Maintain visual consistency',
  flexibility: 'Support role-based customization'
}
```

### 2. Performance Considerations
- Lazy loading for dashboard components
- Code splitting by role
- Optimized bundle size
- Minimal render cycles

### 3. Accessibility Standards
- ARIA landmarks
- Keyboard navigation
- Screen reader support
- Focus management

## Next Steps
1. Complete role-specific dashboard layouts
2. Implement analytics integration
3. Enhance mobile responsiveness
4. Optimize performance
5. Add advanced features

---
*For implementation details, see [implementation.md](./implementation.md)*
*For component documentation, see [components.md](./components.md)*
