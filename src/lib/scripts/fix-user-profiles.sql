-- Begin transaction
begin;

-- Add missing columns to user_profiles if they don't exist
do $$ 
begin
  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'profile_image') then
    alter table public.user_profiles add column profile_image text;
  end if;

  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'default_donation') then
    alter table public.user_profiles add column default_donation decimal(10,2);
  end if;

  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'social_links') then
    alter table public.user_profiles add column social_links jsonb default '{}'::jsonb;
  end if;
end $$;

-- Drop all existing policies
do $$ 
declare
  pol record;
begin
  for pol in (select policyname from pg_policies where tablename = 'user_profiles' and schemaname = 'public')
  loop
    execute format('drop policy if exists %I on public.user_profiles', pol.policyname);
  end loop;
end $$;

-- Create new policies
create policy "Public profiles are viewable by everyone"
  on public.user_profiles for select
  using (true);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.user_profiles to anon, authenticated;

-- Verify the changes
do $$ 
begin
  -- Verify columns exist
  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'profile_image') then
    raise exception 'profile_image column was not created';
  end if;

  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'default_donation') then
    raise exception 'default_donation column was not created';
  end if;

  if not exists (select 1 from information_schema.columns 
    where table_name = 'user_profiles' and column_name = 'social_links') then
    raise exception 'social_links column was not created';
  end if;

  -- Verify policies exist
  if not exists (select 1 from pg_policies 
    where tablename = 'user_profiles' 
    and policyname = 'Public profiles are viewable by everyone') then
    raise exception 'Select policy was not created';
  end if;

  if not exists (select 1 from pg_policies 
    where tablename = 'user_profiles' 
    and policyname = 'Users can update own profile') then
    raise exception 'Update policy was not created';
  end if;

  if not exists (select 1 from pg_policies 
    where tablename = 'user_profiles' 
    and policyname = 'Users can insert own profile') then
    raise exception 'Insert policy was not created';
  end if;
end $$;

commit;