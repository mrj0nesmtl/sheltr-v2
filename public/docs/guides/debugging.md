# 🔧 SHELTR Debugging Guide
*Last Updated: December 25, 2024*
*Version: 0.4.9*

## Common Issues & Solutions

### 1. Authentication System
```typescript
interface AuthDebugging {
  loginPage: {
    symptoms: ['Blank page', 'Loading state stuck', 'Form not rendering'],
    checks: [
      'Supabase connection',
      'AuthProvider mounting',
      'Route configuration'
    ],
    solutions: [
      'Verify .env configuration',
      'Check AuthProvider wrapper',
      'Validate route guards'
    ]
  },
  sessionManagement: {
    symptoms: ['Session loss', 'Infinite redirects'],
    locations: [
      'src/auth/components/AuthProvider.tsx',
      'src/auth/stores/authStore.ts'
    ],
    solutions: [
      'Check token refresh logic',
      'Verify session persistence',
      'Debug auth state updates'
    ]
  }
}
```

### 2. Layout System Issues
```typescript
interface LayoutDebugging {
  sidebar: {
    critical: [
      'index.tsx',          // Core navigation
      'DebugSidebar.tsx',   // Development testing
      'DonorSidebar.tsx'    // Role-specific navigation
    ],
    location: 'src/layouts/specialized/dashboard/Sidebar/',
    symptoms: [
      'White screen',
      'Navigation missing',
      'Role-based content not showing'
    ],
    solutions: [
      'Check component mounting',
      'Verify role-based rendering',
      'Validate auth context'
    ]
  },
  dashboard: {
    components: ['DashboardHeader.tsx', 'DashboardLayout.tsx'],
    location: 'src/layouts/specialized/dashboard/components/',
    checks: [
      'Component hierarchy',
      'Auth state integration',
      'Route protection'
    ]
  }
}
```

## Diagnostic Tools

### 1. Development Environment
```bash
# Environment Verification
npm run check-env     # Verify environment variables
npm run type-check    # Run TypeScript checks
npm run lint         # ESLint verification

# Component Testing
npm run test:components  # Run component tests
npm run storybook       # Visual component testing

# E2E Testing
npm run cypress:open    # Interactive testing
npm run cypress:run     # Headless testing
```

### 2. Runtime Debugging
```typescript
interface DebugTools {
  browser: {
    react: 'React Developer Tools',
    network: 'Chrome DevTools Network',
    storage: ['Local Storage', 'Session Storage', 'IndexedDB']
  },
  logging: {
    levels: ['error', 'warn', 'info', 'debug'],
    locations: [
      'src/utils/logger.ts',
      'src/features/**/debug.ts'
    ]
  },
  monitoring: {
    performance: 'Lighthouse',
    errors: 'Sentry',
    analytics: 'Vercel Analytics'
  }
}
```

## Common Error Patterns

### 1. Authentication Errors
```typescript
interface AuthErrors {
  login: {
    E001: 'Supabase connection failed',
    E002: 'Invalid credentials format',
    E003: 'Session initialization failed'
  },
  session: {
    E101: 'Token refresh failed',
    E102: 'Role validation error',
    E103: 'Permission denied'
  }
}
```

### 2. Layout Errors
```typescript
interface LayoutErrors {
  rendering: {
    L001: 'Component failed to mount',
    L002: 'Role-based content error',
    L003: 'Navigation state invalid'
  },
  routing: {
    R001: 'Invalid route configuration',
    R002: 'Guard condition failed',
    R003: 'Role access denied'
  }
}
```

## Recovery Procedures

### 1. Critical System Recovery
```bash
# Reset environment
npm clean-install
npm run build

# Verify core systems
npm run verify:auth
npm run verify:layout
npm run verify:routes

# Test critical paths
npm run test:critical
```

### 2. Component Recovery
```typescript
interface RecoverySteps {
  auth: [
    'Verify Supabase connection',
    'Check AuthProvider mounting',
    'Test session management'
  ],
  layout: [
    'Validate component tree',
    'Check role-based rendering',
    'Test navigation state'
  ],
  routing: [
    'Verify route configuration',
    'Test guards and middleware',
    'Check role permissions'
  ]
}
```

## Performance Debugging

### 1. Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Check performance metrics
npm run lighthouse
```

### 2. Runtime Performance
```typescript
interface PerformanceChecks {
  metrics: {
    FCP: 'First Contentful Paint',
    LCP: 'Largest Contentful Paint',
    TTI: 'Time to Interactive'
  },
  tools: {
    profiler: 'React Profiler',
    network: 'Network Tab',
    memory: 'Memory Usage'
  }
}
```

## Development Tips

### 1. Quick Fixes
- Clear local storage and session data
- Reset environment variables
- Rebuild node modules
- Clear build cache
- Check component mounting order

### 2. Prevention
- Use TypeScript strict mode
- Implement proper error boundaries
- Add comprehensive logging
- Maintain test coverage
- Document debug procedures

---
*For architecture details, see [architecture.md](../core/architecture.md)*
*For technical specs, see [technical.md](../core/technical.md)*