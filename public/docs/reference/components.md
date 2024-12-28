# 🧩 SHELTR Component Reference
*Version: 0.4.12 - December 28, 2024 22:00 EST*
*Status: CRITICAL REFACTOR* 🔴

## ⚠️ STATUS UPDATE
Authentication system and dashboard components require immediate attention. Several critical components need rebuilding.

## Critical Layout Components

### Sidebar System (🔴 NEEDS REBUILD)
```typescript
interface SidebarSystem {
  core: {
    index: {
      path: 'src/layouts/specialized/dashboard/Sidebar/index.tsx',
      required: true,
      status: '🔴 UNSTABLE',
      exports: ['Sidebar', 'SidebarItem']
    }
  },
  roleSpecific: {
    superAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/SuperAdminSidebar.tsx',
      required: true,
      status: '⚠️ PARTIALLY_WORKING'
    },
    shelterAdmin: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ShelterAdminSidebar.tsx',
      required: true,
      status: '🔴 UNSTABLE'
    },
    donor: {
      path: 'src/layouts/specialized/dashboard/Sidebar/DonorSidebar.tsx',
      required: true,
      status: '❌ NOT_IMPLEMENTED'
    },
    participant: {
      path: 'src/layouts/specialized/dashboard/Sidebar/ParticipantSidebar.tsx',
      required: true,
      status: '❌ NOT_IMPLEMENTED'
    }
  }
}
```

### Layout Components (🔴 CRITICAL)
```typescript
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  status?: ComponentStatus;
}

// Base Layout Components
BaseLayout        // 🔴 NEEDS_REBUILD
DashboardLayout   // 🔴 UNSTABLE
AuthLayout        // ⚠️ PARTIALLY_WORKING

// Specialized Layouts
SuperAdminDashboard    // ⚠️ PARTIALLY_WORKING
ShelterDashboard      // 🔴 UNSTABLE
DonorDashboard        // ❌ NOT_IMPLEMENTED
ParticipantDashboard  // ❌ NOT_IMPLEMENTED
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
LoginForm        // ⚠️ UNSTABLE
SignupForm       // ⚠️ UNSTABLE
VerificationForm // 🔴 NOT_WORKING
ResetPassword    // 🔴 NOT_WORKING
```

## Dashboard Components

### Core Dashboard (🔴 NEEDS_REBUILD)
```typescript
interface DashboardCore {
  header: {
    path: 'src/layouts/specialized/dashboard/components/DashboardHeader.tsx',
    required: true,
    status: '⚠️ UNSTABLE',
    dependencies: ['auth context', 'navigation']
  },
  layout: {
    path: 'src/layouts/specialized/dashboard/DashboardLayout.tsx',
    required: true,
    status: '🔴 NEEDS_REBUILD',
    dependencies: ['Sidebar', 'DashboardHeader']
  }
}
```

### Role-Specific Dashboards
```typescript
interface RoleDashboards {
  superAdmin: {
    status: '⚠️ PARTIALLY_WORKING',
    components: ['SystemStats', 'UserManagement', 'Analytics']
  },
  shelterAdmin: {
    status: '🔴 UNSTABLE',
    components: ['ShelterMetrics', 'UserManagement', 'Reports']
  },
  donor: {
    status: '❌ NOT_IMPLEMENTED',
    components: ['DonationHistory', 'Impact', 'Profile']
  },
  participant: {
    status: '❌ NOT_IMPLEMENTED',
    components: ['Progress', 'Resources', 'Profile']
  }
}
```

## Feature Components (✅ STABLE)
```typescript
interface FeatureComponents {
  ui: ['Button', 'Card', 'Alert', 'Modal'],
  forms: ['Input', 'Select', 'Checkbox'],
  feedback: ['Toast', 'ErrorBoundary', 'LoadingState'],
  data: ['Table', 'Chart', 'StatCard']
}
```

## Critical Issues to Address

### 🔴 Authentication Components
1. Session Management
   - Token refresh implementation
   - Cache handling
   - Role verification
   - Login persistence

### 🔴 Dashboard Components
1. Layout System
   - Unified layout structure
   - Role-based navigation
   - Component organization
   - Error boundaries

### 🔴 Role-Based Components
1. Implementation Status
   - Super Admin (⚠️ Partial)
   - Shelter Admin (🔴 Unstable)
   - Donor (❌ Not Started)
   - Participant (❌ Not Started)

## Immediate Action Plan
1. Authentication System Rebuild
2. Dashboard Layout Restructuring
3. Role-Based Component Implementation
4. Navigation System Fix

---
*Last Updated: December 28, 2024 22:00 EST*
*Status: CRITICAL REFACTOR* 🔴
