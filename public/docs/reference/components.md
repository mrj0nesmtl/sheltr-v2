# 🧩 SHELTR Component Reference
*Version: 0.4.9 - December 23, 2024*

## Critical Layout Components

### Sidebar System
```typescript
interface SidebarSystem {
  core: {
    index: {
      path: 'src/layouts/specialized/dashboard/Sidebar/index.tsx',
      required: true,
      exports: ['Sidebar', 'DebugSidebar', 'SidebarItem']
    },
    debug: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DebugSidebar.tsx',
      required: true,
      dependencies: ['index.tsx']
    }
  },
  roleSpecific: {
    donor: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DonorSidebar.tsx',
      required: true
    },
    participant: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ParticipantSidebar.tsx',
      required: true
    },
    shelterAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ShelterAdminSidebar.tsx',
      required: true
    },
    superAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/SuperAdminSidebar.tsx',
      required: true
    }
  }
}
```

### Layout Components
```typescript
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Base Layout Components
BaseLayout
DashboardLayout
AuthLayout

// Specialized Layouts
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
    dependencies: ['auth context', 'navigation']
  },
  layout: {
    path: 'src/layouts/specialized/dashboard/DashboardLayout.tsx',
    required: true,
    dependencies: ['Sidebar', 'DashboardHeader']
  }
}
```

### Donor Dashboard
```typescript
interface DonorMetricsProps {
  timeframe: 'day' | 'week' | 'month' | 'year';
  data: DonationData[];
}

// Donor Components
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
}

// Shelter Components
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
}

// Admin Components
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
}

// Auth Components
LoginForm
SignupForm
VerificationForm
ResetPassword
```

## Feature Components
```typescript
interface QRScannerProps {
  onScan: (data: string) => void;
  onError: (error: Error) => void;
  enabled: boolean;
}

// Feature Components
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

---
*For implementation details, see /docs/guides/best-practices.md*
*For debugging help, see /docs/dev/debugging.md*
*For architecture overview, see /docs/core/architecture.md*
