# 🔒 SHELTR Constants Reference
*Version: 0.4.11 - December 25, 2024 19:45 EST*
*Status: CRITICAL* 🔴

## ⚠️ CRITICAL ALERT
Auth-related constants require immediate attention due to system instability.

## API Constants

### Endpoints (🔴 CRITICAL)
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',      // 🔴 Non-functional
    REGISTER: '/auth/register', // 🔴 Non-functional
    LOGOUT: '/auth/logout',     // 🟡 Partial
    VERIFY: '/auth/verify'      // 🟡 Unstable
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

### Configuration (🟡 NEEDS REVIEW)
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://sheltr.replit.app',
  VERSION: 'v1',
  TIMEOUT: 30000,              // Consider reducing for auth endpoints
  RETRY_ATTEMPTS: 3            // May need adjustment for auth
} as const;
```

## Authentication Constants (🔴 CRITICAL)
```typescript
export const AUTH_CONFIG = {
  SESSION: {
    TIMEOUT: 3600,            // Review needed
    REFRESH_THRESHOLD: 300    // Review needed
  },
  ROUTES: {
    LOGIN: '/login',          // Non-functional
    REGISTER: '/register',    // Non-functional
    RESET: '/reset-password'  // Partial
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

## Feature Flags (🟡 PARTIAL)
```typescript
export const FEATURES = {
  QR_SCANNER: true,           // ✅ Functional
  OFFLINE_MODE: false,        // 🟡 In development
  ANALYTICS: true,           // ✅ Functional
  BLOCKCHAIN: false,         // 🟡 In development
  AUTH_DEBUG: true          // 🔴 Emergency debug mode
} as const;
```

## Validation Constants (🟡 NEEDS REVIEW)
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
  AUTH: {                    // New section for auth validation
    SESSION_TIMEOUT: 3600,
    TOKEN_EXPIRY: 7200,
    MAX_ATTEMPTS: 3
  }
} as const;
```

## Role Constants (🟡 PARTIAL)
```typescript
export const ROLES = {
  ADMIN: 'admin',           // ✅ Functional
  DONOR: 'donor',          // 🟡 Partial access
  SHELTER: 'shelter',      // 🟡 Partial access
  PARTICIPANT: 'participant'// 🟡 Partial access
} as const;
```

## Status Constants (✅ STABLE)
```typescript
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  AUTH_ERROR: 'auth_error'  // New status for auth issues
} as const;
```

## Critical Status Overview

### 🔴 Critical Areas
1. Auth Endpoints
   - Login endpoint non-functional
   - Register endpoint non-functional
   - Session management unstable

2. Configuration
   - Auth timeouts need review
   - Retry logic needs adjustment
   - Session handling requires updates

### 🟡 Areas Needing Review
1. Feature Flags
   - Auth debug mode enabled
   - Offline mode in development
   - Blockchain integration pending

2. Validation
   - Auth validation needs update
   - Session timeout review needed
   - Token management review needed

## Emergency Recovery Notes
1. Auth endpoints require immediate fixes
2. Session management needs implementation
3. Role-based access needs review
4. Validation constants need updating
5. Feature flags need adjustment

---
*Last Updated: December 25, 2024 19:45 EST*
*Status: CRITICAL RECOVERY NEEDED*
*For implementation details, see [status-dec25.md](../dev/notes/2024-12/status-dec25.md)*
