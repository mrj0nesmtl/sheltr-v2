# Auth System Reset Scripts

These scripts should be run in order to safely reset the authentication system:

1. `01-backup.sql` - Creates a backup of user profiles
2. `02-disable-triggers.sql` - Temporarily disables triggers
3. `03-clear-tables.sql` - Clears all tables in the correct order
4. `04-enable-triggers.sql` - Re-enables triggers
5. `05-create-admin.sql` - Creates the super admin account

Run each script separately and verify the output before proceeding to the next step.

After completion, you can log in with:
- Email: joel@arcanaconcept.com
- Password: sl1pnsl1de&&!