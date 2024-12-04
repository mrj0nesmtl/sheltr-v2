-- Begin transaction
begin;

-- Add missing columns and fix relationships for donations table
alter table donations 
  add column if not exists donor_id uuid references user_profiles(id),
  add column if not exists donor_email text,
  add column if not exists donor_name text;

-- Create indexes for better performance
create index if not exists idx_donations_donor_id on donations(donor_id);
create index if not exists idx_donations_participant_id on donations(participant_id);

-- Update policies for donations table
drop policy if exists "Enable read access for all users" on donations;
drop policy if exists "Enable insert for authenticated users only" on donations;

create policy "Public donations are viewable by everyone"
  on donations for select
  using (true);

create policy "Authenticated users can create donations"
  on donations for insert
  with check (auth.role() = 'authenticated');

create policy "Users can view their own donations"
  on donations for select
  using (
    donor_id = auth.uid() or
    participant_id in (
      select id from participants where user_id = auth.uid()
    )
  );

-- Create donor_stats table if it doesn't exist
create table if not exists donor_stats (
  donor_id uuid primary key references user_profiles(id),
  total_donated decimal(10,2) default 0,
  donation_count integer default 0,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_donation_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for donor_stats
create index if not exists idx_donor_stats_total_donated on donor_stats(total_donated);
create index if not exists idx_donor_stats_donation_count on donor_stats(donation_count);
create index if not exists idx_donor_stats_current_streak on donor_stats(current_streak);

-- Enable RLS on donor_stats
alter table donor_stats enable row level security;

-- Create policies for donor_stats
create policy "Public donor stats are viewable by everyone"
  on donor_stats for select
  using (true);

create policy "Users can update their own donor stats"
  on donor_stats for update
  using (donor_id = auth.uid());

-- Function to update donor stats after donation
create or replace function update_donor_stats()
returns trigger as $$
begin
  -- Create or update donor stats
  insert into donor_stats (donor_id, total_donated, donation_count, last_donation_date)
  values (
    NEW.donor_id,
    NEW.amount,
    1,
    NEW.created_at
  )
  on conflict (donor_id) do update
  set total_donated = donor_stats.total_donated + NEW.amount,
      donation_count = donor_stats.donation_count + 1,
      last_donation_date = NEW.created_at,
      updated_at = now();

  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger for updating donor stats
drop trigger if exists update_donor_stats_trigger on donations;
create trigger update_donor_stats_trigger
  after insert on donations
  for each row
  when (NEW.status = 'completed')
  execute function update_donor_stats();

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on donations to anon, authenticated;
grant all on donor_stats to anon, authenticated;

-- Verify the changes
do $$ 
begin
  -- Verify donations columns
  if not exists (select 1 from information_schema.columns 
    where table_name = 'donations' and column_name = 'donor_id') then
    raise exception 'donor_id column was not created in donations table';
  end if;

  -- Verify donor_stats table
  if not exists (select 1 from information_schema.tables 
    where table_name = 'donor_stats') then
    raise exception 'donor_stats table was not created';
  end if;

  -- Verify policies
  if not exists (select 1 from pg_policies 
    where tablename = 'donations' 
    and policyname = 'Public donations are viewable by everyone') then
    raise exception 'Donations select policy was not created';
  end if;
end $$;

commit;