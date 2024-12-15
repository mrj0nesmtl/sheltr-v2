# 🔐 Role-Based Access Control
*Last Updated: December 15, 2024*

## Role Hierarchy
```typescript
enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SHELTER_ADMIN = 'SHELTER_ADMIN',
  DONOR = 'DONOR',
  GUEST = 'GUEST'
}
```

## Access Patterns
```typescript
interface AccessControl {
  view: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
}
```

## Implementation
1. **Route Protection**
   ```typescript
   const ProtectedRoute: FC<Props> = ({ 
     children, 
     requiredRole 
   }) => {
     // Implementation
   }
   ```

2. **Component Access**
   ```typescript
   const withRoleAccess = (
     Component: FC, 
     requiredRole: UserRole
   ) => {
     // Implementation
   }
   ```

## Permission Matrix
| Feature | Guest | Donor | Shelter | Admin |
|---------|-------|--------|----------|--------|
| View Public | ✅ | ✅ | ✅ | ✅ |
| Dashboard | ❌ | ✅ | ✅ | ✅ |
| Analytics | ❌ | 🔵 | 🔵 | ✅ |
| Management | ❌ | ❌ | 🔵 | ✅ |

*🔵 = Limited Access*