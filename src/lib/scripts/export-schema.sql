-- Function to export complete schema
create or replace function export_schema() returns text as $$
declare
  schema_sql text;
begin
  -- Collect all table definitions
  select string_agg(
    format(
      E'-- Table: %I\n%s;\n\n',
      tablename,
      pg_get_ddl(format('%I.%I', schemaname, tablename)::regclass)
    ),
    E'\n'
  )
  into schema_sql
  from pg_tables
  where schemaname = 'public';

  -- Add functions
  select schema_sql || string_agg(
    format(
      E'-- Function: %I\n%s\n\n',
      p.proname,
      pg_get_functiondef(p.oid)
    ),
    E'\n'
  )
  into schema_sql
  from pg_proc p
  join pg_namespace n on p.pronamespace = n.oid
  where n.nspname = 'public';

  -- Add indexes
  select schema_sql || string_agg(
    format(
      E'-- Index: %I\n%s;\n\n',
      indexname,
      indexdef
    ),
    E'\n'
  )
  into schema_sql
  from pg_indexes
  where schemaname = 'public';

  -- Add RLS policies
  select schema_sql || string_agg(
    format(
      E'-- Policy: %I on %I\n%s;\n\n',
      polname,
      tablename,
      pg_get_policydef(pol.oid)
    ),
    E'\n'
  )
  into schema_sql
  from pg_policy pol
  join pg_class cls on pol.polrelid = cls.oid
  join pg_namespace n on cls.relnamespace = n.oid
  where n.nspname = 'public';

  return schema_sql;
end;
$$ language plpgsql;

-- Create extension for pg_get_ddl if not exists
create extension if not exists "plpgsql_check";

-- Export the schema
select export_schema();