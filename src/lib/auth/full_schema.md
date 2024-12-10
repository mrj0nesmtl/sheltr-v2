| table_schema | table_name                | column_name                 | data_type                   | column_default                                  | is_nullable |
| ------------ | ------------------------- | --------------------------- | --------------------------- | ----------------------------------------------- | ----------- |
| auth         | audit_log_entries         | instance_id                 | uuid                        |                                                 | YES         |
| auth         | audit_log_entries         | id                          | uuid                        |                                                 | NO          |
| auth         | audit_log_entries         | payload                     | json                        |                                                 | YES         |
| auth         | audit_log_entries         | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | audit_log_entries         | ip_address                  | character varying           | ''::character varying                           | NO          |
| auth         | flow_state                | id                          | uuid                        |                                                 | NO          |
| auth         | flow_state                | user_id                     | uuid                        |                                                 | YES         |
| auth         | flow_state                | auth_code                   | text                        |                                                 | NO          |
| auth         | flow_state                | code_challenge_method       | USER-DEFINED                |                                                 | NO          |
| auth         | flow_state                | code_challenge              | text                        |                                                 | NO          |
| auth         | flow_state                | provider_type               | text                        |                                                 | NO          |
| auth         | flow_state                | provider_access_token       | text                        |                                                 | YES         |
| auth         | flow_state                | provider_refresh_token      | text                        |                                                 | YES         |
| auth         | flow_state                | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | flow_state                | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | flow_state                | authentication_method       | text                        |                                                 | NO          |
| auth         | flow_state                | auth_code_issued_at         | timestamp with time zone    |                                                 | YES         |
| auth         | identities                | provider_id                 | text                        |                                                 | NO          |
| auth         | identities                | user_id                     | uuid                        |                                                 | NO          |
| auth         | identities                | identity_data               | jsonb                       |                                                 | NO          |
| auth         | identities                | provider                    | text                        |                                                 | NO          |
| auth         | identities                | last_sign_in_at             | timestamp with time zone    |                                                 | YES         |
| auth         | identities                | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | identities                | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | identities                | email                       | text                        |                                                 | YES         |
| auth         | identities                | id                          | uuid                        | gen_random_uuid()                               | NO          |
| auth         | instances                 | id                          | uuid                        |                                                 | NO          |
| auth         | instances                 | uuid                        | uuid                        |                                                 | YES         |
| auth         | instances                 | raw_base_config             | text                        |                                                 | YES         |
| auth         | instances                 | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | instances                 | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | mfa_amr_claims            | session_id                  | uuid                        |                                                 | NO          |
| auth         | mfa_amr_claims            | created_at                  | timestamp with time zone    |                                                 | NO          |
| auth         | mfa_amr_claims            | updated_at                  | timestamp with time zone    |                                                 | NO          |
| auth         | mfa_amr_claims            | authentication_method       | text                        |                                                 | NO          |
| auth         | mfa_amr_claims            | id                          | uuid                        |                                                 | NO          |
| auth         | mfa_challenges            | id                          | uuid                        |                                                 | NO          |
| auth         | mfa_challenges            | factor_id                   | uuid                        |                                                 | NO          |
| auth         | mfa_challenges            | created_at                  | timestamp with time zone    |                                                 | NO          |
| auth         | mfa_challenges            | verified_at                 | timestamp with time zone    |                                                 | YES         |
| auth         | mfa_challenges            | ip_address                  | inet                        |                                                 | NO          |
| auth         | mfa_challenges            | otp_code                    | text                        |                                                 | YES         |
| auth         | mfa_challenges            | web_authn_session_data      | jsonb                       |                                                 | YES         |
| auth         | mfa_factors               | id                          | uuid                        |                                                 | NO          |
| auth         | mfa_factors               | user_id                     | uuid                        |                                                 | NO          |
| auth         | mfa_factors               | friendly_name               | text                        |                                                 | YES         |
| auth         | mfa_factors               | factor_type                 | USER-DEFINED                |                                                 | NO          |
| auth         | mfa_factors               | status                      | USER-DEFINED                |                                                 | NO          |
| auth         | mfa_factors               | created_at                  | timestamp with time zone    |                                                 | NO          |
| auth         | mfa_factors               | updated_at                  | timestamp with time zone    |                                                 | NO          |
| auth         | mfa_factors               | secret                      | text                        |                                                 | YES         |
| auth         | mfa_factors               | phone                       | text                        |                                                 | YES         |
| auth         | mfa_factors               | last_challenged_at          | timestamp with time zone    |                                                 | YES         |
| auth         | mfa_factors               | web_authn_credential        | jsonb                       |                                                 | YES         |
| auth         | mfa_factors               | web_authn_aaguid            | uuid                        |                                                 | YES         |
| auth         | one_time_tokens           | id                          | uuid                        |                                                 | NO          |
| auth         | one_time_tokens           | user_id                     | uuid                        |                                                 | NO          |
| auth         | one_time_tokens           | token_type                  | USER-DEFINED                |                                                 | NO          |
| auth         | one_time_tokens           | token_hash                  | text                        |                                                 | NO          |
| auth         | one_time_tokens           | relates_to                  | text                        |                                                 | NO          |
| auth         | one_time_tokens           | created_at                  | timestamp without time zone | now()                                           | NO          |
| auth         | one_time_tokens           | updated_at                  | timestamp without time zone | now()                                           | NO          |
| auth         | refresh_tokens            | instance_id                 | uuid                        |                                                 | YES         |
| auth         | refresh_tokens            | id                          | bigint                      | nextval('auth.refresh_tokens_id_seq'::regclass) | NO          |
| auth         | refresh_tokens            | token                       | character varying           |                                                 | YES         |
| auth         | refresh_tokens            | user_id                     | character varying           |                                                 | YES         |
| auth         | refresh_tokens            | revoked                     | boolean                     |                                                 | YES         |
| auth         | refresh_tokens            | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | refresh_tokens            | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | refresh_tokens            | parent                      | character varying           |                                                 | YES         |
| auth         | refresh_tokens            | session_id                  | uuid                        |                                                 | YES         |
| auth         | saml_providers            | id                          | uuid                        |                                                 | NO          |
| auth         | saml_providers            | sso_provider_id             | uuid                        |                                                 | NO          |
| auth         | saml_providers            | entity_id                   | text                        |                                                 | NO          |
| auth         | saml_providers            | metadata_xml                | text                        |                                                 | NO          |
| auth         | saml_providers            | metadata_url                | text                        |                                                 | YES         |
| auth         | saml_providers            | attribute_mapping           | jsonb                       |                                                 | YES         |
| auth         | saml_providers            | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | saml_providers            | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | saml_providers            | name_id_format              | text                        |                                                 | YES         |
| auth         | saml_relay_states         | id                          | uuid                        |                                                 | NO          |
| auth         | saml_relay_states         | sso_provider_id             | uuid                        |                                                 | NO          |
| auth         | saml_relay_states         | request_id                  | text                        |                                                 | NO          |
| auth         | saml_relay_states         | for_email                   | text                        |                                                 | YES         |
| auth         | saml_relay_states         | redirect_to                 | text                        |                                                 | YES         |
| auth         | saml_relay_states         | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | saml_relay_states         | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | saml_relay_states         | flow_state_id               | uuid                        |                                                 | YES         |
| auth         | schema_migrations         | version                     | bigint                      |                                                 | NO          |
| auth         | schema_migrations         | version                     | character varying           |                                                 | NO          |
| auth         | schema_migrations         | inserted_at                 | timestamp without time zone |                                                 | YES         |
| auth         | sessions                  | id                          | uuid                        |                                                 | NO          |
| auth         | sessions                  | user_id                     | uuid                        |                                                 | NO          |
| auth         | sessions                  | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | sessions                  | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | sessions                  | factor_id                   | uuid                        |                                                 | YES         |
| auth         | sessions                  | aal                         | USER-DEFINED                |                                                 | YES         |
| auth         | sessions                  | not_after                   | timestamp with time zone    |                                                 | YES         |
| auth         | sessions                  | refreshed_at                | timestamp without time zone |                                                 | YES         |
| auth         | sessions                  | user_agent                  | text                        |                                                 | YES         |
| auth         | sessions                  | ip                          | inet                        |                                                 | YES         |
| auth         | sessions                  | tag                         | text                        |                                                 | YES         |
| auth         | sso_domains               | id                          | uuid                        |                                                 | NO          |
| auth         | sso_domains               | sso_provider_id             | uuid                        |                                                 | NO          |
| auth         | sso_domains               | domain                      | text                        |                                                 | NO          |
| auth         | sso_domains               | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | sso_domains               | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | sso_providers             | id                          | uuid                        |                                                 | NO          |
| auth         | sso_providers             | resource_id                 | text                        |                                                 | YES         |
| auth         | sso_providers             | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | sso_providers             | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | instance_id                 | uuid                        |                                                 | YES         |
| auth         | users                     | id                          | uuid                        |                                                 | NO          |
| auth         | users                     | aud                         | character varying           |                                                 | YES         |
| auth         | users                     | role                        | character varying           |                                                 | YES         |
| auth         | users                     | email                       | character varying           |                                                 | YES         |
| auth         | users                     | encrypted_password          | character varying           |                                                 | YES         |
| auth         | users                     | email_confirmed_at          | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | invited_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | confirmation_token          | character varying           |                                                 | YES         |
| auth         | users                     | confirmation_sent_at        | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | recovery_token              | character varying           |                                                 | YES         |
| auth         | users                     | recovery_sent_at            | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | email_change_token_new      | character varying           |                                                 | YES         |
| auth         | users                     | email_change                | character varying           |                                                 | YES         |
| auth         | users                     | email_change_sent_at        | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | last_sign_in_at             | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | raw_app_meta_data           | jsonb                       |                                                 | YES         |
| auth         | users                     | raw_user_meta_data          | jsonb                       |                                                 | YES         |
| auth         | users                     | is_super_admin              | boolean                     |                                                 | YES         |
| auth         | users                     | created_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | updated_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | phone                       | text                        | NULL::character varying                         | YES         |
| auth         | users                     | phone_confirmed_at          | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | phone_change                | text                        | ''::character varying                           | YES         |
| auth         | users                     | phone_change_token          | character varying           | ''::character varying                           | YES         |
| auth         | users                     | phone_change_sent_at        | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | confirmed_at                | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | email_change_token_current  | character varying           | ''::character varying                           | YES         |
| auth         | users                     | email_change_confirm_status | smallint                    | 0                                               | YES         |
| auth         | users                     | banned_until                | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | reauthentication_token      | character varying           | ''::character varying                           | YES         |
| auth         | users                     | reauthentication_sent_at    | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | is_sso_user                 | boolean                     | false                                           | NO          |
| auth         | users                     | deleted_at                  | timestamp with time zone    |                                                 | YES         |
| auth         | users                     | is_anonymous                | boolean                     | false                                           | NO          |
| public       | donations                 | id                          | uuid                        | uuid_generate_v4()                              | NO          |
| public       | donations                 | created_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | NO          |
| public       | donations                 | participant_id              | uuid                        |                                                 | NO          |
| public       | donations                 | amount                      | numeric                     |                                                 | NO          |
| public       | donations                 | donor_email                 | text                        |                                                 | YES         |
| public       | donations                 | transaction_id              | text                        |                                                 | NO          |
| public       | donations                 | status                      | text                        | 'pending'::text                                 | YES         |
| public       | donor_stats               | donor_id                    | uuid                        |                                                 | NO          |
| public       | donor_stats               | current_streak              | integer                     | 0                                               | YES         |
| public       | donor_stats               | longest_streak              | integer                     | 0                                               | YES         |
| public       | donor_stats               | last_donation_date          | timestamp with time zone    |                                                 | YES         |
| public       | donor_stats               | total_donated               | numeric                     | 0                                               | YES         |
| public       | donor_stats               | donation_count              | integer                     | 0                                               | YES         |
| public       | donor_stats               | created_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | NO          |
| public       | donor_stats               | updated_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | NO          |
| public       | participants              | id                          | uuid                        | uuid_generate_v4()                              | NO          |
| public       | participants              | created_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | NO          |
| public       | participants              | name                        | text                        |                                                 | NO          |
| public       | participants              | qr_code                     | text                        |                                                 | NO          |
| public       | participants              | total_received              | numeric                     | 0                                               | YES         |
| public       | participants              | housing_fund                | numeric                     | 0                                               | YES         |
| public       | participants              | wallet_balance              | numeric                     | 0                                               | YES         |
| public       | participants              | status                      | text                        | 'active'::text                                  | YES         |
| public       | participants              | user_id                     | uuid                        |                                                 | YES         |
| public       | profiles                  | id                          | uuid                        |                                                 | NO          |
| public       | profiles                  | email                       | text                        |                                                 | NO          |
| public       | profiles                  | role                        | text                        |                                                 | NO          |
| public       | profiles                  | name                        | text                        |                                                 | YES         |
| public       | profiles                  | verified                    | boolean                     | false                                           | YES         |
| public       | profiles                  | profile_image               | text                        |                                                 | YES         |
| public       | profiles                  | total_donated               | numeric                     | 0                                               | YES         |
| public       | profiles                  | total_donations             | integer                     | 0                                               | YES         |
| public       | profiles                  | impact_score                | integer                     | 0                                               | YES         |
| public       | profiles                  | created_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | YES         |
| public       | profiles                  | updated_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | YES         |
| public       | transactions              | id                          | uuid                        | uuid_generate_v4()                              | NO          |
| public       | transactions              | created_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | NO          |
| public       | transactions              | participant_id              | uuid                        |                                                 | NO          |
| public       | transactions              | amount                      | numeric                     |                                                 | NO          |
| public       | transactions              | type                        | text                        |                                                 | NO          |
| public       | transactions              | status                      | text                        | 'pending'::text                                 | YES         |
| public       | transactions              | metadata                    | jsonb                       | '{}'::jsonb                                     | YES         |
| public       | user_profiles             | id                          | uuid                        |                                                 | NO          |
| public       | user_profiles             | email                       | text                        |                                                 | NO          |
| public       | user_profiles             | role                        | text                        |                                                 | NO          |
| public       | user_profiles             | name                        | text                        |                                                 | NO          |
| public       | user_profiles             | organization                | text                        |                                                 | YES         |
| public       | user_profiles             | created_at                  | timestamp with time zone    | timezone('utc'::text, now())                    | NO          |
| public       | user_profiles             | profile_image               | text                        |                                                 | YES         |
| public       | user_profiles             | default_donation            | numeric                     |                                                 | YES         |
| public       | user_profiles             | social_links                | jsonb                       | '{}'::jsonb                                     | YES         |
| public       | user_profiles             | contact_phone               | text                        |                                                 | YES         |
| public       | user_profiles             | city                        | text                        |                                                 | YES         |
| public       | user_profiles             | address                     | text                        |                                                 | YES         |
| public       | user_profiles             | registration_number         | text                        |                                                 | YES         |
| public       | user_profiles             | capacity                    | integer                     |                                                 | YES         |
| public       | user_profiles             | services                    | jsonb                       | '[]'::jsonb                                     | YES         |
| public       | user_profiles             | verified                    | boolean                     | false                                           | YES         |
| public       | user_profiles             | emergency_contact           | jsonb                       |                                                 | YES         |
| public       | user_profiles_backup_safe | id                          | uuid                        |                                                 | YES         |
| public       | user_profiles_backup_safe | email                       | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | role                        | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | name                        | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | organization                | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | created_at                  | timestamp with time zone    |                                                 | YES         |
| public       | user_profiles_backup_safe | profile_image               | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | default_donation            | numeric                     |                                                 | YES         |
| public       | user_profiles_backup_safe | social_links                | jsonb                       |                                                 | YES         |
| public       | user_profiles_backup_safe | contact_phone               | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | city                        | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | address                     | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | registration_number         | text                        |                                                 | YES         |
| public       | user_profiles_backup_safe | capacity                    | integer                     |                                                 | YES         |
| public       | user_profiles_backup_safe | services                    | jsonb                       |                                                 | YES         |
| public       | user_profiles_backup_safe | verified                    | boolean                     |                                                 | YES         |
| public       | user_profiles_backup_safe | emergency_contact           | jsonb                       |                                                 | YES         |