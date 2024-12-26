# 📝 SHELTR Type Definitions
*Version: 0.4.11 - December 25, 2024 19:45 EST*
*Status: CRITICAL* 🔴

## ⚠️ CRITICAL ALERT
Auth-related types require immediate attention. Several core types need updates for system stability.

## Core Types

### Authentication (🔴 CRITICAL)
```typescript
type AuthStatus = 
  | 'authenticated'     // 🔴 Currently unstable
  | 'unauthenticated'  // 🔴 Default state
  | 'loading'          // 🟡 Needs review
  | 'error'            // New state for auth failures
  | 'partial';         // New state for incomplete auth

interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  createdAt: Date;
  authStatus: AuthStatus;     // New required field
  sessionExpiry?: Date;       // New field for session management
  lastLogin?: Date;          // New field for tracking
}

type UserRole = 
  | 'super_admin'      // ✅ Functional
  | 'shelter_admin'    // 🟡 Partial
  | 'donor'           // 🟡 Partial
  | 'participant';    // 🟡 Partial

interface UserProfile {
  displayName: string;
  avatar?: string;
  preferences: UserPreferences;
  authPreferences?: AuthPreferences;  // New field
}

// New type for auth preferences
interface AuthPreferences {
  sessionTimeout: number;
  requireMFA: boolean;
  lastPasswordChange: Date;
}
```

### Layout System (🟡 UNSTABLE)
```typescript
interface LayoutSystem {
  sidebar: {
    type: 'super_admin' | 'shelter_admin' | 'donor' | 'participant';
    required: boolean;
    dependencies: string[];
    authRequired: boolean;     // New field
    fallback?: string;        // New field
  };
  header: {
    type: 'dashboard';
    required: boolean;
    dependencies: string[];
    authStatus: AuthStatus;   // New field
  };
}

interface SidebarProps {
  role: UserRole;
  navigation: NavigationItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  authStatus: AuthStatus;     // New required field
  fallbackView?: string;     // New field
}

interface DashboardHeaderProps {
  user: User;
  navigation: NavigationProps;
  actions?: ActionItem[];
  authState: AuthStatus;      // New required field
}
```

### Auth Error Types (🔴 NEW CRITICAL)
```typescript
interface AuthError {
  code: AuthErrorCode;
  message: string;
  timestamp: Date;
  attempts: number;
  resolution?: string;
}

type AuthErrorCode = 
  | 'AUTH_FAILED'
  | 'SESSION_EXPIRED'
  | 'INVALID_TOKEN'
  | 'ROLE_UNAUTHORIZED'
  | 'SYSTEM_ERROR';
```

### Donations
```typescript
interface Donation {
  id: string;
  amount: number;
  currency: string;
  donor: User;
  recipient: Shelter;
  timestamp: Date;
  status: DonationStatus;
}

type DonationStatus = 'pending' | 'completed' | 'failed';

interface DonationMetrics {
  total: number;
  count: number;
  average: number;
  timeframe: TimeFrame;
}
```

### QR Scanner
```typescript
interface QRScanResult {
  data: string;
  timestamp: Date;
  location?: GeolocationData;
}

interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}
```

## Component Types

### Layout Types
```typescript
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  navigation?: NavigationProps;
}

interface NavigationProps {
  items: NavigationItem[];
  active?: string;
  onNavigate: (path: string) => void;
}

interface NavigationItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  roles?: UserRole[];
}
```

### Form Types
```typescript
interface FormField {
  name: string;
  label: string;
  type: FieldType;
  validation?: ValidationRules;
  options?: SelectOption[];
}

type FieldType = 'text' | 'number' | 'select' | 'checkbox';

interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}
```

## API Types

### Response Types
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  metadata: ResponseMetadata;
}

interface APIError {
  code: string;
  message: string;
  details?: unknown;
}

interface ResponseMetadata {
  timestamp: string;
  version: string;
}
```

### Request Types
```typescript
interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

interface FilterParams {
  search?: string;
  status?: string[];
  dateRange?: DateRange;
}
```

## Utility Types

### Common Types
```typescript
type Status = 'idle' | 'loading' | 'success' | 'error';

type TimeFrame = 'day' | 'week' | 'month' | 'year';

interface DateRange {
  start: Date;
  end: Date;
}
```

### Event Types
```typescript
interface AppEvent {
  type: EventType;
  payload: unknown;
  timestamp: Date;
}

type EventType = 
  | 'donation_created'
  | 'qr_scanned'
  | 'user_authenticated'
  | 'error_occurred'
  | 'layout_changed'
  | 'sidebar_toggled';
```

## Critical Type Updates

### 🔴 Authentication Types
1. Added new AuthStatus values
2. Enhanced User interface
3. Added AuthPreferences
4. Added AuthError types

### 🟡 Layout Types
1. Added auth-related fields
2. Enhanced error handling
3. Added fallback options

### ✅ Stable Types
1. Donation types
2. QR Scanner types
3. API Response types
4. Utility types

## Type Migration Guide

### Critical Changes
1. Update AuthStatus usage
2. Implement AuthError handling
3. Add required auth fields
4. Update layout dependencies

### Required Updates
1. User type implementations
2. Layout system interfaces
3. Navigation props
4. Error handling

## Emergency Recovery Types
```typescript
interface AuthRecovery {
  status: AuthStatus;
  errors: AuthError[];
  recovery: {
    attempts: number;
    timeout: number;
    fallback: string;
  };
}
```

---
*Last Updated: December 25, 2024 19:45 EST*
*Status: CRITICAL RECOVERY NEEDED*
*For detailed status, see [status-dec25.md](../dev/notes/2024-12/status-dec25.md)*
