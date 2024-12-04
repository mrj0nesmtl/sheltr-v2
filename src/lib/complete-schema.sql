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

-- Create main application tables
create table participants (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references user_profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  qr_code text unique not null,
  total_received decimal(10,2) default 0,
  housing_fund decimal(10,2) default 0,
  wallet_balance decimal(10,2) default 0,
  status text default 'active' check (status in ('active', 'inactive'))
);

create table donations (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  participant_id uuid references participants(id) not null,
  donor_id uuid references user_profiles(id),
  amount decimal(10,2) not null,
  donor_email text,
  transaction_id text unique not null,
  status text default 'pending' check (status in ('pending', 'completed', 'failed'))
);

create table transactions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  participant_id uuid references participants(id) not null,
  amount decimal(10,2) not null,
  type text not null check (type in ('donation', 'withdrawal', 'housing')),
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  metadata jsonb default '{}'::jsonb
);

-- Create increment function for atomic updates
create or replace function increment(x numeric)
returns numeric as $$
begin
  return x;
end;
$$ language plpgsql;

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

-- Enable Row Level Security
alter table public.user_profiles enable row level security;
alter table participants enable row level security;
alter table donations enable row level security;
alter table transactions enable row level security;

-- Create RLS policies
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Enable read access for all users" on participants
  for select using (true);

create policy "Enable read access for all users" on donations
  for select using (true);

create policy "Enable insert for authenticated users only" on donations
  for insert with check (auth.role() = 'authenticated');

create policy "Enable read access for all users" on transactions
  for select using (true);

-- Create indexes for better performance
create index idx_user_profiles_role on user_profiles(role);
create index idx_participants_user_id on participants(user_id);
create index idx_participants_qr_code on participants(qr_code);
create index idx_donations_participant_id on donations(participant_id);
create index idx_donations_donor_id on donations(donor_id);
create index idx_donations_transaction_id on donations(transaction_id);
create index idx_transactions_participant_id on transactions(participant_id);