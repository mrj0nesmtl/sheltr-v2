-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Create auth schema if it doesn't exist
create schema if not exists auth;

-- Create auth tables
create table if not exists auth.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  encrypted_password text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user profiles table
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id),
  email text not null,
  role text not null check (role in ('super_admin', 'admin', 'user', 'participant')),
  name text not null,
  organization text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table public.user_profiles enable row level security;

create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Create super admin function
create or replace function create_super_admin(
  email text,
  password text,
  name text
) returns void as $$
begin
  -- Insert into auth.users
  insert into auth.users (email, encrypted_password)
  values (email, crypt(password, gen_salt('bf')));
  
  -- Get the user id
  with new_user as (
    select id from auth.users where email = $1
  )
  -- Insert into user_profiles
  insert into public.user_profiles (id, email, role, name)
  select id, email, 'super_admin', $3
  from new_user;
end;
$$ language plpgsql security definer;