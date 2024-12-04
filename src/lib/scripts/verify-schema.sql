-- Verify table structure
select 
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_name = 'user_profiles'
order by ordinal_position;

-- Verify policies
select 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where tablename = 'user_profiles'
order by policyname;

-- Verify permissions
select 
  grantee,
  privilege_type
from information_schema.role_table_grants
where table_name = 'user_profiles'
order by grantee, privilege_type;