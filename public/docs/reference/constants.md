# 🔒 SHELTR Constants Reference
*Version: 0.4.9 - December 22, 2024*

## API Constants

### Endpoints
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify'
  },
  DONATIONS: {
    CREATE: '/donations/create',
    LIST: '/donations/list',
    METRICS: '/donations/metrics'
  },
  QR: {
    GENERATE: '/qr/generate',
    VALIDATE: '/qr/validate',
    SCAN: '/qr/scan'
  }
} as const;
```

### Configuration
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://sheltr.replit.app',
  VERSION: 'v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
} as const;
```

## UI Constants

### Theme
```typescript
export const THEME = {
  COLORS: {
    PRIMARY: '#3B82F6',
    SECONDARY: '#10B981',
    ERROR: '#EF4444',
    WARNING: '#F59E0B',
    SUCCESS: '#10B981'
  },
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem'
  }
} as const;
```

### Breakpoints
```typescript
export const BREAKPOINTS = {
  MOBILE: '640px',
  TABLET: '768px',
  LAPTOP: '1024px',
  DESKTOP: '1280px'
} as const;
```

## Feature Flags
```typescript
export const FEATURES = {
  QR_SCANNER: true,
  OFFLINE_MODE: false,
  ANALYTICS: true,
  BLOCKCHAIN: false
} as const;
```

## Validation Constants
```typescript
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20
  }
} as const;
```

## Role Constants
```typescript
export const ROLES = {
  ADMIN: 'admin',
  DONOR: 'donor',
  SHELTER: 'shelter',
  PARTICIPANT: 'participant'
} as const;
```

## Status Constants
```typescript
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;
```

*For implementation details, see /docs/guides/best-practices.md*
