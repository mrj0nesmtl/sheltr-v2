# 🔒 SHELTR Constants Reference
*Version: 0.4.12 - December 28, 2024 22:00 EST*
*Status: CRITICAL REFACTOR* 🔴

## ⚠️ STATUS UPDATE
Auth system requires immediate verification. Constants updated to reflect current issues.

## API Constants

### Endpoints (🔴 NEEDS_REVIEW)
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',      // ⚠️ Unstable
    REGISTER: '/auth/register', // ⚠️ Unstable
    LOGOUT: '/auth/logout',     // ⚠️ Cache Issues
    VERIFY: '/auth/verify',     // 🔴 Not Working
    REFRESH: '/auth/refresh'    // ❌ Not Implemented
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

### Configuration (⚠️ NEEDS_UPDATE)
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://sheltr.replit.app',
  VERSION: 'v1',
  TIMEOUT: 30000,              // Increased for stability
  RETRY_ATTEMPTS: 3,           // Increased for reliability
  AUTH_TIMEOUT: 20000,         // Increased for auth stability
  CACHE_CONTROL: 'no-store'    // Added for auth fixes
} as const;
```

## Authentication Constants (🔴 CRITICAL)
```typescript
export const AUTH_CONFIG = {
  SESSION: {
    TIMEOUT: 3600,            // Reduced for testing
    REFRESH_THRESHOLD: 300,   // Adjusted for stability
    CLEAR_CACHE: true        // Added for login fixes
  },
  ROUTES: {
    LOGIN: '/login',          // ⚠️ Unstable
    REGISTER: '/register',    // ⚠️ Unstable
    RESET: '/reset-password'  // 🔴 Not Working
  },
  PERSISTENCE: {
    STORAGE_KEY: 'sheltr_auth',
    VERSION: 'v1',
    CLEAR_ON_LOGOUT: true    // Added for stability
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

## Feature Flags (⚠️ UPDATING)
```typescript
export const FEATURES = {
  QR_SCANNER: true,           // ✅ Functional
  OFFLINE_MODE: false,        // 🔴 Disabled
  ANALYTICS: true,           // ✅ Functional
  BLOCKCHAIN: false,         // 🔵 Coming soon
  AUTH_DEBUG: true,         // Added for testing
  FORCE_LOGOUT: true,       // Added for stability
  CLEAR_CACHE: true        // Added for auth fixes
} as const;
```

## Validation Constants (🔴 NEEDS_REVIEW)
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
    SESSION_TIMEOUT: 3600,    // Reduced for testing
    TOKEN_EXPIRY: 3600,      // Reduced for testing
    MAX_ATTEMPTS: 5,         // Increased for UX
    FORCE_LOGOUT: true       // Added for stability
  }
} as const;
```

## Role Constants (⚠️ UPDATING)
```typescript
export const ROLES = {
  ADMIN: 'admin',           // ⚠️ Partial
  DONOR: 'donor',          // ❌ Not Implemented
  SHELTER: 'shelter',      // ⚠️ Unstable
  PARTICIPANT: 'participant'// ❌ Not Implemented
} as const;
```

## Status Constants (✅ STABLE)
```typescript
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  AUTH_ERROR: 'auth_error',  // Added for auth issues
  CACHE_ERROR: 'cache_error' // Added for debugging
} as const;
```

## Status Overview

### ⚠️ Critical Areas
1. Auth System
   - Login endpoints unstable
   - Session management issues
   - Cache clearing required
   - Token refresh needed

2. Configuration
   - Timeouts adjusted
   - Retry logic enhanced
   - Cache control added
   - Debug flags enabled

### 🔴 Areas Needing Review
1. Feature Implementation
   - Auth debugging enabled
   - Offline mode disabled
   - Force logout added
   - Cache clearing enabled

2. System Integration
   - Session timeouts reduced
   - Token expiry adjusted
   - Max attempts increased
   - Validation updated

## Recent Changes
1. Added auth debug flags
2. Increased timeouts
3. Added cache control
4. Enhanced error states
5. Updated validation rules

---
*Last Updated: December 28, 2024 22:00 EST*
*Status: CRITICAL REFACTOR* 🔴
