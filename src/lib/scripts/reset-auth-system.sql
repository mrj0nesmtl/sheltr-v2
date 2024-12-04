-- Begin transaction
begin;

-- Backup important data
create table if not exists user_profiles_backup as 
select * from user_profiles;

-- Drop existing policies to avoid conflicts
do $$ 
declare
  pol record;
begin
  for pol in (select policyname from pg_policies where tablename = 'user_profiles')
  loop
    execute format('drop policy if exists %I on public.user_profiles', pol.policyname);
  end loop;
end $$;

-- Recreate user_profiles table with correct structure
drop table if exists user_profiles cascade;
create table user_profiles (
  id uuid references auth.users primary key,
  email text not null,
  role text not null check (role in ('super_admin', 'admin', 'user', 'participant')),
  name text not null,
  organization text,
  profile_image text,
  default_donation decimal(10,2),
  social_links jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create policies with correct permissions
create policy "Public profiles are viewable by everyone"
  on user_profiles for select
  using (true);

create policy "Users can update own profile"
  on user_profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on user_profiles for insert
  with check (auth.uid() = id);

-- Enable RLS
alter table user_profiles enable row level security;

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on user_profiles to anon, authenticated;

-- Create super admin
insert into auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role,
  created_at,
  updated_at
) values (
  'joel@arcanaconcept.com',
  crypt('Sl1pnsl1de&&!', gen_salt('bf')),
  now(),
  'authenticated',
  now(),
  now()
) on conflict (email) do nothing;

-- Create super admin profile
insert into user_profiles (
  id,
  email,
  role,
  name,
  organization,
  created_at,
  updated_at
)
select 
  id,
  email,
  'super_admin',
  'Joel Yaffe',
  'Arcana Concept',
  now(),
  now()
from auth.users
where email = 'joel@arcanaconcept.com'
on conflict (id) do update
set role = 'super_admin',
    name = 'Joel Yaffe',
    organization = 'Arcana Concept',
    updated_at = now();

commit;