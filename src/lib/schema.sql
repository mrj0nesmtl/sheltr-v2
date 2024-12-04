-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table user_profiles (
  id uuid references auth.users primary key,
  email text not null,
  role text not null check (role in ('super_admin', 'admin', 'user', 'participant')),
  name text not null,
  organization text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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

-- Enable Row Level Security
alter table user_profiles enable row level security;
alter table participants enable row level security;
alter table donations enable row level security;
alter table transactions enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone" on user_profiles
  for select using (true);

create policy "Users can update own profile" on user_profiles
  for update using (auth.uid() = id);

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