# 🗄️ SHELTR Database Documentation
*Last Updated: January 6, 2025 00:12 EST*
*Version: 0.5.7*
*Status: STABLE* 🟢

## Database Connection
```bash
export PGHOST=db.oinjrlzuc1zztdstagqg.supabase.co
export PGDATABASE=postgres
export PGUSER=postgres
export PGPASSWORD='xxxxxxxxxxxxx'
psql
```

## Schema Overview

### Public Schema
The `public` schema contains tables related to the core functionality of the SHELTR platform, including donations, users, and transactions.

### Auth Schema
The `auth` schema manages authentication-related data, such as user credentials and session information.

## Table Definitions

### Public Schema Tables

#### Users
- **id**: UUID, Primary Key
- **email**: VARCHAR, Unique
- **first_name**: VARCHAR
- **last_name**: VARCHAR
- **created_at**: TIMESTAMP
- **updated_at**: TIMESTAMP

#### Donations
- **id**: UUID, Primary Key
- **user_id**: UUID, Foreign Key (references Users)
- **amount**: DECIMAL
- **created_at**: TIMESTAMP

### Auth Schema Tables

#### Auth Users
- **id**: UUID, Primary Key
- **email**: VARCHAR, Unique
- **password_hash**: VARCHAR
- **role**: ENUM('super_admin', 'shelter_admin', 'donor', 'participant')
- **created_at**: TIMESTAMP

#### Sessions
- **id**: UUID, Primary Key
- **user_id**: UUID, Foreign Key (references Auth Users)
- **expires_at**: TIMESTAMP
- **created_at**: TIMESTAMP

## Relationships and Indexes
- **Users** table has a foreign key relationship with **Donations**.
- Indexes on `email` for fast lookup in both **Users** and **Auth Users** tables.

## Sample Queries

### Retrieve User Information
```sql
SELECT * FROM public.users WHERE email = 'example@example.com';
```

### Update User Profile
```sql
UPDATE public.users SET first_name = 'John', last_name = 'Doe' WHERE id = 'user-uuid';
```

## Security Considerations
- Ensure all sensitive data is encrypted.
- Use role-based access control to restrict access to sensitive tables.

---
*For further details, see [implementation.md](./implementation.md)*
