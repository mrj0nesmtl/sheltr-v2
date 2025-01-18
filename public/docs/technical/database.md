# 🗄️ SHELTR Database Documentation
*Last Updated: January 17, 2025 22:15 EST*
*Version: 0.6.0*
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
The `public` schema contains tables related to the core functionality of the SHELTR platform, including donations, users, transactions, navigation states, and internationalization data.

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
- **preferred_language**: VARCHAR(5)
- **ui_preferences**: JSONB

#### Donations
- **id**: UUID, Primary Key
- **user_id**: UUID, Foreign Key (references Users)
- **amount**: DECIMAL
- **created_at**: TIMESTAMP

#### Navigation States
- **id**: UUID, Primary Key
- **user_id**: UUID, Foreign Key (references Users)
- **current_route**: VARCHAR
- **history**: JSONB
- **created_at**: TIMESTAMP
- **updated_at**: TIMESTAMP

#### Translations
- **id**: UUID, Primary Key
- **key**: VARCHAR
- **language**: VARCHAR(5)
- **content**: TEXT
- **created_at**: TIMESTAMP
- **updated_at**: TIMESTAMP

#### Performance Metrics
- **id**: UUID, Primary Key
- **user_id**: UUID, Foreign Key (references Users)
- **navigation_mount_time**: INTEGER
- **language_switch_time**: INTEGER
- **route**: VARCHAR
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
- **Navigation States** table has a foreign key relationship with **Users**
- **Performance Metrics** table has a foreign key relationship with **Users**
- Indexes on `email` for fast lookup in both **Users** and **Auth Users** tables.
- Indexes on `language` and `key` in **Translations** table
- Index on `user_id` and `route` in **Performance Metrics**

## Sample Queries

### Retrieve User Information
```sql
SELECT * FROM public.users WHERE email = 'example@example.com';
```

### Update User Profile
```sql
UPDATE public.users SET first_name = 'John', last_name = 'Doe' WHERE id = 'user-uuid';
```

### Retrieve User Language Preference
```sql
SELECT preferred_language, ui_preferences 
FROM public.users 
WHERE id = 'user-uuid';
```

### Get Navigation History
```sql
SELECT current_route, history 
FROM public.navigation_states 
WHERE user_id = 'user-uuid' 
ORDER BY created_at DESC 
LIMIT 1;
```

### Fetch Translations
```sql
SELECT key, content 
FROM public.translations 
WHERE language = 'en' 
AND key = ANY($1);
```

### Track Performance Metrics
```sql
INSERT INTO public.performance_metrics 
(user_id, navigation_mount_time, language_switch_time, route) 
VALUES ('user-uuid', 45, 95, '/dashboard');
```

## Performance Considerations
- Implement caching for translations
- Index frequently queried columns
- Monitor query performance
- Optimize navigation state queries

## Security Considerations
- Ensure all sensitive data is encrypted.
- Use role-based access control to restrict access to sensitive tables.
- Implement row-level security for navigation states
- Encrypt sensitive user preferences
- Validate language codes
- Sanitize translation content

## Monitoring Queries

### Navigation Performance
```sql
SELECT 
  route,
  AVG(navigation_mount_time) as avg_mount_time,
  AVG(language_switch_time) as avg_switch_time,
  COUNT(*) as total_visits
FROM public.performance_metrics
GROUP BY route
ORDER BY total_visits DESC;
```

### Language Usage
```sql
SELECT 
  preferred_language,
  COUNT(*) as user_count
FROM public.users
GROUP BY preferred_language
ORDER BY user_count DESC;
```

---
*For further details, see [implementation.md](./implementation.md)*
