-- Step 5: Create super admin
select create_super_admin(
  'joel@arcanaconcept.com',
  'sl1pnsl1de&&!',
  'Joel Yaffe'
);

-- Verify creation
select * from auth.users;
select * from user_profiles;