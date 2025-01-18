# 📝 SHELTR Type Definitions
*Last Updated: January 17, 2025 22:15 EST*
*Version: 0.6.0*
*Status: STABLE* 🟢

## Situational Abstract
Following successful optimization of navigation system and i18n infrastructure, type definitions have been updated to support optimized navigation mounting, language management, and enhanced performance monitoring. Recent updates include navigation state types, i18n interfaces, and performance tracking types.

## Recent Updates
| Type System | Status | Details |
|-------------|---------|---------|
| Navigation Types | ✅ Complete | Optimized mounting patterns |
| i18n Types | ✅ Complete | Language management system |
| Performance Types | ✅ Complete | Metrics and monitoring |
| Component Types | ✅ Complete | Enhanced mounting patterns |
| State Types | ✅ Complete | Navigation management |
| Monitoring Types | ✅ Complete | Performance tracking |

### Navigation System (✅ NEW)
```typescript
interface NavigationSystem {
  state: NavigationState;
  metrics: NavigationMetrics;
  mount: MountingStrategy;
}

interface NavigationState {
  current: string;
  previous: string;
  history: string[];
  timestamp: Date;
}

interface NavigationMetrics {
  mountTime: number;
  transitionTime: number;
  renderCount: number;
  performance: PerformanceMetrics;
}

interface MountingStrategy {
  type: 'optimized' | 'lazy' | 'eager';
  timeout: number;
  retryAttempts: number;
}
```

### i18n System (✅ NEW)
```typescript
interface I18nSystem {
  language: LanguageConfig;
  translations: TranslationMap;
  fallbacks: FallbackConfig;
}

interface LanguageConfig {
  current: string;
  supported: string[];
  fallback: string;
  direction: 'ltr' | 'rtl';
}

interface TranslationMap {
  [key: string]: {
    [language: string]: string;
  };
}

interface FallbackConfig {
  enabled: boolean;
  cascade: boolean;
  logMissing: boolean;
}
```

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

### PWA Types (✅ NEW)
```typescript
interface PWAConfig {
  version: string;
  buildId: string;
  cacheVersion: string;
  lastUpdate: Date;
}

interface OfflineCapability {
  isAvailable: boolean;
  lastSync: Date;
  pendingChanges: number;
  syncStatus: SyncStatus;
}

type SyncStatus = 
  | 'idle'
  | 'syncing'
  | 'error'
  | 'complete';

interface CacheStrategy {
  type: 'network-first' | 'cache-first' | 'stale-while-revalidate';
  timeout: number;
  maxAge: number;
}
```

### Analytics Types (✅ NEW)
```typescript
interface AnalyticsEvent {
  type: AnalyticsEventType;
  data: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

type AnalyticsEventType =
  | 'page_view'
  | 'donation'
  | 'registration'
  | 'error'
  | 'feature_usage';

interface AnalyticsMetrics {
  performance: PerformanceMetrics;
  usage: UsageMetrics;
  errors: ErrorMetrics;
}

interface PerformanceMetrics {
  loadTime: number;
  ttfb: number;
  fcp: number;
  lcp: number;
}
```

### Real-Time Types (✅ Complete)
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

### Notification Types (✅ NEW)
```typescript
interface NotificationConfig {
  enabled: boolean;
  permission: NotificationPermission;
  subscription?: PushSubscription;
}

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, unknown>;
  actions?: NotificationAction[];
}

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
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
1. PWA type system implemented
2. Analytics interfaces completed
3. WebSocket integration finalized
4. Notification system types added
5. Navigation type system implemented
6. i18n interfaces completed
7. Performance tracking finalized
8. Mount optimization types added

### In Progress 🟡
1. Advanced metrics types
2. Performance tracking
3. A/B testing interfaces
4. Enhanced error tracking

### Planned 🔵
1. Machine learning interfaces
2. Blockchain integration types
3. Advanced security types
4. Social features expansion

---
*Next Update Focus: Advanced Performance Types*
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

### Performance Types (✅ NEW)
```typescript
interface PerformanceMetrics {
  navigation: {
    mountTime: number;
    transitionTime: number;
    renderCount: number;
  };
  i18n: {
    loadTime: number;
    switchTime: number;
    cacheHitRate: number;
  };
  general: {
    fcp: number;
    lcp: number;
    cls: number;
  };
}

interface MonitoringConfig {
  enabled: boolean;
  sampleRate: number;
  thresholds: PerformanceThresholds;
}

interface PerformanceThresholds {
  navigation: {
    mount: number;
    transition: number;
  };
  i18n: {
    load: number;
    switch: number;
  };
}
```

### Component Mount Types (✅ NEW)
```typescript
interface MountingMetrics {
  component: string;
  mountTime: number;
  renderCount: number;
  unmountTime: number;
  performance: ComponentPerformance;
}

interface ComponentPerformance {
  firstRender: number;
  rerender: number;
  memoryUsage: number;
}
```
