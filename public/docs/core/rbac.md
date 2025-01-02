# 🔐 Role-Based Access Control
*Last Updated: January 1, 2025 00:15 EST*
*Version: 0.5.3*
*Status: STABLE* 🟢

## Role Definitions
```typescript
enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}
```

## Authentication Flow Matrix
| Action           | Public | Donor | Shelter Admin | Super Admin |
|-----------------|--------|-------|---------------|-------------|
| View Landing    | ✅     | ✅    | ✅           | ✅         |
| Create Account  | ✅     | ✅    | ✅           | ✅         |
| Access Form     | ❌     | ✅    | ✅           | ✅         |
| Manage Profile  | ❌     | ✅    | ✅           | ✅         |
| View Dashboard  | ❌     | ✅    | ✅           | ✅         |
| QR Scanner      | ❌     | ✅    | ✅           | ✅         |

## Feature Access Matrix
| Feature          | Participant | Donor | Shelter Admin | Super Admin |
|------------------|-------------|-------|---------------|-------------|
| View Public      | ✅         | ✅    | ✅           | ✅         |
| Profile Access   | ✅         | ✅    | ✅           | ✅         |
| Make Donations   | ❌         | ✅    | ❌           | ✅         |
| Manage Shelter   | ❌         | ❌    | ✅           | ✅         |
| System Config    | ❌         | ❌    | ❌           | ✅         |
| View Analytics   | ❌         | 🔵    | ✅           | ✅         |
| Manage Users     | ❌         | ❌    | 🔵           | ✅         |
| QR Scanner       | ❌         | ✅    | ✅           | ✅         |

*🔵 = Limited Access*

## Implementation Example
```typescript
interface AccessControl {
  view: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
}

interface DonorAuthControl extends AccessControl {
  createAccount: boolean;
  accessDashboard: boolean;
  manageProfile: boolean;
  scanQR: boolean;
}

const donorPermissions: Record<UserRole, DonorAuthControl> = {
  donor: {
    createAccount: true,
    accessDashboard: true,
    manageProfile: true,
    scanQR: true,
    view: true,
    edit: true,
    delete: false,
    manage: false
  },
  // ... other role permissions
}
```

## Usage Example
```typescript
const withRoleAccess = (
  Component: FC,
  requiredRole: UserRole
) => {
  return function WrappedComponent(props: any) {
    const { user } = useAuth();
    const hasAccess = user && user.role >= requiredRole;
    
    if (!hasAccess) {
      return <Navigate to="/unauthorized" />;
    }
    
    return <Component {...props} />;
  }
}
```

## Recent Updates
- Added QR Scanner permissions
- Updated Donor analytics access
- Enhanced Shelter Admin user management
- Added Participant role definitions
- Updated implementation examples