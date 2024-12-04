-- Begin transaction
begin;

-- Create activity_log table
create table if not exists activity_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references user_profiles(id) not null,
  type text not null check (type in ('qr_scan', 'donation', 'profile_update', 'login')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for better performance
create index if not exists idx_activity_log_user_id on activity_log(user_id);
create index if not exists idx_activity_log_type on activity_log(type);
create index if not exists idx_activity_log_created_at on activity_log(created_at);

-- Enable RLS
alter table activity_log enable row level security;

-- Create policies
create policy "Users can view their own activity"
  on activity_log for select
  using (user_id = auth.uid());

create policy "Users can insert their own activity"
  on activity_log for insert
  with check (user_id = auth.uid());

-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all on activity_log to authenticated;

commit;