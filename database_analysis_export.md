| table_schema | table_name    | column_name | description                                                                                                                           |
| ------------ | ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| auth         | identities    | email       | Auth: Email is a generated column that references the optional email property in the identity_data                                    |
| auth         | sessions      | not_after   | Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.                 |
| auth         | sso_providers | resource_id | Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code. |
| auth         | users         | is_sso_user | Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.                              |
