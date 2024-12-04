-- First, ensure we're in the right schema
SET search_path TO public;

-- Create super_admin role if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname = 'super_admin'
  ) THEN
    CREATE ROLE super_admin WITH LOGIN;
  END IF;
END
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO super_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO super_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO super_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO super_admin;

-- Create trigger function for handling new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.email = 'joel@arcanaconcept.com' THEN
    -- Create profile if it doesn't exist
    INSERT INTO public.profiles (
      id,
      email,
      role,
      name,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      NEW.email,
      'super_admin',
      COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
      role = 'super_admin',
      updated_at = NOW();
    
    -- Update user metadata
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_set(
      COALESCE(raw_user_meta_data, '{}'::jsonb),
      '{role}',
      '"super_admin"'
    )
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for new user handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update existing super admin if needed
DO $$
BEGIN
  -- Update auth.users
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"super_admin"'
  )
  WHERE email = 'joel@arcanaconcept.com';

  -- Update or create profile
  INSERT INTO public.profiles (
    id,
    email,
    role,
    name,
    created_at,
    updated_at
  )
  SELECT 
    id,
    email,
    'super_admin',
    COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)),
    NOW(),
    NOW()
  FROM auth.users
  WHERE email = 'joel@arcanaconcept.com'
  ON CONFLICT (id) DO UPDATE
  SET 
    role = 'super_admin',
    updated_at = NOW();
END;
$$;

-- Grant super_admin role to the user
DO $$
BEGIN
  EXECUTE format(
    'GRANT super_admin TO %I',
    (SELECT email FROM auth.users WHERE email = 'joel@arcanaconcept.com')
  );
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Could not grant super_admin role: %', SQLERRM;
END;
$$; 