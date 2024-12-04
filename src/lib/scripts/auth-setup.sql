-- Enable required extensions
create extension if not exists "pgcrypto";

-- Create user_profiles table if it doesn't exist
create table if not exists public.user_profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  role text not null check (role in ('super_admin', 'admin', 'user', 'participant')),
  name text not null,
  organization text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone" on public.user_profiles;
drop policy if exists "Users can update own profile" on public.user_profiles;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.user_profiles for select
  using (true);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Create trigger function for new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, role, name)
  values (new.id, new.email, 'user', split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to make user a super admin
create or replace function public.make_super_admin(user_email text)
returns void as $$
begin
  update public.user_profiles
  set role = 'super_admin'
  where email = user_email;
end;
$$ language plpgsql security definer;

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant all on all functions in schema public to anon, authenticated;