# 🔒 SHELTR Constants Reference
*Version: 0.4.12 - December 28, 2024 22:00 EST*
*Status: STABLE* ✅

## ⚠️ STATUS UPDATE
Auth system stabilized. Constants updated to reflect current implementation.

## API Constants

### Endpoints (✅ STABLE)
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',      // ✅ Stable
    REGISTER: '/auth/register', // ✅ Stable
    LOGOUT: '/auth/logout',     // ✅ Stable
    VERIFY: '/auth/verify',     // ✅ Implemented
    REFRESH: '/auth/refresh'    // ✅ Implemented
  },
  DONATIONS: {
    CREATE: '/donations/create', // ✅ Functional
    LIST: '/donations/list',     // ✅ Functional
    METRICS: '/donations/metrics'// ✅ Functional
  },
  QR: {
    GENERATE: '/qr/generate',    // ✅ Functional
    VALIDATE: '/qr/validate',    // ✅ Functional
    SCAN: '/qr/scan'            // ✅ Functional
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
  CACHE_CONTROL: 'no-store'    // Implemented
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

### Breakpoints (✅ STABLE)
```typescript
export const BREAKPOINTS = {
  MOBILE: '640px',
  TABLET: '768px',
  LAPTOP: '1024px',
  DESKTOP: '1280px'
} as const;
```

## Feature Flags (🟡 IN_PROGRESS)
```typescript
export const FEATURES = {
  QR_SCANNER: true,           // ✅ Functional
  OFFLINE_MODE: false,        // 🟡 In Progress
  ANALYTICS: true,           // ✅ Functional
  BLOCKCHAIN: false,         // 🔵 Coming soon
  AUTH_DEBUG: false,         // Disabled
  FORCE_LOGOUT: false,       // Disabled
  CLEAR_CACHE: true        // Implemented
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

## Role Constants (🟡 IN_PROGRESS)
```typescript
export const ROLES = {
  ADMIN: 'admin',           // ✅ Implemented
  DONOR: 'donor',          // 🟡 In Progress
  SHELTER: 'shelter',      // 🟡 In Progress
  PARTICIPANT: 'participant'// 🔵 Planned
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

## Status Overview

### ✅ Stable Areas
1. Auth System
   - Login endpoints stable
   - Session management optimized
   - Cache management implemented
   - Token refresh functional

2. Configuration
   - Timeouts optimized
   - Retry logic optimized
   - Cache control implemented
   - Debug flags disabled

### 🟡 Areas In Progress
1. Feature Implementation
   - Offline mode in development
   - Blockchain integration planned
   - Role system enhancement
   - Advanced features planned

## Recent Changes
1. Disabled debug flags
2. Optimized timeouts
3. Implemented cache control
4. Enhanced error states
5. Updated validation rules

---
*Last Updated: December 28, 2024 22:00 EST*
*Status: STABLE* ✅
