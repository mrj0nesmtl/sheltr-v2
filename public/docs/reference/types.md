# 📝 SHELTR Type Definitions
*Version: 0.5.0 - December 28, 2024 22:45 EST*
*Status: STABLE* ✅

## 🔄 STATUS UPDATE
Authentication types have been stabilized. Layout and component types enhanced for better type safety.

## Core Types

### Authentication (✅ STABLE)
```typescript
type AuthStatus = 
  | 'authenticated'     // ✅ Stable
  | 'unauthenticated'  // ✅ Stable
  | 'loading'          // ✅ Implemented
  | 'error'            // ✅ Error handling
  | 'partial';         // ✅ Partial auth state

interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  createdAt: Date;
  authStatus: AuthStatus;     // Stable field
  sessionExpiry?: Date;       // Session management
  lastLogin?: Date;          // Tracking implemented
}

type UserRole = 
  | 'super_admin'      // ✅ Functional
  | 'shelter_admin'    // 🟡 In Progress
  | 'donor'           // 🟡 In Progress
  | 'participant';    // 🔵 Planned

interface UserProfile {
  displayName: string;
  avatar?: string;
  preferences: UserPreferences;
  authPreferences: AuthPreferences;  // Required field
}

interface AuthPreferences {
  sessionTimeout: number;
  requireMFA: boolean;
  lastPasswordChange: Date;
}
```

### Layout System (✅ STABLE)
```typescript
interface LayoutSystem {
  sidebar: {
    type: 'super_admin' | 'shelter_admin' | 'donor' | 'participant';
    required: boolean;
    dependencies: string[];
    authRequired: boolean;
    fallback: string;
  };
  header: {
    type: 'dashboard';
    required: boolean;
    dependencies: string[];
    authStatus: AuthStatus;
  };
}

interface SidebarProps {
  role: UserRole;
  navigation: NavigationItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  authStatus: AuthStatus;
  fallbackView: string;
}

interface DashboardHeaderProps {
  user: User;
  navigation: NavigationProps;
  actions?: ActionItem[];
  authState: AuthStatus;
}
```

### Auth Error Types (✅ STABLE)
```typescript
interface AuthError {
  code: AuthErrorCode;
  message: string;
  timestamp: Date;
  attempts: number;
  resolution: string;
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

## Type Migration Guide

### Completed Updates ✅
1. Authentication types stabilized
2. Layout system types enhanced
3. Error handling implemented
4. Session management added

### In Progress 🟡
1. Role-specific dashboard types
2. Advanced analytics types
3. Real-time update types
4. Mobile optimization types

### Planned 🔵
1. Social feature types
2. Advanced reporting types
3. Integration types
4. Performance monitoring types

## Recovery Status
✅ Authentication system recovered
✅ Layout system stabilized
✅ Error handling implemented
✅ Type safety enhanced

---
*Last Updated: December 28, 2024 22:45 EST*
*Status: STABLE* ✅
*For implementation details, see [implementation.md](../implementation/implementation.md)*
