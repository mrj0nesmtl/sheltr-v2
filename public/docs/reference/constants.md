# 🔒 SHELTR Constants Reference
*Last Updated: January 4, 2025 21:30 EST*
*Version: 0.5.4*
*Status: STABLE* 🟢

## ⚠️ STATUS UPDATE
Badge system and authentication flows stabilized. Constants updated to reflect role-based implementation.

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
    CONNECT: '/ws/connect',     // 🟡 In Progress
    STATUS: '/ws/status',       // 🟡 In Progress
    EVENTS: '/ws/events'        // 🟡 In Progress
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
  WEBSOCKET_RETRY: 5000        // Added
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

### 🟡 Areas In Progress
1. Real-Time Features
   - WebSocket implementation
   - Event system
   - Connection management
   - Error handling

## Recent Changes
1. Added badge constants
2. Updated role definitions
3. Added WebSocket config
4. Enhanced security measures
5. Optimized performance settings

---
*For implementation details, see [implementation.md](./implementation.md)*
