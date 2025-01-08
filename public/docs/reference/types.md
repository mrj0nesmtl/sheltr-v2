# 📝 SHELTR Type Definitions
*Last Updated: January 4, 2025 21:30 EST*
*Version: 0.5.4*
*Status: STABLE* 🟢

## Situational Abstract
Following successful implementation of role-based badges and enhanced analytics visualization across all dashboard types, type definitions have been updated to support real-time data integration. Recent updates include badge system types, unified authentication flows, and standardized role-based access patterns.

## Recent Updates
| Type System | Status | Details |
|-------------|---------|---------|
| Badge System | ✅ Complete | Role-based implementation |
| Auth Types | ✅ Complete | Enhanced session management |
| Dashboard Types | ✅ Complete | Role-specific implementations |
| Real-Time Types | 🟡 In Progress | WebSocket integration |
| API Types | 🟢 Stable | Response/Request interfaces |

### Badge System (✅ STABLE)
```typescript
interface BadgeSystem {
  type: BadgeType;
  style: BadgeStyle;
  label: string;
  icon?: React.ReactNode;
  animate?: boolean;
}

type BadgeType = 
  | 'role'           // ✅ Implemented
  | 'status'         // ✅ Implemented
  | 'achievement'    // ✅ Implemented

type BadgeStyle =
  | 'default'        // ✅ Implemented
  | 'success'        // ✅ Implemented
  | 'warning'        // ✅ Implemented
  | 'error'          // ✅ Implemented
```

### Authentication (✅ STABLE)
```typescript
type AuthStatus = 
  | 'authenticated'     // ✅ Stable
  | 'unauthenticated'  // ✅ Stable
  | 'loading'          // ✅ Stable
  | 'error'            // ✅ Stable
  | 'partial'          // ✅ Stable
  | 'pendingVerification'; // New status

interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  badges: BadgeSystem[];
  createdAt: Date;
  authStatus: AuthStatus;     
  sessionExpiry?: Date;      
  lastLogin?: Date;          
  firstName?: string; // New field
  lastName?: string;  // New field
  address?: string;   // New field
  phoneNumber?: string; // New field
}

type UserRole = 
  | 'super_admin'      // ✅ Implemented
  | 'shelter_admin'    // ✅ Implemented
  | 'donor'           // ✅ Implemented
  | 'participant';    // ✅ Implemented
```

### Real-Time Types (🟡 IN PROGRESS)
```typescript
interface WebSocketConnection {
  status: ConnectionStatus;
  events: WebSocketEvent[];
  lastPing?: Date;
  reconnectAttempts: number;
}

type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'connecting'
  | 'error';

interface WebSocketEvent {
  type: WebSocketEventType;
  payload: unknown;
  timestamp: Date;
}

type WebSocketEventType =
  | 'connection_status'
  | 'data_update'
  | 'error'
  | 'reconnect';
```

### Dashboard Types (✅ STABLE)
```typescript
interface DashboardTypes {
  donor: {
    status: '🟡 IN_PROGRESS',
    interfaces: {
      DonorDashboard: DonorDashboardProps;
      DonationHistory: DonationHistoryProps;
      ImpactMetrics: ImpactMetricsProps;
      SocialFeatures: SocialFeaturesProps;
    }
  },
  participant: {
    status: '🔵 PLANNED',
    interfaces: {
      ParticipantDashboard: ParticipantDashboardProps;
      ResourceAccess: ResourceAccessProps;
      ProgressTracking: ProgressTrackingProps;
    }
  }
}

interface DonorDashboardProps {
  user: User;
  donations: DonationHistory[];
  impact: ImpactMetrics;
  social: SocialFeatures;
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
1. Badge system types implemented
2. Authentication flows enhanced
3. Role-based access patterns
4. Dashboard implementations

### In Progress 🟡
1. Real-time integration types
2. WebSocket connection types
3. Event system types
4. Cache management types

### Planned 🔵
1. Advanced real-time features
2. Performance optimization
3. Security enhancements
4. Monitoring systems

---
*Next Update Focus: Real-Time Integration Types*
*For implementation details, see [implementation.md](../implementation/implementation.md)*

### Profile Management Types
```typescript
interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  updatedProfile?: UserProfile;
}

type FeedbackMessage = {
  type: 'success' | 'error';
  content: string;
}
```
