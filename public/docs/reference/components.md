# 🧩 SHELTR Component Reference
*Version: 0.4.12 - December 26, 2024 22:00 EST*
*Status: STABILIZING* 🟡

## ⚠️ STATUS UPDATE
Auth system implementation has been stabilized. Several components have been fixed and tested.

## Critical Layout Components

### Sidebar System
```typescript
interface SidebarSystem {
  core: {
    index: {
      path: 'src/layouts/specialized/dashboard/Sidebar/index.tsx',
      required: true,
      status: '✅ STABLE',
      exports: ['Sidebar', 'SidebarItem']
    }
  },
  roleSpecific: {
    superAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/SuperAdminSidebar.tsx',
      required: true,
      status: '✅ STABLE'
    },
    donor: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DonorSidebar.tsx',
      required: true,
      status: '🟡 NEEDS_TESTING'
    },
    // Other role sidebars remain at previous status
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

// Base Layout Components (✅ STABLE)
BaseLayout        // Enhanced with mobile responsiveness
DashboardLayout   // Navigation and scroll fixed
AuthLayout        // Restored functionality

// Specialized Layouts (🟡 IN_PROGRESS)
SuperAdminDashboard    // ✅ STABLE
DonorDashboard        // 🟡 NEEDS_TESTING
ShelterDashboard      // 🟡 NEEDS_TESTING
```

## Authentication Components (🟡 STABILIZING)
```typescript
interface AuthProps {
  redirectUrl?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  status: ComponentStatus;
}

// Auth Components
LoginForm        // ✅ FUNCTIONAL
SignupForm       // 🟡 NEEDS_TESTING
VerificationForm // 🟡 PARTIAL
ResetPassword    // 🟡 PARTIAL
```

## Dashboard Components

### Core Dashboard (✅ STABLE)
```typescript
interface DashboardCore {
  header: {
    path: 'src/layouts/specialized/dashboard/components/DashboardHeader.tsx',
    required: true,
    status: '✅ STABLE',
    dependencies: ['auth context', 'navigation']
  },
  layout: {
    path: 'src/layouts/specialized/dashboard/DashboardLayout.tsx',
    required: true,
    status: '✅ STABLE',
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
1. Never modify auth components without testing
2. Maintain navigation state integrity
3. Test all role-specific components
4. Verify auth integration
5. Document all changes

## Critical Status Overview

### 🔴 Critical Components
1. Auth System
   - Login non-functional
   - SignUp forms broken
   - Session management unstable
   - Role verification incomplete

2. Layout System
   - Navigation state unstable
   - Sidebar needs fixes
   - Auth layout broken

### 🟡 Unstable Components
1. Dashboard Components
   - Header navigation unstable
   - Role-based access incomplete
   - State management issues

2. Navigation
   - User navigation unreliable
   - Route protection partial
   - State management needs fixes

### ✅ Stable Components
1. UI Components Library
2. Feature Components
3. Chart Components
4. Utility Components

## Emergency Recovery Plan
1. Fix auth component implementation
2. Restore login functionality
3. Implement proper session management
4. Stabilize navigation system
5. Test role-based access

---
*Last Updated: December 26, 2024 22:00 EST*
*Status: STABILIZING*
*For detailed status, see [status-dec26.md](../dev/notes/2024-12/status-dec26.md)*
