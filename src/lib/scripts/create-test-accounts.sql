-- Function to create a test user profile
create or replace function create_test_profile(
  p_email text,
  p_password text,
  p_name text,
  p_role text,
  p_org text default null
) returns uuid as $$
declare
  v_user_id uuid;
begin
  -- Create auth user
  insert into auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
  )
  values (
    p_email,
    crypt(p_password, gen_salt('bf')),
    now(),
    now(),
    now()
  )
  returning id into v_user_id;

  -- Create user profile
  insert into public.user_profiles (
    id,
    email,
    role,
    name,
    organization,
    created_at
  )
  values (
    v_user_id,
    p_email,
    p_role,
    p_name,
    p_org,
    now()
  );

  return v_user_id;
end;
$$ language plpgsql security definer;

-- Create test accounts
do $$
declare
  v_participant_id uuid;
begin
  -- Create participant account
  v_participant_id := create_test_profile(
    'joel.yaffe+participant@gmail.com',
    'TestParticipant2024!',
    'Participant 1',
    'participant'
  );

  -- Create participant record
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
  values (
    gen_random_uuid(),
    'Participant 1',
    'PART1-' || encode(gen_random_bytes(8), 'hex'),
    0,
    0,
    0,
    'active',
    v_participant_id
  );

  -- Create donor account
  perform create_test_profile(
    'joel.yaffe+donor@gmail.com',
    'TestDonor2024!',
    'Donor 1',
    'user'
  );
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
where up.email in (
  'joel.yaffe+participant@gmail.com',
  'joel.yaffe+donor@gmail.com'
);