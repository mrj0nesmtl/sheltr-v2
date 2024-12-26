# 🔒 SHELTR Constants Reference
*Version: 0.4.12 - December 26, 2024 22:00 EST*
*Status: STABILIZING* 🟡

## ⚠️ STATUS UPDATE
Auth system has been stabilized. Constants updated to reflect recent fixes.

## API Constants

### Endpoints (🟡 STABILIZING)
```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',      // ✅ Functional
    REGISTER: '/auth/register', // ✅ Functional
    LOGOUT: '/auth/logout',     // ✅ Functional
    VERIFY: '/auth/verify'      // 🟡 Testing
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
  TIMEOUT: 15000,              // Optimized for auth
  RETRY_ATTEMPTS: 2,           // Adjusted for better UX
  AUTH_TIMEOUT: 10000         // New: Specific auth timeout
} as const;
```

## Authentication Constants (✅ STABLE)
```typescript
export const AUTH_CONFIG = {
  SESSION: {
    TIMEOUT: 7200,            // Extended for better UX
    REFRESH_THRESHOLD: 600    // Adjusted for stability
  },
  ROUTES: {
    LOGIN: '/login',          // ✅ Functional
    REGISTER: '/register',    // ✅ Functional
    RESET: '/reset-password'  // ✅ Functional
  },
  PERSISTENCE: {             // New section
    STORAGE_KEY: 'sheltr_auth',
    VERSION: 'v1'
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

## Feature Flags (✅ STABLE)
```typescript
export const FEATURES = {
  QR_SCANNER: true,           // ✅ Functional
  OFFLINE_MODE: false,        // 🟡 Beta testing
  ANALYTICS: true,           // ✅ Functional
  BLOCKCHAIN: false,         // 🔵 Coming soon
  AUTH_DEBUG: false         // Disabled: System stable
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

## Role Constants (✅ STABLE)
```typescript
export const ROLES = {
  ADMIN: 'admin',           // ✅ Functional
  DONOR: 'donor',          // ✅ Functional
  SHELTER: 'shelter',      // ✅ Functional
  PARTICIPANT: 'participant'// 🟡 Testing
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

## Status Overview

### ✅ Stable Areas
1. Auth System
   - Login endpoint functional
   - Register endpoint functional
   - Session management stable
   - Token handling improved

2. Configuration
   - Timeouts optimized
   - Retry logic improved
   - Session handling stable

### 🟡 Areas Under Testing
1. Feature Implementation
   - Offline mode in beta
   - Participant role access
   - Extended auth features

2. System Integration
   - Blockchain integration planned
   - Extended analytics
   - Advanced metrics

## Recent Improvements
1. Auth system stabilized
2. Session management optimized
3. Role-based access implemented
4. Validation constants updated
5. Feature flags adjusted

---
*Last Updated: December 26, 2024 22:00 EST*
*Status: STABILIZING*
*For implementation details, see [status-dec26.md](../dev/notes/2024-12/status-dec26.md)*
