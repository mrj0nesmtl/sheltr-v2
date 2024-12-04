-- Function to safely update or create user profiles
create or replace function setup_user_profile(
  p_email text,
  p_role text,
  p_name text,
  p_org text default null
) returns void as $$
declare
  v_user_id uuid;
begin
  -- Get the user ID from auth.users
  select id into v_user_id
  from auth.users
  where email = p_email;

  if v_user_id is null then
    raise exception 'User with email % not found in auth.users', p_email;
  end if;

  -- Insert or update the user profile
  insert into public.user_profiles (id, email, role, name, organization)
  values (v_user_id, p_email, p_role, p_name, p_org)
  on conflict (id) do update
  set role = excluded.role,
      name = excluded.name,
      organization = excluded.organization;
end;
$$ language plpgsql security definer;

-- Setup all user profiles
do $$
begin
  -- Super Admins
  perform setup_user_profile(
    'joel@arcanaconcept.com',
    'super_admin',
    'Joel Yaffe',
    'Arcana Concept'
  );
  
  perform setup_user_profile(
    'alexander@arcanaconcept.com',
    'super_admin',
    'Alexander Kline',
    'Arcana Concept'
  );
  
  perform setup_user_profile(
    'morgan@arcanaconcept.com',
    'super_admin',
    'Morgan Hirtle',
    'Arcana Concept'
  );

  -- Test Participant
  perform setup_user_profile(
    'joel.yaffe+participant1@gmail.com',
    'participant',
    'Test Participant 1'
  );

  -- Test Donor
  perform setup_user_profile(
    'joel.yaffe+donor@gmail.com',
    'user',
    'Test Donor'
  );

  -- Create participant record for the test participant
  insert into participants (
    id,
    name,
    qr_code,
    total_received,
    housing_fund,
    wallet_balance,
    status,
    user_id
  )
  select 
    gen_random_uuid(),
    'Test Participant 1',
    'PART1-' || encode(gen_random_bytes(8), 'hex'),
    0,
    0,
    0,
    'active',
    id
  from user_profiles
  where email = 'joel.yaffe+participant1@gmail.com'
  on conflict do nothing;

end $$;

-- Verify the setup
select 
  up.email,
  up.role,
  up.name,
  up.organization,
  p.qr_code as participant_qr_code
from user_profiles up
left join participants p on p.user_id = up.id
order by up.role, up.email;