-- Create donor_stats table
create table if not exists donor_stats (
  donor_id uuid primary key references user_profiles(id),
  current_streak int default 0,
  longest_streak int default 0,
  last_donation_date timestamp with time zone,
  total_donated decimal(10,2) default 0,
  donation_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to update longest streak
create or replace function update_longest_streak()
returns trigger as $$
begin
  if NEW.current_streak > OLD.longest_streak then
    NEW.longest_streak := NEW.current_streak;
  end if;
  NEW.updated_at := now();
  return NEW;
end;
$$ language plpgsql;

-- Create trigger for longest streak updates
create trigger update_longest_streak_trigger
before update on donor_stats
for each row
when (NEW.current_streak is distinct from OLD.current_streak)
execute function update_longest_streak();

-- Create indexes
create index idx_donor_stats_current_streak on donor_stats(current_streak);
create index idx_donor_stats_total_donated on donor_stats(total_donated);
create index idx_donor_stats_donation_count on donor_stats(donation_count);

-- Enable RLS
alter table donor_stats enable row level security;

-- Create policies
create policy "Public donor stats are viewable by everyone"
  on donor_stats for select
  using (true);

create policy "Users can update own donor stats"
  on donor_stats for update
  using (auth.uid() = donor_id);