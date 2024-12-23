# 🧩 SHELTR Component Reference
*Version: 0.4.9 - December 22, 2024*

## Core Components

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

### Authentication Components
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

### Feature Components
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

### UI Components
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

## Dashboard Components

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

*For implementation details, see /docs/guides/best-practices.md*
