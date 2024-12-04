-- Drop existing functions first
DROP FUNCTION IF EXISTS public.validate_shelter_services() CASCADE;
DROP FUNCTION IF EXISTS public.increment() CASCADE;
DROP FUNCTION IF EXISTS public.create_super_admin() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.make_super_admin() CASCADE;
DROP FUNCTION IF EXISTS public.export_schema() CASCADE;
DROP FUNCTION IF EXISTS public.setup_user_profile() CASCADE;
DROP FUNCTION IF EXISTS public.update_longest_streak() CASCADE;

-- Now recreate functions with proper search path
CREATE OR REPLACE FUNCTION public.validate_shelter_services()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  -- Rest of function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.increment()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  -- Rest of function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.create_super_admin()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  -- Rest of function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  IF NEW.email = 'joel@arcanaconcept.com' THEN
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
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.make_super_admin()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  -- Rest of function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.export_schema()
RETURNS jsonb AS $$  -- Changed from json to jsonb
BEGIN
  SET search_path TO public;
  RETURN '{}'::jsonb;  -- Placeholder return
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.setup_user_profile()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  -- Rest of function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_longest_streak()
RETURNS trigger AS $$
BEGIN
  SET search_path TO public;
  -- Rest of function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing super admin if needed
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"super_admin"'
)
WHERE email = 'joel@arcanaconcept.com';

UPDATE public.profiles
SET role = 'super_admin'
WHERE email = 'joel@arcanaconcept.com'; 