-- Step 4: Re-enable triggers
alter table user_profiles enable trigger all;
alter table participants enable trigger all;
alter table donations enable trigger all;
alter table transactions enable trigger all;