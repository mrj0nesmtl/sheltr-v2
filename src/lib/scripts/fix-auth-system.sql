-- Drop existing function
drop function if exists create_super_admin;

-- Create improved super admin function
create or replace function create_super_admin(
  p_email text,
  p_password text,
  p_name text
) returns void as $$
declare
  v_user_id uuid;
begin
  -- Create auth user with proper UUID
  v_user_id := gen_random_uuid();
  
  insert into auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    aud,
    role
  ) values (
    v_user_id,
    '00000000-0000-0000-0000-000000000000',
    p_email,
    crypt(p_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated'
  );

  -- Create user profile
  insert into public.user_profiles (
    id,
    email,
    role,
    name,
    created_at
  ) values (
    v_user_id,
    p_email,
    'super_admin',
    p_name,
    now()
  );
end;
$$ language plpgsql security definer;

-- Try creating super admin again
select create_super_admin(
  'joel@arcanaconcept.com',
  'sl1pnsl1de&&!',
  'Joel Yaffe'
);

-- Verify creation
select * from auth.users where email = 'joel@arcanaconcept.com';
select * from user_profiles where email = 'joel@arcanaconcept.com';