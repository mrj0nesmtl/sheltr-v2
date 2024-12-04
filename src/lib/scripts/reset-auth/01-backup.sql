-- Step 1: Backup user profiles
create table if not exists user_profiles_backup as 
select * from user_profiles;