# 🔐 Role-Based Access Control
*Last Updated: December 17, 2024 04:45 EST*

## Role Definitions
```typescript
enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}
```

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

## Scanner Access Control
```typescript
interface ScannerAccessControl extends AccessControl {
  scan: boolean;
  validate: boolean;
  history: boolean;
}

const scannerPermissions: Record<UserRole, ScannerAccessControl> = {
  donor: {
    scan: true,
    validate: true,
    history: true,
    view: true,
    edit: false,
    delete: false,
    manage: false
  },
  // ... other role permissions
}
```

## Implementation
```typescript
const withScannerAccess = (
  Component: FC,
  requiredRole: UserRole
) => {
  return function WrappedComponent(props: any) {
    const { user } = useAuth();
    const canAccessScanner = user && scannerPermissions[user.role]?.scan;
    
    if (!canAccessScanner) {
      return null;
    }
    
    return <Component {...props} />;
  }
}
```

[Previous sections remain unchanged...]