-- Begin transaction
begin;

-- Add shelter-specific columns to user_profiles if they don't exist
alter table public.user_profiles
  add column if not exists contact_phone text,
  add column if not exists city text,
  add column if not exists address text,
  add column if not exists registration_number text,
  add column if not exists capacity integer,
  add column if not exists services jsonb default '[]'::jsonb,
  add column if not exists verified boolean default false,
  add column if not exists emergency_contact jsonb;

-- Create indexes for better performance
create index if not exists idx_user_profiles_registration_number 
  on user_profiles(registration_number) 
  where role = 'shelter_admin';

create index if not exists idx_user_profiles_city 
  on user_profiles(city) 
  where role = 'shelter_admin';

-- Update RLS policies
drop policy if exists "Shelter admins can view shelter profiles" on user_profiles;
create policy "Shelter admins can view shelter profiles"
  on user_profiles for select
  using (
    auth.role() = 'authenticated' and 
    (role = 'shelter_admin' or auth.uid() = id)
  );

-- Add constraints
alter table public.user_profiles
  add constraint valid_shelter_admin_data 
  check (
    (role = 'shelter_admin' and registration_number is not null and capacity > 0) or
    role != 'shelter_admin'
  );

-- Create function to validate shelter services
create or replace function validate_shelter_services()
returns trigger as $$
declare
  valid_services text[] := array[
    'Emergency Shelter',
    'Transitional Housing',
    'Food Services',
    'Medical Care',
    'Mental Health Services',
    'Job Training',
    'Case Management',
    'Substance Abuse Treatment'
  ];
  service text;
begin
  if NEW.role = 'shelter_admin' then
    -- Validate that all services are from the allowed list
    for service in select jsonb_array_elements_text(NEW.services)
    loop
      if not service = any(valid_services) then
        raise exception 'Invalid service: %', service;
      end if;
    end loop;
  end if;
  return NEW;
end;
$$ language plpgsql;

-- Create trigger for service validation
drop trigger if exists validate_shelter_services_trigger on user_profiles;
create trigger validate_shelter_services_trigger
  before insert or update on user_profiles
  for each row
  when (NEW.role = 'shelter_admin')
  execute function validate_shelter_services();

-- Add descriptions to tables and columns
comment on table public.user_profiles is 'User profiles including shelter administrators';
comment on column user_profiles.contact_phone is 'Primary contact phone number for shelter admins';
comment on column user_profiles.registration_number is 'Official registration/license number for shelters';
comment on column user_profiles.capacity is 'Maximum number of individuals the shelter can accommodate';
comment on column user_profiles.services is 'Array of services offered by the shelter';
comment on column user_profiles.verified is 'Whether the shelter has been verified by system administrators';
comment on column user_profiles.emergency_contact is 'Emergency contact information for shelter';

-- Verify the changes
do $$ 
begin
  -- Verify columns exist
  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'contact_phone') then
    raise exception 'contact_phone column was not created';
  end if;

  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'services') then
    raise exception 'services column was not created';
  end if;

  -- Verify trigger exists
  if not exists (select 1 from pg_trigger 
    where tgname = 'validate_shelter_services_trigger') then
    raise exception 'Service validation trigger was not created';
  end if;
end $$;

commit;