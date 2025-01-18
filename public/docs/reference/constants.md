# 🔒 SHELTR Constants Reference
*Last Updated: January 17, 2025 22:15 EST*
*Version: 0.6.0*
*Status: STABLE* 🟢

## ⚠️ STATUS UPDATE
Navigation optimization and i18n infrastructure complete. Constants updated to support optimized navigation mounting, language management, and enhanced performance monitoring.

## API Constants

### Endpoints (✅ STABLE)
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',      // ✅ Stable
    REGISTER: '/auth/register', // ✅ Stable
    LOGOUT: '/auth/logout',     // ✅ Stable
    VERIFY: '/auth/verify',     // ✅ Stable
    REFRESH: '/auth/refresh'    // ✅ Stable
  },
  BADGES: {
    GET: '/badges/get',         // ✅ Implemented
    UPDATE: '/badges/update',   // ✅ Implemented
    VERIFY: '/badges/verify'    // ✅ Implemented
  },
  REALTIME: {
    CONNECT: '/ws/connect',     // ✅ Implemented
    STATUS: '/ws/status',       // ✅ Implemented
    EVENTS: '/ws/events'        // ✅ Implemented
  },
  ANALYTICS: {
    METRICS: '/analytics/metrics', // ✅ New
    EVENTS: '/analytics/events',   // ✅ New
    REPORTS: '/analytics/reports'  // ✅ New
  },
  NAVIGATION: {
    STATE: '/nav/state',        // ✅ New
    METRICS: '/nav/metrics',    // ✅ New
    OPTIMIZE: '/nav/optimize'   // ✅ New
  },
  I18N: {
    LANGUAGES: '/i18n/langs',   // ✅ New
    TRANSLATIONS: '/i18n/trans', // ✅ New
    FALLBACKS: '/i18n/falls'    // ✅ New
  }
} as const;
```

### Configuration (✅ STABLE)
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://sheltr.replit.app',
  VERSION: 'v1',
  TIMEOUT: 30000,              // Optimized
  RETRY_ATTEMPTS: 3,           // Optimized
  AUTH_TIMEOUT: 20000,         // Optimized
  CACHE_CONTROL: 'no-store',   // Implemented
  WEBSOCKET_RETRY: 5000,       // Implemented
  OFFLINE_SYNC: 300000,        // New: 5min sync
  PWA_VERSION: '1.0.0',         // New
  NAVIGATION: {
    MOUNT_TIMEOUT: 5000,      // New
    STATE_SYNC: 1000,         // New
    METRICS_INTERVAL: 60000   // New
  },
  I18N: {
    LOAD_TIMEOUT: 3000,       // New
    CACHE_DURATION: 3600000,  // New
    FALLBACK_LANG: 'en'      // New
  }
} as const;
```

## Authentication Constants (✅ STABLE)
```typescript
export const AUTH_CONFIG = {
  SESSION: {
    TIMEOUT: 3600,            // Optimized
    REFRESH_THRESHOLD: 300,   // Optimized
    CLEAR_CACHE: true        // Implemented
  },
  ROUTES: {
    LOGIN: '/login',          // ✅ Stable
    REGISTER: '/register',    // ✅ Stable
    RESET: '/reset-password'  // ✅ Implemented
  },
  PERSISTENCE: {
    STORAGE_KEY: 'sheltr_auth',
    VERSION: 'v1',
    CLEAR_ON_LOGOUT: true    // Implemented
  }
} as const;
```

## UI Constants

### Theme (✅ STABLE)
```typescript
export const THEME = {
  COLORS: {
    PRIMARY: '#3B82F6',
    SECONDARY: '#10B981',
    ERROR: '#EF4444',
    WARNING: '#F59E0B',
    SUCCESS: '#10B981',
    INFO: '#60A5FA',    // Added
    MUTED: '#9CA3AF'    // Added
  },
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    XXL: '4rem'        // Added
  },
  SHADOWS: {           // New section
    SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    MD: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    LG: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
} as const;
```

### Breakpoints (✅ STABLE)
```typescript
export const BREAKPOINTS = {
  MOBILE: '640px',
  TABLET: '768px',
  LAPTOP: '1024px',
  DESKTOP: '1280px'
} as const;
```

## Feature Flags (✅ STABLE)
```typescript
export const FEATURES = {
  QR_SCANNER: true,           // ✅ Functional
  OFFLINE_MODE: true,         // ✅ Implemented
  ANALYTICS: true,            // ✅ Functional
  BLOCKCHAIN: true,           // ✅ Implemented
  AUTH_DEBUG: false,          // Disabled
  FORCE_LOGOUT: false,        // Disabled
  CLEAR_CACHE: true,          // Implemented
  PWA_ENABLED: true,          // New
  REAL_TIME: true            // New
} as const;
```

## Validation Constants (✅ STABLE)
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
  },
  AUTH: {
    SESSION_TIMEOUT: 3600,    // Optimized
    TOKEN_EXPIRY: 3600,      // Optimized
    MAX_ATTEMPTS: 5,         // Optimized
    FORCE_LOGOUT: false      // Disabled
  }
} as const;
```

## Role Constants (✅ STABLE)
```typescript
export const ROLES = {
  SUPER_ADMIN: 'super_admin',     // ✅ Implemented
  SHELTER_ADMIN: 'shelter_admin', // ✅ Implemented
  DONOR: 'donor',                // ✅ Implemented
  PARTICIPANT: 'participant'     // ✅ Implemented
} as const;
```

## Badge Constants (✅ STABLE)
```typescript
export const BADGES = {
  TYPES: {
    ROLE: 'role',
    STATUS: 'status',
    ACHIEVEMENT: 'achievement'
  },
  STYLES: {
    DEFAULT: 'default',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
  },
  DISPLAY: {
    SHOW_LABEL: true,
    SHOW_ICON: true,
    ANIMATE: true
  }
} as const;
```

## Status Constants (✅ STABLE)
```typescript
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  AUTH_ERROR: 'auth_error',  // Implemented
  CACHE_ERROR: 'cache_error' // Implemented
} as const;
```

## Navigation Constants (✅ NEW)
```typescript
export const NAVIGATION = {
  MOUNTING: {
    STRATEGY: 'optimized',
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3
  },
  STATE: {
    SYNC_INTERVAL: 1000,
    BATCH_UPDATES: true,
    PERSIST: true
  },
  METRICS: {
    ENABLED: true,
    INTERVAL: 60000,
    THRESHOLD: 100
  }
} as const;
```

## i18n Constants (✅ NEW)
```typescript
export const I18N = {
  LANGUAGES: {
    DEFAULT: 'en',
    SUPPORTED: ['en', 'fr'],
    RTL: ['ar', 'he']
  },
  LOADING: {
    STRATEGY: 'lazy',
    TIMEOUT: 3000,
    RETRY: 3
  },
  FALLBACKS: {
    ENABLED: true,
    CASCADE: true,
    LOG_MISSING: true
  }
} as const;
```

## Performance Constants (✅ NEW)
```typescript
export const PERFORMANCE = {
  THRESHOLDS: {
    NAV_MOUNT: 50,        // ms
    LANG_SWITCH: 100,     // ms
    ROUTE_CHANGE: 100,    // ms
    INITIAL_LOAD: 2000    // ms
  },
  MONITORING: {
    ENABLED: true,
    INTERVAL: 60000,
    SAMPLE_RATE: 100
  },
  OPTIMIZATION: {
    BATCH_UPDATES: true,
    LAZY_LOADING: true,
    PREFETCH: true
  }
} as const;
```

## Status Overview

### ✅ Stable Areas
1. Auth System
   - Enhanced session management
   - Role verification complete
   - Badge system integrated
   - Real-time ready

2. Configuration
   - WebSocket support added
   - Cache strategy optimized
   - Performance enhanced
   - Security hardened

3. Navigation System
   - Optimized mounting
   - State management
   - Performance monitoring

4. i18n Framework
   - Language management
   - Translation system
   - Fallback handling

### �� Areas In Progress
1. Real-Time Features
   - WebSocket implementation
   - Event system
   - Connection management
   - Error handling

2. Performance Monitoring
   - Metrics collection
   - Real-time tracking
   - Optimization feedback

## Recent Changes
1. Added badge constants
2. Updated role definitions
3. Added WebSocket config
4. Enhanced security measures
5. Optimized performance settings
6. Added Navigation constants
7. Added i18n constants
8. Added Performance constants
9. Enhanced API endpoints
10. Updated configuration
11. Added monitoring thresholds

## PWA Constants (✅ NEW)
```typescript
export const PWA_CONFIG = {
  CACHE: {
    VERSION: 'v1',
    STRATEGY: 'network-first',
    TIMEOUT: 3000
  },
  SYNC: {
    BACKGROUND: true,
    INTERVAL: 300000,
    RETRY: 3
  },
  NOTIFICATIONS: {
    ENABLED: true,
    VAPID_KEY: process.env.NEXT_PUBLIC_VAPID_KEY
  }
} as const;
```

## Analytics Constants (✅ NEW)
```typescript
export const ANALYTICS = {
  TRACKING: {
    ENABLED: true,
    ANONYMIZE_IP: true,
    SAMPLE_RATE: 100
  },
  EVENTS: {
    PAGE_VIEW: 'page_view',
    DONATION: 'donation',
    REGISTRATION: 'registration',
    ERROR: 'error'
  },
  METRICS: {
    PERFORMANCE: true,
    ERRORS: true,
    USAGE: true
  }
} as const;
```

---
*For implementation details, see [implementation.md](./implementation.md)*
