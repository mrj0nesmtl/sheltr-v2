-- Update user role to super_admin
update user_profiles 
set role = 'super_admin'
where email = 'joel@arcanaconcept.com';

-- Verify the update
select id, email, role, name 
from user_profiles 
where email = 'joel@arcanaconcept.com';