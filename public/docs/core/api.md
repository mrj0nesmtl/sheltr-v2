# 🔌 SHELTR API Documentation
*Last Updated: January 25, 2024 23:45 EST*
*Version: 0.6.6*
*Status: STABLE* 🟢

## API Overview
SHELTR's API provides enterprise-grade, role-based endpoints with real-time WebSocket support, blockchain integration, and AI-ready infrastructure. Enhanced security measures include advanced monitoring and automated threat detection.

## Base Configuration
```typescript
interface APIConfig {
  endpoints: {
    production: 'https://sheltr-beta.replit.app',
    development: 'http://localhost:5173',
  },
  version: 'v1',
  timeout: 30000,
  retryAttempts: 3,
  roleValidation: true,
  pathValidation: true,
  wsConnection: true,
  aiReady: true,
  monitoring: {
    enabled: true,
    performance: true,
    security: true
  }
}
```

## Authentication
```typescript
interface AuthHeaders {
  Authorization: `Bearer ${string}`;
  'Content-Type': 'application/json';
  'X-Client-Version': string;
  'X-Role-Access': UserRole;
  'X-Path-Validation': string;
  'X-Request-ID': string;
}

type UserRole = 'super_admin' | 'shelter_admin' | 'donor' | 'participant';
```

## Core Endpoints

### Authentication & Authorization
```typescript
interface AuthEndpoints {
  login: 'POST /auth/login',
  register: 'POST /auth/register',
  logout: 'POST /auth/logout',
  session: 'GET /auth/session',
  refresh: 'POST /auth/refresh',
  verify: 'POST /auth/verify',
  resetPassword: 'POST /auth/reset-password',
  validateRole: 'POST /auth/validate-role',
  validatePath: 'POST /auth/validate-path'
}
```

### Role-Based Navigation
```typescript
interface NavigationEndpoints {
  getRoleRoutes: 'GET /navigation/routes/:role',
  validateAccess: 'POST /navigation/validate',
  getPathPermissions: 'GET /navigation/permissions/:path',
  getUserNavigation: 'GET /navigation/user/:userId'
}
```

### Dashboard & Analytics
```typescript
interface DashboardEndpoints {
  analytics: 'GET /dashboard/analytics',
  metrics: 'GET /dashboard/metrics',
  performance: 'GET /dashboard/performance',
  realtime: 'WS /dashboard/realtime',
  roleMetrics: 'GET /dashboard/:role/metrics'
}
```

### Donation Management
```typescript
interface DonationEndpoints {
  create: 'POST /donations/create',
  verify: 'POST /donations/verify',
  history: 'GET /donations/history',
  analytics: 'GET /donations/analytics',
  impact: 'GET /donations/impact',
  blockchain: 'POST /donations/blockchain/verify'
}
```

### User Management
```typescript
interface UserEndpoints {
  profile: 'GET /users/profile',
  update: 'PUT /users/update',
  statistics: 'GET /users/statistics',
  preferences: 'PATCH /users/preferences',
  roles: 'GET /users/roles',
  permissions: 'GET /users/permissions',
  validateAccess: 'POST /users/validate-access'
}
```

### Super Admin Dashboard
```typescript
interface SuperAdminEndpoints {
  systemMetrics: 'GET /admin/metrics',
  userManagement: 'GET /admin/users',
  securityLogs: 'GET /admin/security/logs',
  performanceStats: 'GET /admin/performance',
  roleManagement: 'PUT /admin/roles',
  systemHealth: 'GET /admin/health',
  auditTrails: 'GET /admin/audit'
}
```

### Analytics & Monitoring
```typescript
interface AnalyticsEndpoints {
  metrics: 'GET /analytics/metrics',
  performance: 'GET /analytics/performance',
  security: 'GET /analytics/security',
  realtime: 'WS /analytics/realtime',
  aiInsights: 'GET /analytics/ai/insights',
  blockchain: 'GET /analytics/blockchain'
}
```

## Response Formats
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  metadata: {
    timestamp: string;
    version: string;
    requestId: string;
    processingTime: number;
    roleValidated?: boolean;
    pathValidated?: boolean
  };
}

interface APIError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
  path: string;
  requestId: string;
  roleContext?: string;
  pathContext?: string
}
```

## Security Enhancements
```typescript
interface SecurityConfig {
  rateLimit: {
    window: 60000,
    max: 100,
    burst: 200,
    cooldown: 60,
    aiProtection: true
  },
  cors: {
    origins: [
      'https://sheltr-beta.replit.app',
      'https://staging.sheltr-beta.replit.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    secureHeaders: true
  },
  monitoring: {
    enabled: true,
    metrics: true,
    alerts: true,
    aiDetection: true,
    blockchain: true
  }
}
```

## Performance Metrics
```typescript
interface PerformanceMetrics {
  responseTime: {
    p50: '< 50ms',
    p95: '< 100ms',
    p99: '< 150ms'
  },
  availability: '99.99%',
  errorRate: '< 0.01%',
  concurrency: {
    max: 1000,
    sustained: 500
  }
}
```

## WebSocket Events
```typescript
interface WebSocketEvents {
  DONATION_CREATED: 'donation:created',
  DONATION_VERIFIED: 'donation:verified',
  METRICS_UPDATED: 'metrics:updated',
  USER_ACTIVITY: 'user:activity',
  SYSTEM_ALERT: 'system:alert',
  ROLE_UPDATED: 'role:updated',
  PATH_VALIDATED: 'path:validated',
  PERFORMANCE_ALERT: 'performance:alert',
  SECURITY_EVENT: 'security:event'
}
```

## Rate Limiting
- Standard: 100 requests per minute
- Authenticated: 200 requests per minute
- Admin: 500 requests per minute
- Burst: 200 requests
- Cooldown: 60 seconds

## Versioning
- Current: v1
- Format: application/vnd.sheltr.v1+json
- Deprecation: 6 months notice
- Legacy Support: 12 months

## Health Checks
```typescript
interface HealthCheck {
  '/health': {
    status: 'healthy' | 'degraded' | 'unhealthy',
    uptime: number,
    version: string,
    services: Record<string, 'up' | 'down'>,
    roleValidation: 'active' | 'inactive',
    pathValidation: 'active' | 'inactive',
    lastIncident: string | null,
    performance: {
      cpu: number,
      memory: number,
      responseTime: number
    }
  }
}
```

---
*Updated with Super Admin dashboard endpoints and enhanced security measures*
*For implementation details, see [implementation.md](./implementation.md)*
*For architecture overview, see [architecture.md](./architecture.md)*
