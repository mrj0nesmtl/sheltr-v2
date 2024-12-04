-- Step 2: Disable triggers
alter table user_profiles disable trigger all;
alter table participants disable trigger all;
alter table donations disable trigger all;
alter table transactions disable trigger all;