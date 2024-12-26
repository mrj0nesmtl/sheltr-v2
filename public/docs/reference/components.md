# 🧩 SHELTR Component Reference
*Version: 0.4.11 - December 25, 2024 19:45 EST*
*Status: CRITICAL* 🔴

## ⚠️ CRITICAL ALERT
Auth system implementation is currently unstable. Several critical components require immediate attention.

## Critical Layout Components

### Sidebar System
```typescript
interface SidebarSystem {
  core: {
    index: {
      path: 'src/layouts/specialized/dashboard/Sidebar/index.tsx',
      required: true,
      status: '🟡 UNSTABLE',
      exports: ['Sidebar', 'DebugSidebar', 'SidebarItem']
    },
    debug: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DebugSidebar.tsx',
      required: true,
      status: '🟡 PARTIAL',
      dependencies: ['index.tsx']
    }
  },
  roleSpecific: {
    donor: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DonorSidebar.tsx',
      required: true,
      status: '🟡 NEEDS_TESTING'
    },
    participant: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ParticipantSidebar.tsx',
      required: true,
      status: '🟡 NEEDS_TESTING'
    },
    shelterAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ShelterAdminSidebar.tsx',
      required: true,
      status: '🟡 NEEDS_TESTING'
    },
    superAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/SuperAdminSidebar.tsx',
      required: true,
      status: '🟡 NEEDS_TESTING'
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

// Base Layout Components (🟡 UNSTABLE)
BaseLayout        // Needs reinforcement
DashboardLayout   // Navigation unstable
AuthLayout        // 🔴 Critical: Non-functional

// Specialized Layouts (🟡 PARTIAL)
DonorDashboard    // Auth dependent
ShelterDashboard  // Auth dependent
AdminDashboard    // Auth dependent
```

## Authentication Components (🔴 CRITICAL)
```typescript
interface AuthProps {
  redirectUrl?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  status: ComponentStatus;
}

// Auth Components
LoginForm        // 🔴 NON-FUNCTIONAL
SignupForm       // 🔴 NON-FUNCTIONAL
VerificationForm // 🟡 PARTIAL
ResetPassword    // 🟡 PARTIAL
```

## Dashboard Components

### Core Dashboard (🟡 UNSTABLE)
```typescript
interface DashboardCore {
  header: {
    path: 'src/layouts/specialized/dashboard/components/DashboardHeader.tsx',
    required: true,
    status: '🟡 UNSTABLE',
    dependencies: ['auth context', 'navigation']
  },
  layout: {
    path: 'src/layouts/specialized/dashboard/DashboardLayout.tsx',
    required: true,
    status: '🟡 PARTIAL',
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
*Last Updated: December 25, 2024 19:45 EST*
*Status: CRITICAL RECOVERY NEEDED*
*For detailed status, see [status-dec25.md](../dev/notes/2024-12/status-dec25.md)*
