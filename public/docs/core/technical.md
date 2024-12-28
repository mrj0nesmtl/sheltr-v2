# 🔧 SHELTR Technical Specifications
*Last Updated: December 28, 2024*
*Version: 0.4.12*
*Status: CRITICAL REFACTOR* 🔴

## Core Systems

### Layout System
```typescript
interface LayoutSystem {
  core: {
    base: {
      required: ['Layout.tsx', 'PageLayout.tsx'],
      location: 'src/layouts/base/',
      dependencies: ['navigation', 'footer'],
      status: 'NEEDS_REBUILD'
    },
    sidebar: {
      required: ['index.tsx', 'DebugSidebar.tsx'],
      location: 'src/layouts/specialized/dashboard/Sidebar/',
      dependencies: ['role components', 'auth context'],
      status: 'PARTIALLY_IMPLEMENTED'
    },
    dashboard: {
      required: ['DashboardHeader.tsx', 'DashboardLayout.tsx'],
      location: 'src/layouts/specialized/dashboard/components/',
      dependencies: ['auth state', 'navigation'],
      status: 'UNSTABLE'
    }
  },
  specialized: {
    donor: {
      components: ['DonorSidebar.tsx', 'DonorDashboard.tsx'],
      location: 'src/layouts/specialized/dashboard/donor/',
      status: 'NOT_IMPLEMENTED'
    },
    participant: {
      components: ['ParticipantSidebar.tsx', 'ParticipantDashboard.tsx'],
      location: 'src/layouts/specialized/dashboard/participant/',
      status: 'NOT_IMPLEMENTED'
    },
    shelterAdmin: {
      components: ['ShelterSidebar.tsx', 'ShelterDashboard.tsx'],
      location: 'src/layouts/specialized/dashboard/shelter/',
      status: 'PARTIALLY_IMPLEMENTED'
    }
  }
}
```

### Technical Dependencies
```typescript
interface TechnicalDependencies {
  core: {
    typescript: '^4.9.0',
    react: '^18.0.0',
    vite: '^4.4.0',
    node: '>=18.12.1'
  },
  backend: {
    supabase: '^2.0.0',
    database: 'PostgreSQL 15+'
  },
  styling: {
    tailwind: '^3.0.0',
    shadcn: '^0.4.0'
  },
  routing: {
    reactRouter: '^6.0.0'
  },
  stateManagement: {
    zustand: '^4.0.0'
  },
  status: {
    core: 'STABLE',
    dependencies: 'UP_TO_DATE',
    conflicts: 'NONE'
  }
}
```

### Integration Points

#### 1. Authentication (🔴 CRITICAL)
```typescript
interface AuthIntegration {
  provider: 'Supabase',
  status: 'PARTIALLY_FUNCTIONAL',
  components: {
    core: ['AuthProvider.tsx', 'RoleGuard.tsx'],
    forms: ['LoginForm.tsx', 'SignupForm.tsx'],
    hooks: ['useAuth.ts', 'useRole.ts']
  },
  flows: {
    login: {
      methods: ['email/password', 'social'],
      status: 'NEEDS_FIXING'
    },
    signup: {
      methods: ['email verification', 'role selection'],
      status: 'PARTIALLY_WORKING'
    },
    recovery: {
      methods: ['password reset', 'email verification'],
      status: 'NOT_IMPLEMENTED'
    }
  },
  issues: [
    'Session persistence',
    'Cache clearing requirement',
    'Role verification',
    'Token refresh'
  ]
}
```

#### 2. Dashboard (🔴 NEEDS_REBUILD)
```typescript
interface DashboardIntegration {
  core: {
    layout: {
      component: 'DashboardLayout.tsx',
      status: 'UNSTABLE'
    },
    navigation: {
      component: 'DashboardNavigation.tsx',
      status: 'NEEDS_REBUILD'
    },
    sidebar: {
      component: 'RoleSidebar.tsx',
      status: 'PARTIALLY_IMPLEMENTED'
    }
  },
  features: {
    analytics: {
      components: ['DonationMetrics', 'ImpactTracking'],
      status: 'NOT_IMPLEMENTED'
    },
    management: {
      components: ['UserManagement', 'RoleManagement'],
      status: 'PARTIALLY_IMPLEMENTED'
    },
    reporting: {
      components: ['ActivityReports', 'DonationReports'],
      status: 'NOT_IMPLEMENTED'
    }
  },
  state: {
    global: {
      store: 'DashboardStore',
      status: 'NEEDS_REBUILD'
    },
    local: {
      store: 'ComponentState',
      status: 'STABLE'
    },
    persistence: {
      method: 'LocalStorage',
      status: 'IMPLEMENTED'
    }
  }
}
```

#### 3. QR System (✅ STABLE)
```typescript
interface QRIntegration {
  scanner: {
    component: 'QRScanner.tsx',
    hooks: ['useScanner', 'useCameraPermissions'],
    utils: ['qrProcessing', 'validation'],
    status: 'STABLE'
  },
  generation: {
    service: 'QRGenerationService',
    types: ['donation', 'verification', 'tracking'],
    format: 'SVG',
    status: 'STABLE'
  },
  validation: {
    methods: ['blockchain', 'database'],
    security: ['encryption', 'timestamp'],
    expiry: 'configurable',
    status: 'IMPLEMENTED'
  }
}
```

## System Architecture
```typescript
interface SystemArchitecture {
  frontend: {
    framework: 'React 18+',
    routing: 'React Router v6',
    state: ['Context API', 'Zustand'],
    styling: ['Tailwind CSS', 'Shadcn UI'],
    bundler: 'Vite'
  },
  backend: {
    database: 'Supabase',
    auth: 'Supabase Auth',
    storage: 'Supabase Storage',
    realtime: 'Supabase Realtime'
  },
  deployment: {
    hosting: 'Vercel',
    ci: 'GitHub Actions',
    monitoring: 'Sentry',
    analytics: 'Vercel Analytics'
  }
}
```

## Critical Performance Requirements
```typescript
interface PerformanceRequirements {
  metrics: {
    fcp: '< 1.2s',
    lcp: '< 2.5s',
    tti: '< 3.5s',
    fid: '< 100ms',
    cls: '< 0.1'
  },
  bundle: {
    mainSize: '< 500KB',
    chunkSize: '< 200KB'
  },
  quality: {
    lighthouse: '> 90',
    typeCoverage: '> 95%',
    testCoverage: '> 80%'
  },
  current: {
    status: 'NEEDS_IMPROVEMENT',
    issues: [
      'Bundle size optimization',
      'Code splitting implementation',
      'Performance monitoring setup'
    ]
  }
}
```

## Development Standards
```typescript
interface DevelopmentStandards {
  code: {
    typescript: 'strict',
    linting: 'ESLint',
    formatting: 'Prettier',
    hooks: 'Husky'
  },
  testing: {
    unit: 'Jest',
    integration: 'React Testing Library',
    e2e: 'Cypress',
    component: 'Storybook'
  },
  documentation: {
    inline: 'TSDoc',
    storybook: true,
    readme: true,
    architecture: true
  },
  monitoring: {
    bundle: true,
    lighthouse: true,
    performance: true,
    optimization: true
  }
}
```

## Immediate Technical Priorities
1. Authentication System Rebuild
2. Dashboard Architecture Redesign
3. Role-Based Component Implementation
4. Performance Optimization
5. Testing Implementation

---
*For implementation details, see [implementation.md](./implementation.md)*
*For API specifications, see [api.md](./api.md)* 