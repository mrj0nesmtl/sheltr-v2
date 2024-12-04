-- Function to export schema in a simple format
create or replace function export_schema() 
returns table (
  object_type text,
  object_name text,
  definition text
) as $$
begin
  -- Tables
  return query
  select 
    'TABLE'::text as object_type,
    table_name::text as object_name,
    ('CREATE TABLE ' || table_name::text || ' (' ||
    string_agg(
      column_name::text || ' ' || 
      data_type::text || 
      case when character_maximum_length is not null 
        then '(' || character_maximum_length::text || ')' 
        else '' 
      end ||
      case when is_nullable = 'NO' 
        then ' NOT NULL' 
        else '' 
      end,
      ', '
    ) || ');')::text as definition
  from information_schema.columns
  where table_schema = 'public'
  group by table_name;

  -- Indexes
  return query
  select 
    'INDEX'::text as object_type,
    indexname::text as object_name,
    indexdef::text as definition
  from pg_indexes
  where schemaname = 'public';

  -- Policies
  return query
  select 
    'POLICY'::text as object_type,
    pol.polname::text as object_name,
    ('CREATE POLICY ' || pol.polname::text || ' ON ' || 
    tab.relname::text || ' ' ||
    case pol.polcmd
      when 'r' then 'FOR SELECT'
      when 'a' then 'FOR INSERT'
      when 'w' then 'FOR UPDATE'
      when 'd' then 'FOR DELETE'
    end ||
    ' USING (' || pg_get_expr(pol.polqual, pol.polrelid)::text || ');')::text as definition
  from pg_policy pol
  join pg_class tab on tab.oid = pol.polrelid
  where tab.relnamespace = (select oid from pg_namespace where nspname = 'public');

  -- Functions
  return query
  select 
    'FUNCTION'::text as object_type,
    p.proname::text as object_name,
    pg_get_functiondef(p.oid)::text as definition
  from pg_proc p
  join pg_namespace n on p.pronamespace = n.oid
  where n.nspname = 'public';
end;
$$ language plpgsql;

-- Execute the function to get the schema
select * from export_schema() order by object_type, object_name;