-- Add user_id column to participants table
alter table public.participants 
add column if not exists user_id uuid references public.user_profiles(id);

-- Create index for better performance
create index if not exists idx_participants_user_id 
on public.participants(user_id);

-- Update RLS policies for participants table
drop policy if exists "Enable read access for all users" on participants;
create policy "Enable read access for all users"
  on participants for select
  using (true);

create policy "Participants can update their own record"
  on participants for update
  using (auth.uid() = user_id);

-- Verify the changes
select 
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'participants'
order by ordinal_position;