-- Update super admin with compliant password
select create_super_admin(
  'joel@arcanaconcept.com',
  'Sl1pnsl1de&&!',  -- Added uppercase 'S' and '!' for extra security
  'Joel Yaffe'
);

-- Verify the update
select email, role from user_profiles where email = 'joel@arcanaconcept.com';