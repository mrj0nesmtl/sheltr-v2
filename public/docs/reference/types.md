# 📝 SHELTR Type Definitions
*Last Updated: January 4, 2024 15:30 UTC*
*Version: 0.5.5*
*Status: STABLE* 🟢

## Situational Abstract
Following successful implementation of Super Admin dashboard analytics and Montreal shelter mapping features, type definitions have been enhanced to support donor and participant experiences. Recent updates include standardized analytics types, role-based dashboard interfaces, and improved component type safety across the platform.

## Recent Updates
| Type System | Status | Details |
|-------------|---------|---------|
| Auth Types | ✅ Complete | Role-based authentication |
| Analytics Types | ✅ Complete | Chart and metric interfaces |
| Dashboard Types | 🟡 In Progress | Donor/Participant interfaces |
| Component Types | ✅ Complete | Shared component definitions |
| API Types | 🟢 Stable | Response/Request interfaces |

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
  authStatus: AuthStatus;     
  sessionExpiry?: Date;      
  lastLogin?: Date;          
}

type UserRole = 
  | 'super_admin'      // ✅ Functional
  | 'shelter_admin'    // ✅ Functional
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

### Dashboard Types (🟡 IN PROGRESS)
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
1. Authentication types stabilized
2. Analytics visualization types
3. Montreal map integration types
4. Shared component interfaces

### In Progress 🟡
1. Donor dashboard types
2. Social feature interfaces
3. Impact tracking types
4. Profile management types

### Planned 🔵
1. Participant dashboard types
2. Resource management interfaces
3. Progress tracking types
4. Support network types

---
*Next Update Focus: Donor Dashboard Type Implementation*
*For implementation details, see [implementation.md](../implementation/implementation.md)*
