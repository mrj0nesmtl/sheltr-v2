-- Begin transaction
begin;

-- Step 1: Delete data in reverse dependency order
delete from transactions;
delete from donations;
delete from participants;
delete from user_profiles;

-- Step 2: Delete auth users through Supabase's API
-- Note: This needs to be done through the dashboard or auth.users API
-- as we don't have direct SQL access to auth schema

-- Step 3: Create new super admin
select create_super_admin(
  'joel@arcanaconcept.com',
  'sl1pnsl1de&&!',
  'Joel Yaffe'
);

-- Verify the reset
select count(*) from transactions;
select count(*) from donations;
select count(*) from participants;
select count(*) from user_profiles;

commit;