-- Step 3: Clear tables in correct order
truncate table transactions cascade;
truncate table donations cascade;
truncate table participants cascade;
truncate table user_profiles cascade;
truncate table auth.users cascade;