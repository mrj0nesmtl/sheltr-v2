# 🧩 SHELTR Component Reference
*Version: 0.4.9 - December 25, 2024*

## Critical Layout Components

### Sidebar System
```typescript
interface SidebarSystem {
  core: {
    index: {
      path: 'src/layouts/specialized/dashboard/Sidebar/index.tsx',
      required: true,
      status: '✅ RESTORED',
      exports: ['Sidebar', 'DebugSidebar', 'SidebarItem']
    },
    debug: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DebugSidebar.tsx',
      required: true,
      status: '✅ FUNCTIONAL',
      dependencies: ['index.tsx']
    }
  },
  roleSpecific: {
    donor: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DonorSidebar.tsx',
      required: true,
      status: '✅ IMPLEMENTED'
    },
    participant: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ParticipantSidebar.tsx',
      required: true,
      status: '✅ IMPLEMENTED'
    },
    shelterAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ShelterAdminSidebar.tsx',
      required: true,
      status: '✅ IMPLEMENTED'
    },
    superAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/SuperAdminSidebar.tsx',
      required: true,
      status: '✅ IMPLEMENTED'
    }
  }
}
```

### Layout Components
```typescript
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  status?: ComponentStatus;
}

// Base Layout Components (✅ RESTORED)
BaseLayout
DashboardLayout
AuthLayout

// Specialized Layouts (✅ FUNCTIONAL)
DonorDashboard
ShelterDashboard
AdminDashboard
```

## Dashboard Components

### Core Dashboard
```typescript
interface DashboardCore {
  header: {
    path: 'src/layouts/specialized/dashboard/components/DashboardHeader.tsx',
    required: true,
    status: '✅ RESTORED',
    dependencies: ['auth context', 'navigation']
  },
  layout: {
    path: 'src/layouts/specialized/dashboard/DashboardLayout.tsx',
    required: true,
    status: '✅ FUNCTIONAL',
    dependencies: ['Sidebar', 'DashboardHeader']
  }
}
```

### Donor Dashboard
```typescript
interface DonorMetricsProps {
  timeframe: 'day' | 'week' | 'month' | 'year';
  data: DonationData[];
  status: ComponentStatus;
}

// Donor Components (✅ IMPLEMENTED)
DonationHistory
ImpactMetrics
DonorProfile
QRScanner
DonationForm
```

### Shelter Dashboard
```typescript
interface ShelterMetricsProps {
  shelterData: ShelterData;
  donationMetrics: DonationMetrics;
  status: ComponentStatus;
}

// Shelter Components (✅ FUNCTIONAL)
ShelterMetrics
ResourceManagement
ParticipantList
ShelterAnalytics
DonorAnalytics
```

### Admin Dashboard
```typescript
interface AdminDashboardProps {
  systemMetrics: SystemMetrics;
  userManagement: UserManagement;
  status: ComponentStatus;
}

// Admin Components (✅ IMPLEMENTED)
SystemMonitoring
UserManagement
GlobalAnalytics
ShelterOverview
```

## Authentication Components
```typescript
interface AuthProps {
  redirectUrl?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  status: ComponentStatus;
}

// Auth Components (🟡 PARTIAL)
LoginForm        // Needs debugging
SignupForm       // ✅ FUNCTIONAL
VerificationForm // ✅ FUNCTIONAL
ResetPassword    // ✅ FUNCTIONAL
```

## Feature Components
```typescript
interface QRScannerProps {
  onScan: (data: string) => void;
  onError: (error: Error) => void;
  enabled: boolean;
  status: ComponentStatus;
}

// Feature Components (✅ IMPLEMENTED)
QRScanner
DonationForm
ImpactMetrics
ActivityLog
```

## UI Components
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'text';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

// Common UI Components
Button
Card
Alert
Modal
Spinner
```

## Form Components

### Input Components
```typescript
interface InputProps {
  name: string;
  label: string;
  error?: string;
  touched?: boolean;
}

// Form Elements
TextInput
Select
Checkbox
RadioGroup
```

### Validation Components
```typescript
interface ValidationProps {
  rules: ValidationRule[];
  message: string;
}

// Validation Components
FormValidator
FieldError
ValidationMessage
```

## Chart Components

### Data Visualization
```typescript
interface ChartProps {
  data: DataPoint[];
  options: ChartOptions;
}

// Chart Components
LineChart
BarChart
PieChart
MetricsCard
```

## Utility Components

### Feedback Components
```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

// Utility Components
Toast
ErrorBoundary
LoadingState
Skeleton
```

## HOCs & Providers

### Context Providers
```typescript
interface ProviderProps {
  initialState?: any;
  children: React.ReactNode;
}

// Providers
AuthProvider
ThemeProvider
FeatureProvider
```

## Safe Refactoring Guidelines
1. Never remove Sidebar system components without verification
2. Maintain DashboardHeader.tsx integrity
3. Test all role-specific components after changes
4. Verify layout dependencies before updates
5. Keep core layout structure intact
6. Document component status changes
7. Maintain recovery procedures
8. Test auth integration thoroughly

## Recovery Procedures
1. Verify Sidebar system integrity
2. Check DashboardHeader dependencies
3. Validate auth context integration
4. Test role-based routing
5. Verify component mounting order

---
*Last Updated: December 25, 2024 - Post Recovery*
*For implementation details, see /docs/guides/best-practices.md*
*For debugging help, see /docs/dev/debugging.md*
*For architecture overview, see /docs/core/architecture.md*
