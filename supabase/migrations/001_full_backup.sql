--
-- PostgreSQL database dump
--

\restrict N0gZUEU8d02k8U5KQVlmeSSljqZW6jRLDsk9rOPNa0nCzlbAGOb2WNMIQmkkBSa

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP EVENT TRIGGER IF EXISTS "pgrst_drop_watch";
DROP EVENT TRIGGER IF EXISTS "pgrst_ddl_watch";
DROP EVENT TRIGGER IF EXISTS "issue_pg_net_access";
DROP EVENT TRIGGER IF EXISTS "issue_pg_graphql_access";
DROP EVENT TRIGGER IF EXISTS "issue_pg_cron_access";
DROP EVENT TRIGGER IF EXISTS "issue_graphql_placeholder";
DROP PUBLICATION IF EXISTS "supabase_realtime";
DROP POLICY IF EXISTS "Public Access Videos" ON "storage"."objects";
DROP POLICY IF EXISTS "Public Access Property Images" ON "storage"."objects";
DROP POLICY IF EXISTS "Public Access Agents" ON "storage"."objects";
DROP POLICY IF EXISTS "Public Access Agent Photos" ON "storage"."objects";
DROP POLICY IF EXISTS "Public Access" ON "storage"."objects";
DROP POLICY IF EXISTS "Admin Upload Videos" ON "storage"."objects";
DROP POLICY IF EXISTS "Admin Upload Property Images" ON "storage"."objects";
DROP POLICY IF EXISTS "Admin Upload Agent Photos" ON "storage"."objects";
DROP POLICY IF EXISTS "Admin Delete Videos" ON "storage"."objects";
DROP POLICY IF EXISTS "Admin Delete Property Images" ON "storage"."objects";
DROP POLICY IF EXISTS "Admin Delete Agent Photos" ON "storage"."objects";
DROP POLICY IF EXISTS "Users can view their own admin record" ON "public"."admin_users";
DROP POLICY IF EXISTS "Public read access stories" ON "public"."stories_items";
DROP POLICY IF EXISTS "Public read access site_statistics" ON "public"."site_statistics";
DROP POLICY IF EXISTS "Public read access site_config" ON "public"."site_config";
DROP POLICY IF EXISTS "Public read access page_meta" ON "public"."page_meta";
DROP POLICY IF EXISTS "Public read access navigation_items" ON "public"."navigation_items";
DROP POLICY IF EXISTS "Public read access media_library" ON "public"."media_library";
DROP POLICY IF EXISTS "Public read access" ON "public"."newsletters";
DROP POLICY IF EXISTS "Public can view featured properties" ON "public"."featured_properties";
DROP POLICY IF EXISTS "Public can view active templates" ON "public"."component_templates";
DROP POLICY IF EXISTS "Public can view active tabs" ON "public"."tabs_items";
DROP POLICY IF EXISTS "Public can view active properties" ON "public"."properties";
DROP POLICY IF EXISTS "Public can view active page sections" ON "public"."page_sections";
DROP POLICY IF EXISTS "Public can view active agents" ON "public"."agents";
DROP POLICY IF EXISTS "Public can submit forms" ON "public"."form_submissions";
DROP POLICY IF EXISTS "Authenticated users can view admin users" ON "public"."admin_users";
DROP POLICY IF EXISTS "Authenticated users can manage admin users" ON "public"."admin_users";
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON "public"."newsletter_subscribers";
DROP POLICY IF EXISTS "Admins can view and manage subscribers" ON "public"."newsletter_subscribers";
DROP POLICY IF EXISTS "Admins can manage templates" ON "public"."component_templates";
DROP POLICY IF EXISTS "Admins can manage tabs" ON "public"."tabs_items";
DROP POLICY IF EXISTS "Admins can manage page sections" ON "public"."page_sections";
DROP POLICY IF EXISTS "Admins can manage featured properties" ON "public"."featured_properties";
DROP POLICY IF EXISTS "Admins can manage agents" ON "public"."agents";
DROP POLICY IF EXISTS "Admins can do everything with properties" ON "public"."properties";
DROP POLICY IF EXISTS "Admins access site_statistics" ON "public"."site_statistics";
DROP POLICY IF EXISTS "Admins access site_config" ON "public"."site_config";
DROP POLICY IF EXISTS "Admins access page_meta" ON "public"."page_meta";
DROP POLICY IF EXISTS "Admins access navigation_items" ON "public"."navigation_items";
DROP POLICY IF EXISTS "Admins access media_library" ON "public"."media_library";
DROP POLICY IF EXISTS "Admins access form_configs" ON "public"."form_configs";
DROP POLICY IF EXISTS "Admin write access stories" ON "public"."stories_items";
DROP POLICY IF EXISTS "Admin write access" ON "public"."newsletters";
ALTER TABLE IF EXISTS ONLY "storage"."vector_indexes" DROP CONSTRAINT IF EXISTS "vector_indexes_bucket_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads_parts" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_parts_upload_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads_parts" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_parts_bucket_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_bucket_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."objects" DROP CONSTRAINT IF EXISTS "objects_bucketId_fkey";
ALTER TABLE IF EXISTS ONLY "public"."tabs_items" DROP CONSTRAINT IF EXISTS "tabs_items_section_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."stories_items" DROP CONSTRAINT IF EXISTS "stories_items_section_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."page_sections" DROP CONSTRAINT IF EXISTS "page_sections_template_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."navigation_items" DROP CONSTRAINT IF EXISTS "navigation_items_parent_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."media_library" DROP CONSTRAINT IF EXISTS "media_library_uploaded_by_fkey";
ALTER TABLE IF EXISTS ONLY "public"."featured_properties" DROP CONSTRAINT IF EXISTS "featured_properties_property_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."admin_users" DROP CONSTRAINT IF EXISTS "admin_users_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."webauthn_credentials" DROP CONSTRAINT IF EXISTS "webauthn_credentials_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."webauthn_challenges" DROP CONSTRAINT IF EXISTS "webauthn_challenges_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."sso_domains" DROP CONSTRAINT IF EXISTS "sso_domains_sso_provider_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."sessions" DROP CONSTRAINT IF EXISTS "sessions_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."sessions" DROP CONSTRAINT IF EXISTS "sessions_oauth_client_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_relay_states" DROP CONSTRAINT IF EXISTS "saml_relay_states_sso_provider_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_relay_states" DROP CONSTRAINT IF EXISTS "saml_relay_states_flow_state_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_providers" DROP CONSTRAINT IF EXISTS "saml_providers_sso_provider_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_session_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."one_time_tokens" DROP CONSTRAINT IF EXISTS "one_time_tokens_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_consents" DROP CONSTRAINT IF EXISTS "oauth_consents_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_consents" DROP CONSTRAINT IF EXISTS "oauth_consents_client_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_authorizations" DROP CONSTRAINT IF EXISTS "oauth_authorizations_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_authorizations" DROP CONSTRAINT IF EXISTS "oauth_authorizations_client_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_factors" DROP CONSTRAINT IF EXISTS "mfa_factors_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_challenges" DROP CONSTRAINT IF EXISTS "mfa_challenges_auth_factor_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_amr_claims" DROP CONSTRAINT IF EXISTS "mfa_amr_claims_session_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."identities" DROP CONSTRAINT IF EXISTS "identities_user_id_fkey";
DROP TRIGGER IF EXISTS "update_objects_updated_at" ON "storage"."objects";
DROP TRIGGER IF EXISTS "protect_objects_delete" ON "storage"."objects";
DROP TRIGGER IF EXISTS "protect_buckets_delete" ON "storage"."buckets";
DROP TRIGGER IF EXISTS "enforce_bucket_name_length_trigger" ON "storage"."buckets";
DROP TRIGGER IF EXISTS "tr_check_filters" ON "realtime"."subscription";
DROP TRIGGER IF EXISTS "update_properties_updated_at" ON "public"."properties";
DROP TRIGGER IF EXISTS "update_page_sections_updated_at" ON "public"."page_sections";
DROP TRIGGER IF EXISTS "update_agents_updated_at" ON "public"."agents";
DROP TRIGGER IF EXISTS "properties_search_vector_trigger" ON "public"."properties";
DROP TRIGGER IF EXISTS "agents_search_vector_trigger" ON "public"."agents";
DROP INDEX IF EXISTS "storage"."vector_indexes_name_bucket_id_idx";
DROP INDEX IF EXISTS "storage"."name_prefix_search";
DROP INDEX IF EXISTS "storage"."idx_objects_bucket_id_name_lower";
DROP INDEX IF EXISTS "storage"."idx_objects_bucket_id_name";
DROP INDEX IF EXISTS "storage"."idx_multipart_uploads_list";
DROP INDEX IF EXISTS "storage"."buckets_analytics_unique_name_idx";
DROP INDEX IF EXISTS "storage"."bucketid_objname";
DROP INDEX IF EXISTS "storage"."bname";
DROP INDEX IF EXISTS "realtime"."subscription_subscription_id_entity_filters_action_filter_key";
DROP INDEX IF EXISTS "realtime"."messages_inserted_at_topic_index";
DROP INDEX IF EXISTS "realtime"."ix_realtime_subscription_entity";
DROP INDEX IF EXISTS "public"."idx_tabs_items_section";
DROP INDEX IF EXISTS "public"."idx_tabs_items_order";
DROP INDEX IF EXISTS "public"."idx_site_statistics_category";
DROP INDEX IF EXISTS "public"."idx_site_statistics_active";
DROP INDEX IF EXISTS "public"."idx_site_config_key";
DROP INDEX IF EXISTS "public"."idx_site_config_category";
DROP INDEX IF EXISTS "public"."idx_properties_status";
DROP INDEX IF EXISTS "public"."idx_properties_slug";
DROP INDEX IF EXISTS "public"."idx_properties_search";
DROP INDEX IF EXISTS "public"."idx_properties_price";
DROP INDEX IF EXISTS "public"."idx_properties_listing_type";
DROP INDEX IF EXISTS "public"."idx_properties_is_featured";
DROP INDEX IF EXISTS "public"."idx_properties_city";
DROP INDEX IF EXISTS "public"."idx_properties_category";
DROP INDEX IF EXISTS "public"."idx_page_sections_page";
DROP INDEX IF EXISTS "public"."idx_page_sections_order";
DROP INDEX IF EXISTS "public"."idx_page_sections_active";
DROP INDEX IF EXISTS "public"."idx_page_meta_path";
DROP INDEX IF EXISTS "public"."idx_newsletter_email";
DROP INDEX IF EXISTS "public"."idx_navigation_items_parent";
DROP INDEX IF EXISTS "public"."idx_navigation_items_location";
DROP INDEX IF EXISTS "public"."idx_navigation_has_dropdown";
DROP INDEX IF EXISTS "public"."idx_media_library_type";
DROP INDEX IF EXISTS "public"."idx_media_library_tags";
DROP INDEX IF EXISTS "public"."idx_form_submissions_type";
DROP INDEX IF EXISTS "public"."idx_form_submissions_status";
DROP INDEX IF EXISTS "public"."idx_form_submissions_created";
DROP INDEX IF EXISTS "public"."idx_form_configs_key";
DROP INDEX IF EXISTS "public"."idx_featured_properties_order";
DROP INDEX IF EXISTS "public"."idx_agents_search";
DROP INDEX IF EXISTS "public"."idx_agents_email";
DROP INDEX IF EXISTS "auth"."webauthn_credentials_user_id_idx";
DROP INDEX IF EXISTS "auth"."webauthn_credentials_credential_id_key";
DROP INDEX IF EXISTS "auth"."webauthn_challenges_user_id_idx";
DROP INDEX IF EXISTS "auth"."webauthn_challenges_expires_at_idx";
DROP INDEX IF EXISTS "auth"."users_is_anonymous_idx";
DROP INDEX IF EXISTS "auth"."users_instance_id_idx";
DROP INDEX IF EXISTS "auth"."users_instance_id_email_idx";
DROP INDEX IF EXISTS "auth"."users_email_partial_key";
DROP INDEX IF EXISTS "auth"."user_id_created_at_idx";
DROP INDEX IF EXISTS "auth"."unique_phone_factor_per_user";
DROP INDEX IF EXISTS "auth"."sso_providers_resource_id_pattern_idx";
DROP INDEX IF EXISTS "auth"."sso_providers_resource_id_idx";
DROP INDEX IF EXISTS "auth"."sso_domains_sso_provider_id_idx";
DROP INDEX IF EXISTS "auth"."sso_domains_domain_idx";
DROP INDEX IF EXISTS "auth"."sessions_user_id_idx";
DROP INDEX IF EXISTS "auth"."sessions_oauth_client_id_idx";
DROP INDEX IF EXISTS "auth"."sessions_not_after_idx";
DROP INDEX IF EXISTS "auth"."saml_relay_states_sso_provider_id_idx";
DROP INDEX IF EXISTS "auth"."saml_relay_states_for_email_idx";
DROP INDEX IF EXISTS "auth"."saml_relay_states_created_at_idx";
DROP INDEX IF EXISTS "auth"."saml_providers_sso_provider_id_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_updated_at_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_session_id_revoked_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_parent_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_instance_id_user_id_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_instance_id_idx";
DROP INDEX IF EXISTS "auth"."recovery_token_idx";
DROP INDEX IF EXISTS "auth"."reauthentication_token_idx";
DROP INDEX IF EXISTS "auth"."one_time_tokens_user_id_token_type_key";
DROP INDEX IF EXISTS "auth"."one_time_tokens_token_hash_hash_idx";
DROP INDEX IF EXISTS "auth"."one_time_tokens_relates_to_hash_idx";
DROP INDEX IF EXISTS "auth"."oauth_consents_user_order_idx";
DROP INDEX IF EXISTS "auth"."oauth_consents_active_user_client_idx";
DROP INDEX IF EXISTS "auth"."oauth_consents_active_client_idx";
DROP INDEX IF EXISTS "auth"."oauth_clients_deleted_at_idx";
DROP INDEX IF EXISTS "auth"."oauth_auth_pending_exp_idx";
DROP INDEX IF EXISTS "auth"."mfa_factors_user_id_idx";
DROP INDEX IF EXISTS "auth"."mfa_factors_user_friendly_name_unique";
DROP INDEX IF EXISTS "auth"."mfa_challenge_created_at_idx";
DROP INDEX IF EXISTS "auth"."idx_user_id_auth_method";
DROP INDEX IF EXISTS "auth"."idx_oauth_client_states_created_at";
DROP INDEX IF EXISTS "auth"."idx_auth_code";
DROP INDEX IF EXISTS "auth"."identities_user_id_idx";
DROP INDEX IF EXISTS "auth"."identities_email_idx";
DROP INDEX IF EXISTS "auth"."flow_state_created_at_idx";
DROP INDEX IF EXISTS "auth"."factor_id_created_at_idx";
DROP INDEX IF EXISTS "auth"."email_change_token_new_idx";
DROP INDEX IF EXISTS "auth"."email_change_token_current_idx";
DROP INDEX IF EXISTS "auth"."custom_oauth_providers_provider_type_idx";
DROP INDEX IF EXISTS "auth"."custom_oauth_providers_identifier_idx";
DROP INDEX IF EXISTS "auth"."custom_oauth_providers_enabled_idx";
DROP INDEX IF EXISTS "auth"."custom_oauth_providers_created_at_idx";
DROP INDEX IF EXISTS "auth"."confirmation_token_idx";
DROP INDEX IF EXISTS "auth"."audit_logs_instance_id_idx";
ALTER TABLE IF EXISTS ONLY "supabase_migrations"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."vector_indexes" DROP CONSTRAINT IF EXISTS "vector_indexes_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads_parts" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_parts_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."objects" DROP CONSTRAINT IF EXISTS "objects_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."migrations" DROP CONSTRAINT IF EXISTS "migrations_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."migrations" DROP CONSTRAINT IF EXISTS "migrations_name_key";
ALTER TABLE IF EXISTS ONLY "storage"."buckets_vectors" DROP CONSTRAINT IF EXISTS "buckets_vectors_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."buckets" DROP CONSTRAINT IF EXISTS "buckets_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."buckets_analytics" DROP CONSTRAINT IF EXISTS "buckets_analytics_pkey";
ALTER TABLE IF EXISTS ONLY "realtime"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "realtime"."subscription" DROP CONSTRAINT IF EXISTS "pk_subscription";
ALTER TABLE IF EXISTS ONLY "realtime"."messages" DROP CONSTRAINT IF EXISTS "messages_pkey";
ALTER TABLE IF EXISTS ONLY "public"."tabs_items" DROP CONSTRAINT IF EXISTS "tabs_items_pkey";
ALTER TABLE IF EXISTS ONLY "public"."stories_items" DROP CONSTRAINT IF EXISTS "stories_items_pkey";
ALTER TABLE IF EXISTS ONLY "public"."site_statistics" DROP CONSTRAINT IF EXISTS "site_statistics_pkey";
ALTER TABLE IF EXISTS ONLY "public"."site_config" DROP CONSTRAINT IF EXISTS "site_config_pkey";
ALTER TABLE IF EXISTS ONLY "public"."site_config" DROP CONSTRAINT IF EXISTS "site_config_key_key";
ALTER TABLE IF EXISTS ONLY "public"."properties" DROP CONSTRAINT IF EXISTS "properties_slug_key";
ALTER TABLE IF EXISTS ONLY "public"."properties" DROP CONSTRAINT IF EXISTS "properties_pkey";
ALTER TABLE IF EXISTS ONLY "public"."page_sections" DROP CONSTRAINT IF EXISTS "page_sections_pkey";
ALTER TABLE IF EXISTS ONLY "public"."page_meta" DROP CONSTRAINT IF EXISTS "page_meta_pkey";
ALTER TABLE IF EXISTS ONLY "public"."page_meta" DROP CONSTRAINT IF EXISTS "page_meta_page_path_key";
ALTER TABLE IF EXISTS ONLY "public"."newsletters" DROP CONSTRAINT IF EXISTS "newsletters_slug_key";
ALTER TABLE IF EXISTS ONLY "public"."newsletters" DROP CONSTRAINT IF EXISTS "newsletters_pkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter_subscribers" DROP CONSTRAINT IF EXISTS "newsletter_subscribers_pkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter_subscribers" DROP CONSTRAINT IF EXISTS "newsletter_subscribers_email_key";
ALTER TABLE IF EXISTS ONLY "public"."navigation_items" DROP CONSTRAINT IF EXISTS "navigation_items_pkey";
ALTER TABLE IF EXISTS ONLY "public"."media_library" DROP CONSTRAINT IF EXISTS "media_library_pkey";
ALTER TABLE IF EXISTS ONLY "public"."form_submissions" DROP CONSTRAINT IF EXISTS "form_submissions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."form_configs" DROP CONSTRAINT IF EXISTS "form_configs_pkey";
ALTER TABLE IF EXISTS ONLY "public"."form_configs" DROP CONSTRAINT IF EXISTS "form_configs_form_key_key";
ALTER TABLE IF EXISTS ONLY "public"."featured_properties" DROP CONSTRAINT IF EXISTS "featured_properties_property_id_key";
ALTER TABLE IF EXISTS ONLY "public"."featured_properties" DROP CONSTRAINT IF EXISTS "featured_properties_pkey";
ALTER TABLE IF EXISTS ONLY "public"."component_templates" DROP CONSTRAINT IF EXISTS "component_templates_pkey";
ALTER TABLE IF EXISTS ONLY "public"."component_templates" DROP CONSTRAINT IF EXISTS "component_templates_name_key";
ALTER TABLE IF EXISTS ONLY "public"."agents" DROP CONSTRAINT IF EXISTS "agents_pkey";
ALTER TABLE IF EXISTS ONLY "public"."agents" DROP CONSTRAINT IF EXISTS "agents_email_key";
ALTER TABLE IF EXISTS ONLY "public"."admin_users" DROP CONSTRAINT IF EXISTS "admin_users_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."webauthn_credentials" DROP CONSTRAINT IF EXISTS "webauthn_credentials_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."webauthn_challenges" DROP CONSTRAINT IF EXISTS "webauthn_challenges_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."users" DROP CONSTRAINT IF EXISTS "users_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."users" DROP CONSTRAINT IF EXISTS "users_phone_key";
ALTER TABLE IF EXISTS ONLY "auth"."sso_providers" DROP CONSTRAINT IF EXISTS "sso_providers_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."sso_domains" DROP CONSTRAINT IF EXISTS "sso_domains_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."sessions" DROP CONSTRAINT IF EXISTS "sessions_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_relay_states" DROP CONSTRAINT IF EXISTS "saml_relay_states_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_providers" DROP CONSTRAINT IF EXISTS "saml_providers_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_providers" DROP CONSTRAINT IF EXISTS "saml_providers_entity_id_key";
ALTER TABLE IF EXISTS ONLY "auth"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_token_unique";
ALTER TABLE IF EXISTS ONLY "auth"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."one_time_tokens" DROP CONSTRAINT IF EXISTS "one_time_tokens_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_consents" DROP CONSTRAINT IF EXISTS "oauth_consents_user_client_unique";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_consents" DROP CONSTRAINT IF EXISTS "oauth_consents_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_clients" DROP CONSTRAINT IF EXISTS "oauth_clients_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_client_states" DROP CONSTRAINT IF EXISTS "oauth_client_states_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_authorizations" DROP CONSTRAINT IF EXISTS "oauth_authorizations_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_authorizations" DROP CONSTRAINT IF EXISTS "oauth_authorizations_authorization_id_key";
ALTER TABLE IF EXISTS ONLY "auth"."oauth_authorizations" DROP CONSTRAINT IF EXISTS "oauth_authorizations_authorization_code_key";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_factors" DROP CONSTRAINT IF EXISTS "mfa_factors_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_factors" DROP CONSTRAINT IF EXISTS "mfa_factors_last_challenged_at_key";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_challenges" DROP CONSTRAINT IF EXISTS "mfa_challenges_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_amr_claims" DROP CONSTRAINT IF EXISTS "mfa_amr_claims_session_id_authentication_method_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."instances" DROP CONSTRAINT IF EXISTS "instances_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."identities" DROP CONSTRAINT IF EXISTS "identities_provider_id_provider_unique";
ALTER TABLE IF EXISTS ONLY "auth"."identities" DROP CONSTRAINT IF EXISTS "identities_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."flow_state" DROP CONSTRAINT IF EXISTS "flow_state_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."custom_oauth_providers" DROP CONSTRAINT IF EXISTS "custom_oauth_providers_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."custom_oauth_providers" DROP CONSTRAINT IF EXISTS "custom_oauth_providers_identifier_key";
ALTER TABLE IF EXISTS ONLY "auth"."audit_log_entries" DROP CONSTRAINT IF EXISTS "audit_log_entries_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_amr_claims" DROP CONSTRAINT IF EXISTS "amr_id_pk";
ALTER TABLE IF EXISTS "auth"."refresh_tokens" ALTER COLUMN "id" DROP DEFAULT;
DROP TABLE IF EXISTS "supabase_migrations"."schema_migrations";
DROP TABLE IF EXISTS "storage"."vector_indexes";
DROP TABLE IF EXISTS "storage"."s3_multipart_uploads_parts";
DROP TABLE IF EXISTS "storage"."s3_multipart_uploads";
DROP TABLE IF EXISTS "storage"."objects";
DROP TABLE IF EXISTS "storage"."migrations";
DROP TABLE IF EXISTS "storage"."buckets_vectors";
DROP TABLE IF EXISTS "storage"."buckets_analytics";
DROP TABLE IF EXISTS "storage"."buckets";
DROP TABLE IF EXISTS "realtime"."subscription";
DROP TABLE IF EXISTS "realtime"."schema_migrations";
DROP TABLE IF EXISTS "realtime"."messages";
DROP TABLE IF EXISTS "public"."tabs_items";
DROP TABLE IF EXISTS "public"."stories_items";
DROP TABLE IF EXISTS "public"."site_statistics";
DROP TABLE IF EXISTS "public"."site_config";
DROP TABLE IF EXISTS "public"."properties";
DROP TABLE IF EXISTS "public"."page_sections";
DROP TABLE IF EXISTS "public"."page_meta";
DROP TABLE IF EXISTS "public"."newsletters";
DROP TABLE IF EXISTS "public"."newsletter_subscribers";
DROP TABLE IF EXISTS "public"."navigation_items";
DROP TABLE IF EXISTS "public"."media_library";
DROP TABLE IF EXISTS "public"."form_submissions";
DROP TABLE IF EXISTS "public"."form_configs";
DROP TABLE IF EXISTS "public"."featured_properties";
DROP TABLE IF EXISTS "public"."component_templates";
DROP TABLE IF EXISTS "public"."agents";
DROP TABLE IF EXISTS "public"."admin_users";
DROP TABLE IF EXISTS "auth"."webauthn_credentials";
DROP TABLE IF EXISTS "auth"."webauthn_challenges";
DROP TABLE IF EXISTS "auth"."users";
DROP TABLE IF EXISTS "auth"."sso_providers";
DROP TABLE IF EXISTS "auth"."sso_domains";
DROP TABLE IF EXISTS "auth"."sessions";
DROP TABLE IF EXISTS "auth"."schema_migrations";
DROP TABLE IF EXISTS "auth"."saml_relay_states";
DROP TABLE IF EXISTS "auth"."saml_providers";
DROP SEQUENCE IF EXISTS "auth"."refresh_tokens_id_seq";
DROP TABLE IF EXISTS "auth"."refresh_tokens";
DROP TABLE IF EXISTS "auth"."one_time_tokens";
DROP TABLE IF EXISTS "auth"."oauth_consents";
DROP TABLE IF EXISTS "auth"."oauth_clients";
DROP TABLE IF EXISTS "auth"."oauth_client_states";
DROP TABLE IF EXISTS "auth"."oauth_authorizations";
DROP TABLE IF EXISTS "auth"."mfa_factors";
DROP TABLE IF EXISTS "auth"."mfa_challenges";
DROP TABLE IF EXISTS "auth"."mfa_amr_claims";
DROP TABLE IF EXISTS "auth"."instances";
DROP TABLE IF EXISTS "auth"."identities";
DROP TABLE IF EXISTS "auth"."flow_state";
DROP TABLE IF EXISTS "auth"."custom_oauth_providers";
DROP TABLE IF EXISTS "auth"."audit_log_entries";
DROP FUNCTION IF EXISTS "storage"."update_updated_at_column"();
DROP FUNCTION IF EXISTS "storage"."search_v2"("prefix" "text", "bucket_name" "text", "limits" integer, "levels" integer, "start_after" "text", "sort_order" "text", "sort_column" "text", "sort_column_after" "text");
DROP FUNCTION IF EXISTS "storage"."search_legacy_v1"("prefix" "text", "bucketname" "text", "limits" integer, "levels" integer, "offsets" integer, "search" "text", "sortcolumn" "text", "sortorder" "text");
DROP FUNCTION IF EXISTS "storage"."search_by_timestamp"("p_prefix" "text", "p_bucket_id" "text", "p_limit" integer, "p_level" integer, "p_start_after" "text", "p_sort_order" "text", "p_sort_column" "text", "p_sort_column_after" "text");
DROP FUNCTION IF EXISTS "storage"."search"("prefix" "text", "bucketname" "text", "limits" integer, "levels" integer, "offsets" integer, "search" "text", "sortcolumn" "text", "sortorder" "text");
DROP FUNCTION IF EXISTS "storage"."protect_delete"();
DROP FUNCTION IF EXISTS "storage"."operation"();
DROP FUNCTION IF EXISTS "storage"."list_objects_with_delimiter"("_bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer, "start_after" "text", "next_token" "text", "sort_order" "text");
DROP FUNCTION IF EXISTS "storage"."list_multipart_uploads_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer, "next_key_token" "text", "next_upload_token" "text");
DROP FUNCTION IF EXISTS "storage"."get_size_by_bucket"();
DROP FUNCTION IF EXISTS "storage"."get_prefixes"("name" "text");
DROP FUNCTION IF EXISTS "storage"."get_prefix"("name" "text");
DROP FUNCTION IF EXISTS "storage"."get_level"("name" "text");
DROP FUNCTION IF EXISTS "storage"."get_common_prefix"("p_key" "text", "p_prefix" "text", "p_delimiter" "text");
DROP FUNCTION IF EXISTS "storage"."foldername"("name" "text");
DROP FUNCTION IF EXISTS "storage"."filename"("name" "text");
DROP FUNCTION IF EXISTS "storage"."extension"("name" "text");
DROP FUNCTION IF EXISTS "storage"."enforce_bucket_name_length"();
DROP FUNCTION IF EXISTS "storage"."delete_leaf_prefixes"("bucket_ids" "text"[], "names" "text"[]);
DROP FUNCTION IF EXISTS "storage"."can_insert_object"("bucketid" "text", "name" "text", "owner" "uuid", "metadata" "jsonb");
DROP FUNCTION IF EXISTS "realtime"."topic"();
DROP FUNCTION IF EXISTS "realtime"."to_regrole"("role_name" "text");
DROP FUNCTION IF EXISTS "realtime"."subscription_check_filters"();
DROP FUNCTION IF EXISTS "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean);
DROP FUNCTION IF EXISTS "realtime"."quote_wal2json"("entity" "regclass");
DROP FUNCTION IF EXISTS "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer);
DROP FUNCTION IF EXISTS "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]);
DROP FUNCTION IF EXISTS "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text");
DROP FUNCTION IF EXISTS "realtime"."cast"("val" "text", "type_" "regtype");
DROP FUNCTION IF EXISTS "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]);
DROP FUNCTION IF EXISTS "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text");
DROP FUNCTION IF EXISTS "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer);
DROP FUNCTION IF EXISTS "public"."update_updated_at_column"();
DROP FUNCTION IF EXISTS "public"."properties_search_vector_update"();
DROP FUNCTION IF EXISTS "public"."agents_search_vector_update"();
DROP FUNCTION IF EXISTS "pgbouncer"."get_auth"("p_usename" "text");
DROP FUNCTION IF EXISTS "extensions"."set_graphql_placeholder"();
DROP FUNCTION IF EXISTS "extensions"."pgrst_drop_watch"();
DROP FUNCTION IF EXISTS "extensions"."pgrst_ddl_watch"();
DROP FUNCTION IF EXISTS "extensions"."grant_pg_net_access"();
DROP FUNCTION IF EXISTS "extensions"."grant_pg_graphql_access"();
DROP FUNCTION IF EXISTS "extensions"."grant_pg_cron_access"();
DROP FUNCTION IF EXISTS "auth"."uid"();
DROP FUNCTION IF EXISTS "auth"."role"();
DROP FUNCTION IF EXISTS "auth"."jwt"();
DROP FUNCTION IF EXISTS "auth"."email"();
DROP TYPE IF EXISTS "storage"."buckettype";
DROP TYPE IF EXISTS "realtime"."wal_rls";
DROP TYPE IF EXISTS "realtime"."wal_column";
DROP TYPE IF EXISTS "realtime"."user_defined_filter";
DROP TYPE IF EXISTS "realtime"."equality_op";
DROP TYPE IF EXISTS "realtime"."action";
DROP TYPE IF EXISTS "auth"."one_time_token_type";
DROP TYPE IF EXISTS "auth"."oauth_response_type";
DROP TYPE IF EXISTS "auth"."oauth_registration_type";
DROP TYPE IF EXISTS "auth"."oauth_client_type";
DROP TYPE IF EXISTS "auth"."oauth_authorization_status";
DROP TYPE IF EXISTS "auth"."factor_type";
DROP TYPE IF EXISTS "auth"."factor_status";
DROP TYPE IF EXISTS "auth"."code_challenge_method";
DROP TYPE IF EXISTS "auth"."aal_level";
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP EXTENSION IF EXISTS "supabase_vault";
DROP EXTENSION IF EXISTS "pgcrypto";
DROP EXTENSION IF EXISTS "pg_stat_statements";
DROP EXTENSION IF EXISTS "pg_graphql";
DROP SCHEMA IF EXISTS "vault";
DROP SCHEMA IF EXISTS "supabase_migrations";
DROP SCHEMA IF EXISTS "storage";
DROP SCHEMA IF EXISTS "realtime";
DROP SCHEMA IF EXISTS "pgbouncer";
DROP SCHEMA IF EXISTS "graphql_public";
DROP SCHEMA IF EXISTS "graphql";
DROP SCHEMA IF EXISTS "extensions";
DROP SCHEMA IF EXISTS "auth";
--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "auth";


--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "extensions";


--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "graphql";


--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "graphql_public";


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "pgbouncer";


--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "realtime";


--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "storage";


--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "supabase_migrations";


--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "vault";


--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";


--
-- Name: EXTENSION "pg_graphql"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "pg_graphql" IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "pg_stat_statements"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "pg_stat_statements" IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "pgcrypto"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "pgcrypto" IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";


--
-- Name: EXTENSION "supabase_vault"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "supabase_vault" IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."aal_level" AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."code_challenge_method" AS ENUM (
    's256',
    'plain'
);


--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."factor_status" AS ENUM (
    'unverified',
    'verified'
);


--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."factor_type" AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."oauth_authorization_status" AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."oauth_client_type" AS ENUM (
    'public',
    'confidential'
);


--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."oauth_registration_type" AS ENUM (
    'dynamic',
    'manual'
);


--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."oauth_response_type" AS ENUM (
    'code'
);


--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE "auth"."one_time_token_type" AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


--
-- Name: action; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE "realtime"."action" AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE "realtime"."equality_op" AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE "realtime"."user_defined_filter" AS (
	"column_name" "text",
	"op" "realtime"."equality_op",
	"value" "text"
);


--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE "realtime"."wal_column" AS (
	"name" "text",
	"type_name" "text",
	"type_oid" "oid",
	"value" "jsonb",
	"is_pkey" boolean,
	"is_selectable" boolean
);


--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE "realtime"."wal_rls" AS (
	"wal" "jsonb",
	"is_rls_enabled" boolean,
	"subscription_ids" "uuid"[],
	"errors" "text"[]
);


--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: -
--

CREATE TYPE "storage"."buckettype" AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION "auth"."email"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


--
-- Name: FUNCTION "email"(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION "auth"."email"() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION "auth"."jwt"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION "auth"."role"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


--
-- Name: FUNCTION "role"(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION "auth"."role"() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION "auth"."uid"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


--
-- Name: FUNCTION "uid"(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION "auth"."uid"() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION "extensions"."grant_pg_cron_access"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


--
-- Name: FUNCTION "grant_pg_cron_access"(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION "extensions"."grant_pg_cron_access"() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION "extensions"."grant_pg_graphql_access"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


--
-- Name: FUNCTION "grant_pg_graphql_access"(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION "extensions"."grant_pg_graphql_access"() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION "extensions"."grant_pg_net_access"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


--
-- Name: FUNCTION "grant_pg_net_access"(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION "extensions"."grant_pg_net_access"() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION "extensions"."pgrst_ddl_watch"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION "extensions"."pgrst_drop_watch"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION "extensions"."set_graphql_placeholder"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


--
-- Name: FUNCTION "set_graphql_placeholder"(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION "extensions"."set_graphql_placeholder"() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth("text"); Type: FUNCTION; Schema: pgbouncer; Owner: -
--

CREATE FUNCTION "pgbouncer"."get_auth"("p_usename" "text") RETURNS TABLE("username" "text", "password" "text")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


--
-- Name: agents_search_vector_update(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION "public"."agents_search_vector_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.first_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.last_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.bio, '')), 'C');
  RETURN NEW;
END;
$$;


--
-- Name: properties_search_vector_update(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION "public"."properties_search_vector_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.address, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.state, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.zip_code, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.neighborhood, '')), 'B');
  RETURN NEW;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


--
-- Name: apply_rls("jsonb", integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer DEFAULT (1024 * 1024)) RETURNS SETOF "realtime"."wal_rls"
    LANGUAGE "plpgsql"
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_
        -- Filter by action early - only get subscriptions interested in this action
        -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
        and (subs.action_filter = '*' or subs.action_filter = action::text);

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


--
-- Name: broadcast_changes("text", "text", "text", "text", "text", "record", "record", "text"); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text" DEFAULT 'ROW'::"text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


--
-- Name: build_prepared_statement_sql("text", "regclass", "realtime"."wal_column"[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) RETURNS "text"
    LANGUAGE "sql"
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


--
-- Name: cast("text", "regtype"); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") RETURNS "jsonb"
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


--
-- Name: check_equality_op("realtime"."equality_op", "regtype", "text", "text"); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") RETURNS boolean
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


--
-- Name: is_visible_through_filters("realtime"."wal_column"[], "realtime"."user_defined_filter"[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) RETURNS boolean
    LANGUAGE "sql" IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


--
-- Name: list_changes("name", "name", integer, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) RETURNS SETOF "realtime"."wal_rls"
    LANGUAGE "sql"
    SET "log_min_messages" TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


--
-- Name: quote_wal2json("regclass"); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."quote_wal2json"("entity" "regclass") RETURNS "text"
    LANGUAGE "sql" IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


--
-- Name: send("jsonb", "text", "text", boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean DEFAULT true) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."subscription_check_filters"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


--
-- Name: to_regrole("text"); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."to_regrole"("role_name" "text") RETURNS "regrole"
    LANGUAGE "sql" IMMUTABLE
    AS $$ select role_name::regrole $$;


--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION "realtime"."topic"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


--
-- Name: can_insert_object("text", "text", "uuid", "jsonb"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."can_insert_object"("bucketid" "text", "name" "text", "owner" "uuid", "metadata" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


--
-- Name: delete_leaf_prefixes("text"[], "text"[]); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."delete_leaf_prefixes"("bucket_ids" "text"[], "names" "text"[]) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."enforce_bucket_name_length"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


--
-- Name: extension("text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."extension"("name" "text") RETURNS "text"
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


--
-- Name: filename("text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."filename"("name" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


--
-- Name: foldername("text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."foldername"("name" "text") RETURNS "text"[]
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


--
-- Name: get_common_prefix("text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."get_common_prefix"("p_key" "text", "p_prefix" "text", "p_delimiter" "text") RETURNS "text"
    LANGUAGE "sql" IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


--
-- Name: get_level("text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."get_level"("name" "text") RETURNS integer
    LANGUAGE "sql" IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


--
-- Name: get_prefix("text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."get_prefix"("name" "text") RETURNS "text"
    LANGUAGE "sql" IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


--
-- Name: get_prefixes("text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."get_prefixes"("name" "text") RETURNS "text"[]
    LANGUAGE "plpgsql" IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."get_size_by_bucket"() RETURNS TABLE("size" bigint, "bucket_id" "text")
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


--
-- Name: list_multipart_uploads_with_delimiter("text", "text", "text", integer, "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."list_multipart_uploads_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer DEFAULT 100, "next_key_token" "text" DEFAULT ''::"text", "next_upload_token" "text" DEFAULT ''::"text") RETURNS TABLE("key" "text", "id" "text", "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


--
-- Name: list_objects_with_delimiter("text", "text", "text", integer, "text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."list_objects_with_delimiter"("_bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer DEFAULT 100, "start_after" "text" DEFAULT ''::"text", "next_token" "text" DEFAULT ''::"text", "sort_order" "text" DEFAULT 'asc'::"text") RETURNS TABLE("name" "text", "id" "uuid", "metadata" "jsonb", "updated_at" timestamp with time zone, "created_at" timestamp with time zone, "last_accessed_at" timestamp with time zone)
    LANGUAGE "plpgsql" STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."operation"() RETURNS "text"
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."protect_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


--
-- Name: search("text", "text", integer, integer, integer, "text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."search"("prefix" "text", "bucketname" "text", "limits" integer DEFAULT 100, "levels" integer DEFAULT 1, "offsets" integer DEFAULT 0, "search" "text" DEFAULT ''::"text", "sortcolumn" "text" DEFAULT 'name'::"text", "sortorder" "text" DEFAULT 'asc'::"text") RETURNS TABLE("name" "text", "id" "uuid", "updated_at" timestamp with time zone, "created_at" timestamp with time zone, "last_accessed_at" timestamp with time zone, "metadata" "jsonb")
    LANGUAGE "plpgsql" STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: search_by_timestamp("text", "text", integer, integer, "text", "text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."search_by_timestamp"("p_prefix" "text", "p_bucket_id" "text", "p_limit" integer, "p_level" integer, "p_start_after" "text", "p_sort_order" "text", "p_sort_column" "text", "p_sort_column_after" "text") RETURNS TABLE("key" "text", "name" "text", "id" "uuid", "updated_at" timestamp with time zone, "created_at" timestamp with time zone, "last_accessed_at" timestamp with time zone, "metadata" "jsonb")
    LANGUAGE "plpgsql" STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


--
-- Name: search_legacy_v1("text", "text", integer, integer, integer, "text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."search_legacy_v1"("prefix" "text", "bucketname" "text", "limits" integer DEFAULT 100, "levels" integer DEFAULT 1, "offsets" integer DEFAULT 0, "search" "text" DEFAULT ''::"text", "sortcolumn" "text" DEFAULT 'name'::"text", "sortorder" "text" DEFAULT 'asc'::"text") RETURNS TABLE("name" "text", "id" "uuid", "updated_at" timestamp with time zone, "created_at" timestamp with time zone, "last_accessed_at" timestamp with time zone, "metadata" "jsonb")
    LANGUAGE "plpgsql" STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


--
-- Name: search_v2("text", "text", integer, integer, "text", "text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."search_v2"("prefix" "text", "bucket_name" "text", "limits" integer DEFAULT 100, "levels" integer DEFAULT 1, "start_after" "text" DEFAULT ''::"text", "sort_order" "text" DEFAULT 'asc'::"text", "sort_column" "text" DEFAULT 'name'::"text", "sort_column_after" "text" DEFAULT ''::"text") RETURNS TABLE("key" "text", "name" "text", "id" "uuid", "updated_at" timestamp with time zone, "created_at" timestamp with time zone, "last_accessed_at" timestamp with time zone, "metadata" "jsonb")
    LANGUAGE "plpgsql" STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION "storage"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."audit_log_entries" (
    "instance_id" "uuid",
    "id" "uuid" NOT NULL,
    "payload" json,
    "created_at" timestamp with time zone,
    "ip_address" character varying(64) DEFAULT ''::character varying NOT NULL
);


--
-- Name: TABLE "audit_log_entries"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."audit_log_entries" IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."custom_oauth_providers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "provider_type" "text" NOT NULL,
    "identifier" "text" NOT NULL,
    "name" "text" NOT NULL,
    "client_id" "text" NOT NULL,
    "client_secret" "text" NOT NULL,
    "acceptable_client_ids" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "scopes" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "pkce_enabled" boolean DEFAULT true NOT NULL,
    "attribute_mapping" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "authorization_params" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "enabled" boolean DEFAULT true NOT NULL,
    "email_optional" boolean DEFAULT false NOT NULL,
    "issuer" "text",
    "discovery_url" "text",
    "skip_nonce_check" boolean DEFAULT false NOT NULL,
    "cached_discovery" "jsonb",
    "discovery_cached_at" timestamp with time zone,
    "authorization_url" "text",
    "token_url" "text",
    "userinfo_url" "text",
    "jwks_uri" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "custom_oauth_providers_authorization_url_https" CHECK ((("authorization_url" IS NULL) OR ("authorization_url" ~~ 'https://%'::"text"))),
    CONSTRAINT "custom_oauth_providers_authorization_url_length" CHECK ((("authorization_url" IS NULL) OR ("char_length"("authorization_url") <= 2048))),
    CONSTRAINT "custom_oauth_providers_client_id_length" CHECK ((("char_length"("client_id") >= 1) AND ("char_length"("client_id") <= 512))),
    CONSTRAINT "custom_oauth_providers_discovery_url_length" CHECK ((("discovery_url" IS NULL) OR ("char_length"("discovery_url") <= 2048))),
    CONSTRAINT "custom_oauth_providers_identifier_format" CHECK (("identifier" ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::"text")),
    CONSTRAINT "custom_oauth_providers_issuer_length" CHECK ((("issuer" IS NULL) OR (("char_length"("issuer") >= 1) AND ("char_length"("issuer") <= 2048)))),
    CONSTRAINT "custom_oauth_providers_jwks_uri_https" CHECK ((("jwks_uri" IS NULL) OR ("jwks_uri" ~~ 'https://%'::"text"))),
    CONSTRAINT "custom_oauth_providers_jwks_uri_length" CHECK ((("jwks_uri" IS NULL) OR ("char_length"("jwks_uri") <= 2048))),
    CONSTRAINT "custom_oauth_providers_name_length" CHECK ((("char_length"("name") >= 1) AND ("char_length"("name") <= 100))),
    CONSTRAINT "custom_oauth_providers_oauth2_requires_endpoints" CHECK ((("provider_type" <> 'oauth2'::"text") OR (("authorization_url" IS NOT NULL) AND ("token_url" IS NOT NULL) AND ("userinfo_url" IS NOT NULL)))),
    CONSTRAINT "custom_oauth_providers_oidc_discovery_url_https" CHECK ((("provider_type" <> 'oidc'::"text") OR ("discovery_url" IS NULL) OR ("discovery_url" ~~ 'https://%'::"text"))),
    CONSTRAINT "custom_oauth_providers_oidc_issuer_https" CHECK ((("provider_type" <> 'oidc'::"text") OR ("issuer" IS NULL) OR ("issuer" ~~ 'https://%'::"text"))),
    CONSTRAINT "custom_oauth_providers_oidc_requires_issuer" CHECK ((("provider_type" <> 'oidc'::"text") OR ("issuer" IS NOT NULL))),
    CONSTRAINT "custom_oauth_providers_provider_type_check" CHECK (("provider_type" = ANY (ARRAY['oauth2'::"text", 'oidc'::"text"]))),
    CONSTRAINT "custom_oauth_providers_token_url_https" CHECK ((("token_url" IS NULL) OR ("token_url" ~~ 'https://%'::"text"))),
    CONSTRAINT "custom_oauth_providers_token_url_length" CHECK ((("token_url" IS NULL) OR ("char_length"("token_url") <= 2048))),
    CONSTRAINT "custom_oauth_providers_userinfo_url_https" CHECK ((("userinfo_url" IS NULL) OR ("userinfo_url" ~~ 'https://%'::"text"))),
    CONSTRAINT "custom_oauth_providers_userinfo_url_length" CHECK ((("userinfo_url" IS NULL) OR ("char_length"("userinfo_url") <= 2048)))
);


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."flow_state" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid",
    "auth_code" "text",
    "code_challenge_method" "auth"."code_challenge_method",
    "code_challenge" "text",
    "provider_type" "text" NOT NULL,
    "provider_access_token" "text",
    "provider_refresh_token" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "authentication_method" "text" NOT NULL,
    "auth_code_issued_at" timestamp with time zone,
    "invite_token" "text",
    "referrer" "text",
    "oauth_client_state_id" "uuid",
    "linking_target_id" "uuid",
    "email_optional" boolean DEFAULT false NOT NULL
);


--
-- Name: TABLE "flow_state"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."flow_state" IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."identities" (
    "provider_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "identity_data" "jsonb" NOT NULL,
    "provider" "text" NOT NULL,
    "last_sign_in_at" timestamp with time zone,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "email" "text" GENERATED ALWAYS AS ("lower"(("identity_data" ->> 'email'::"text"))) STORED,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


--
-- Name: TABLE "identities"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."identities" IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN "identities"."email"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."identities"."email" IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."instances" (
    "id" "uuid" NOT NULL,
    "uuid" "uuid",
    "raw_base_config" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


--
-- Name: TABLE "instances"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."instances" IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."mfa_amr_claims" (
    "session_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "authentication_method" "text" NOT NULL,
    "id" "uuid" NOT NULL
);


--
-- Name: TABLE "mfa_amr_claims"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."mfa_amr_claims" IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."mfa_challenges" (
    "id" "uuid" NOT NULL,
    "factor_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "verified_at" timestamp with time zone,
    "ip_address" "inet" NOT NULL,
    "otp_code" "text",
    "web_authn_session_data" "jsonb"
);


--
-- Name: TABLE "mfa_challenges"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."mfa_challenges" IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."mfa_factors" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "friendly_name" "text",
    "factor_type" "auth"."factor_type" NOT NULL,
    "status" "auth"."factor_status" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "secret" "text",
    "phone" "text",
    "last_challenged_at" timestamp with time zone,
    "web_authn_credential" "jsonb",
    "web_authn_aaguid" "uuid",
    "last_webauthn_challenge_data" "jsonb"
);


--
-- Name: TABLE "mfa_factors"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."mfa_factors" IS 'auth: stores metadata about factors';


--
-- Name: COLUMN "mfa_factors"."last_webauthn_challenge_data"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."mfa_factors"."last_webauthn_challenge_data" IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."oauth_authorizations" (
    "id" "uuid" NOT NULL,
    "authorization_id" "text" NOT NULL,
    "client_id" "uuid" NOT NULL,
    "user_id" "uuid",
    "redirect_uri" "text" NOT NULL,
    "scope" "text" NOT NULL,
    "state" "text",
    "resource" "text",
    "code_challenge" "text",
    "code_challenge_method" "auth"."code_challenge_method",
    "response_type" "auth"."oauth_response_type" DEFAULT 'code'::"auth"."oauth_response_type" NOT NULL,
    "status" "auth"."oauth_authorization_status" DEFAULT 'pending'::"auth"."oauth_authorization_status" NOT NULL,
    "authorization_code" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "expires_at" timestamp with time zone DEFAULT ("now"() + '00:03:00'::interval) NOT NULL,
    "approved_at" timestamp with time zone,
    "nonce" "text",
    CONSTRAINT "oauth_authorizations_authorization_code_length" CHECK (("char_length"("authorization_code") <= 255)),
    CONSTRAINT "oauth_authorizations_code_challenge_length" CHECK (("char_length"("code_challenge") <= 128)),
    CONSTRAINT "oauth_authorizations_expires_at_future" CHECK (("expires_at" > "created_at")),
    CONSTRAINT "oauth_authorizations_nonce_length" CHECK (("char_length"("nonce") <= 255)),
    CONSTRAINT "oauth_authorizations_redirect_uri_length" CHECK (("char_length"("redirect_uri") <= 2048)),
    CONSTRAINT "oauth_authorizations_resource_length" CHECK (("char_length"("resource") <= 2048)),
    CONSTRAINT "oauth_authorizations_scope_length" CHECK (("char_length"("scope") <= 4096)),
    CONSTRAINT "oauth_authorizations_state_length" CHECK (("char_length"("state") <= 4096))
);


--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."oauth_client_states" (
    "id" "uuid" NOT NULL,
    "provider_type" "text" NOT NULL,
    "code_verifier" "text",
    "created_at" timestamp with time zone NOT NULL
);


--
-- Name: TABLE "oauth_client_states"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."oauth_client_states" IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."oauth_clients" (
    "id" "uuid" NOT NULL,
    "client_secret_hash" "text",
    "registration_type" "auth"."oauth_registration_type" NOT NULL,
    "redirect_uris" "text" NOT NULL,
    "grant_types" "text" NOT NULL,
    "client_name" "text",
    "client_uri" "text",
    "logo_uri" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "deleted_at" timestamp with time zone,
    "client_type" "auth"."oauth_client_type" DEFAULT 'confidential'::"auth"."oauth_client_type" NOT NULL,
    "token_endpoint_auth_method" "text" NOT NULL,
    CONSTRAINT "oauth_clients_client_name_length" CHECK (("char_length"("client_name") <= 1024)),
    CONSTRAINT "oauth_clients_client_uri_length" CHECK (("char_length"("client_uri") <= 2048)),
    CONSTRAINT "oauth_clients_logo_uri_length" CHECK (("char_length"("logo_uri") <= 2048)),
    CONSTRAINT "oauth_clients_token_endpoint_auth_method_check" CHECK (("token_endpoint_auth_method" = ANY (ARRAY['client_secret_basic'::"text", 'client_secret_post'::"text", 'none'::"text"])))
);


--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."oauth_consents" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "client_id" "uuid" NOT NULL,
    "scopes" "text" NOT NULL,
    "granted_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "revoked_at" timestamp with time zone,
    CONSTRAINT "oauth_consents_revoked_after_granted" CHECK ((("revoked_at" IS NULL) OR ("revoked_at" >= "granted_at"))),
    CONSTRAINT "oauth_consents_scopes_length" CHECK (("char_length"("scopes") <= 2048)),
    CONSTRAINT "oauth_consents_scopes_not_empty" CHECK (("char_length"(TRIM(BOTH FROM "scopes")) > 0))
);


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."one_time_tokens" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "token_type" "auth"."one_time_token_type" NOT NULL,
    "token_hash" "text" NOT NULL,
    "relates_to" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "one_time_tokens_token_hash_check" CHECK (("char_length"("token_hash") > 0))
);


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."refresh_tokens" (
    "instance_id" "uuid",
    "id" bigint NOT NULL,
    "token" character varying(255),
    "user_id" character varying(255),
    "revoked" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "parent" character varying(255),
    "session_id" "uuid"
);


--
-- Name: TABLE "refresh_tokens"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."refresh_tokens" IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: -
--

CREATE SEQUENCE "auth"."refresh_tokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: -
--

ALTER SEQUENCE "auth"."refresh_tokens_id_seq" OWNED BY "auth"."refresh_tokens"."id";


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."saml_providers" (
    "id" "uuid" NOT NULL,
    "sso_provider_id" "uuid" NOT NULL,
    "entity_id" "text" NOT NULL,
    "metadata_xml" "text" NOT NULL,
    "metadata_url" "text",
    "attribute_mapping" "jsonb",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "name_id_format" "text",
    CONSTRAINT "entity_id not empty" CHECK (("char_length"("entity_id") > 0)),
    CONSTRAINT "metadata_url not empty" CHECK ((("metadata_url" = NULL::"text") OR ("char_length"("metadata_url") > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK (("char_length"("metadata_xml") > 0))
);


--
-- Name: TABLE "saml_providers"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."saml_providers" IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."saml_relay_states" (
    "id" "uuid" NOT NULL,
    "sso_provider_id" "uuid" NOT NULL,
    "request_id" "text" NOT NULL,
    "for_email" "text",
    "redirect_to" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "flow_state_id" "uuid",
    CONSTRAINT "request_id not empty" CHECK (("char_length"("request_id") > 0))
);


--
-- Name: TABLE "saml_relay_states"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."saml_relay_states" IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."schema_migrations" (
    "version" character varying(255) NOT NULL
);


--
-- Name: TABLE "schema_migrations"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."schema_migrations" IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."sessions" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "factor_id" "uuid",
    "aal" "auth"."aal_level",
    "not_after" timestamp with time zone,
    "refreshed_at" timestamp without time zone,
    "user_agent" "text",
    "ip" "inet",
    "tag" "text",
    "oauth_client_id" "uuid",
    "refresh_token_hmac_key" "text",
    "refresh_token_counter" bigint,
    "scopes" "text",
    CONSTRAINT "sessions_scopes_length" CHECK (("char_length"("scopes") <= 4096))
);


--
-- Name: TABLE "sessions"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."sessions" IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN "sessions"."not_after"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."sessions"."not_after" IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN "sessions"."refresh_token_hmac_key"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."sessions"."refresh_token_hmac_key" IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN "sessions"."refresh_token_counter"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."sessions"."refresh_token_counter" IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."sso_domains" (
    "id" "uuid" NOT NULL,
    "sso_provider_id" "uuid" NOT NULL,
    "domain" "text" NOT NULL,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK (("char_length"("domain") > 0))
);


--
-- Name: TABLE "sso_domains"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."sso_domains" IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."sso_providers" (
    "id" "uuid" NOT NULL,
    "resource_id" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "disabled" boolean,
    CONSTRAINT "resource_id not empty" CHECK ((("resource_id" = NULL::"text") OR ("char_length"("resource_id") > 0)))
);


--
-- Name: TABLE "sso_providers"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."sso_providers" IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN "sso_providers"."resource_id"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."sso_providers"."resource_id" IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."users" (
    "instance_id" "uuid",
    "id" "uuid" NOT NULL,
    "aud" character varying(255),
    "role" character varying(255),
    "email" character varying(255),
    "encrypted_password" character varying(255),
    "email_confirmed_at" timestamp with time zone,
    "invited_at" timestamp with time zone,
    "confirmation_token" character varying(255),
    "confirmation_sent_at" timestamp with time zone,
    "recovery_token" character varying(255),
    "recovery_sent_at" timestamp with time zone,
    "email_change_token_new" character varying(255),
    "email_change" character varying(255),
    "email_change_sent_at" timestamp with time zone,
    "last_sign_in_at" timestamp with time zone,
    "raw_app_meta_data" "jsonb",
    "raw_user_meta_data" "jsonb",
    "is_super_admin" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "phone" "text" DEFAULT NULL::character varying,
    "phone_confirmed_at" timestamp with time zone,
    "phone_change" "text" DEFAULT ''::character varying,
    "phone_change_token" character varying(255) DEFAULT ''::character varying,
    "phone_change_sent_at" timestamp with time zone,
    "confirmed_at" timestamp with time zone GENERATED ALWAYS AS (LEAST("email_confirmed_at", "phone_confirmed_at")) STORED,
    "email_change_token_current" character varying(255) DEFAULT ''::character varying,
    "email_change_confirm_status" smallint DEFAULT 0,
    "banned_until" timestamp with time zone,
    "reauthentication_token" character varying(255) DEFAULT ''::character varying,
    "reauthentication_sent_at" timestamp with time zone,
    "is_sso_user" boolean DEFAULT false NOT NULL,
    "deleted_at" timestamp with time zone,
    "is_anonymous" boolean DEFAULT false NOT NULL,
    CONSTRAINT "users_email_change_confirm_status_check" CHECK ((("email_change_confirm_status" >= 0) AND ("email_change_confirm_status" <= 2)))
);


--
-- Name: TABLE "users"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE "auth"."users" IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN "users"."is_sso_user"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN "auth"."users"."is_sso_user" IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."webauthn_challenges" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "challenge_type" "text" NOT NULL,
    "session_data" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "expires_at" timestamp with time zone NOT NULL,
    CONSTRAINT "webauthn_challenges_challenge_type_check" CHECK (("challenge_type" = ANY (ARRAY['signup'::"text", 'registration'::"text", 'authentication'::"text"])))
);


--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE "auth"."webauthn_credentials" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "credential_id" "bytea" NOT NULL,
    "public_key" "bytea" NOT NULL,
    "attestation_type" "text" DEFAULT ''::"text" NOT NULL,
    "aaguid" "uuid",
    "sign_count" bigint DEFAULT 0 NOT NULL,
    "transports" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "backup_eligible" boolean DEFAULT false NOT NULL,
    "backed_up" boolean DEFAULT false NOT NULL,
    "friendly_name" "text" DEFAULT ''::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "last_used_at" timestamp with time zone
);


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."admin_users" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "full_name" "text",
    "role" "text" DEFAULT 'admin'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "last_login" timestamp with time zone
);


--
-- Name: agents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."agents" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "bio" "text",
    "photo_url" "text",
    "title" "text",
    "specialties" "jsonb" DEFAULT '[]'::"jsonb",
    "social_links" "jsonb" DEFAULT '{}'::"jsonb",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_featured" boolean DEFAULT false,
    "featured_order" integer DEFAULT 0,
    "specialties_list" "text"[],
    "languages" "text"[],
    "search_vector" "tsvector",
    "profile_data" "jsonb" DEFAULT '{}'::"jsonb"
);


--
-- Name: component_templates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."component_templates" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "component_type" "text" NOT NULL,
    "description" "text",
    "default_config" "jsonb" DEFAULT '{}'::"jsonb",
    "preview_image_url" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: featured_properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."featured_properties" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "property_id" "uuid",
    "display_order" integer NOT NULL,
    "title_override" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: form_configs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."form_configs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "form_key" "text" NOT NULL,
    "title" "text" NOT NULL,
    "fields" "jsonb" NOT NULL,
    "submit_text" "text" DEFAULT 'Submit'::"text",
    "success_message" "text",
    "email_recipients" "text"[],
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: TABLE "form_configs"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."form_configs" IS 'Configuration for site forms';


--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."form_submissions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "form_type" "text" NOT NULL,
    "data" "jsonb" NOT NULL,
    "status" "text" DEFAULT 'new'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: media_library; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."media_library" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "filename" "text" NOT NULL,
    "cloudinary_url" "text" NOT NULL,
    "cloudinary_id" "text" NOT NULL,
    "media_type" "text",
    "file_size" integer,
    "dimensions" "jsonb",
    "alt_text" "text",
    "tags" "text"[],
    "uploaded_by" "uuid",
    "uploaded_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "media_library_media_type_check" CHECK (("media_type" = ANY (ARRAY['image'::"text", 'video'::"text"])))
);


--
-- Name: TABLE "media_library"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."media_library" IS 'Centralized media asset management';


--
-- Name: navigation_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."navigation_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "menu_location" "text" NOT NULL,
    "label" "text" NOT NULL,
    "url" "text" NOT NULL,
    "parent_id" "uuid",
    "order_index" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "icon" "text",
    "dropdown_config" "jsonb",
    "has_dropdown" boolean DEFAULT false,
    "dropdown_type" "text",
    "opens_in_new_tab" boolean DEFAULT false
);


--
-- Name: TABLE "navigation_items"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."navigation_items" IS 'Navigation menu items for header and footer';


--
-- Name: COLUMN "navigation_items"."has_dropdown"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "public"."navigation_items"."has_dropdown" IS 'Whether this navigation item has a dropdown menu';


--
-- Name: newsletter_subscribers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."newsletter_subscribers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "email" "text" NOT NULL,
    "subscribed_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    "unsubscribed_at" timestamp with time zone
);


--
-- Name: newsletters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."newsletters" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "cover_image_url" "text",
    "description" "text",
    "content" "text",
    "category" "text" DEFAULT 'INSIDER'::"text",
    "published_date" "date" DEFAULT CURRENT_DATE,
    "is_featured" boolean DEFAULT false,
    "order_index" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: page_meta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."page_meta" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "page_path" "text" NOT NULL,
    "title" "text",
    "description" "text",
    "keywords" "text"[],
    "og_image" "text",
    "canonical_url" "text",
    "noindex" boolean DEFAULT false,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: TABLE "page_meta"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."page_meta" IS 'SEO and meta information for pages';


--
-- Name: page_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."page_sections" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "page" "text" NOT NULL,
    "section_type" "text" NOT NULL,
    "title" "text",
    "subtitle" "text",
    "content" "text",
    "media_url" "text",
    "media_type" "text",
    "layout_config" "jsonb" DEFAULT '{}'::"jsonb",
    "cta_primary_text" "text",
    "cta_primary_link" "text",
    "cta_secondary_text" "text",
    "cta_secondary_link" "text",
    "background_color" "text" DEFAULT '#FFFFFF'::"text",
    "text_color" "text" DEFAULT '#000000'::"text",
    "order_index" integer NOT NULL,
    "is_active" boolean DEFAULT true,
    "template_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."properties" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "city" "text" NOT NULL,
    "address" "text",
    "state" "text",
    "zip_code" "text",
    "bedrooms" integer,
    "bathrooms" numeric(3,1),
    "half_baths" integer DEFAULT 0,
    "price" numeric(12,2) NOT NULL,
    "description" "text",
    "property_type" "text",
    "status" "text" DEFAULT 'active'::"text",
    "square_feet" integer,
    "lot_size" numeric(10,2),
    "year_built" integer,
    "is_featured" boolean DEFAULT false,
    "featured_order" integer,
    "images" "jsonb" DEFAULT '[]'::"jsonb",
    "amenities" "jsonb" DEFAULT '[]'::"jsonb",
    "category" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_exclusive" boolean DEFAULT false,
    "badge_text" "text",
    "badge_expires_at" timestamp with time zone,
    "listing_type" "text" DEFAULT 'sale'::"text",
    "neighborhood" "text",
    "search_vector" "tsvector",
    CONSTRAINT "properties_listing_type_check" CHECK (("listing_type" = ANY (ARRAY['sale'::"text", 'rent'::"text"])))
);


--
-- Name: site_config; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."site_config" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "key" "text" NOT NULL,
    "value" "jsonb" NOT NULL,
    "category" "text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: TABLE "site_config"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."site_config" IS 'Stores site-wide configuration settings';


--
-- Name: site_statistics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."site_statistics" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "label" "text" NOT NULL,
    "value" "text" NOT NULL,
    "sublabel" "text",
    "category" "text" DEFAULT 'general'::"text",
    "order_index" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: TABLE "site_statistics"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."site_statistics" IS 'Stores company statistics displayed across the site';


--
-- Name: stories_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."stories_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "section_id" "uuid",
    "title" "text" NOT NULL,
    "image_url" "text",
    "category" "text" DEFAULT 'INSIDER'::"text",
    "url" "text",
    "sort_order" integer DEFAULT 0,
    "layout_config" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: tabs_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."tabs_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "section_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "image_url" "text",
    "order_index" integer NOT NULL,
    "layout_config" "jsonb" DEFAULT '{}'::"jsonb",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


--
-- Name: TABLE "tabs_items"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "public"."tabs_items" IS 'Individual tab items for tabs sections';


--
-- Name: COLUMN "tabs_items"."section_id"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "public"."tabs_items"."section_id" IS 'Reference to parent page_sections entry';


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE "realtime"."messages" (
    "topic" "text" NOT NULL,
    "extension" "text" NOT NULL,
    "payload" "jsonb",
    "event" "text",
    "private" boolean DEFAULT false,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "inserted_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
)
PARTITION BY RANGE ("inserted_at");


--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE "realtime"."schema_migrations" (
    "version" bigint NOT NULL,
    "inserted_at" timestamp(0) without time zone
);


--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE "realtime"."subscription" (
    "id" bigint NOT NULL,
    "subscription_id" "uuid" NOT NULL,
    "entity" "regclass" NOT NULL,
    "filters" "realtime"."user_defined_filter"[] DEFAULT '{}'::"realtime"."user_defined_filter"[] NOT NULL,
    "claims" "jsonb" NOT NULL,
    "claims_role" "regrole" GENERATED ALWAYS AS ("realtime"."to_regrole"(("claims" ->> 'role'::"text"))) STORED NOT NULL,
    "created_at" timestamp without time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "action_filter" "text" DEFAULT '*'::"text",
    CONSTRAINT "subscription_action_filter_check" CHECK (("action_filter" = ANY (ARRAY['*'::"text", 'INSERT'::"text", 'UPDATE'::"text", 'DELETE'::"text"])))
);


--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: -
--

ALTER TABLE "realtime"."subscription" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "realtime"."subscription_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."buckets" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "owner" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "public" boolean DEFAULT false,
    "avif_autodetection" boolean DEFAULT false,
    "file_size_limit" bigint,
    "allowed_mime_types" "text"[],
    "owner_id" "text",
    "type" "storage"."buckettype" DEFAULT 'STANDARD'::"storage"."buckettype" NOT NULL
);


--
-- Name: COLUMN "buckets"."owner"; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN "storage"."buckets"."owner" IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."buckets_analytics" (
    "name" "text" NOT NULL,
    "type" "storage"."buckettype" DEFAULT 'ANALYTICS'::"storage"."buckettype" NOT NULL,
    "format" "text" DEFAULT 'ICEBERG'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "deleted_at" timestamp with time zone
);


--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."buckets_vectors" (
    "id" "text" NOT NULL,
    "type" "storage"."buckettype" DEFAULT 'VECTOR'::"storage"."buckettype" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."migrations" (
    "id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "hash" character varying(40) NOT NULL,
    "executed_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: objects; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."objects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "bucket_id" "text",
    "name" "text",
    "owner" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "last_accessed_at" timestamp with time zone DEFAULT "now"(),
    "metadata" "jsonb",
    "path_tokens" "text"[] GENERATED ALWAYS AS ("string_to_array"("name", '/'::"text")) STORED,
    "version" "text",
    "owner_id" "text",
    "user_metadata" "jsonb"
);


--
-- Name: COLUMN "objects"."owner"; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN "storage"."objects"."owner" IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."s3_multipart_uploads" (
    "id" "text" NOT NULL,
    "in_progress_size" bigint DEFAULT 0 NOT NULL,
    "upload_signature" "text" NOT NULL,
    "bucket_id" "text" NOT NULL,
    "key" "text" NOT NULL COLLATE "pg_catalog"."C",
    "version" "text" NOT NULL,
    "owner_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_metadata" "jsonb"
);


--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."s3_multipart_uploads_parts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "upload_id" "text" NOT NULL,
    "size" bigint DEFAULT 0 NOT NULL,
    "part_number" integer NOT NULL,
    "bucket_id" "text" NOT NULL,
    "key" "text" NOT NULL COLLATE "pg_catalog"."C",
    "etag" "text" NOT NULL,
    "owner_id" "text",
    "version" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE "storage"."vector_indexes" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL COLLATE "pg_catalog"."C",
    "bucket_id" "text" NOT NULL,
    "data_type" "text" NOT NULL,
    "dimension" integer NOT NULL,
    "distance_metric" "text" NOT NULL,
    "metadata_configuration" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: -
--

CREATE TABLE "supabase_migrations"."schema_migrations" (
    "version" "text" NOT NULL,
    "statements" "text"[],
    "name" "text"
);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."refresh_tokens" ALTER COLUMN "id" SET DEFAULT "nextval"('"auth"."refresh_tokens_id_seq"'::"regclass");


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
47838213-c39c-4135-9d1a-a924307c77d6	47838213-c39c-4135-9d1a-a924307c77d6	{"sub": "47838213-c39c-4135-9d1a-a924307c77d6", "email": "admin@ellliman.com", "email_verified": false, "phone_verified": false}	email	2025-12-22 08:05:20.33481+00	2025-12-22 08:05:20.335565+00	2025-12-22 08:05:20.335565+00	9f53f556-b7e7-4a70-bc5f-2cd3189545f8
742c31bf-d94b-45d2-906a-8de86a6d8954	742c31bf-d94b-45d2-906a-8de86a6d8954	{"sub": "742c31bf-d94b-45d2-906a-8de86a6d8954", "email": "admin@sirimara.com", "email_verified": false, "phone_verified": false}	email	2026-02-11 06:50:45.014182+00	2026-02-11 06:50:45.014658+00	2026-02-11 06:50:45.014658+00	bd69c435-8e40-4b6e-a175-359b202b87ec
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
85804b57-30ac-45b9-beb8-df57d81f5c46	2026-03-22 07:09:01.487329+00	2026-03-22 07:09:01.487329+00	password	339ce7eb-3757-49dc-b33c-10d07e8275a3
e333f3c7-7f67-4ab3-a653-199157a8d546	2026-03-25 09:33:28.763823+00	2026-03-25 09:33:28.763823+00	password	c3385da4-386e-4d4a-957f-fc44e8b91482
ff065f2f-5471-4ba5-9c6a-b6b1ff0811a8	2026-03-26 06:38:40.187931+00	2026-03-26 06:38:40.187931+00	password	68ef443c-7eac-4d06-bfbb-03401493bab9
915bc0db-2037-4757-8822-1d74be743fb0	2026-03-26 06:38:48.503072+00	2026-03-26 06:38:48.503072+00	password	7f67d235-56eb-4b16-ac61-b9e986de7860
3225e678-522b-41fd-a079-7eee283c9115	2026-03-26 08:11:46.15225+00	2026-03-26 08:11:46.15225+00	password	9ddf3a05-0d16-49c8-b34a-d91d218d54a2
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	125	cq5vcpk2wfg3	742c31bf-d94b-45d2-906a-8de86a6d8954	f	2026-03-22 07:09:01.482219+00	2026-03-22 07:09:01.482219+00	\N	85804b57-30ac-45b9-beb8-df57d81f5c46
00000000-0000-0000-0000-000000000000	126	u5phdaceo7m5	742c31bf-d94b-45d2-906a-8de86a6d8954	f	2026-03-25 09:33:28.718294+00	2026-03-25 09:33:28.718294+00	\N	e333f3c7-7f67-4ab3-a653-199157a8d546
00000000-0000-0000-0000-000000000000	127	g6yoycizf4es	742c31bf-d94b-45d2-906a-8de86a6d8954	f	2026-03-26 06:38:40.141611+00	2026-03-26 06:38:40.141611+00	\N	ff065f2f-5471-4ba5-9c6a-b6b1ff0811a8
00000000-0000-0000-0000-000000000000	128	5oi2csachbbc	742c31bf-d94b-45d2-906a-8de86a6d8954	t	2026-03-26 06:38:48.500569+00	2026-03-26 08:03:48.588983+00	\N	915bc0db-2037-4757-8822-1d74be743fb0
00000000-0000-0000-0000-000000000000	130	jc6dyc7pcctu	742c31bf-d94b-45d2-906a-8de86a6d8954	f	2026-03-26 08:11:46.147268+00	2026-03-26 08:11:46.147268+00	\N	3225e678-522b-41fd-a079-7eee283c9115
00000000-0000-0000-0000-000000000000	129	d2odpzxyf42f	742c31bf-d94b-45d2-906a-8de86a6d8954	t	2026-03-26 08:03:48.619233+00	2026-03-26 09:56:35.523862+00	5oi2csachbbc	915bc0db-2037-4757-8822-1d74be743fb0
00000000-0000-0000-0000-000000000000	131	jzkngncoqd4n	742c31bf-d94b-45d2-906a-8de86a6d8954	f	2026-03-26 09:56:35.555337+00	2026-03-26 09:56:35.555337+00	d2odpzxyf42f	915bc0db-2037-4757-8822-1d74be743fb0
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."schema_migrations" ("version") FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
85804b57-30ac-45b9-beb8-df57d81f5c46	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-03-22 07:09:01.479174+00	2026-03-22 07:09:01.479174+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0	41.90.185.198	\N	\N	\N	\N	\N
e333f3c7-7f67-4ab3-a653-199157a8d546	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-03-25 09:33:28.659902+00	2026-03-25 09:33:28.659902+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0	197.237.123.236	\N	\N	\N	\N	\N
ff065f2f-5471-4ba5-9c6a-b6b1ff0811a8	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-03-26 06:38:40.092838+00	2026-03-26 06:38:40.092838+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	197.232.71.138	\N	\N	\N	\N	\N
3225e678-522b-41fd-a079-7eee283c9115	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-03-26 08:11:46.133758+00	2026-03-26 08:11:46.133758+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0	102.210.12.11	\N	\N	\N	\N	\N
915bc0db-2037-4757-8822-1d74be743fb0	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-03-26 06:38:48.498699+00	2026-03-26 09:57:16.558333+00	\N	aal1	\N	2026-03-26 09:57:16.558238	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	197.232.71.138	\N	\N	\N	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	742c31bf-d94b-45d2-906a-8de86a6d8954	authenticated	authenticated	admin@sirimara.com	$2a$10$0MP2qJuZ5uSdi.LJrgfBeegaa8w/tJv8SZaR7DwRJ9Ya.zijbnGg6	2026-02-11 06:50:45.0383+00	\N		\N		\N			\N	2026-03-26 08:11:46.133649+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-02-11 06:50:44.974934+00	2026-03-26 09:56:35.571376+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	47838213-c39c-4135-9d1a-a924307c77d6	authenticated	authenticated	admin@ellliman.com	$2a$10$mhU7qgAggUnMvS4f.i.eTur3QkmT3DcswCMSVNSntFT/LLlpK1iEC	2025-12-22 08:05:20.344556+00	\N		\N		\N			\N	2026-02-11 10:01:49.852015+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-12-22 08:05:20.321213+00	2026-02-11 10:01:49.908771+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."admin_users" ("id", "email", "full_name", "role", "created_at", "last_login") FROM stdin;
742c31bf-d94b-45d2-906a-8de86a6d8954	admin@sirimara.com	Admin User	super_admin	2026-02-11 06:56:28.175814+00	2026-03-26 08:11:44.798+00
\.


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."agents" ("id", "first_name", "last_name", "email", "phone", "bio", "photo_url", "title", "specialties", "social_links", "is_active", "created_at", "updated_at", "is_featured", "featured_order", "specialties_list", "languages", "search_vector", "profile_data") FROM stdin;
30000564-8fb7-4907-b63f-ea05cdad15c9	Halima 	Hussein	admin@sirimararealty.com	0712345678	Halima has expertise in commercial transactions and in energy, environmental and international trade issues with more than 10 years of post qualification legal experience. 	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/agent-photos/tsp11p1irx7_1774507553844.jpg	Agent	[]	{"twitter": "", "linkedin": "", "instagram": ""}	t	2026-03-26 06:45:58.554026+00	2026-03-26 06:45:58.554026+00	f	0	\N	\N	'10':21C 'agent':3B 'commerci':8C 'energi':12C 'environment':13C 'experi':27C 'expertis':6C 'halima':1A,4C 'hussein':2A 'intern':15C 'issu':17C 'legal':26C 'post':24C 'qualif':25C 'trade':16C 'transact':9C 'year':22C	{"intro": "Halima has expertise in commercial transactions and in energy, environmental and international trade issues with more than 10 years of post qualification legal experience. ", "admissions": ["Advocate of the High Court of Kenya"], "experience": "Corporate Law Islamic Banking Policy making and legislative drafting Conveyancing Family law Energy and Infrastructure Employment Law Medical law Research & Consultancy Services", "capabilities": ["Corporate Law Islamic Banking Policy making and legislative drafting Conveyancing Family law Energy and Infrastructure Employment Law Medical law Research & Consultancy Services"], "academic_qualifications": ["Master of Laws in Energy and Natural Resources Law (Distinction), Queen Mary University of London, 2016.", "Post Graduate Diploma in Law (Distinction), Kenya School of Law Bar Qualifying Examinations, 2013.", "Bachelor of Laws (Hons), University of Nairobi, 2012."]}
\.


--
-- Data for Name: component_templates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."component_templates" ("id", "name", "component_type", "description", "default_config", "preview_image_url", "is_active", "created_at") FROM stdin;
45fe7b04-e602-4347-9b58-db19457ba4b2	hero_fullscreen	hero	Full-screen hero with video/image background and centered text	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 30, "show_scroll_indicator": false}	\N	t	2026-02-04 12:53:56.566012+00
140d90ad-2e77-4f50-82bd-34559cdf413e	hero_home_variant	hero	Homepage hero with bottom navigation overlay	{"height": "screen", "variant": "home", "text_alignment": "center", "overlay_opacity": 20, "show_bottom_nav": true, "show_scroll_indicator": false}	\N	t	2026-02-04 12:53:56.566012+00
b4fee2dd-1d37-4bd6-8053-29b767bc2b6c	hero_80vh	hero	Shorter hero section (80% viewport height)	{"height": "80vh", "variant": "default", "text_alignment": "center", "overlay_opacity": 30, "show_scroll_indicator": true}	\N	t	2026-02-04 12:53:56.566012+00
951bf8bf-c247-4413-8f99-308c86a6d61e	stats_3column	stats	Three-column statistics display	{"columns": 3, "show_border": true, "show_intro_text": true}	\N	t	2026-02-04 12:53:56.566012+00
c326dd7c-c58d-4eab-a4ef-335e6d56c4db	quote_centered	quote	Centered quote with attribution and decorative quotation marks	{"text_alignment": "center", "show_author_image": false, "show_quotation_marks": true}	\N	t	2026-02-04 12:53:56.566012+00
64770728-5f45-4650-96c6-6e9c5deaa8ff	banner_cta	banner	Full-width banner with CTA buttons and overlay	{"height": "80vh", "cta_layout": "horizontal", "text_alignment": "center", "overlay_opacity": 30}	\N	t	2026-02-04 12:53:56.566012+00
f1c4aaee-3617-4df0-85b7-8e90265f248e	contact_dual_cta	contact	Contact section with two CTA buttons (phone and email)	{"layout": "horizontal", "show_intro_text": true}	\N	t	2026-02-04 12:53:56.566012+00
fbef6085-d8d3-4f3c-91e3-f297acfa1ad5	tabs_spotlight	tabs	Interactive tabs section with image switching	{"layout": "side-by-side", "show_gradient": true, "image_position": "right"}	\N	t	2026-02-04 12:53:56.566012+00
199c16fd-2af9-4187-a414-41ef94c7a985	property_search	property_search_sales	Full property search interface with map and filters	{"show_map": true, "initial_view": "list"}	\N	t	2026-02-04 12:53:56.566012+00
4d88d499-adcf-4b82-a5ce-4c2873fdd4cb	development_grid	development_grid	Grid of new developments	{"columns": 4}	\N	t	2026-02-04 12:53:56.566012+00
accdd500-017f-41af-90f2-7542f57fb6b2	logo_grid	logo_grid	Grid of brand logos	{"background_color": "#F8F8F8"}	\N	t	2026-02-04 12:53:56.566012+00
34ead2cd-ed90-47a3-b1c5-c0f7b34639c9	property_showcase	property_showcase	Property showcase with category tabs	{"show_tabs": true, "max_properties": 4}	\N	t	2026-02-04 12:53:56.566012+00
dd333c2b-9364-47f0-ba1d-2f04535b812d	newsletter	newsletter	Newsletter signup section	{"layout": "horizontal"}	\N	t	2026-02-04 12:53:56.566012+00
502632fb-5814-44ab-bd21-aeffda676834	woe_full_bleed	woe_story	Full bleed story with video/image background	{"variant": "story"}	\N	t	2026-02-04 12:53:56.566012+00
ca3efe58-a9d7-4b73-b64f-d83016093972	woe_grouped_banner	woe_banner	Two-column grouped banner section	{}	\N	t	2026-02-04 12:53:56.566012+00
8f055698-e379-4b5c-82a9-c30a92cdb537	woe_market_modules	woe_modules	Grid of featured publications	{}	\N	t	2026-02-04 12:53:56.566012+00
c5dea592-0521-48a9-bfa1-16ace37c8ed3	leadership_hero	leadership_hero	Leadership page hero with scroll indicator	{}	\N	t	2026-02-04 12:53:56.566012+00
3fb7adc6-ab58-42ed-953b-296cd20d7a31	leader_tile_row	leadership_tiles	Large leadership image and bio tiles	{"reversed": false}	\N	t	2026-02-04 12:53:56.566012+00
141205dd-48e5-4a2f-808c-75a6c14a8a16	regional_accordion	accordion	Accordion section for regional content	{}	\N	t	2026-02-04 12:53:56.566012+00
766db7e4-23d1-4126-953e-9a1f46228419	legal_content	legal	Legal document content with rich text formatting	{"show_toc": false, "show_last_modified": true}	\N	t	2026-02-04 12:54:44.49988+00
\.


--
-- Data for Name: featured_properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."featured_properties" ("id", "property_id", "display_order", "title_override", "created_at") FROM stdin;
\.


--
-- Data for Name: form_configs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."form_configs" ("id", "form_key", "title", "fields", "submit_text", "success_message", "email_recipients", "is_active", "updated_at") FROM stdin;
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."form_submissions" ("id", "form_type", "data", "status", "created_at", "updated_at") FROM stdin;
dd377453-4d90-47f7-b12d-de4796dd3f12	contact	{"email": "okellobrian462@gmail.com", "phone": "0714928456", "consent": true, "message": "interested", "lastName": "okello", "firstName": "brian"}	new	2026-03-02 09:08:53.871954+00	2026-03-02 09:08:53.871954+00
a653aaeb-1885-4999-bacc-d4c58ae37964	contact	{"email": "OKELLOBRIAN454@GMAIL.COM", "phone": "0712345667", "consent": true, "message": "TEST", "lastName": "OKELLO", "firstName": "BRIAN"}	new	2026-03-18 06:02:05.760916+00	2026-03-18 06:02:05.760916+00
\.


--
-- Data for Name: media_library; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."media_library" ("id", "filename", "cloudinary_url", "cloudinary_id", "media_type", "file_size", "dimensions", "alt_text", "tags", "uploaded_by", "uploaded_at") FROM stdin;
ee0e0eea-77f6-4d4f-9069-f38d85d13f60	0xprhlvm5dx_1770211060046.svg	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/0xprhlvm5dx_1770211060046.svg	0xprhlvm5dx_1770211060046.svg	image	\N	\N	\N	\N	\N	2026-02-04 13:17:47.772812+00
71fcb045-ae8e-4569-97ca-43a74e7d2f50	etg1lkkz1fo_1770232384037.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/etg1lkkz1fo_1770232384037.mp4	etg1lkkz1fo_1770232384037.mp4	video	\N	\N	\N	\N	\N	2026-02-04 19:13:08.167564+00
102594eb-fa9b-4479-8dcb-9464cdf5712a	edzuus2nz7l_1770289090345.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/edzuus2nz7l_1770289090345.mp4	edzuus2nz7l_1770289090345.mp4	video	\N	\N	\N	\N	\N	2026-02-05 10:58:15.919947+00
c96f771a-5b9c-4268-ab9d-1f6878d74ee4	p1j72f9eby_1770289116420.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/p1j72f9eby_1770289116420.mp4	p1j72f9eby_1770289116420.mp4	video	\N	\N	\N	\N	\N	2026-02-05 10:58:40.30189+00
3116cebe-46dc-49d0-b329-f75f311be8c0	fk07jxj7jor_1770289140849.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/fk07jxj7jor_1770289140849.mp4	fk07jxj7jor_1770289140849.mp4	video	\N	\N	\N	\N	\N	2026-02-05 10:59:06.02471+00
f6760c7f-5b2b-43ca-b267-3f8e9b9dea35	d8afhdci7c4_1770289160422.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/d8afhdci7c4_1770289160422.mp4	d8afhdci7c4_1770289160422.mp4	video	\N	\N	\N	\N	\N	2026-02-05 10:59:27.322261+00
439d2400-da7d-482d-b204-e73dc5940eeb	0njk1jp6cf7h_1770289831670.jpeg	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/0njk1jp6cf7h_1770289831670.jpeg	0njk1jp6cf7h_1770289831670.jpeg	image	\N	\N	\N	\N	\N	2026-02-05 11:10:34.679886+00
fdbabc40-88af-4c27-bc94-992acb5fbfdc	4ycqt45daeh_1770292806266.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/4ycqt45daeh_1770292806266.mp4	4ycqt45daeh_1770292806266.mp4	video	\N	\N	\N	\N	\N	2026-02-05 12:00:23.14502+00
7f288d13-579e-4a70-9460-d832790cc1fe	in3mtsohk2_1770293861458.jpeg	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/in3mtsohk2_1770293861458.jpeg	in3mtsohk2_1770293861458.jpeg	image	\N	\N	\N	\N	\N	2026-02-05 12:17:44.253102+00
a5f9d4c1-c798-4bb6-a5f4-dd2c223347ed	cq6m3faqs57_1770294369872.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/cq6m3faqs57_1770294369872.mp4	cq6m3faqs57_1770294369872.mp4	video	\N	\N	\N	\N	\N	2026-02-05 12:26:17.138882+00
1b284ade-e301-42ea-ab11-c2944bac9f8f	uqyz5tocmm_1770301736841.png	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/uqyz5tocmm_1770301736841.png	uqyz5tocmm_1770301736841.png	image	\N	\N	\N	\N	\N	2026-02-05 14:29:00.599895+00
604f33bb-e9d1-4ee8-ae04-468c2ea59020	i7qdemgbsds_1770301997758.png	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/i7qdemgbsds_1770301997758.png	i7qdemgbsds_1770301997758.png	image	\N	\N	\N	\N	\N	2026-02-05 14:33:23.148897+00
1f321011-10be-4097-a881-e1a16f5db94c	uey1aipcid_1770307812131.mp4	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/uey1aipcid_1770307812131.mp4	uey1aipcid_1770307812131.mp4	video	\N	\N	\N	\N	\N	2026-02-05 16:10:44.691726+00
\.


--
-- Data for Name: navigation_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."navigation_items" ("id", "menu_location", "label", "url", "parent_id", "order_index", "is_active", "icon", "dropdown_config", "has_dropdown", "dropdown_type", "opens_in_new_tab") FROM stdin;
789f894c-b383-406b-a164-f986b221aa57	footer_company	About Us	/about	\N	1	t	\N	\N	f	\N	f
c306b58d-1d75-4882-86cb-ea20ee3c3a82	footer_company	Contact Us	#contact	\N	4	t	\N	\N	f	\N	f
5351ae07-8db3-4b90-b8a2-fd3f2713dd70	header_secondary	INSIGHTS	/newsletters	\N	3	t	\N	\N	f	\N	f
fed7c45d-6c46-4b04-931f-1810ea0f4e48	footer_resources	Insights	/newsletters	\N	1	t	\N	\N	f	\N	f
b083e0ba-1133-4d70-a174-06b337268d94	footer_legal	Terms & Conditions	/terms-of-service	\N	1	t	\N	\N	f	\N	f
98abb56c-5334-4b3a-8522-4437cecea55f	header_secondary	AGENTS	/agents	\N	1	t	\N	\N	f	\N	f
7d863ebf-c927-4285-be25-16b41125a38c	header_secondary	PROPERTY MANAGEMENT	/property-management	\N	2	t	\N	\N	f	\N	f
f9a272e6-632b-42cc-9ec3-b2cf7a42a4c6	header_main	SELL	/sell	\N	3	t	\N	\N	f	\N	f
2f8b47d8-3d42-4240-8b36-e97a02cb242b	header_main	HOME	/	\N	2	t	\N	\N	f	\N	f
26e365c6-3553-4af3-99c7-90d0154a35ac	header_main	BUY	/sales	\N	4	t	\N	\N	f	\N	f
f30ac047-c7a1-492c-bfd0-5240ea7b900c	header_main	RENT	/rentals	\N	5	t	\N	\N	f	\N	f
\.


--
-- Data for Name: newsletter_subscribers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."newsletter_subscribers" ("id", "email", "subscribed_at", "is_active", "unsubscribed_at") FROM stdin;
fbbef617-3ab8-4c5e-a07c-ae17b2f472cf	admin@sirimara.com	2026-03-21 02:16:13.364425+00	t	\N
bff8abbd-75cf-44f9-9a0b-8793da2e147f	okellobrian462@gmail.com	2026-03-21 15:28:53.045409+00	t	\N
\.


--
-- Data for Name: newsletters; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."newsletters" ("id", "title", "slug", "cover_image_url", "description", "content", "category", "published_date", "is_featured", "order_index", "created_at", "updated_at") FROM stdin;
2ce01d73-113c-440b-be84-643d7e191ecb	Property due diligence when buying a Property in Kenya: What is essential? 	sirimara-insight	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/0njk1jp6cf7h_1770289831670.jpeg	Due diligence is a form of investigation to discover hidden issues of a property before buying it. With the recent change in Land regime laws in Kenya, due diligence has transformed and with it, essential steps have changed. 	<p class="ql-align-justify"></p><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Due&nbsp;diligence&nbsp;is&nbsp;a&nbsp;form&nbsp;of&nbsp;investigation&nbsp;to&nbsp;discover&nbsp;hidden&nbsp;issues&nbsp;of&nbsp;a&nbsp;property&nbsp;before&nbsp;buying&nbsp;it.&nbsp;With&nbsp;the&nbsp;recent&nbsp;change&nbsp;in&nbsp;Land&nbsp;regime&nbsp;laws&nbsp;in&nbsp;Kenya,&nbsp;due&nbsp;diligence&nbsp;has&nbsp;transformed&nbsp;and&nbsp;with&nbsp;it,&nbsp;essential&nbsp;steps&nbsp;have&nbsp;changed.&nbsp;Below&nbsp;are&nbsp;the&nbsp;current&nbsp;key&nbsp;steps:&nbsp;–</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Conduct&nbsp;an&nbsp;Official&nbsp;Search&nbsp;at&nbsp;the&nbsp;Land&nbsp;Registry</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">The&nbsp;first&nbsp;and&nbsp;most&nbsp;crucial&nbsp;step&nbsp;is&nbsp;to&nbsp;conduct&nbsp;an&nbsp;official&nbsp;search&nbsp;at&nbsp;the&nbsp;Land&nbsp;Registry.&nbsp;This&nbsp;search&nbsp;will&nbsp;help&nbsp;you&nbsp;verify&nbsp;the&nbsp;ownership&nbsp;of&nbsp;the&nbsp;property&nbsp;and&nbsp;check&nbsp;for&nbsp;any&nbsp;encumbrances&nbsp;such&nbsp;as&nbsp;mortgages,&nbsp;caveats,&nbsp;or&nbsp;disputes.</span></p><ul><li><strong style="color: rgb(85, 85, 85);">Manual&nbsp;Search</strong><span style="color: rgb(85, 85, 85);">:&nbsp;Visit&nbsp;the&nbsp;nearest&nbsp;land&nbsp;registry&nbsp;with&nbsp;a&nbsp;copy&nbsp;of&nbsp;the&nbsp;title&nbsp;deed,&nbsp;the&nbsp;seller’s&nbsp;KRA&nbsp;PIN,&nbsp;and&nbsp;the&nbsp;seller’s&nbsp;national&nbsp;ID.&nbsp;Fill&nbsp;out&nbsp;the&nbsp;Land&nbsp;Search&nbsp;Form&nbsp;LRA&nbsp;84,&nbsp;attach&nbsp;the&nbsp;title&nbsp;and&nbsp;any&nbsp;other&nbsp;necessary&nbsp;document,&nbsp;and&nbsp;submit&nbsp;the&nbsp;form.&nbsp;The&nbsp;results&nbsp;will&nbsp;typically&nbsp;be&nbsp;available&nbsp;within&nbsp;a&nbsp;few&nbsp;hours&nbsp;or&nbsp;days.</span></li><li><strong style="color: rgb(85, 85, 85);">Online&nbsp;Search</strong><span style="color: rgb(85, 85, 85);">:&nbsp;Log&nbsp;in&nbsp;to&nbsp;the&nbsp;Ardhisasa&nbsp;portal,&nbsp;select&nbsp;the&nbsp;land&nbsp;search&nbsp;option,&nbsp;enter&nbsp;the&nbsp;title&nbsp;deed&nbsp;number&nbsp;and&nbsp;follow&nbsp;the&nbsp;steps.</span></li></ul><ol><li><strong style="color: rgb(194, 35, 41);">Title&nbsp;Deed&nbsp;and&nbsp;Encumbrance&nbsp;Check</strong></li></ol><ul><li><strong style="color: rgb(85, 85, 85);">Verify&nbsp;Title&nbsp;Deed</strong><span style="color: rgb(85, 85, 85);">:&nbsp;Ensure&nbsp;the&nbsp;title&nbsp;deed&nbsp;is&nbsp;authentic&nbsp;and&nbsp;free&nbsp;from&nbsp;encumbrances,&nbsp;such&nbsp;as&nbsp;mortgages,&nbsp;disputes,&nbsp;or&nbsp;unpaid&nbsp;taxes.&nbsp;This&nbsp;can&nbsp;be&nbsp;done&nbsp;by&nbsp;obtaining&nbsp;a&nbsp;search&nbsp;report&nbsp;from&nbsp;the&nbsp;land&nbsp;registry</span></li><li><strong style="color: rgb(85, 85, 85);">Caveats&nbsp;and&nbsp;Cautions</strong><span style="color: rgb(85, 85, 85);">:&nbsp;Check&nbsp;for&nbsp;registered&nbsp;caveats&nbsp;or&nbsp;cautions&nbsp;that&nbsp;may&nbsp;restrict&nbsp;dealings&nbsp;with&nbsp;the&nbsp;property.&nbsp;Investigate&nbsp;the&nbsp;reasons&nbsp;for&nbsp;these&nbsp;restrictions&nbsp;and&nbsp;ensure&nbsp;they&nbsp;are&nbsp;resolved&nbsp;before&nbsp;proceeding&nbsp;with&nbsp;the&nbsp;purchase</span></li></ul><ol><li><strong style="color: rgb(194, 35, 41);">Verify&nbsp;the&nbsp;Seller’s&nbsp;Identity&nbsp;and&nbsp;Legal&nbsp;Standing</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Ensure&nbsp;that&nbsp;the&nbsp;seller&nbsp;is&nbsp;the&nbsp;legitimate&nbsp;property&nbsp;owner&nbsp;with&nbsp;the&nbsp;legal&nbsp;capacity&nbsp;to&nbsp;sell&nbsp;it.&nbsp;This&nbsp;involves&nbsp;checking&nbsp;the&nbsp;seller’s&nbsp;identification&nbsp;documents&nbsp;and&nbsp;confirming&nbsp;their&nbsp;legal&nbsp;standing.&nbsp;If&nbsp;a&nbsp;company&nbsp;sells&nbsp;the&nbsp;property,&nbsp;it&nbsp;must&nbsp;maintain&nbsp;the&nbsp;legitimacy&nbsp;of&nbsp;the&nbsp;company,&nbsp;its&nbsp;shareholders,&nbsp;and&nbsp;directors.&nbsp;Conduct&nbsp;a&nbsp;search&nbsp;of&nbsp;the&nbsp;Company&nbsp;on&nbsp;E-citizen&nbsp;to&nbsp;ascertain&nbsp;its&nbsp;current&nbsp;Directors&nbsp;and&nbsp;Shareholders.</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Conduct&nbsp;a&nbsp;Physical&nbsp;Inspection</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">A&nbsp;physical&nbsp;inspection&nbsp;of&nbsp;the&nbsp;property&nbsp;is&nbsp;necessary&nbsp;to&nbsp;verify&nbsp;its&nbsp;condition,&nbsp;boundaries,&nbsp;and&nbsp;any&nbsp;existing&nbsp;structures.&nbsp;Engage&nbsp;a&nbsp;licensed&nbsp;surveyor&nbsp;to&nbsp;confirm&nbsp;that&nbsp;the&nbsp;boundaries&nbsp;match&nbsp;those&nbsp;on&nbsp;official&nbsp;land&nbsp;maps&nbsp;and&nbsp;to&nbsp;check&nbsp;for&nbsp;any&nbsp;structural&nbsp;issues.</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Verify&nbsp;Zoning&nbsp;and&nbsp;Land&nbsp;Use&nbsp;Regulations</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Confirm&nbsp;that&nbsp;the&nbsp;property&nbsp;complies&nbsp;with&nbsp;zoning&nbsp;and&nbsp;land&nbsp;use&nbsp;regulations.&nbsp;This&nbsp;involves&nbsp;checking&nbsp;with&nbsp;the&nbsp;local&nbsp;county&nbsp;government&nbsp;to&nbsp;ensure&nbsp;that&nbsp;the&nbsp;property&nbsp;is&nbsp;zoned&nbsp;for&nbsp;the&nbsp;intended&nbsp;use&nbsp;and&nbsp;that&nbsp;there&nbsp;are&nbsp;no&nbsp;future&nbsp;restrictions&nbsp;or&nbsp;violations&nbsp;for&nbsp;the&nbsp;intended&nbsp;developments.</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Review&nbsp;of&nbsp;the&nbsp;Sale&nbsp;Agreement&nbsp;and&nbsp;other&nbsp;documents.</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Work&nbsp;with&nbsp;a&nbsp;qualified&nbsp;real&nbsp;estate&nbsp;Advocate&nbsp;to&nbsp;review&nbsp;all&nbsp;relevant&nbsp;legal&nbsp;documents,&nbsp;including&nbsp;contracts,&nbsp;agreements,&nbsp;permits,&nbsp;and&nbsp;licenses&nbsp;associated&nbsp;with&nbsp;the&nbsp;property.</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Historical&nbsp;ownership&nbsp;and&nbsp;approvals/consent&nbsp;for&nbsp;transfer.</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Apply&nbsp;for&nbsp;a&nbsp;copy&nbsp;of&nbsp;the&nbsp;green&nbsp;card&nbsp;from&nbsp;the&nbsp;respective&nbsp;land&nbsp;registry&nbsp;to&nbsp;understand&nbsp;the&nbsp;historical&nbsp;ownership&nbsp;of&nbsp;the&nbsp;property&nbsp;and&nbsp;other&nbsp;underlying&nbsp;encumbrances&nbsp;that&nbsp;the&nbsp;official&nbsp;search&nbsp;could&nbsp;not&nbsp;have&nbsp;highlighted.&nbsp;Also,&nbsp;seek&nbsp;Land&nbsp;Rates&nbsp;from&nbsp;the&nbsp;respective&nbsp;County&nbsp;Government&nbsp;and&nbsp;a&nbsp;Land&nbsp;Rent&nbsp;Clearance&nbsp;certificate&nbsp;from&nbsp;the&nbsp;Ministry&nbsp;of&nbsp;Lands.&nbsp;For&nbsp;Consent,&nbsp;ensure&nbsp;you&nbsp;get&nbsp;the&nbsp;spousal&nbsp;consent&nbsp;to&nbsp;sell&nbsp;the&nbsp;Land&nbsp;Control&nbsp;Board&nbsp;(LCB)&nbsp;consent&nbsp;for&nbsp;the&nbsp;agricultural&nbsp;land.</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Execution&nbsp;of&nbsp;Sale&nbsp;Agreement</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Once&nbsp;satisfied&nbsp;with&nbsp;the&nbsp;terms&nbsp;of&nbsp;the&nbsp;agreement,&nbsp;you&nbsp;can&nbsp;proceed&nbsp;to&nbsp;execute&nbsp;the&nbsp;sale&nbsp;agreement.&nbsp;The&nbsp;execution&nbsp;is&nbsp;the&nbsp;signing&nbsp;of&nbsp;the&nbsp;contract&nbsp;by&nbsp;the&nbsp;seller&nbsp;and&nbsp;the&nbsp;buyer&nbsp;in&nbsp;the&nbsp;presence&nbsp;of&nbsp;their&nbsp;witnesses.&nbsp;Once&nbsp;executed,&nbsp;the&nbsp;buyer&nbsp;proceeds&nbsp;to&nbsp;make&nbsp;a&nbsp;</span><strong style="color: rgb(85, 85, 85);">10%&nbsp;security&nbsp;deposit</strong><span style="color: rgb(85, 85, 85);">&nbsp;of&nbsp;the&nbsp;purchase&nbsp;price&nbsp;in&nbsp;an&nbsp;escrow&nbsp;account&nbsp;to&nbsp;offer&nbsp;protection&nbsp;in&nbsp;case&nbsp;of&nbsp;any&nbsp;issues.</span></p><ol><li><strong style="color: rgb(194, 35, 41);">Completion&nbsp;and&nbsp;Transfer&nbsp;of&nbsp;Title</strong></li></ol><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">Once&nbsp;all&nbsp;due&nbsp;diligence&nbsp;steps&nbsp;are&nbsp;completed,&nbsp;you&nbsp;can&nbsp;proceed&nbsp;with&nbsp;the&nbsp;completion&nbsp;of&nbsp;the&nbsp;sale&nbsp;and&nbsp;the&nbsp;transfer&nbsp;of&nbsp;the&nbsp;title.&nbsp;This&nbsp;involves&nbsp;payment&nbsp;of&nbsp;stamp&nbsp;duty,&nbsp;which&nbsp;is&nbsp;4%&nbsp;for&nbsp;lands&nbsp;in&nbsp;the&nbsp;municipal/urban&nbsp;areas&nbsp;and&nbsp;2%&nbsp;for&nbsp;agricultural&nbsp;lands,&nbsp;depositing&nbsp;all&nbsp;the&nbsp;completion&nbsp;documents&nbsp;with&nbsp;the&nbsp;land&nbsp;registrar&nbsp;for&nbsp;the&nbsp;transfer&nbsp;of&nbsp;ownership&nbsp;to&nbsp;the&nbsp;buyer,&nbsp;issuance&nbsp;of&nbsp;a&nbsp;new&nbsp;title&nbsp;deed&nbsp;in&nbsp;favor&nbsp;of&nbsp;the&nbsp;buyer&nbsp;and&nbsp;finally&nbsp;completing&nbsp;the&nbsp;payment&nbsp;of&nbsp;the&nbsp;balance&nbsp;of&nbsp;the&nbsp;purchase&nbsp;price.</span></p><p><strong style="color: rgb(194, 35, 41);">Conclusion</strong></p><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">By&nbsp;meticulously&nbsp;following&nbsp;these&nbsp;steps,&nbsp;you&nbsp;can&nbsp;mitigate&nbsp;risks&nbsp;associated&nbsp;with&nbsp;property&nbsp;transactions&nbsp;in&nbsp;Kenya.&nbsp;</span></p><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">To&nbsp;navigate&nbsp;the&nbsp;due&nbsp;diligence&nbsp;process&nbsp;effectively,&nbsp;it&nbsp;is&nbsp;highly&nbsp;recommended&nbsp;that&nbsp;you&nbsp;engage&nbsp;professionals&nbsp;such&nbsp;as&nbsp;advocates,&nbsp;licensed&nbsp;surveyors&nbsp;and&nbsp;property&nbsp;valuers.&nbsp;Due&nbsp;diligence&nbsp;is&nbsp;a&nbsp;crucial&nbsp;step&nbsp;in&nbsp;any&nbsp;property&nbsp;purchase&nbsp;and&nbsp;every&nbsp;single&nbsp;step&nbsp;shared&nbsp;above&nbsp;is&nbsp;essential.&nbsp;It&nbsp;may&nbsp;require&nbsp;time,&nbsp;effort&nbsp;and&nbsp;resources,&nbsp;but&nbsp;it’s&nbsp;worth&nbsp;it&nbsp;to&nbsp;protect&nbsp;your&nbsp;investment.</span></p><p class="ql-align-justify"><span style="color: rgb(85, 85, 85);">For&nbsp;a&nbsp;more&nbsp;detailed&nbsp;guide,&nbsp;contact&nbsp;us&nbsp;at&nbsp;info@sirimara.co.ke</span></p><ul><li></li></ul>	INSIDER	2026-02-04	f	1	2026-02-04 12:55:20.694626+00	2026-02-04 12:55:20.694626+00
\.


--
-- Data for Name: page_meta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."page_meta" ("id", "page_path", "title", "description", "keywords", "og_image", "canonical_url", "noindex", "updated_at") FROM stdin;
4dd91070-286f-4fab-865a-135ac78c36df	/terms-of-service	Terms of Service | Douglas Elliman	Read our terms and conditions of use for the Douglas Elliman website.	{terms,legal,conditions,use}	\N	\N	f	2026-02-04 12:54:44.49988+00
65aaa45a-7d27-4a57-92eb-464c60eef041	/privacy-policy	Privacy Policy | Douglas Elliman	Learn how we protect your privacy at Douglas Elliman.	{privacy,"data protection",legal,policy}	\N	\N	f	2026-02-04 12:54:44.49988+00
3fdd7ee6-adfc-4bb6-a859-5b6f48d35359	/newsletters	Newsletters | Douglas Elliman	Explore our latest insights, magazines, and market reports.	\N	\N	\N	f	2026-02-04 12:55:20.694626+00
b1111111-1111-1111-1111-111111111111	/property-management	Property Management | Sirimara Realty	Expert property management services including tenant management, facilities audits, and financial reporting.	\N	\N	\N	f	2026-03-21 00:36:15.403508+00
\.


--
-- Data for Name: page_sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."page_sections" ("id", "page", "section_type", "title", "subtitle", "content", "media_url", "media_type", "layout_config", "cta_primary_text", "cta_primary_link", "cta_secondary_text", "cta_secondary_link", "background_color", "text_color", "order_index", "is_active", "template_id", "created_at", "updated_at") FROM stdin;
35d6133e-3863-4320-8e6e-1efbbfa5efa7	exclusives	hero	Douglas Elliman Exclusives	EXCLUSIVES	View our curated collection of premier properties.	https://ext.same-assets.com/2757429726/2803648720.jpeg	image	{"height": "60vh", "variant": "default", "text_alignment": "center", "overlay_opacity": 40}	\N	\N	\N	\N	#181728	#FFFFFF	1	t	b4fee2dd-1d37-4bd6-8053-29b767bc2b6c	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
99eb33c1-93a5-447f-88a8-bd729e43decd	exclusives	property_search_sales	Find Your Exclusive Home	\N	\N	\N	\N	{"show_map": true, "initial_view": "grid"}	\N	\N	\N	\N	#FFFFFF	#000000	2	t	199c16fd-2af9-4187-a414-41ef94c7a985	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
90000000-0000-0000-0000-000000000001	leadership	leadership_hero	Real Estate is a People Business First	Our Leadership	While innovation drives success for our agents and partners, relationships and thoughtful leadership are the most essential.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1766097063/production/myfyhtalqjqjhtcmxiuk.jpg	image	{}	\N	\N	\N	\N	#181728	#FFFFFF	1	t	c5dea592-0521-48a9-bfa1-16ace37c8ed3	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
90000000-0000-0000-0000-000000000002	leadership	leadership_tiles	Principals	\N	\N	\N	\N	{}	\N	\N	\N	\N	#FFFFFF	#000000	2	t	3fb7adc6-ab58-42ed-953b-296cd20d7a31	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
90000000-0000-0000-0000-000000000003	leadership	accordion	Regional Leadership	\N	\N	\N	\N	{}	\N	\N	\N	\N	#FFFFFF	#000000	3	t	141205dd-48e5-4a2f-808c-75a6c14a8a16	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
a7b4aa65-ad47-4274-b45c-f441a96dddfe	home	hero	Discover Kenya’s Finest Addresses	Step into a world where elegance meets opportunity.	Our portfolio of luxury estates across Nairobi, Mombasa, and the Great Rift Valley offers more than homes—they are statements of prestige.	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/4ycqt45daeh_1770292806266.mp4	video	{"height": "screen", "variant": "home", "text_alignment": "center", "overlay_opacity": 20, "show_bottom_nav": true, "show_scroll_indicator": false}	START YOUR SEARCH	/search			#000000	#FFFFFF	1	t	140d90ad-2e77-4f50-82bd-34559cdf413e	2026-02-04 12:53:56.566012+00	2026-02-05 12:14:14.62212+00
7c239c63-de7d-4cae-9532-6cb39fea91f7	about	stats			Sirimara realty is a unique  real estate company, with a team of five experts holding more than 20 years of experience and knowledge in both the legal and real estate fields.\n\nAt sirimara realty, we provide real estate services all under one roof, hinged upon the principles of transparency and integrity.		image	{"columns": 3, "show_border": true, "stats_category": "company", "show_intro_text": true}					#181728	#FFFFFF	2	t	951bf8bf-c247-4413-8f99-308c86a6d61e	2026-02-04 12:53:56.566012+00	2026-02-05 12:27:00.244289+00
31d5ec75-f65d-436b-92df-e542df4f2f70	about	hero	We Are The Ultimate Destination Real Estate in Kenya	About Us		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/cq6m3faqs57_1770294369872.mp4	video	{"height": "80vh", "variant": "default", "text_alignment": "center", "overlay_opacity": 20, "show_scroll_indicator": true}					#181728	#FFFFFF	1	t	\N	2026-02-04 12:53:56.566012+00	2026-02-05 12:27:11.226109+00
50aad805-5544-48c6-99b9-523633b3e8fa	home	hero	Property due diligence in Kenya, What's essential?	Kenya’s Luxury Real Estate Specialists"		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/0njk1jp6cf7h_1770289831670.jpeg	image	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 30, "show_scroll_indicator": false}	Learn More	/newsletter			#e65314	#db0606	5	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-22 14:56:57.945295+00
b0d67018-f54a-4ed8-bd43-499a24165e9f	about	banner	We Are Market Makers		We focus our expertise on the places that inspire and shape the future.	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/in3mtsohk2_1770293861458.jpeg	image	{"height": "80vh", "cta_layout": "horizontal", "text_alignment": "center", "overlay_opacity": 30}	Explore Our Exclusive Properties	/sales			#181728	#FFFFFF	6	t	64770728-5f45-4650-96c6-6e9c5deaa8ff	2026-02-04 12:53:56.566012+00	2026-02-05 12:29:18.349745+00
b5555555-5555-5555-5555-555555555555	property-management	tabs	\N	Our Value Add	\N	\N	\N	{"layout": "side-by-side", "show_gradient": false, "image_position": "right"}	\N	\N	\N	\N	#FFFFFF	#181728	4	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 00:51:41.294404+00
b6666666-6666-6666-6666-666666666666	property-management	tabs	\N	Our Value Add	\N	\N	\N	{"layout": "side-by-side", "show_gradient": false, "image_position": "left"}	\N	\N	\N	\N	#F8F8F8	#181728	5	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 00:51:41.294404+00
b7777777-7777-7777-7777-777777777777	property-management	tabs	\N	Our Value Add	\N	\N	\N	{"layout": "side-by-side", "show_gradient": false, "image_position": "right"}	\N	\N	\N	\N	#FFFFFF	#181728	6	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 00:51:41.294404+00
9b314acd-a4c6-40e2-9465-72c633df9786	about	contact	Ready to Connect?		Let our exceptional team guide you.		image	{"layout": "horizontal", "show_intro_text": true}	Call SIRIMIARAREALTY	tel:+254795456604	info@sirimararealty.com	mailto:sirimararealty@gmail.com	#181728	#FFFFFF	7	t	f1c4aaee-3617-4df0-85b7-8e90265f248e	2026-02-04 12:53:56.566012+00	2026-03-21 01:19:00.035094+00
6a16a57c-f06c-4fa3-bacd-f1c329ebdea2	sell	stats	THE NUMBERS SPEAK FOR THEMSELVES	\N	We deliver results that matter. Our proven track record and market expertise ensure your property gets the attention it deserves.	\N	\N	{"columns": 3, "show_border": true, "stats_category": "company", "show_intro_text": true}	VIEW OUR MARKET REPORTS	\N	\N	\N	#181728	#FFFFFF	2	t	951bf8bf-c247-4413-8f99-308c86a6d61e	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
4ad8de9b-a927-448b-af23-a6f8eff2ab0f	sell	banner	OUR AGENT ADVANTAGE	\N	Our agents have the knowledge, experience, and professional network to price, promote and put your property in front of the most highly qualified buyers.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1732501450/staging-test/vrvgksmitdbeff170j1y.jpg	image	{"height": "600px", "cta_layout": "horizontal", "text_alignment": "center", "overlay_opacity": 50}	FIND AN AGENT	/agents	\N	\N	#000000	#FFFFFF	3	t	64770728-5f45-4650-96c6-6e9c5deaa8ff	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
4f5f27fb-b971-4508-ae03-c8058077a55d	sell	contact	GET YOUR HOME VALUATION	\N	Discover what your property is worth with a complimentary market analysis from our experts.	\N	\N	{"layout": "horizontal", "show_intro_text": true}	REQUEST A VALUATION	/valuation	\N	\N	#F8F8F8	#181728	10	t	f1c4aaee-3617-4df0-85b7-8e90265f248e	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
085856ea-4aca-4be7-85a0-75b401d066d9	sales	property_search_sales	Sales Search	\N	\N	\N	\N	{}	\N	\N	\N	\N	#FFFFFF	#000000	2	t	199c16fd-2af9-4187-a414-41ef94c7a985	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
080a0f67-39be-4349-bc2a-3b7e1575f963	rentals	property_search_rentals	Rentals Search	\N	\N	\N	\N	{}	\N	\N	\N	\N	#FFFFFF	#000000	2	t	199c16fd-2af9-4187-a414-41ef94c7a985	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
4e169c36-8311-421c-9c36-e64ebff17ac2	new-development	hero	NEW DEVELOPMENT	Discover the world's most inspired new developments with Douglas Elliman.	\N	https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498188/production/s5xv552j7o6j5q4z5z5g.jpg	image	{"height": "screen", "text_alignment": "center", "overlay_opacity": 20, "show_scroll_indicator": true}	\N	\N	\N	\N	#181728	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
f827b256-f209-4650-8816-5b6c64b25a1c	new-development	stats	UNRIVALED EXPERTISE	\N	Our New Development division is the industry leader, with a portfolio of the most prestigious properties in the world.	\N	\N	{"columns": 3, "stats_category": "new_development", "show_intro_text": true}	\N	\N	\N	\N	#FFFFFF	#181728	2	t	\N	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
ce7aa924-295a-4627-9f18-12cbca6216a7	new-development	development_grid	WE TRANSFORM SKYLINES AND SHAPE CULTURE	\N	\N	\N	\N	{}	\N	\N	\N	\N	#FFFFFF	#000000	3	t	4d88d499-adcf-4b82-a5ce-4c2873fdd4cb	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
1397227f-3893-4359-9cdb-89e9a00f93c7	new-development	tabs	WE ARE PARTNERS THROUGHOUT THE ENTIRE PROCESS	\N	Our team of experts provides the highest level of hands-on support at every turn.	\N	\N	{"layout": "side-by-side", "show_gradient": false, "image_position": "left"}	\N	\N	\N	\N	#FFFFFF	#181728	4	t	fbef6085-d8d3-4f3c-91e3-f297acfa1ad5	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
e8ade329-c08b-45f6-bdb8-f1560eeea881	new-development	logo_grid	we are the choice of world-renowned brands	\N	\N	http://res.cloudinary.com/daeyhsq50/image/upload/v1710268136/notmplnhap56ym7pmg3r.png	\N	{"background_color": "#F8F8F8"}	\N	\N	\N	\N	#F8F8F8	#181728	5	t	accdd500-017f-41af-90f2-7542f57fb6b2	2026-02-04 12:53:56.566012+00	2026-02-04 12:53:56.566012+00
70e6effa-20f5-4d38-afdf-f81060333db6	terms-of-service	hero	TERMS OF USE	DOUGLAS ELLIMAN	\N	https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp	image	{"height": "60vh", "variant": "default", "text_alignment": "center", "overlay_opacity": 40}	\N	\N	\N	\N	#181728	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:54:44.49988+00	2026-02-04 12:54:44.49988+00
898ed1e1-1ec6-43dc-b080-6d8b45aec483	privacy-policy	hero	PRIVACY POLICY	DOUGLAS ELLIMAN	\N	https://res.cloudinary.com/dk92v0fkk/image/upload/v1727311016/staging/zkbtspvuvdutxii11lzk.webp	image	{"height": "60vh", "variant": "default", "text_alignment": "center", "overlay_opacity": 40}	\N	\N	\N	\N	#181728	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:54:44.49988+00	2026-02-04 12:54:44.49988+00
a39be6ce-35fc-436a-814f-c5c50fc34c69	agents	hero	CONNECT WITH OUR LUXURY REAL ESTATE AGENTS	AGENTS		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/uey1aipcid_1770307812131.mp4	video	{"height": "screen", "variant": "agents", "text_alignment": "center", "overlay_opacity": 20, "search_placeholder": "Enter agent name, state or office address", "show_scroll_indicator": true}					#181728	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-10 11:50:12.579425+00
40566a97-787a-4f67-a6a3-aceffe7a004c	sell	hero	Elevate Your Property, Maximize Your Return.	SELL WITH US	Our agents are local experts, record breakers, and trusted advocates for you.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1727313545/staging/if0tunyrf2dsgrf6eeec.webp	image	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 40, "show_scroll_indicator": true}					#000000	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-10 11:37:05.710457+00
9fa6d2e1-7b01-493d-a8de-6ac5f2f0aef0	rentals	hero	FIND YOUR FAVORITE PLACE TO BES	We are experts in the luxury rental market.			image	{"height": "auto", "text_alignment": "center", "overlay_opacity": 0, "background_color": "#4d525c"}					#4d525c	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-11 05:16:14.736729+00
fae98aee-4b96-4d97-ad35-c947b6978157	agents	hero	PARTNER WITH THE BEST	OUR AGENTS	Our agents are more than just transaction managers—they are your advisors, local experts, and trusted advocates.	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/in3mtsohk2_1770293861458.jpeg	image	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 40}					#000000	#FFFFFF	2	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-10 11:49:37.217827+00
62534159-19c4-4da9-a3a0-6730ca0f6700	sales	hero	FIND YOUR DREAM HOME	We are experts in the luxury sales market.		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/in3mtsohk2_1770293861458.jpeg	image	{"height": "auto", "text_alignment": "center", "overlay_opacity": 0, "background_color": "#4d525c"}					#4d525c	#FFFFFF	1	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 12:53:56.566012+00	2026-02-22 14:53:21.820686+00
b2222222-2222-2222-2222-222222222222	property-management	hero	Property Management	\N	We treat your property like it is our own.	https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop	image	{"height": "60vh", "variant": "default", "text_alignment": "left", "overlay_opacity": 40}	\N	\N	\N	\N	#181728	#FFFFFF	1	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 00:36:15.403508+00
b3333333-3333-3333-3333-333333333333	property-management	prop_mgmt_intro	Our qualified team will take care of every detail of your property	\N	For over 20 years, Sirimara has maintained an excellent track record in the management of its own and third-party property portfolios. The company has integrated a feedback-loop of continuous improvement, innovations and solutions. This has elevated Sirimara to one of the leading property management companies in the region.\r\n\r\nVarious managed third-party properties were handed over in dilapidated condition and Sirimara progressively spearheaded the rehabilitation and restoration of these properties through a strategic financial and operational planning system that includes a stringent Planned Preventative Maintenance programme (PPM) maintained using its bespoke Computerized Maintenance Management System (CMMS).\r\n\r\nThese properties are currently fully occupied by quality tenants and are in good tenable condition.	\N	\N	{"stats": [{"icon": "History", "label": "Experience", "value": "20+ years"}, {"icon": "Maximize", "label": "Management", "value": "Over 500K sq ft"}, {"icon": "Users", "label": "Average Occupancy", "value": "95%"}, {"icon": "Briefcase", "label": "", "value": "Multidisciplinary Team"}, {"icon": "Settings", "label": "Bespoke CMMS", "value": "Computerized Maintenance Management System"}, {"icon": "Wrench", "label": "Robust PPM", "value": "Planned Preventative Maintenance"}]}	\N	\N	\N	\N	#FFFFFF	#181728	2	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 00:36:15.403508+00
c405354e-9f77-4991-b339-ed9db0d78893	home	hero	Discover the Riftvalley	Our estates here combine natural beauty with refined design, creating sanctuaries of peace and prestige.		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/d8afhdci7c4_1770289160422.mp4	video	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 30, "show_scroll_indicator": false}	Search	/sales			#FFFFFF	#000000	3	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-05 11:00:05.931536+00	2026-02-05 12:14:14.697269+00
62acb9e9-d0ed-4ba2-9f64-f1dbbab2f703	agents	agents_grid	Our Agents	Meet our team of luxury real estate experts	\N	\N	\N	{}	\N	\N	\N	\N	#FFFFFF	#181728	3	t	\N	2026-02-05 03:00:57.439786+00	2026-02-05 03:00:57.439786+00
05e64495-f7c0-491a-8f68-16be8fd9b3f9	terms-of-service	legal	TERMS AND CONDITIONS OF USE		<p>Welcome to SIRIMARA REALTY. By accessing our website, you agree to these legal terms.</p>\n\n<h3>1. Acceptance of Terms</h3>\n<p>By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>\n\n<h3>2. Use of Services</h3>\n<p>You may use our services only as permitted by law. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>\n\n<h3>3. Intellectual Property</h3>\n<p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.</p>\n\n<h3>4. Disclaimer of Warranties</h3>\n<p>THE SERVICES ARE PROVIDED "AS IS". WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIM AND NEGATE ALL OTHER WARRANTIES, INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.</p>\n		none	{"last_modified_date": "2025-04-09", "show_last_modified": true}					#FFFFFF	#000000	2	t	766db7e4-23d1-4126-953e-9a1f46228419	2026-02-04 12:54:44.49988+00	2026-02-22 14:37:52.505043+00
f3566bee-e36a-4ed8-ace1-31be2532a6ef	home	hero	Discover Nairobi	Invest in Nairobi’s prime addresses—where business, culture, and luxury converge.		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/p1j72f9eby_1770289116420.mp4	video	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 30, "show_scroll_indicator": false}	Search	/sales			#FFFFFF	#f48e57	2	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-04 18:15:10.714142+00	2026-02-22 14:44:42.297284+00
79b53dbc-dc18-4cd9-ba72-eed4cfde0f35	home	newsletter	The latest in luxury property, lifestyle & culture, curated just for you.	THE NEXT MOVE IS YOURS	Local Experts, Global Reach	https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/in3mtsohk2_1770293861458.jpeg	image	{"layout": "horizontal"}				/agents	#ffffff	#000000	6	t	dd333c2b-9364-47f0-ba1d-2f04535b812d	2026-02-05 12:14:43.740751+00	2026-02-05 14:36:16.980725+00
cb543754-0ce2-4ac0-b06e-526e9ebfb9a7	home	hero	Discover the Coast	Exclusive oceanfront estates where every sunrise is a masterpiece and every sunset a private escape.		https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/videos/uey1aipcid_1770307812131.mp4	video	{"height": "screen", "variant": "default", "text_alignment": "center", "overlay_opacity": 30, "show_scroll_indicator": false}	Search	/sales			#FFFFFF	#000000	4	t	45fe7b04-e602-4347-9b58-db19457ba4b2	2026-02-05 11:04:41.497755+00	2026-02-05 16:11:56.53003+00
b4444444-4444-4444-4444-444444444444	property-management	tabs	\N	Our Edge	\N	\N	\N	{"layout": "side-by-side", "show_gradient": false, "image_position": "left"}	\N	\N	\N	\N	#F8F8F8	#181728	3	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 00:51:41.294404+00
b8888888-8888-8888-8888-888888888888	property-management	contact	Ready to Transform Your Property?	\N	Let our exceptional property management team maximize the value of your real estate investments.	\N	\N	{"layout": "horizontal", "show_intro_text": true}	Talk to an Expert	tel:+254795456604	Email Us	mailto:sirimararealty@gmail.com	#181728	#FFFFFF	7	t	\N	2026-03-21 00:36:15.403508+00	2026-03-21 01:19:00.035094+00
c325fc25-1f1f-4f7f-88b6-1c290f6ddab2	privacy-policy	legal	PRIVACY POLICY		<h1>Terms of Use</h1> <section> <h2>Liability Disclaimer</h2> <p>The information, materials, and opinions on this website are for general information only and do not constitute legal advice. You should seek specific legal advice. Any reliance is at your own risk and SIRIMARA accepts no responsibility for any resulting loss. No client/advocate relationship is created by use of the site.</p> <p>We do not warrant that the website or its contents are free of viruses or malicious code.</p> <ul> <li>SIRIMARA is not responsible for interrupted or failed transmissions due to causes beyond its control.</li> <li>Reliance on website content is at your own risk.</li> <li>Content may be inaccurate, incomplete, or inadequate.</li> <li>SIRIMARA does not control and is not liable for content on linked external websites.</li> </ul> <p>SIRIMARA shall not be liable for any damages resulting from use of or reliance on this website or its contents.</p> </section> <section> <h2>Indemnity</h2> <p>You agree to fully indemnify SIRIMARA, its partners, associates, employees, or suppliers against any claims related to your use of the website or third-party content errors.</p> </section> <section> <h2>Violation and Waiver</h2> <p>SIRIMARA reserves all legal rights in case of breach. Failure to enforce any provision does not waive that provision. If any provision is found invalid, the remaining terms remain enforceable.</p> </section> <section> <h2>Applicable Law</h2> <p>These terms are governed by the laws of the Republic of Kenya. You consent to the exclusive jurisdiction of the High Court of Kenya for any disputes.</p> </section> <section> <h2>Data Privacy</h2> <p>SIRIMARA collects personal information when you use the website for purposes such as:</p> <ul> <li>Responding to your requests</li> <li>Providing legal services</li> <li>Compliance with anti-money laundering laws</li> <li>Processing employment applications</li> <li>Marketing and business development</li> <li>Market research</li> <li>Audit and compliance</li> </ul> <p>Data may be shared internally for conflict checks, client management, and administrative use. It may be stored outside your region. We do not share data with third parties unless required by law or authorized by you.</p> </section> <section> <h2>Links to Other Websites</h2> <p>SIRIMARA is not responsible for the content or policies of third-party websites. Use them at your own risk.</p> </section> <section> <h2>Anti-Money Laundering</h2> <p>SIRIMARA may require proof of identity and report suspicious activity without notice or liability. We follow applicable AML laws and may cease work without explanation.</p> </section> <section> <h2>Anti-Bribery and Anti-Corruption</h2> <p>SIRIMARA has a zero-tolerance policy towards bribery and corruption, applicable to all personnel and third-party service providers.</p> </section> <section> <h2>Intellectual Property Rights</h2> <p>All content is owned by SIRIMARA or its suppliers and protected by copyright laws.</p> <p>You may:</p> <ul> <li>Use content for informational, non-commercial purposes</li> <li>Download and distribute content if unmodified and with proper attribution</li> </ul> <p>Misuse or reproduction in breach of these terms will terminate your right to use the site.</p> </section> <section> <h2>Term and Termination</h2> <p>These terms remain in effect indefinitely. You may terminate by deleting stored website data. SIRIMARA may terminate access without notice if you breach these terms or misuse the site.</p> </section> <section> <h2>Trademarks</h2> <p>SIRIMARA is a registered trademark.</p> </section> <section> <h2>Contact</h2> <p>For questions, contact us at <a href="mailto:sirimararealty@gmail.com">sirimararealty@gmail.com</a>.</p> </section> <p><strong>Your continued use of this website is contingent upon your agreement to be bound by these Terms of Use.</strong></p>		none	{"last_modified_date": "2025-04-09", "show_last_modified": true}					#FFFFFF	#000000	2	t	766db7e4-23d1-4126-953e-9a1f46228419	2026-02-04 12:54:44.49988+00	2026-03-21 01:19:00.035094+00
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."properties" ("id", "title", "slug", "city", "address", "state", "zip_code", "bedrooms", "bathrooms", "half_baths", "price", "description", "property_type", "status", "square_feet", "lot_size", "year_built", "is_featured", "featured_order", "images", "amenities", "category", "created_at", "updated_at", "is_exclusive", "badge_text", "badge_expires_at", "listing_type", "neighborhood", "search_vector") FROM stdin;
27d05fa2-1bc0-45c5-a443-067ff34dfbc8	Nakuru property=Elevate Your Property, Maximize Your Return.	nakuru-property	Nakuru	 Lanet Farm	Nakuru	00000	5	3.0	0	260.00	20 acres Lanet Farm: \n1. 5 bedroom main house, all ensuite, with lounge, dining & kitchen\n2. Guest house with lounge/dining room, and 1 bathroom\n3. Prime land used for farming ( maize, organic vegetables, avocados( & bee keeping.	house	active	123	\N	2006	f	\N	["https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/0syk62i722k9_1770295236848.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/mg5p423kjwn_1770295244542.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/g5zuhzy3i6i_1770295249795.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/s8pbdsxix2_1770295257278.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/im8fynvyzd_1770295263687.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/ehkx9oon206_1770295270133.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/gghkd5r7ymd_1770295284512.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/jrhhhy312sj_1770295292359.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/3dvdxzg23up_1770295298478.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/r3psdmbj4a8_1770295304524.jpeg"]	[]	farm-ranch	2026-02-05 12:41:50.996077+00	2026-02-05 12:41:50.996077+00	f	\N	\N	sale	\N	'00000':5C 'farm':2A 'lanet':1A 'nakuru':3A,4B
06ce0936-1e8d-456c-8112-ce7be355076d	Nairobi Property-Karen 2728 sq ft commercial office:	karen-2728-sq-ft-commercial-office	Nairobi	Karen	Nairobi	00000	\N	2.0	0	400000.00	Karen 2728 sq ft commercial office:\n1. Top floor Office in Grade 1 Building along Ngong Road, with in-office kitchenette and bathrooms\n2. 2 Parkings included with Property\n3. Access to lush and well maintained gardens\n\nSale Price: Kshs 40M exclusive of VAT	apartment	active	2728	\N	2000	t	\N	["https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/rxvr7b3u3a_1770295519054.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/j9i10dnnizm_1770295527192.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/9b9q69kqji_1770295533051.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/chm46svf1np_1770295540933.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/26p58afg2ln_1770295549996.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/wg3a0p45wym_1770295556294.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/wda6xr4xb88_1770295561369.jpeg", "https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/94knj8ghzv_1770295568993.jpeg"]	[]	city-skylines	2026-02-05 12:46:29.259228+00	2026-03-26 09:57:52.129076+00	f	\N	\N	rent	\N	'00000':4C 'karen':1A 'nairobi':2A,3B
\.


--
-- Data for Name: site_config; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."site_config" ("id", "key", "value", "category", "updated_at") FROM stdin;
32587141-bd8d-4b1f-ad5b-bea689fcd2a8	company_name	"SIRIMARA"	branding	2026-02-12 14:25:45.438+00
dbd203d7-3f7f-438b-8050-1799b8e68e6d	tagline	"Leaders in Luxury Real Estate"	branding	2026-02-12 14:25:45.593+00
6af88330-4662-4c36-87eb-f9c3530106d0	logo_image_url	"https://bbvrobnjlyzckyzgjuoi.supabase.co/storage/v1/object/public/property-images/i7qdemgbsds_1770301997758.png"	branding	2026-02-12 14:25:45.642+00
89d3da69-d96d-4506-9317-2a02016f7a4a	logo_header_svg	"SIRIMARA"	branding	2026-02-12 14:25:45.683+00
9e10d838-8653-442a-816c-cafa8493f070	contact_address	"No. 25, Apple Cross Road, Lavington, Nairobi, Kenya"	contact	2026-02-12 14:25:45.719+00
7e7f1894-d093-41f5-9322-94348228ac75	phone	"+254 795 456 604  "	contact	2026-02-12 14:25:45.798+00
48766918-2b18-4be0-ae6a-375e5277d815	property_showcase_title	"THE NEXT MOVE IS YOURS"	content	2026-02-12 14:25:45.837+00
ff395379-a6a9-45d9-8a21-5d3cbdc51c3e	property_showcase_subtitle	"Local Experts, Global Reach"	content	2026-02-12 14:25:45.879+00
bcb987a4-d56c-4e77-af75-2f13ad080920	newsletter_placeholder	"ENTER YOUR EMAIL"	content	2026-02-12 14:25:45.921+00
e1922d94-7400-489b-97d5-9cff5f7c0be5	newsletter_text	"The latest in luxury property, lifestyle & culture, curated just for you."	content	2026-02-12 14:25:45.959+00
9a7f01de-f5d5-43e5-b904-a2058dc3b4f6	footer_section_titles	"{\\"company_title\\":\\"Company\\",\\"resources_title\\":\\"Resources\\"}"	content	2026-02-12 14:25:45.993+00
029156c5-3538-4861-be33-3ab4ec4c84ca	footer_powered_by	""	legal	2026-02-12 14:25:46.031+00
d5e9bce0-f96a-4b4b-b3c8-9ccc177e7bbf	footer_disclaimer_2	""	legal	2026-02-12 14:25:46.067+00
c8a3d451-fb95-4205-a487-e47d8d295980	footer_disclaimer_3	""	legal	2026-02-12 14:25:46.103+00
beaac808-a307-48a1-a69c-a4ca2b38655d	footer_disclaimer_1	""	legal	2026-02-12 14:25:46.138+00
861682bd-9e6d-40e4-9511-0a74eb387278	default_meta_description	"Leaders in luxury real estate with exceptional agents in key markets worldwide."	seo	2026-02-12 14:25:46.172+00
cc3d569f-e6e9-4160-bca8-238e771bb41a	default_meta_title	"sirimara| Luxury Real Estate"	seo	2026-02-12 14:25:46.21+00
d14b68f6-633f-428d-af6e-97fa20b61472	facebook_url	"https://facebook.com/"	social	2026-02-12 14:25:46.246+00
d0718836-4af3-4da0-b5b5-8fb95f9642f1	twitter_url	"https://twitter.com/"	social	2026-02-12 14:25:46.28+00
d74f41e4-a2d6-4ae9-b613-576782183f0d	linkedin_url	"https://linkedin.com/company/"	social	2026-02-12 14:25:46.325+00
0a4930f1-ce2a-46c4-8fa6-ba5a6e26f596	instagram_url	"https://instagram.com/"	social	2026-02-12 14:25:46.363+00
a37db0b0-caad-4518-98c4-687191b4448d	theme_colors	{"accent": "#181728", "primary": "#ff7e00", "primary_hover": "#252438"}	theme	2026-02-22 14:40:52.258+00
0510faf4-ce3d-4082-9c26-0e022e713651	email	"sirimararealty@gmail.com"	contact	2026-02-12 14:25:45.759+00
cf35337e-7194-4e4e-a2e3-91b78175546e	footer_keepingup_title	"Keep up to date with Sirimara Realty"	footer	2026-03-21 02:15:42.244058+00
cbc4ef70-ca6d-4b7b-ae08-b01063f18e1f	google_maps_embed_url	"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277444359858!2d36.8147115!3d-1.283333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6118d3b85%3A0x6bba46c5332f9157!2sNairobi%20Central%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1714400000000!5m2!1sen!2sus"	footer	2026-03-21 02:15:42.244058+00
\.


--
-- Data for Name: site_statistics; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."site_statistics" ("id", "label", "value", "sublabel", "category", "order_index", "is_active", "created_at") FROM stdin;
cead88b0-2bfa-465c-93a7-62a51fac17d0	SALES PRICE	$5,400	AVERAGE / SQFT	market	1	t	2026-02-04 12:53:56.566012+00
a5b092e3-f8c1-4343-a5f6-17976acb9960	CLOSED SALES	585	TOTAL VOLUME	market	2	t	2026-02-04 12:53:56.566012+00
cfff137a-a3e3-4e5a-b980-2d3d3939a7c3	MEDIAN PRICE	$7.4M	CLOSED SALES	market	3	t	2026-02-04 12:53:56.566012+00
c0c1978b-9d38-4e50-8063-368f5f68cc8a	DAYS ON MKT	142	AVERAGE	market	4	t	2026-02-04 12:53:56.566012+00
10c845aa-162a-418b-bede-23c854cbad59	CLOSED SALES	$34.4B	TOTAL VOLUME	company	1	t	2026-02-04 12:53:56.566012+00
a92b5268-b183-4901-9149-954d177d1319	NATIONWIDE	43K+	TRANSACTIONS	company	2	t	2026-02-04 12:53:56.566012+00
523e165c-3619-4d7d-b50d-152d6f566b77	AGENTS	6,900+	NATIONWIDE	company	3	t	2026-02-04 12:53:56.566012+00
610285dd-d654-44bd-b6bd-a7541aeb9450	OFFICES	100+	KEY MARKETS	company	4	t	2026-02-04 12:53:56.566012+00
0e8e89ed-5fec-4fd8-bc03-bd1b33b29886	TOTAL SALES	$1.2B	2024 YTD	new_development	1	t	2026-02-04 12:53:56.566012+00
fe8f4978-7f8e-4b34-9750-9cf65ff5a184	MARKET SHARE	24%	MANHATTAN	new_development	2	t	2026-02-04 12:53:56.566012+00
6a1806be-693c-4671-af60-0c4d34519067	PIPELINE	$85B	ACTIVE INVENTORY	new_development	3	t	2026-02-04 12:53:56.566012+00
\.


--
-- Data for Name: stories_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."stories_items" ("id", "section_id", "title", "image_url", "category", "url", "sort_order", "layout_config", "created_at") FROM stdin;
\.


--
-- Data for Name: tabs_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."tabs_items" ("id", "section_id", "title", "description", "image_url", "order_index", "layout_config", "is_active", "created_at") FROM stdin;
96f2399e-6ac3-484d-919b-79d09103394f	90000000-0000-0000-0000-000000000002	Michael S. Liebowitz	President and Chief Executive Officer	https://res.cloudinary.com/dk92v0fkk/image/upload/v1740419107/production/hpzxerrwbliqrzaogane.png	1	{"reversed": false}	t	2026-02-04 12:53:56.566012+00
2ec69d61-d69a-4a01-a357-adbb52c7583b	90000000-0000-0000-0000-000000000002	Susan de França	President & Chief Executive Officer - DE Development Marketing	https://res.cloudinary.com/dk92v0fkk/image/upload/v1734999307/production/ri0ouilkicfcv6k9okhf.png	2	{"reversed": true}	t	2026-02-04 12:53:56.566012+00
f2c321d9-1b61-4519-8e5a-63d952bcb808	90000000-0000-0000-0000-000000000003	Executive Leadership	Leadership details coming soon for this region.	\N	1	{}	t	2026-02-04 12:53:56.566012+00
83d2e1c9-d423-4fbb-b86b-004b4bc9d3a9	90000000-0000-0000-0000-000000000003	New York City	Leadership details coming soon for this region.	\N	2	{}	t	2026-02-04 12:53:56.566012+00
a9f8d3e2-d84d-4ada-ab8e-5261e6fe16df	90000000-0000-0000-0000-000000000003	Long Island, Hamptons & North Fork	Leadership details coming soon for this region.	\N	3	{}	t	2026-02-04 12:53:56.566012+00
6fb7a7cd-5a43-48d0-8a0e-06b0d9882c88	90000000-0000-0000-0000-000000000003	Westchester & New England	Leadership details coming soon for this region.	\N	4	{}	t	2026-02-04 12:53:56.566012+00
4288997c-bcc8-4a23-a3de-151444f646d0	90000000-0000-0000-0000-000000000003	Mid-Atlantic	Leadership details coming soon for this region.	\N	5	{}	t	2026-02-04 12:53:56.566012+00
c1a1e4e7-268d-4cb2-88dc-f85a741249ed	90000000-0000-0000-0000-000000000003	New Jersey	Leadership details coming soon for this region.	\N	6	{}	t	2026-02-04 12:53:56.566012+00
9fb608d2-27b9-49c8-a741-9c99c8aa2ecd	90000000-0000-0000-0000-000000000003	Florida	Leadership details coming soon for this region.	\N	7	{}	t	2026-02-04 12:53:56.566012+00
3f1e2c8c-afc1-4a06-bfbc-fcc44f357ac4	90000000-0000-0000-0000-000000000003	California	Leadership details coming soon for this region.	\N	8	{}	t	2026-02-04 12:53:56.566012+00
2e6165da-cc80-4616-9a98-2f2fc0b05841	90000000-0000-0000-0000-000000000003	Colorado	Leadership details coming soon for this region.	\N	9	{}	t	2026-02-04 12:53:56.566012+00
80680f38-e53a-4562-9fff-cc6747b855a8	90000000-0000-0000-0000-000000000003	Texas	Leadership details coming soon for this region.	\N	10	{}	t	2026-02-04 12:53:56.566012+00
4f6ea76b-e1c7-4545-8ddb-c44db7ed5261	90000000-0000-0000-0000-000000000003	Nevada	Leadership details coming soon for this region.	\N	11	{}	t	2026-02-04 12:53:56.566012+00
ea617d30-da8d-4e0f-83f4-6b445007cfa3	1397227f-3893-4359-9cdb-89e9a00f93c7	research + analytics	Guided by data-driven insights and a deep understanding of market dynamics, our analysis ensures every project is positioned for success.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498376/production/wpmwbah2g1r8nrafz7jj.jpg	1	{}	t	2026-02-04 12:53:56.566012+00
6a7bbd2e-a1b5-4e1e-b808-6dc5ccb99999	1397227f-3893-4359-9cdb-89e9a00f93c7	planning + design	Collaborating with world-renowned architects and designers to create residences that define the modern luxury lifestyle.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1733498315/production/t0y1m0valxjjgovcrsuj.jpg	2	{}	t	2026-02-04 12:53:56.566012+00
beb8268e-5449-4d8f-846d-a7d0473368bd	1397227f-3893-4359-9cdb-89e9a00f93c7	branding + marketing	Crafting compelling narratives and elevated visual identities that resonate with the global elite.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1721338194/staging/emdaxu0bvayeflhkeeqx.jpg	3	{}	t	2026-02-04 12:53:56.566012+00
c319bd6c-597c-4dad-bee5-3dcbe7c51e30	1397227f-3893-4359-9cdb-89e9a00f93c7	sales + operations	Unparalleled expertise in lead generation and conversion, supported by a global network of top-tier professionals.	https://res.cloudinary.com/dk92v0fkk/image/upload/v1731963295/staging-test/boqens24o7fqalofhu7e.jpg	4	{}	t	2026-02-04 12:53:56.566012+00
5fade575-9d21-4914-b49f-fb164707515a	b4444444-4444-4444-4444-444444444444	CMMS	Computerized Maintenance Management Systems are the future of Property and Facilities Management. Using CMMS our property team is able to effectively manage real assets, schedule maintenance, track work orders and costs to ensure seamless and cost-effective operation of the buildings under management.	https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop	1	{}	t	2026-03-21 00:36:15.403508+00
b597356e-39e6-4c3c-a131-91551af7dfed	b5555555-5555-5555-5555-555555555555	Tenant Management	Our team manages tenant relations, contracts, and communications to ensure high occupancy rates and smooth tenancy operations across all managed properties.	https://images.unsplash.com/photo-1621360841013-c76831f18ef8?q=80&w=2832&auto=format&fit=crop	1	{}	t	2026-03-21 00:36:15.403508+00
35e64692-66f9-4020-ac69-9ebb18151df6	b6666666-6666-6666-6666-666666666666	Facilities Audit	By leveraging our multidisciplinary team, Sirimara conducts periodic facilities and conditions audits to ascertain the health of the building's shared amenities and services. This audit forms the basis of the planned preventative maintenance (PPM) programme and also guides the formulation of the maintenance budget.	https://images.unsplash.com/photo-1541888086925-0c13bb39cd98?q=80&w=2938&auto=format&fit=crop	1	{}	t	2026-03-21 00:36:15.403508+00
24624eb7-736a-4354-91cf-1c68b5dd460b	b7777777-7777-7777-7777-777777777777	Financial Reporting	We provide comprehensive financial reporting including income statements, expense tracking, and budget forecasts — giving property owners full visibility and confidence in their investment performance.	https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2936&auto=format&fit=crop	1	{}	t	2026-03-21 00:36:15.403508+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY "realtime"."schema_migrations" ("version", "inserted_at") FROM stdin;
20211116024918	2025-12-22 05:11:47
20211116045059	2025-12-22 05:11:49
20211116050929	2025-12-22 05:11:52
20211116051442	2025-12-22 05:11:54
20211116212300	2025-12-22 05:11:57
20211116213355	2025-12-22 05:11:59
20211116213934	2025-12-22 05:12:01
20211116214523	2025-12-22 05:12:04
20211122062447	2025-12-22 05:12:06
20211124070109	2025-12-22 05:12:08
20211202204204	2025-12-22 05:12:11
20211202204605	2025-12-22 05:12:13
20211210212804	2025-12-22 05:12:20
20211228014915	2025-12-22 05:12:22
20220107221237	2025-12-22 05:12:24
20220228202821	2025-12-22 05:12:26
20220312004840	2025-12-22 05:12:29
20220603231003	2025-12-22 05:12:32
20220603232444	2025-12-22 05:12:34
20220615214548	2025-12-22 05:12:37
20220712093339	2025-12-22 05:12:39
20220908172859	2025-12-22 05:12:41
20220916233421	2025-12-22 05:12:43
20230119133233	2025-12-22 05:12:46
20230128025114	2025-12-22 05:12:49
20230128025212	2025-12-22 05:12:51
20230227211149	2025-12-22 05:12:53
20230228184745	2025-12-22 05:12:55
20230308225145	2025-12-22 05:12:57
20230328144023	2025-12-22 05:13:00
20231018144023	2025-12-22 05:13:02
20231204144023	2025-12-22 05:13:06
20231204144024	2025-12-22 05:13:08
20231204144025	2025-12-22 05:13:10
20240108234812	2025-12-22 05:13:12
20240109165339	2025-12-22 05:13:14
20240227174441	2025-12-22 05:13:18
20240311171622	2025-12-22 05:13:21
20240321100241	2025-12-22 05:13:26
20240401105812	2025-12-22 05:13:32
20240418121054	2025-12-22 05:13:35
20240523004032	2025-12-22 05:13:43
20240618124746	2025-12-22 05:13:45
20240801235015	2025-12-22 05:13:48
20240805133720	2025-12-22 05:13:50
20240827160934	2025-12-22 05:13:52
20240919163303	2025-12-22 05:13:55
20240919163305	2025-12-22 05:13:57
20241019105805	2025-12-22 05:13:59
20241030150047	2025-12-22 05:14:08
20241108114728	2025-12-22 05:14:11
20241121104152	2025-12-22 05:14:13
20241130184212	2025-12-22 05:14:16
20241220035512	2025-12-22 05:14:18
20241220123912	2025-12-22 05:14:20
20241224161212	2025-12-22 05:14:22
20250107150512	2025-12-22 05:14:24
20250110162412	2025-12-22 05:14:26
20250123174212	2025-12-22 05:14:29
20250128220012	2025-12-22 05:14:31
20250506224012	2025-12-22 05:14:33
20250523164012	2025-12-22 05:14:35
20250714121412	2025-12-22 05:14:37
20250905041441	2025-12-22 05:14:39
20251103001201	2025-12-22 05:14:41
20251120212548	2026-02-04 11:12:49
20251120215549	2026-02-04 11:12:49
20260218120000	2026-03-20 21:33:22
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY "realtime"."subscription" ("id", "subscription_id", "entity", "filters", "claims", "created_at", "action_filter") FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
property-images	property-images	\N	2025-12-22 10:17:40.432622+00	2025-12-22 10:17:40.432622+00	t	f	\N	\N	\N	STANDARD
agent-photos	agent-photos	\N	2025-12-22 10:17:40.432622+00	2025-12-22 10:17:40.432622+00	t	f	\N	\N	\N	STANDARD
videos	videos	\N	2026-02-04 19:10:02.6507+00	2026-02-04 19:10:02.6507+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."buckets_vectors" ("id", "type", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."migrations" ("id", "name", "hash", "executed_at") FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-12-22 05:11:40.445616
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-12-22 05:11:40.501847
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-12-22 05:11:40.541456
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-12-22 05:11:40.619016
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-12-22 05:11:40.62489
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-12-22 05:11:40.638689
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-12-22 05:11:40.645198
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-12-22 05:11:40.665928
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-12-22 05:11:40.674231
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-12-22 05:11:40.681811
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-12-22 05:11:40.688319
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-12-22 05:11:40.714412
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-12-22 05:11:40.720475
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-12-22 05:11:40.726403
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-12-22 05:11:40.732119
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-12-22 05:11:40.740211
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-12-22 05:11:40.746315
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-12-22 05:11:40.754634
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-12-22 05:11:40.771419
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-12-22 05:11:40.784862
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-12-22 05:11:40.792017
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-12-22 05:11:40.799684
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-12-22 05:11:41.880084
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2025-12-22 05:11:41.935719
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2025-12-22 05:11:41.942463
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2025-12-22 05:11:41.956648
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2025-12-22 05:11:41.963679
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2025-12-22 05:11:41.985453
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2025-12-22 05:11:40.507994
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2025-12-22 05:11:40.631578
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2025-12-22 05:11:40.6529
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2025-12-22 05:11:40.659209
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2025-12-22 05:11:40.80611
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2025-12-22 05:11:40.820953
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2025-12-22 05:11:41.81729
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2025-12-22 05:11:41.826266
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2025-12-22 05:11:41.832256
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2025-12-22 05:11:41.840168
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2025-12-22 05:11:41.848068
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2025-12-22 05:11:41.856461
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2025-12-22 05:11:41.858827
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2025-12-22 05:11:41.865965
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2025-12-22 05:11:41.871851
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2025-12-22 05:11:41.886343
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2025-12-22 05:11:41.898214
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2025-12-22 05:11:41.90477
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2025-12-22 05:11:41.914647
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2025-12-22 05:11:41.92139
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2025-12-22 05:11:41.929203
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2025-12-22 05:11:41.969403
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-02-05 16:04:21.207506
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-02-05 16:04:21.372232
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-02-05 16:04:21.449107
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-02-05 16:04:21.45234
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-02-05 16:04:21.45395
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-02-05 16:04:21.374153
56	fix-optimized-search-function	cb58526ebc23048049fd5bf2fd148d18b04a2073	2026-02-12 05:59:20.306302
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
45b24166-7961-4b14-9efc-18f9ec7d1c09	property-images	y7q87accg1_1766553310410.jpg	47838213-c39c-4135-9d1a-a924307c77d6	2025-12-24 05:15:14.310941+00	2025-12-24 05:15:14.310941+00	2025-12-24 05:15:14.310941+00	{"eTag": "\\"6e829f75cf7b9366106ec2bbe59ca2a1\\"", "size": 32614, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-12-24T05:15:15.000Z", "contentLength": 32614, "httpStatusCode": 200}	a198cff7-a1a8-4de3-9491-3b4e32ec130a	47838213-c39c-4135-9d1a-a924307c77d6	{}
23e5e6b6-d6e2-468c-bd38-0830227dc81b	property-images	b4uuckp3077_1766738965955.jpg	47838213-c39c-4135-9d1a-a924307c77d6	2025-12-26 08:50:36.595645+00	2025-12-26 08:50:36.595645+00	2025-12-26 08:50:36.595645+00	{"eTag": "\\"6ec4c0d34cef7f400dd9981e4d4f5040\\"", "size": 601935, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-12-26T08:50:37.000Z", "contentLength": 601935, "httpStatusCode": 200}	870aaf70-c40a-4f23-9165-925b05363040	47838213-c39c-4135-9d1a-a924307c77d6	{}
d64ea819-0151-48ca-b2cd-e41523d6b8bb	property-images	500sfl3fqhw_1766739250116.jpg	47838213-c39c-4135-9d1a-a924307c77d6	2025-12-26 08:54:17.980034+00	2025-12-26 08:54:17.980034+00	2025-12-26 08:54:17.980034+00	{"eTag": "\\"6ec4c0d34cef7f400dd9981e4d4f5040\\"", "size": 601935, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-12-26T08:54:18.000Z", "contentLength": 601935, "httpStatusCode": 200}	cdc22f5f-e406-4da5-886d-be5f55bf5f16	47838213-c39c-4135-9d1a-a924307c77d6	{}
8e21da53-7101-47c9-98d4-58354a9cf3a3	property-images	sy4r2v4octs_1769854101532.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-01-31 10:08:25.407796+00	2026-01-31 10:08:25.407796+00	2026-01-31 10:08:25.407796+00	{"eTag": "\\"8d7976f00f2766630d1aa6ea3520fa64\\"", "size": 365875, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-01-31T10:08:26.000Z", "contentLength": 365875, "httpStatusCode": 200}	a2d0312d-291a-4c7c-868f-671ecaaf5154	47838213-c39c-4135-9d1a-a924307c77d6	{}
0bffef72-f7ba-404f-85ab-a44fdc723ffb	property-images	g3ozzchhghu_1770059918038.webp	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-02 19:18:39.813342+00	2026-02-02 19:18:39.813342+00	2026-02-02 19:18:39.813342+00	{"eTag": "\\"c6042d596ee6030ca3c748b4aed32af0\\"", "size": 60652, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T19:18:40.000Z", "contentLength": 60652, "httpStatusCode": 200}	1791cfa8-7112-4e56-b4e3-42f8d6349992	47838213-c39c-4135-9d1a-a924307c77d6	{}
1714f1c6-4d0f-49d5-900a-2f3199d92aba	property-images	dq8x8pyxls9_1770075565127.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-02 23:39:29.496632+00	2026-02-02 23:39:29.496632+00	2026-02-02 23:39:29.496632+00	{"eTag": "\\"a0093e62fd2a7e4cc7ee8bc780432f0c\\"", "size": 914728, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T23:39:30.000Z", "contentLength": 914728, "httpStatusCode": 200}	23f689c5-5ad9-4219-beb4-2a1d5ebd7dcd	47838213-c39c-4135-9d1a-a924307c77d6	{}
b6bf3b99-2748-4e9a-b1fc-ad5312d0406c	property-images	i0078wso7eq_1770075759746.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-02 23:42:43.558339+00	2026-02-02 23:42:43.558339+00	2026-02-02 23:42:43.558339+00	{"eTag": "\\"a0093e62fd2a7e4cc7ee8bc780432f0c\\"", "size": 914728, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T23:42:44.000Z", "contentLength": 914728, "httpStatusCode": 200}	b5d10814-2dcd-4bd6-9b5b-2b012c4b187b	47838213-c39c-4135-9d1a-a924307c77d6	{}
0c88dff4-2b4c-4fb0-b6bc-2917160aac1f	property-images	4wsn10wpy5s_1770075769232.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-02 23:42:51.547037+00	2026-02-02 23:42:51.547037+00	2026-02-02 23:42:51.547037+00	{"eTag": "\\"35611113f6110eed4acb16c27e3bf256\\"", "size": 997732, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-02T23:42:52.000Z", "contentLength": 997732, "httpStatusCode": 200}	842e5aa8-3ebe-4505-9b0d-02c8a1b7a3d4	47838213-c39c-4135-9d1a-a924307c77d6	{}
b0ce3f4d-c428-419b-a50e-9ff92ad156e0	property-images	0xprhlvm5dx_1770211060046.svg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-04 13:17:46.775647+00	2026-02-04 13:17:46.775647+00	2026-02-04 13:17:46.775647+00	{"eTag": "\\"b662bcdd962570b339ccfe7d7cc6c333\\"", "size": 167593, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2026-02-04T13:17:47.000Z", "contentLength": 167593, "httpStatusCode": 200}	cafb992b-787e-4a77-8841-5417915a95cd	47838213-c39c-4135-9d1a-a924307c77d6	{}
df5ade12-a9d9-4b7a-97ec-9bacf30f9816	videos	etg1lkkz1fo_1770232384037.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-04 19:13:07.597047+00	2026-02-04 19:13:07.597047+00	2026-02-04 19:13:07.597047+00	{"eTag": "\\"adf8ab9774a234aa2ff72ca154c0f042\\"", "size": 416701, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-04T19:13:08.000Z", "contentLength": 416701, "httpStatusCode": 200}	cd1d71ca-e9b5-41db-870e-f6043c22a8e5	47838213-c39c-4135-9d1a-a924307c77d6	{}
fdd62c55-3fcc-4054-8482-a26456106d73	property-images	ojm1270gh_1770233877979.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-04 19:38:03.637282+00	2026-02-04 19:38:03.637282+00	2026-02-04 19:38:03.637282+00	{"eTag": "\\"affc22a4e1c2277a62834c10b30bd9e2\\"", "size": 1132265, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-04T19:38:04.000Z", "contentLength": 1132265, "httpStatusCode": 200}	3e91d4f9-ee15-40bf-8b2a-c1693be8a44f	47838213-c39c-4135-9d1a-a924307c77d6	{}
e9be4154-1036-4c52-927e-01308738d628	videos	edzuus2nz7l_1770289090345.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 10:58:15.50866+00	2026-02-05 10:58:15.50866+00	2026-02-05 10:58:15.50866+00	{"eTag": "\\"3a4c3de124b3ac6468371c27e4c2013d-2\\"", "size": 6113541, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T10:58:16.000Z", "contentLength": 6113541, "httpStatusCode": 200}	ece9e576-0b99-400e-928c-98ab1036026a	47838213-c39c-4135-9d1a-a924307c77d6	{}
95410619-bc6f-47b4-924d-b0072a8d679b	videos	p1j72f9eby_1770289116420.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 10:58:39.960145+00	2026-02-05 10:58:39.960145+00	2026-02-05 10:58:39.960145+00	{"eTag": "\\"5878055a8ac1e8464d171fc37f3855ca-2\\"", "size": 7444007, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T10:58:40.000Z", "contentLength": 7444007, "httpStatusCode": 200}	0d1b2bae-b00b-4f6b-b032-64f16a28ce0a	47838213-c39c-4135-9d1a-a924307c77d6	{}
efd27b60-76ff-4a96-9cbe-d858747f63b2	videos	fk07jxj7jor_1770289140849.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 10:59:05.732787+00	2026-02-05 10:59:05.732787+00	2026-02-05 10:59:05.732787+00	{"eTag": "\\"ae38bdfd8d9c4531e28eb9fcaeef8737-3\\"", "size": 14646688, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T10:59:05.000Z", "contentLength": 14646688, "httpStatusCode": 200}	9e86fbce-0096-45cc-bc80-dcc526ba31a2	47838213-c39c-4135-9d1a-a924307c77d6	{}
0f2cfb8a-c40e-47cb-822c-604c04040fd5	videos	d8afhdci7c4_1770289160422.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 10:59:27.042718+00	2026-02-05 10:59:27.042718+00	2026-02-05 10:59:27.042718+00	{"eTag": "\\"8abbb0cee3448f60fed53b41c80edc27-3\\"", "size": 15722234, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T10:59:27.000Z", "contentLength": 15722234, "httpStatusCode": 200}	94e63581-5e2c-4611-8e4d-4611d2335e72	47838213-c39c-4135-9d1a-a924307c77d6	{}
4da0201c-a4ad-45cb-b74d-3ffb5572d835	property-images	0njk1jp6cf7h_1770289831670.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 11:10:34.30472+00	2026-02-05 11:10:34.30472+00	2026-02-05 11:10:34.30472+00	{"eTag": "\\"6b71289587e1f4fa92a8df30b968ac2b\\"", "size": 52259, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T11:10:35.000Z", "contentLength": 52259, "httpStatusCode": 200}	723ca0f6-86f9-43f3-9098-657abc34251b	47838213-c39c-4135-9d1a-a924307c77d6	{}
2dddfbb1-055d-4b05-929f-132564e923bc	videos	4ycqt45daeh_1770292806266.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:00:22.533985+00	2026-02-05 12:00:22.533985+00	2026-02-05 12:00:22.533985+00	{"eTag": "\\"b4a708f25055cbc395e09ee02c231cce-6\\"", "size": 28782243, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:00:22.000Z", "contentLength": 28782243, "httpStatusCode": 200}	89586edb-cf3d-41ad-b362-a1a59af2d81b	47838213-c39c-4135-9d1a-a924307c77d6	{}
df47beed-04e7-42f6-be0a-c68c0990ecf5	property-images	in3mtsohk2_1770293861458.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:17:43.9149+00	2026-02-05 12:17:43.9149+00	2026-02-05 12:17:43.9149+00	{"eTag": "\\"77b39af5b766cae6c55a13ce77acc918\\"", "size": 34391, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:17:44.000Z", "contentLength": 34391, "httpStatusCode": 200}	cf9899ff-d5be-4c38-aea4-40b410a05f3b	47838213-c39c-4135-9d1a-a924307c77d6	{}
fc4b1a5b-a1a9-4b32-85b7-ae7229440386	videos	cq6m3faqs57_1770294369872.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:26:16.775239+00	2026-02-05 12:26:16.775239+00	2026-02-05 12:26:16.775239+00	{"eTag": "\\"ae38bdfd8d9c4531e28eb9fcaeef8737-3\\"", "size": 14646688, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:26:16.000Z", "contentLength": 14646688, "httpStatusCode": 200}	61197e62-48b1-417c-b1b6-b01abbf7e531	47838213-c39c-4135-9d1a-a924307c77d6	{}
0b3d6bd7-e351-45b0-ae59-f7bf14c55d22	property-images	0syk62i722k9_1770295236848.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:40:41.174771+00	2026-02-05 12:40:41.174771+00	2026-02-05 12:40:41.174771+00	{"eTag": "\\"07f3d58ed6747b5af7fa36dc004a7da5\\"", "size": 279005, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:40:42.000Z", "contentLength": 279005, "httpStatusCode": 200}	bdfc707b-acd6-43f7-bf9a-279dce5a3a9a	47838213-c39c-4135-9d1a-a924307c77d6	{}
e21a2264-6800-4941-89d8-6b4d0ff17393	property-images	mg5p423kjwn_1770295244542.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:40:46.818117+00	2026-02-05 12:40:46.818117+00	2026-02-05 12:40:46.818117+00	{"eTag": "\\"b051553df804e266d44a661df259d88f\\"", "size": 256585, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:40:47.000Z", "contentLength": 256585, "httpStatusCode": 200}	be4e9438-ac72-4f41-9289-2f38581be7ee	47838213-c39c-4135-9d1a-a924307c77d6	{}
5165c2e6-6af1-4421-a7f4-bb99389df8ef	property-images	g5zuhzy3i6i_1770295249795.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:40:52.378855+00	2026-02-05 12:40:52.378855+00	2026-02-05 12:40:52.378855+00	{"eTag": "\\"a3811715f24b6ebe78ce4b3e705262b5\\"", "size": 383392, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:40:53.000Z", "contentLength": 383392, "httpStatusCode": 200}	40080690-0dc5-4477-933c-7253712879b9	47838213-c39c-4135-9d1a-a924307c77d6	{}
01ddd556-c4b3-4d35-bf83-5cc3e900112c	property-images	s8pbdsxix2_1770295257278.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:40:59.631285+00	2026-02-05 12:40:59.631285+00	2026-02-05 12:40:59.631285+00	{"eTag": "\\"062cc1e0b961154b06e9e837085ee81a\\"", "size": 232729, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:00.000Z", "contentLength": 232729, "httpStatusCode": 200}	32b40b0c-7623-4c76-b1d6-003a825c8c62	47838213-c39c-4135-9d1a-a924307c77d6	{}
86fd864f-ecad-424a-9291-a05cd2f568c2	property-images	im8fynvyzd_1770295263687.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:41:05.937024+00	2026-02-05 12:41:05.937024+00	2026-02-05 12:41:05.937024+00	{"eTag": "\\"09150cb63f0a90d8e66201ae72c1174e\\"", "size": 211012, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:06.000Z", "contentLength": 211012, "httpStatusCode": 200}	06583221-d0be-4872-b045-fb836769d0e0	47838213-c39c-4135-9d1a-a924307c77d6	{}
fa39b82f-ce02-44ca-83a0-a3b2dc47cb7f	property-images	ehkx9oon206_1770295270133.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:41:13.682648+00	2026-02-05 12:41:13.682648+00	2026-02-05 12:41:13.682648+00	{"eTag": "\\"6af017990fd75c66e611a454e382bb51\\"", "size": 411853, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:14.000Z", "contentLength": 411853, "httpStatusCode": 200}	4ff92e39-0e0f-47d2-9677-4480fddef66b	47838213-c39c-4135-9d1a-a924307c77d6	{}
2c1b516f-6f9a-4ea1-9baa-7f265885f134	property-images	gghkd5r7ymd_1770295284512.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:41:27.144594+00	2026-02-05 12:41:27.144594+00	2026-02-05 12:41:27.144594+00	{"eTag": "\\"f3b9cbe344dc3d339c5fae0e42ee4160\\"", "size": 399764, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:28.000Z", "contentLength": 399764, "httpStatusCode": 200}	fbfce15d-56ff-452d-b010-334b79592576	47838213-c39c-4135-9d1a-a924307c77d6	{}
78e7d8eb-e46c-414f-a637-31675aa7e2f3	property-images	3dvdxzg23up_1770295298478.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:41:41.238356+00	2026-02-05 12:41:41.238356+00	2026-02-05 12:41:41.238356+00	{"eTag": "\\"9273abc6a09fdbaf1cd622e2aa7bd890\\"", "size": 345417, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:42.000Z", "contentLength": 345417, "httpStatusCode": 200}	b58e3be1-743b-490f-a794-d97a29fa629f	47838213-c39c-4135-9d1a-a924307c77d6	{}
46e316df-3dad-4d48-91e4-51b0b6e0a691	property-images	j9i10dnnizm_1770295527192.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:45:29.554403+00	2026-02-05 12:45:29.554403+00	2026-02-05 12:45:29.554403+00	{"eTag": "\\"0e60e9b906a98de695868b7354ef7797\\"", "size": 271984, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:45:30.000Z", "contentLength": 271984, "httpStatusCode": 200}	e4d7ba15-0362-41a5-8a2b-a23568b3f3c0	47838213-c39c-4135-9d1a-a924307c77d6	{}
44fee592-6e0e-44c5-a39d-1514d06dcd13	property-images	26p58afg2ln_1770295549996.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:45:52.433055+00	2026-02-05 12:45:52.433055+00	2026-02-05 12:45:52.433055+00	{"eTag": "\\"d235395711915315c604894c84a37870\\"", "size": 181018, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:45:53.000Z", "contentLength": 181018, "httpStatusCode": 200}	f8e44511-5f73-4b3f-8124-047b134c60df	47838213-c39c-4135-9d1a-a924307c77d6	{}
3eeb27e6-edfb-4fe3-a5b7-2bc1a0e53662	property-images	94knj8ghzv_1770295568993.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:46:11.258016+00	2026-02-05 12:46:11.258016+00	2026-02-05 12:46:11.258016+00	{"eTag": "\\"aec7af1bdb21172bea7171951e1239d8\\"", "size": 245812, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:46:12.000Z", "contentLength": 245812, "httpStatusCode": 200}	99626f20-fa05-416d-b1d7-3cccf6f5f685	47838213-c39c-4135-9d1a-a924307c77d6	{}
84c8256c-cf16-4044-913d-043664e6e935	property-images	jrhhhy312sj_1770295292359.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:41:34.598951+00	2026-02-05 12:41:34.598951+00	2026-02-05 12:41:34.598951+00	{"eTag": "\\"668cbe25315cf6a379df28a11704543c\\"", "size": 263568, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:35.000Z", "contentLength": 263568, "httpStatusCode": 200}	5b128e77-e71e-4d9e-b2bc-0897a4f83563	47838213-c39c-4135-9d1a-a924307c77d6	{}
8fd30633-08e5-4248-a429-4dd05aea6c2c	property-images	r3psdmbj4a8_1770295304524.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:41:46.909109+00	2026-02-05 12:41:46.909109+00	2026-02-05 12:41:46.909109+00	{"eTag": "\\"af01154bb3ddde8ae0c81c118138d533\\"", "size": 413833, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:41:47.000Z", "contentLength": 413833, "httpStatusCode": 200}	7d10b244-f488-4fc8-8066-78edfaff5d2d	47838213-c39c-4135-9d1a-a924307c77d6	{}
87145eb1-038c-4759-97e4-12a721848ed8	property-images	rxvr7b3u3a_1770295519054.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:45:22.726846+00	2026-02-05 12:45:22.726846+00	2026-02-05 12:45:22.726846+00	{"eTag": "\\"d5d96d33c4266f41f64c902ce13f5fbc\\"", "size": 208073, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:45:23.000Z", "contentLength": 208073, "httpStatusCode": 200}	c5b7ceb0-ecab-4300-8614-773708f3a8e4	47838213-c39c-4135-9d1a-a924307c77d6	{}
b2571ddf-1f93-456c-85e1-035be15c0580	property-images	9b9q69kqji_1770295533051.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:45:35.510532+00	2026-02-05 12:45:35.510532+00	2026-02-05 12:45:35.510532+00	{"eTag": "\\"6efcf93e909a34db1ebe2c157d08bae1\\"", "size": 184352, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:45:36.000Z", "contentLength": 184352, "httpStatusCode": 200}	1b19c2d8-d6c3-4c20-b866-ed81472bbff6	47838213-c39c-4135-9d1a-a924307c77d6	{}
f3e5f885-6519-4348-857d-3e9adc0d78c4	property-images	chm46svf1np_1770295540933.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:45:43.583742+00	2026-02-05 12:45:43.583742+00	2026-02-05 12:45:43.583742+00	{"eTag": "\\"26b5888a746e50f398dc6de18a44f71c\\"", "size": 190395, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:45:44.000Z", "contentLength": 190395, "httpStatusCode": 200}	676f649b-422d-42cf-9069-e1c89a51e4c3	47838213-c39c-4135-9d1a-a924307c77d6	{}
b1f7e947-c205-4643-9182-245ac09372cc	property-images	wg3a0p45wym_1770295556294.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:45:58.51326+00	2026-02-05 12:45:58.51326+00	2026-02-05 12:45:58.51326+00	{"eTag": "\\"704f81b9e97a6b5101054203f1b3563d\\"", "size": 185335, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:45:59.000Z", "contentLength": 185335, "httpStatusCode": 200}	69345793-d34c-4352-95ff-eaaa248d6560	47838213-c39c-4135-9d1a-a924307c77d6	{}
df700e21-8747-4900-be4b-dea1d51b7140	property-images	wda6xr4xb88_1770295561369.jpeg	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 12:46:03.642209+00	2026-02-05 12:46:03.642209+00	2026-02-05 12:46:03.642209+00	{"eTag": "\\"7a1661a9250dd5103af02f53e7c26a56\\"", "size": 258848, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T12:46:04.000Z", "contentLength": 258848, "httpStatusCode": 200}	c4d41046-6a77-42fb-a9a1-7997fbbd8945	47838213-c39c-4135-9d1a-a924307c77d6	{}
088cc1b0-46cc-4855-8ded-7940d9fc99a5	property-images	w9ddnfiexg_1770301570267.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 14:26:13.351645+00	2026-02-05 14:26:13.351645+00	2026-02-05 14:26:13.351645+00	{"eTag": "\\"56f2f178ab1dc2e09eab8e2e6c7cb332\\"", "size": 192660, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T14:26:14.000Z", "contentLength": 192660, "httpStatusCode": 200}	a15e45d4-d68c-419f-8d6c-fc1a6162add9	47838213-c39c-4135-9d1a-a924307c77d6	{}
9798987b-8ac2-4c9a-baea-22f2c5f2dfd2	property-images	uqyz5tocmm_1770301736841.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 14:29:00.126616+00	2026-02-05 14:29:00.126616+00	2026-02-05 14:29:00.126616+00	{"eTag": "\\"f7b9445f49c7bfc763f715dfd20d25a7\\"", "size": 205456, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T14:29:00.000Z", "contentLength": 205456, "httpStatusCode": 200}	f44156e4-9107-44e4-a090-acbdc49bd5ba	47838213-c39c-4135-9d1a-a924307c77d6	{}
93b4f6f5-6e53-4172-b0b4-5acb94c925b0	property-images	i7qdemgbsds_1770301997758.png	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 14:33:22.769435+00	2026-02-05 14:33:22.769435+00	2026-02-05 14:33:22.769435+00	{"eTag": "\\"f6ff571f7d249c57b8e7167bdbcb6c7b\\"", "size": 3624570, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T14:33:23.000Z", "contentLength": 3624570, "httpStatusCode": 200}	39d20455-037f-4181-b0a4-0619ba571630	47838213-c39c-4135-9d1a-a924307c77d6	{}
2b1546e7-81a7-4a6d-9c8e-91208ebdb1e8	videos	uey1aipcid_1770307812131.mp4	47838213-c39c-4135-9d1a-a924307c77d6	2026-02-05 16:10:44.153497+00	2026-02-05 16:10:44.153497+00	2026-02-05 16:10:44.153497+00	{"eTag": "\\"ad6782de6d46535be6fcb48dcda97111-8\\"", "size": 38792771, "mimetype": "video/mp4", "cacheControl": "max-age=3600", "lastModified": "2026-02-05T16:10:40.000Z", "contentLength": 38792771, "httpStatusCode": 200}	fcab5bb2-77af-4961-8de3-ff34d6885742	47838213-c39c-4135-9d1a-a924307c77d6	{}
c4fc5512-88a8-4aa6-a297-c9bcc07758bf	agent-photos	jm3lu23snva_1771771195206.jpg	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-02-22 14:39:57.836817+00	2026-02-22 14:39:57.836817+00	2026-02-22 14:39:57.836817+00	{"eTag": "\\"3cb2d0e7b9e62cc96204c8e2fa385880\\"", "size": 31201, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-22T14:39:58.000Z", "contentLength": 31201, "httpStatusCode": 200}	e6f1df23-3f5c-4a92-aef3-3731c67caabd	742c31bf-d94b-45d2-906a-8de86a6d8954	{}
83160787-b0dc-4e67-bd58-cbd73ec02bd1	agent-photos	tsp11p1irx7_1774507553844.jpg	742c31bf-d94b-45d2-906a-8de86a6d8954	2026-03-26 06:45:54.862765+00	2026-03-26 06:45:54.862765+00	2026-03-26 06:45:54.862765+00	{"eTag": "\\"3cb2d0e7b9e62cc96204c8e2fa385880\\"", "size": 31201, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-03-26T06:45:55.000Z", "contentLength": 31201, "httpStatusCode": 200}	b284cc7d-89ec-4a1a-ba94-a7f0bc3658dd	742c31bf-d94b-45d2-906a-8de86a6d8954	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY "storage"."vector_indexes" ("id", "name", "bucket_id", "data_type", "dimension", "distance_metric", "metadata_configuration", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: -
--

COPY "supabase_migrations"."schema_migrations" ("version", "statements", "name") FROM stdin;
20260320224451	{"SET statement_timeout = 0","SET lock_timeout = 0","SET idle_in_transaction_session_timeout = 0","SET client_encoding = 'UTF8'","SET standard_conforming_strings = on","SELECT pg_catalog.set_config('search_path', '', false)","SET check_function_bodies = false","SET xmloption = content","SET client_min_messages = warning","SET row_security = off","COMMENT ON SCHEMA \\"public\\" IS 'standard public schema'","CREATE EXTENSION IF NOT EXISTS \\"pg_graphql\\" WITH SCHEMA \\"graphql\\"","CREATE EXTENSION IF NOT EXISTS \\"pg_stat_statements\\" WITH SCHEMA \\"extensions\\"","CREATE EXTENSION IF NOT EXISTS \\"pgcrypto\\" WITH SCHEMA \\"extensions\\"","CREATE EXTENSION IF NOT EXISTS \\"supabase_vault\\" WITH SCHEMA \\"vault\\"","CREATE EXTENSION IF NOT EXISTS \\"uuid-ossp\\" WITH SCHEMA \\"extensions\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"agents_search_vector_update\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\"\n    AS $$\r\nBEGIN\r\n  NEW.search_vector := \r\n    setweight(to_tsvector('english', COALESCE(NEW.first_name, '')), 'A') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.last_name, '')), 'A') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'B') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.bio, '')), 'C');\r\n  RETURN NEW;\r\nEND;\r\n$$","ALTER FUNCTION \\"public\\".\\"agents_search_vector_update\\"() OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"properties_search_vector_update\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\"\n    AS $$\r\nBEGIN\r\n  NEW.search_vector := \r\n    setweight(to_tsvector('english', COALESCE(NEW.address, '')), 'A') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'A') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.state, '')), 'B') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.zip_code, '')), 'C') ||\r\n    setweight(to_tsvector('english', COALESCE(NEW.neighborhood, '')), 'B');\r\n  RETURN NEW;\r\nEND;\r\n$$","ALTER FUNCTION \\"public\\".\\"properties_search_vector_update\\"() OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"update_updated_at_column\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\"\n    AS $$\r\nBEGIN\r\n  NEW.updated_at = NOW();\r\n  RETURN NEW;\r\nEND;\r\n$$","ALTER FUNCTION \\"public\\".\\"update_updated_at_column\\"() OWNER TO \\"postgres\\"","SET default_tablespace = ''","SET default_table_access_method = \\"heap\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"admin_users\\" (\n    \\"id\\" \\"uuid\\" NOT NULL,\n    \\"email\\" \\"text\\" NOT NULL,\n    \\"full_name\\" \\"text\\",\n    \\"role\\" \\"text\\" DEFAULT 'admin'::\\"text\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"last_login\\" timestamp with time zone\n)","ALTER TABLE \\"public\\".\\"admin_users\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"agents\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"first_name\\" \\"text\\" NOT NULL,\n    \\"last_name\\" \\"text\\" NOT NULL,\n    \\"email\\" \\"text\\" NOT NULL,\n    \\"phone\\" \\"text\\",\n    \\"bio\\" \\"text\\",\n    \\"photo_url\\" \\"text\\",\n    \\"title\\" \\"text\\",\n    \\"specialties\\" \\"jsonb\\" DEFAULT '[]'::\\"jsonb\\",\n    \\"social_links\\" \\"jsonb\\" DEFAULT '{}'::\\"jsonb\\",\n    \\"is_active\\" boolean DEFAULT true,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"is_featured\\" boolean DEFAULT false,\n    \\"featured_order\\" integer DEFAULT 0,\n    \\"specialties_list\\" \\"text\\"[],\n    \\"languages\\" \\"text\\"[],\n    \\"search_vector\\" \\"tsvector\\"\n)","ALTER TABLE \\"public\\".\\"agents\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"component_templates\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"name\\" \\"text\\" NOT NULL,\n    \\"component_type\\" \\"text\\" NOT NULL,\n    \\"description\\" \\"text\\",\n    \\"default_config\\" \\"jsonb\\" DEFAULT '{}'::\\"jsonb\\",\n    \\"preview_image_url\\" \\"text\\",\n    \\"is_active\\" boolean DEFAULT true,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"component_templates\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"featured_properties\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"property_id\\" \\"uuid\\",\n    \\"display_order\\" integer NOT NULL,\n    \\"title_override\\" \\"text\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"featured_properties\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"form_configs\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"form_key\\" \\"text\\" NOT NULL,\n    \\"title\\" \\"text\\" NOT NULL,\n    \\"fields\\" \\"jsonb\\" NOT NULL,\n    \\"submit_text\\" \\"text\\" DEFAULT 'Submit'::\\"text\\",\n    \\"success_message\\" \\"text\\",\n    \\"email_recipients\\" \\"text\\"[],\n    \\"is_active\\" boolean DEFAULT true,\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"form_configs\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"form_configs\\" IS 'Configuration for site forms'","CREATE TABLE IF NOT EXISTS \\"public\\".\\"form_submissions\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"form_type\\" \\"text\\" NOT NULL,\n    \\"data\\" \\"jsonb\\" NOT NULL,\n    \\"status\\" \\"text\\" DEFAULT 'new'::\\"text\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"form_submissions\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"media_library\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"filename\\" \\"text\\" NOT NULL,\n    \\"cloudinary_url\\" \\"text\\" NOT NULL,\n    \\"cloudinary_id\\" \\"text\\" NOT NULL,\n    \\"media_type\\" \\"text\\",\n    \\"file_size\\" integer,\n    \\"dimensions\\" \\"jsonb\\",\n    \\"alt_text\\" \\"text\\",\n    \\"tags\\" \\"text\\"[],\n    \\"uploaded_by\\" \\"uuid\\",\n    \\"uploaded_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    CONSTRAINT \\"media_library_media_type_check\\" CHECK ((\\"media_type\\" = ANY (ARRAY['image'::\\"text\\", 'video'::\\"text\\"])))\n)","ALTER TABLE \\"public\\".\\"media_library\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"media_library\\" IS 'Centralized media asset management'","CREATE TABLE IF NOT EXISTS \\"public\\".\\"navigation_items\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"menu_location\\" \\"text\\" NOT NULL,\n    \\"label\\" \\"text\\" NOT NULL,\n    \\"url\\" \\"text\\" NOT NULL,\n    \\"parent_id\\" \\"uuid\\",\n    \\"order_index\\" integer DEFAULT 0,\n    \\"is_active\\" boolean DEFAULT true,\n    \\"icon\\" \\"text\\",\n    \\"dropdown_config\\" \\"jsonb\\",\n    \\"has_dropdown\\" boolean DEFAULT false,\n    \\"dropdown_type\\" \\"text\\",\n    \\"opens_in_new_tab\\" boolean DEFAULT false\n)","ALTER TABLE \\"public\\".\\"navigation_items\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"navigation_items\\" IS 'Navigation menu items for header and footer'","COMMENT ON COLUMN \\"public\\".\\"navigation_items\\".\\"has_dropdown\\" IS 'Whether this navigation item has a dropdown menu'","CREATE TABLE IF NOT EXISTS \\"public\\".\\"newsletter_subscribers\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"email\\" \\"text\\" NOT NULL,\n    \\"subscribed_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"is_active\\" boolean DEFAULT true,\n    \\"unsubscribed_at\\" timestamp with time zone\n)","ALTER TABLE \\"public\\".\\"newsletter_subscribers\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"newsletters\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"title\\" \\"text\\" NOT NULL,\n    \\"slug\\" \\"text\\" NOT NULL,\n    \\"cover_image_url\\" \\"text\\",\n    \\"description\\" \\"text\\",\n    \\"content\\" \\"text\\",\n    \\"category\\" \\"text\\" DEFAULT 'INSIDER'::\\"text\\",\n    \\"published_date\\" \\"date\\" DEFAULT CURRENT_DATE,\n    \\"is_featured\\" boolean DEFAULT false,\n    \\"order_index\\" integer DEFAULT 0,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"newsletters\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"page_meta\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"page_path\\" \\"text\\" NOT NULL,\n    \\"title\\" \\"text\\",\n    \\"description\\" \\"text\\",\n    \\"keywords\\" \\"text\\"[],\n    \\"og_image\\" \\"text\\",\n    \\"canonical_url\\" \\"text\\",\n    \\"noindex\\" boolean DEFAULT false,\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"page_meta\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"page_meta\\" IS 'SEO and meta information for pages'","CREATE TABLE IF NOT EXISTS \\"public\\".\\"page_sections\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"page\\" \\"text\\" NOT NULL,\n    \\"section_type\\" \\"text\\" NOT NULL,\n    \\"title\\" \\"text\\",\n    \\"subtitle\\" \\"text\\",\n    \\"content\\" \\"text\\",\n    \\"media_url\\" \\"text\\",\n    \\"media_type\\" \\"text\\",\n    \\"layout_config\\" \\"jsonb\\" DEFAULT '{}'::\\"jsonb\\",\n    \\"cta_primary_text\\" \\"text\\",\n    \\"cta_primary_link\\" \\"text\\",\n    \\"cta_secondary_text\\" \\"text\\",\n    \\"cta_secondary_link\\" \\"text\\",\n    \\"background_color\\" \\"text\\" DEFAULT '#FFFFFF'::\\"text\\",\n    \\"text_color\\" \\"text\\" DEFAULT '#000000'::\\"text\\",\n    \\"order_index\\" integer NOT NULL,\n    \\"is_active\\" boolean DEFAULT true,\n    \\"template_id\\" \\"uuid\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"page_sections\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"properties\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"title\\" \\"text\\" NOT NULL,\n    \\"slug\\" \\"text\\" NOT NULL,\n    \\"city\\" \\"text\\" NOT NULL,\n    \\"address\\" \\"text\\",\n    \\"state\\" \\"text\\",\n    \\"zip_code\\" \\"text\\",\n    \\"bedrooms\\" integer,\n    \\"bathrooms\\" numeric(3,1),\n    \\"half_baths\\" integer DEFAULT 0,\n    \\"price\\" numeric(12,2) NOT NULL,\n    \\"description\\" \\"text\\",\n    \\"property_type\\" \\"text\\",\n    \\"status\\" \\"text\\" DEFAULT 'active'::\\"text\\",\n    \\"square_feet\\" integer,\n    \\"lot_size\\" numeric(10,2),\n    \\"year_built\\" integer,\n    \\"is_featured\\" boolean DEFAULT false,\n    \\"featured_order\\" integer,\n    \\"images\\" \\"jsonb\\" DEFAULT '[]'::\\"jsonb\\",\n    \\"amenities\\" \\"jsonb\\" DEFAULT '[]'::\\"jsonb\\",\n    \\"category\\" \\"text\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"is_exclusive\\" boolean DEFAULT false,\n    \\"badge_text\\" \\"text\\",\n    \\"badge_expires_at\\" timestamp with time zone,\n    \\"listing_type\\" \\"text\\" DEFAULT 'sale'::\\"text\\",\n    \\"neighborhood\\" \\"text\\",\n    \\"search_vector\\" \\"tsvector\\",\n    CONSTRAINT \\"properties_listing_type_check\\" CHECK ((\\"listing_type\\" = ANY (ARRAY['sale'::\\"text\\", 'rent'::\\"text\\"])))\n)","ALTER TABLE \\"public\\".\\"properties\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"site_config\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"key\\" \\"text\\" NOT NULL,\n    \\"value\\" \\"jsonb\\" NOT NULL,\n    \\"category\\" \\"text\\" NOT NULL,\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"site_config\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"site_config\\" IS 'Stores site-wide configuration settings'","CREATE TABLE IF NOT EXISTS \\"public\\".\\"site_statistics\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"label\\" \\"text\\" NOT NULL,\n    \\"value\\" \\"text\\" NOT NULL,\n    \\"sublabel\\" \\"text\\",\n    \\"category\\" \\"text\\" DEFAULT 'general'::\\"text\\",\n    \\"order_index\\" integer DEFAULT 0,\n    \\"is_active\\" boolean DEFAULT true,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"site_statistics\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"site_statistics\\" IS 'Stores company statistics displayed across the site'","CREATE TABLE IF NOT EXISTS \\"public\\".\\"stories_items\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"section_id\\" \\"uuid\\",\n    \\"title\\" \\"text\\" NOT NULL,\n    \\"image_url\\" \\"text\\",\n    \\"category\\" \\"text\\" DEFAULT 'INSIDER'::\\"text\\",\n    \\"url\\" \\"text\\",\n    \\"sort_order\\" integer DEFAULT 0,\n    \\"layout_config\\" \\"jsonb\\" DEFAULT '{}'::\\"jsonb\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"stories_items\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"tabs_items\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"section_id\\" \\"uuid\\" NOT NULL,\n    \\"title\\" \\"text\\" NOT NULL,\n    \\"description\\" \\"text\\",\n    \\"image_url\\" \\"text\\",\n    \\"order_index\\" integer NOT NULL,\n    \\"layout_config\\" \\"jsonb\\" DEFAULT '{}'::\\"jsonb\\",\n    \\"is_active\\" boolean DEFAULT true,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"tabs_items\\" OWNER TO \\"postgres\\"","COMMENT ON TABLE \\"public\\".\\"tabs_items\\" IS 'Individual tab items for tabs sections'","COMMENT ON COLUMN \\"public\\".\\"tabs_items\\".\\"section_id\\" IS 'Reference to parent page_sections entry'","ALTER TABLE ONLY \\"public\\".\\"admin_users\\"\n    ADD CONSTRAINT \\"admin_users_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"agents\\"\n    ADD CONSTRAINT \\"agents_email_key\\" UNIQUE (\\"email\\")","ALTER TABLE ONLY \\"public\\".\\"agents\\"\n    ADD CONSTRAINT \\"agents_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"component_templates\\"\n    ADD CONSTRAINT \\"component_templates_name_key\\" UNIQUE (\\"name\\")","ALTER TABLE ONLY \\"public\\".\\"component_templates\\"\n    ADD CONSTRAINT \\"component_templates_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"featured_properties\\"\n    ADD CONSTRAINT \\"featured_properties_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"featured_properties\\"\n    ADD CONSTRAINT \\"featured_properties_property_id_key\\" UNIQUE (\\"property_id\\")","ALTER TABLE ONLY \\"public\\".\\"form_configs\\"\n    ADD CONSTRAINT \\"form_configs_form_key_key\\" UNIQUE (\\"form_key\\")","ALTER TABLE ONLY \\"public\\".\\"form_configs\\"\n    ADD CONSTRAINT \\"form_configs_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"form_submissions\\"\n    ADD CONSTRAINT \\"form_submissions_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"media_library\\"\n    ADD CONSTRAINT \\"media_library_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"navigation_items\\"\n    ADD CONSTRAINT \\"navigation_items_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"newsletter_subscribers\\"\n    ADD CONSTRAINT \\"newsletter_subscribers_email_key\\" UNIQUE (\\"email\\")","ALTER TABLE ONLY \\"public\\".\\"newsletter_subscribers\\"\n    ADD CONSTRAINT \\"newsletter_subscribers_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"newsletters\\"\n    ADD CONSTRAINT \\"newsletters_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"newsletters\\"\n    ADD CONSTRAINT \\"newsletters_slug_key\\" UNIQUE (\\"slug\\")","ALTER TABLE ONLY \\"public\\".\\"page_meta\\"\n    ADD CONSTRAINT \\"page_meta_page_path_key\\" UNIQUE (\\"page_path\\")","ALTER TABLE ONLY \\"public\\".\\"page_meta\\"\n    ADD CONSTRAINT \\"page_meta_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"page_sections\\"\n    ADD CONSTRAINT \\"page_sections_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"properties\\"\n    ADD CONSTRAINT \\"properties_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"properties\\"\n    ADD CONSTRAINT \\"properties_slug_key\\" UNIQUE (\\"slug\\")","ALTER TABLE ONLY \\"public\\".\\"site_config\\"\n    ADD CONSTRAINT \\"site_config_key_key\\" UNIQUE (\\"key\\")","ALTER TABLE ONLY \\"public\\".\\"site_config\\"\n    ADD CONSTRAINT \\"site_config_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"site_statistics\\"\n    ADD CONSTRAINT \\"site_statistics_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"stories_items\\"\n    ADD CONSTRAINT \\"stories_items_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"tabs_items\\"\n    ADD CONSTRAINT \\"tabs_items_pkey\\" PRIMARY KEY (\\"id\\")","CREATE INDEX \\"idx_agents_email\\" ON \\"public\\".\\"agents\\" USING \\"btree\\" (\\"email\\")","CREATE INDEX \\"idx_agents_search\\" ON \\"public\\".\\"agents\\" USING \\"gin\\" (\\"search_vector\\")","CREATE INDEX \\"idx_featured_properties_order\\" ON \\"public\\".\\"featured_properties\\" USING \\"btree\\" (\\"display_order\\")","CREATE INDEX \\"idx_form_configs_key\\" ON \\"public\\".\\"form_configs\\" USING \\"btree\\" (\\"form_key\\")","CREATE INDEX \\"idx_form_submissions_created\\" ON \\"public\\".\\"form_submissions\\" USING \\"btree\\" (\\"created_at\\")","CREATE INDEX \\"idx_form_submissions_status\\" ON \\"public\\".\\"form_submissions\\" USING \\"btree\\" (\\"status\\")","CREATE INDEX \\"idx_form_submissions_type\\" ON \\"public\\".\\"form_submissions\\" USING \\"btree\\" (\\"form_type\\")","CREATE INDEX \\"idx_media_library_tags\\" ON \\"public\\".\\"media_library\\" USING \\"gin\\" (\\"tags\\")","CREATE INDEX \\"idx_media_library_type\\" ON \\"public\\".\\"media_library\\" USING \\"btree\\" (\\"media_type\\")","CREATE INDEX \\"idx_navigation_has_dropdown\\" ON \\"public\\".\\"navigation_items\\" USING \\"btree\\" (\\"has_dropdown\\") WHERE (\\"has_dropdown\\" = true)","CREATE INDEX \\"idx_navigation_items_location\\" ON \\"public\\".\\"navigation_items\\" USING \\"btree\\" (\\"menu_location\\")","CREATE INDEX \\"idx_navigation_items_parent\\" ON \\"public\\".\\"navigation_items\\" USING \\"btree\\" (\\"parent_id\\")","CREATE INDEX \\"idx_newsletter_email\\" ON \\"public\\".\\"newsletter_subscribers\\" USING \\"btree\\" (\\"email\\")","CREATE INDEX \\"idx_page_meta_path\\" ON \\"public\\".\\"page_meta\\" USING \\"btree\\" (\\"page_path\\")","CREATE INDEX \\"idx_page_sections_active\\" ON \\"public\\".\\"page_sections\\" USING \\"btree\\" (\\"is_active\\")","CREATE INDEX \\"idx_page_sections_order\\" ON \\"public\\".\\"page_sections\\" USING \\"btree\\" (\\"order_index\\")","CREATE INDEX \\"idx_page_sections_page\\" ON \\"public\\".\\"page_sections\\" USING \\"btree\\" (\\"page\\")","CREATE INDEX \\"idx_properties_category\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"category\\")","CREATE INDEX \\"idx_properties_city\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"city\\")","CREATE INDEX \\"idx_properties_is_featured\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"is_featured\\")","CREATE INDEX \\"idx_properties_listing_type\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"listing_type\\")","CREATE INDEX \\"idx_properties_price\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"price\\")","CREATE INDEX \\"idx_properties_search\\" ON \\"public\\".\\"properties\\" USING \\"gin\\" (\\"search_vector\\")","CREATE INDEX \\"idx_properties_slug\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"slug\\")","CREATE INDEX \\"idx_properties_status\\" ON \\"public\\".\\"properties\\" USING \\"btree\\" (\\"status\\")","CREATE INDEX \\"idx_site_config_category\\" ON \\"public\\".\\"site_config\\" USING \\"btree\\" (\\"category\\")","CREATE INDEX \\"idx_site_config_key\\" ON \\"public\\".\\"site_config\\" USING \\"btree\\" (\\"key\\")","CREATE INDEX \\"idx_site_statistics_active\\" ON \\"public\\".\\"site_statistics\\" USING \\"btree\\" (\\"is_active\\")","CREATE INDEX \\"idx_site_statistics_category\\" ON \\"public\\".\\"site_statistics\\" USING \\"btree\\" (\\"category\\")","CREATE INDEX \\"idx_tabs_items_order\\" ON \\"public\\".\\"tabs_items\\" USING \\"btree\\" (\\"order_index\\")","CREATE INDEX \\"idx_tabs_items_section\\" ON \\"public\\".\\"tabs_items\\" USING \\"btree\\" (\\"section_id\\")","CREATE OR REPLACE TRIGGER \\"agents_search_vector_trigger\\" BEFORE INSERT OR UPDATE ON \\"public\\".\\"agents\\" FOR EACH ROW EXECUTE FUNCTION \\"public\\".\\"agents_search_vector_update\\"()","CREATE OR REPLACE TRIGGER \\"properties_search_vector_trigger\\" BEFORE INSERT OR UPDATE ON \\"public\\".\\"properties\\" FOR EACH ROW EXECUTE FUNCTION \\"public\\".\\"properties_search_vector_update\\"()","CREATE OR REPLACE TRIGGER \\"update_agents_updated_at\\" BEFORE UPDATE ON \\"public\\".\\"agents\\" FOR EACH ROW EXECUTE FUNCTION \\"public\\".\\"update_updated_at_column\\"()","CREATE OR REPLACE TRIGGER \\"update_page_sections_updated_at\\" BEFORE UPDATE ON \\"public\\".\\"page_sections\\" FOR EACH ROW EXECUTE FUNCTION \\"public\\".\\"update_updated_at_column\\"()","CREATE OR REPLACE TRIGGER \\"update_properties_updated_at\\" BEFORE UPDATE ON \\"public\\".\\"properties\\" FOR EACH ROW EXECUTE FUNCTION \\"public\\".\\"update_updated_at_column\\"()","ALTER TABLE ONLY \\"public\\".\\"admin_users\\"\n    ADD CONSTRAINT \\"admin_users_id_fkey\\" FOREIGN KEY (\\"id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"featured_properties\\"\n    ADD CONSTRAINT \\"featured_properties_property_id_fkey\\" FOREIGN KEY (\\"property_id\\") REFERENCES \\"public\\".\\"properties\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"media_library\\"\n    ADD CONSTRAINT \\"media_library_uploaded_by_fkey\\" FOREIGN KEY (\\"uploaded_by\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"navigation_items\\"\n    ADD CONSTRAINT \\"navigation_items_parent_id_fkey\\" FOREIGN KEY (\\"parent_id\\") REFERENCES \\"public\\".\\"navigation_items\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"page_sections\\"\n    ADD CONSTRAINT \\"page_sections_template_id_fkey\\" FOREIGN KEY (\\"template_id\\") REFERENCES \\"public\\".\\"component_templates\\"(\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"stories_items\\"\n    ADD CONSTRAINT \\"stories_items_section_id_fkey\\" FOREIGN KEY (\\"section_id\\") REFERENCES \\"public\\".\\"page_sections\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"tabs_items\\"\n    ADD CONSTRAINT \\"tabs_items_section_id_fkey\\" FOREIGN KEY (\\"section_id\\") REFERENCES \\"public\\".\\"page_sections\\"(\\"id\\") ON DELETE CASCADE","CREATE POLICY \\"Admin write access\\" ON \\"public\\".\\"newsletters\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admin write access stories\\" ON \\"public\\".\\"stories_items\\" USING ((\\"auth\\".\\"role\\"() = 'authenticated'::\\"text\\"))","CREATE POLICY \\"Admins access form_configs\\" ON \\"public\\".\\"form_configs\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins access media_library\\" ON \\"public\\".\\"media_library\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins access navigation_items\\" ON \\"public\\".\\"navigation_items\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins access page_meta\\" ON \\"public\\".\\"page_meta\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins access site_config\\" ON \\"public\\".\\"site_config\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins access site_statistics\\" ON \\"public\\".\\"site_statistics\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can do everything with properties\\" ON \\"public\\".\\"properties\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can manage agents\\" ON \\"public\\".\\"agents\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can manage featured properties\\" ON \\"public\\".\\"featured_properties\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can manage page sections\\" ON \\"public\\".\\"page_sections\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can manage tabs\\" ON \\"public\\".\\"tabs_items\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can manage templates\\" ON \\"public\\".\\"component_templates\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Admins can view and manage subscribers\\" ON \\"public\\".\\"newsletter_subscribers\\" USING ((EXISTS ( SELECT 1\n   FROM \\"public\\".\\"admin_users\\"\n  WHERE (\\"admin_users\\".\\"id\\" = \\"auth\\".\\"uid\\"()))))","CREATE POLICY \\"Anyone can subscribe to newsletter\\" ON \\"public\\".\\"newsletter_subscribers\\" FOR INSERT WITH CHECK (true)","CREATE POLICY \\"Authenticated users can manage admin users\\" ON \\"public\\".\\"admin_users\\" USING ((\\"auth\\".\\"uid\\"() = \\"id\\")) WITH CHECK ((\\"auth\\".\\"uid\\"() = \\"id\\"))","CREATE POLICY \\"Authenticated users can view admin users\\" ON \\"public\\".\\"admin_users\\" FOR SELECT USING ((\\"auth\\".\\"role\\"() = 'authenticated'::\\"text\\"))","CREATE POLICY \\"Public can submit forms\\" ON \\"public\\".\\"form_submissions\\" FOR INSERT WITH CHECK (true)","CREATE POLICY \\"Public can view active agents\\" ON \\"public\\".\\"agents\\" FOR SELECT USING ((\\"is_active\\" = true))","CREATE POLICY \\"Public can view active page sections\\" ON \\"public\\".\\"page_sections\\" FOR SELECT USING ((\\"is_active\\" = true))","CREATE POLICY \\"Public can view active properties\\" ON \\"public\\".\\"properties\\" FOR SELECT USING ((\\"status\\" = 'active'::\\"text\\"))","CREATE POLICY \\"Public can view active tabs\\" ON \\"public\\".\\"tabs_items\\" FOR SELECT USING ((\\"is_active\\" = true))","CREATE POLICY \\"Public can view active templates\\" ON \\"public\\".\\"component_templates\\" FOR SELECT USING ((\\"is_active\\" = true))","CREATE POLICY \\"Public can view featured properties\\" ON \\"public\\".\\"featured_properties\\" FOR SELECT USING (true)","CREATE POLICY \\"Public read access\\" ON \\"public\\".\\"newsletters\\" FOR SELECT USING (true)","CREATE POLICY \\"Public read access media_library\\" ON \\"public\\".\\"media_library\\" FOR SELECT USING (true)","CREATE POLICY \\"Public read access navigation_items\\" ON \\"public\\".\\"navigation_items\\" FOR SELECT USING ((\\"is_active\\" = true))","CREATE POLICY \\"Public read access page_meta\\" ON \\"public\\".\\"page_meta\\" FOR SELECT USING (true)","CREATE POLICY \\"Public read access site_config\\" ON \\"public\\".\\"site_config\\" FOR SELECT USING (true)","CREATE POLICY \\"Public read access site_statistics\\" ON \\"public\\".\\"site_statistics\\" FOR SELECT USING ((\\"is_active\\" = true))","CREATE POLICY \\"Public read access stories\\" ON \\"public\\".\\"stories_items\\" FOR SELECT USING (true)","CREATE POLICY \\"Users can view their own admin record\\" ON \\"public\\".\\"admin_users\\" FOR SELECT USING ((\\"auth\\".\\"uid\\"() = \\"id\\"))","ALTER TABLE \\"public\\".\\"admin_users\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"agents\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"component_templates\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"featured_properties\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"form_configs\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"form_submissions\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"media_library\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"navigation_items\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"newsletter_subscribers\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"newsletters\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"page_meta\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"page_sections\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"properties\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"site_config\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"site_statistics\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"stories_items\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"tabs_items\\" ENABLE ROW LEVEL SECURITY","ALTER PUBLICATION \\"supabase_realtime\\" OWNER TO \\"postgres\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"postgres\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"anon\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"authenticated\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"agents_search_vector_update\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"agents_search_vector_update\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"agents_search_vector_update\\"() TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"properties_search_vector_update\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"properties_search_vector_update\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"properties_search_vector_update\\"() TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"update_updated_at_column\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"update_updated_at_column\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"update_updated_at_column\\"() TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"admin_users\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"admin_users\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"admin_users\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"agents\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"agents\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"agents\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"component_templates\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"component_templates\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"component_templates\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"featured_properties\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"featured_properties\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"featured_properties\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"form_configs\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"form_configs\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"form_configs\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"form_submissions\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"form_submissions\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"form_submissions\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"media_library\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"media_library\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"media_library\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"navigation_items\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"navigation_items\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"navigation_items\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"newsletter_subscribers\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"newsletter_subscribers\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"newsletter_subscribers\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"newsletters\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"newsletters\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"newsletters\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"page_meta\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"page_meta\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"page_meta\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"page_sections\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"page_sections\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"page_sections\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"properties\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"properties\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"properties\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"site_config\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"site_config\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"site_config\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"site_statistics\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"site_statistics\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"site_statistics\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"stories_items\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"stories_items\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"stories_items\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"tabs_items\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"tabs_items\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"tabs_items\\" TO \\"service_role\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"postgres\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"anon\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"authenticated\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"service_role\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"postgres\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"anon\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"authenticated\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"service_role\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"postgres\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"anon\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"authenticated\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"service_role\\"","drop extension if exists \\"pg_net\\"","drop trigger if exists \\"agents_search_vector_trigger\\" on \\"public\\".\\"agents\\"","drop trigger if exists \\"update_agents_updated_at\\" on \\"public\\".\\"agents\\"","drop trigger if exists \\"update_page_sections_updated_at\\" on \\"public\\".\\"page_sections\\"","drop trigger if exists \\"properties_search_vector_trigger\\" on \\"public\\".\\"properties\\"","drop trigger if exists \\"update_properties_updated_at\\" on \\"public\\".\\"properties\\"","drop policy \\"Admins can manage agents\\" on \\"public\\".\\"agents\\"","drop policy \\"Admins can manage templates\\" on \\"public\\".\\"component_templates\\"","drop policy \\"Admins can manage featured properties\\" on \\"public\\".\\"featured_properties\\"","drop policy \\"Admins access form_configs\\" on \\"public\\".\\"form_configs\\"","drop policy \\"Admins access media_library\\" on \\"public\\".\\"media_library\\"","drop policy \\"Admins access navigation_items\\" on \\"public\\".\\"navigation_items\\"","drop policy \\"Admins can view and manage subscribers\\" on \\"public\\".\\"newsletter_subscribers\\"","drop policy \\"Admin write access\\" on \\"public\\".\\"newsletters\\"","drop policy \\"Admins access page_meta\\" on \\"public\\".\\"page_meta\\"","drop policy \\"Admins can manage page sections\\" on \\"public\\".\\"page_sections\\"","drop policy \\"Admins can do everything with properties\\" on \\"public\\".\\"properties\\"","drop policy \\"Admins access site_config\\" on \\"public\\".\\"site_config\\"","drop policy \\"Admins access site_statistics\\" on \\"public\\".\\"site_statistics\\"","drop policy \\"Admins can manage tabs\\" on \\"public\\".\\"tabs_items\\"","alter table \\"public\\".\\"featured_properties\\" drop constraint \\"featured_properties_property_id_fkey\\"","alter table \\"public\\".\\"navigation_items\\" drop constraint \\"navigation_items_parent_id_fkey\\"","alter table \\"public\\".\\"page_sections\\" drop constraint \\"page_sections_template_id_fkey\\"","alter table \\"public\\".\\"stories_items\\" drop constraint \\"stories_items_section_id_fkey\\"","alter table \\"public\\".\\"tabs_items\\" drop constraint \\"tabs_items_section_id_fkey\\"","alter table \\"public\\".\\"agents\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"component_templates\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"featured_properties\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"form_configs\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"form_submissions\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"media_library\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"navigation_items\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"newsletter_subscribers\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"newsletters\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"page_meta\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"page_sections\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"properties\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"site_config\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"site_statistics\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"stories_items\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"tabs_items\\" alter column \\"id\\" set default extensions.uuid_generate_v4()","alter table \\"public\\".\\"featured_properties\\" add constraint \\"featured_properties_property_id_fkey\\" FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE not valid","alter table \\"public\\".\\"featured_properties\\" validate constraint \\"featured_properties_property_id_fkey\\"","alter table \\"public\\".\\"navigation_items\\" add constraint \\"navigation_items_parent_id_fkey\\" FOREIGN KEY (parent_id) REFERENCES public.navigation_items(id) ON DELETE CASCADE not valid","alter table \\"public\\".\\"navigation_items\\" validate constraint \\"navigation_items_parent_id_fkey\\"","alter table \\"public\\".\\"page_sections\\" add constraint \\"page_sections_template_id_fkey\\" FOREIGN KEY (template_id) REFERENCES public.component_templates(id) not valid","alter table \\"public\\".\\"page_sections\\" validate constraint \\"page_sections_template_id_fkey\\"","alter table \\"public\\".\\"stories_items\\" add constraint \\"stories_items_section_id_fkey\\" FOREIGN KEY (section_id) REFERENCES public.page_sections(id) ON DELETE CASCADE not valid","alter table \\"public\\".\\"stories_items\\" validate constraint \\"stories_items_section_id_fkey\\"","alter table \\"public\\".\\"tabs_items\\" add constraint \\"tabs_items_section_id_fkey\\" FOREIGN KEY (section_id) REFERENCES public.page_sections(id) ON DELETE CASCADE not valid","alter table \\"public\\".\\"tabs_items\\" validate constraint \\"tabs_items_section_id_fkey\\"","create policy \\"Admins can manage agents\\"\n  on \\"public\\".\\"agents\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins can manage templates\\"\n  on \\"public\\".\\"component_templates\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins can manage featured properties\\"\n  on \\"public\\".\\"featured_properties\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins access form_configs\\"\n  on \\"public\\".\\"form_configs\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins access media_library\\"\n  on \\"public\\".\\"media_library\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins access navigation_items\\"\n  on \\"public\\".\\"navigation_items\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins can view and manage subscribers\\"\n  on \\"public\\".\\"newsletter_subscribers\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admin write access\\"\n  on \\"public\\".\\"newsletters\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins access page_meta\\"\n  on \\"public\\".\\"page_meta\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins can manage page sections\\"\n  on \\"public\\".\\"page_sections\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins can do everything with properties\\"\n  on \\"public\\".\\"properties\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins access site_config\\"\n  on \\"public\\".\\"site_config\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins access site_statistics\\"\n  on \\"public\\".\\"site_statistics\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","create policy \\"Admins can manage tabs\\"\n  on \\"public\\".\\"tabs_items\\"\n  as permissive\n  for all\n  to public\nusing ((EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid()))))","CREATE TRIGGER agents_search_vector_trigger BEFORE INSERT OR UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.agents_search_vector_update()","CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()","CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()","CREATE TRIGGER properties_search_vector_trigger BEFORE INSERT OR UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.properties_search_vector_update()","CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()","create policy \\"Admin Delete Agent Photos\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for delete\n  to public\nusing (((bucket_id = 'agent-photos'::text) AND (EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid())))))","create policy \\"Admin Delete Property Images\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for delete\n  to public\nusing (((bucket_id = 'property-images'::text) AND (EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid())))))","create policy \\"Admin Delete Videos\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for delete\n  to public\nusing (((bucket_id = 'videos'::text) AND (EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid())))))","create policy \\"Admin Upload Agent Photos\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for insert\n  to public\nwith check (((bucket_id = 'agent-photos'::text) AND (EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid())))))","create policy \\"Admin Upload Property Images\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for insert\n  to public\nwith check (((bucket_id = 'property-images'::text) AND (EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid())))))","create policy \\"Admin Upload Videos\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for insert\n  to public\nwith check (((bucket_id = 'videos'::text) AND (EXISTS ( SELECT 1\n   FROM public.admin_users\n  WHERE (admin_users.id = auth.uid())))))","create policy \\"Public Access Agent Photos\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for select\n  to public\nusing ((bucket_id = 'agent-photos'::text))","create policy \\"Public Access Agents\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for select\n  to public\nusing ((bucket_id = 'agent-photos'::text))","create policy \\"Public Access Property Images\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for select\n  to public\nusing ((bucket_id = 'property-images'::text))","create policy \\"Public Access Videos\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for select\n  to public\nusing ((bucket_id = 'videos'::text))","create policy \\"Public Access\\"\n  on \\"storage\\".\\"objects\\"\n  as permissive\n  for select\n  to public\nusing ((bucket_id = 'property-images'::text))"}	remote_schema
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 131, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('"realtime"."subscription_id_seq"', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_amr_claims"
    ADD CONSTRAINT "amr_id_pk" PRIMARY KEY ("id");


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."audit_log_entries"
    ADD CONSTRAINT "audit_log_entries_pkey" PRIMARY KEY ("id");


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."custom_oauth_providers"
    ADD CONSTRAINT "custom_oauth_providers_identifier_key" UNIQUE ("identifier");


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."custom_oauth_providers"
    ADD CONSTRAINT "custom_oauth_providers_pkey" PRIMARY KEY ("id");


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."flow_state"
    ADD CONSTRAINT "flow_state_pkey" PRIMARY KEY ("id");


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."identities"
    ADD CONSTRAINT "identities_pkey" PRIMARY KEY ("id");


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."identities"
    ADD CONSTRAINT "identities_provider_id_provider_unique" UNIQUE ("provider_id", "provider");


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."instances"
    ADD CONSTRAINT "instances_pkey" PRIMARY KEY ("id");


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_amr_claims"
    ADD CONSTRAINT "mfa_amr_claims_session_id_authentication_method_pkey" UNIQUE ("session_id", "authentication_method");


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_challenges"
    ADD CONSTRAINT "mfa_challenges_pkey" PRIMARY KEY ("id");


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_factors"
    ADD CONSTRAINT "mfa_factors_last_challenged_at_key" UNIQUE ("last_challenged_at");


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_factors"
    ADD CONSTRAINT "mfa_factors_pkey" PRIMARY KEY ("id");


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_authorizations"
    ADD CONSTRAINT "oauth_authorizations_authorization_code_key" UNIQUE ("authorization_code");


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_authorizations"
    ADD CONSTRAINT "oauth_authorizations_authorization_id_key" UNIQUE ("authorization_id");


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_authorizations"
    ADD CONSTRAINT "oauth_authorizations_pkey" PRIMARY KEY ("id");


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_client_states"
    ADD CONSTRAINT "oauth_client_states_pkey" PRIMARY KEY ("id");


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_clients"
    ADD CONSTRAINT "oauth_clients_pkey" PRIMARY KEY ("id");


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_consents"
    ADD CONSTRAINT "oauth_consents_pkey" PRIMARY KEY ("id");


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_consents"
    ADD CONSTRAINT "oauth_consents_user_client_unique" UNIQUE ("user_id", "client_id");


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."one_time_tokens"
    ADD CONSTRAINT "one_time_tokens_pkey" PRIMARY KEY ("id");


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id");


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_token_unique" UNIQUE ("token");


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."saml_providers"
    ADD CONSTRAINT "saml_providers_entity_id_key" UNIQUE ("entity_id");


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."saml_providers"
    ADD CONSTRAINT "saml_providers_pkey" PRIMARY KEY ("id");


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."saml_relay_states"
    ADD CONSTRAINT "saml_relay_states_pkey" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."sso_domains"
    ADD CONSTRAINT "sso_domains_pkey" PRIMARY KEY ("id");


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."sso_providers"
    ADD CONSTRAINT "sso_providers_pkey" PRIMARY KEY ("id");


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."users"
    ADD CONSTRAINT "users_phone_key" UNIQUE ("phone");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."webauthn_challenges"
    ADD CONSTRAINT "webauthn_challenges_pkey" PRIMARY KEY ("id");


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."webauthn_credentials"
    ADD CONSTRAINT "webauthn_credentials_pkey" PRIMARY KEY ("id");


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id");


--
-- Name: agents agents_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."agents"
    ADD CONSTRAINT "agents_email_key" UNIQUE ("email");


--
-- Name: agents agents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."agents"
    ADD CONSTRAINT "agents_pkey" PRIMARY KEY ("id");


--
-- Name: component_templates component_templates_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."component_templates"
    ADD CONSTRAINT "component_templates_name_key" UNIQUE ("name");


--
-- Name: component_templates component_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."component_templates"
    ADD CONSTRAINT "component_templates_pkey" PRIMARY KEY ("id");


--
-- Name: featured_properties featured_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."featured_properties"
    ADD CONSTRAINT "featured_properties_pkey" PRIMARY KEY ("id");


--
-- Name: featured_properties featured_properties_property_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."featured_properties"
    ADD CONSTRAINT "featured_properties_property_id_key" UNIQUE ("property_id");


--
-- Name: form_configs form_configs_form_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."form_configs"
    ADD CONSTRAINT "form_configs_form_key_key" UNIQUE ("form_key");


--
-- Name: form_configs form_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."form_configs"
    ADD CONSTRAINT "form_configs_pkey" PRIMARY KEY ("id");


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."form_submissions"
    ADD CONSTRAINT "form_submissions_pkey" PRIMARY KEY ("id");


--
-- Name: media_library media_library_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."media_library"
    ADD CONSTRAINT "media_library_pkey" PRIMARY KEY ("id");


--
-- Name: navigation_items navigation_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."navigation_items"
    ADD CONSTRAINT "navigation_items_pkey" PRIMARY KEY ("id");


--
-- Name: newsletter_subscribers newsletter_subscribers_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter_subscribers"
    ADD CONSTRAINT "newsletter_subscribers_email_key" UNIQUE ("email");


--
-- Name: newsletter_subscribers newsletter_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter_subscribers"
    ADD CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id");


--
-- Name: newsletters newsletters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletters"
    ADD CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id");


--
-- Name: newsletters newsletters_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletters"
    ADD CONSTRAINT "newsletters_slug_key" UNIQUE ("slug");


--
-- Name: page_meta page_meta_page_path_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page_meta"
    ADD CONSTRAINT "page_meta_page_path_key" UNIQUE ("page_path");


--
-- Name: page_meta page_meta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page_meta"
    ADD CONSTRAINT "page_meta_pkey" PRIMARY KEY ("id");


--
-- Name: page_sections page_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page_sections"
    ADD CONSTRAINT "page_sections_pkey" PRIMARY KEY ("id");


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."properties"
    ADD CONSTRAINT "properties_pkey" PRIMARY KEY ("id");


--
-- Name: properties properties_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."properties"
    ADD CONSTRAINT "properties_slug_key" UNIQUE ("slug");


--
-- Name: site_config site_config_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."site_config"
    ADD CONSTRAINT "site_config_key_key" UNIQUE ("key");


--
-- Name: site_config site_config_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."site_config"
    ADD CONSTRAINT "site_config_pkey" PRIMARY KEY ("id");


--
-- Name: site_statistics site_statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."site_statistics"
    ADD CONSTRAINT "site_statistics_pkey" PRIMARY KEY ("id");


--
-- Name: stories_items stories_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."stories_items"
    ADD CONSTRAINT "stories_items_pkey" PRIMARY KEY ("id");


--
-- Name: tabs_items tabs_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."tabs_items"
    ADD CONSTRAINT "tabs_items_pkey" PRIMARY KEY ("id");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY "realtime"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id", "inserted_at");


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY "realtime"."subscription"
    ADD CONSTRAINT "pk_subscription" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY "realtime"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."buckets_analytics"
    ADD CONSTRAINT "buckets_analytics_pkey" PRIMARY KEY ("id");


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."buckets"
    ADD CONSTRAINT "buckets_pkey" PRIMARY KEY ("id");


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."buckets_vectors"
    ADD CONSTRAINT "buckets_vectors_pkey" PRIMARY KEY ("id");


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."migrations"
    ADD CONSTRAINT "migrations_name_key" UNIQUE ("name");


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."migrations"
    ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("id");


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."objects"
    ADD CONSTRAINT "objects_pkey" PRIMARY KEY ("id");


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads_parts"
    ADD CONSTRAINT "s3_multipart_uploads_parts_pkey" PRIMARY KEY ("id");


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads"
    ADD CONSTRAINT "s3_multipart_uploads_pkey" PRIMARY KEY ("id");


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."vector_indexes"
    ADD CONSTRAINT "vector_indexes_pkey" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: -
--

ALTER TABLE ONLY "supabase_migrations"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "audit_logs_instance_id_idx" ON "auth"."audit_log_entries" USING "btree" ("instance_id");


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "confirmation_token_idx" ON "auth"."users" USING "btree" ("confirmation_token") WHERE (("confirmation_token")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "custom_oauth_providers_created_at_idx" ON "auth"."custom_oauth_providers" USING "btree" ("created_at");


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "custom_oauth_providers_enabled_idx" ON "auth"."custom_oauth_providers" USING "btree" ("enabled");


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "custom_oauth_providers_identifier_idx" ON "auth"."custom_oauth_providers" USING "btree" ("identifier");


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "custom_oauth_providers_provider_type_idx" ON "auth"."custom_oauth_providers" USING "btree" ("provider_type");


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "email_change_token_current_idx" ON "auth"."users" USING "btree" ("email_change_token_current") WHERE (("email_change_token_current")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "email_change_token_new_idx" ON "auth"."users" USING "btree" ("email_change_token_new") WHERE (("email_change_token_new")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "factor_id_created_at_idx" ON "auth"."mfa_factors" USING "btree" ("user_id", "created_at");


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "flow_state_created_at_idx" ON "auth"."flow_state" USING "btree" ("created_at" DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "identities_email_idx" ON "auth"."identities" USING "btree" ("email" "text_pattern_ops");


--
-- Name: INDEX "identities_email_idx"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX "auth"."identities_email_idx" IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "identities_user_id_idx" ON "auth"."identities" USING "btree" ("user_id");


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "idx_auth_code" ON "auth"."flow_state" USING "btree" ("auth_code");


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "idx_oauth_client_states_created_at" ON "auth"."oauth_client_states" USING "btree" ("created_at");


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "idx_user_id_auth_method" ON "auth"."flow_state" USING "btree" ("user_id", "authentication_method");


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "mfa_challenge_created_at_idx" ON "auth"."mfa_challenges" USING "btree" ("created_at" DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "mfa_factors_user_friendly_name_unique" ON "auth"."mfa_factors" USING "btree" ("friendly_name", "user_id") WHERE (TRIM(BOTH FROM "friendly_name") <> ''::"text");


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "mfa_factors_user_id_idx" ON "auth"."mfa_factors" USING "btree" ("user_id");


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "oauth_auth_pending_exp_idx" ON "auth"."oauth_authorizations" USING "btree" ("expires_at") WHERE ("status" = 'pending'::"auth"."oauth_authorization_status");


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "oauth_clients_deleted_at_idx" ON "auth"."oauth_clients" USING "btree" ("deleted_at");


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "oauth_consents_active_client_idx" ON "auth"."oauth_consents" USING "btree" ("client_id") WHERE ("revoked_at" IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "oauth_consents_active_user_client_idx" ON "auth"."oauth_consents" USING "btree" ("user_id", "client_id") WHERE ("revoked_at" IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "oauth_consents_user_order_idx" ON "auth"."oauth_consents" USING "btree" ("user_id", "granted_at" DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "one_time_tokens_relates_to_hash_idx" ON "auth"."one_time_tokens" USING "hash" ("relates_to");


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "one_time_tokens_token_hash_hash_idx" ON "auth"."one_time_tokens" USING "hash" ("token_hash");


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "one_time_tokens_user_id_token_type_key" ON "auth"."one_time_tokens" USING "btree" ("user_id", "token_type");


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "reauthentication_token_idx" ON "auth"."users" USING "btree" ("reauthentication_token") WHERE (("reauthentication_token")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "recovery_token_idx" ON "auth"."users" USING "btree" ("recovery_token") WHERE (("recovery_token")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "refresh_tokens_instance_id_idx" ON "auth"."refresh_tokens" USING "btree" ("instance_id");


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "refresh_tokens_instance_id_user_id_idx" ON "auth"."refresh_tokens" USING "btree" ("instance_id", "user_id");


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "refresh_tokens_parent_idx" ON "auth"."refresh_tokens" USING "btree" ("parent");


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "refresh_tokens_session_id_revoked_idx" ON "auth"."refresh_tokens" USING "btree" ("session_id", "revoked");


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "refresh_tokens_updated_at_idx" ON "auth"."refresh_tokens" USING "btree" ("updated_at" DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "saml_providers_sso_provider_id_idx" ON "auth"."saml_providers" USING "btree" ("sso_provider_id");


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "saml_relay_states_created_at_idx" ON "auth"."saml_relay_states" USING "btree" ("created_at" DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "saml_relay_states_for_email_idx" ON "auth"."saml_relay_states" USING "btree" ("for_email");


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "saml_relay_states_sso_provider_id_idx" ON "auth"."saml_relay_states" USING "btree" ("sso_provider_id");


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "sessions_not_after_idx" ON "auth"."sessions" USING "btree" ("not_after" DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "sessions_oauth_client_id_idx" ON "auth"."sessions" USING "btree" ("oauth_client_id");


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "sessions_user_id_idx" ON "auth"."sessions" USING "btree" ("user_id");


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "sso_domains_domain_idx" ON "auth"."sso_domains" USING "btree" ("lower"("domain"));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "sso_domains_sso_provider_id_idx" ON "auth"."sso_domains" USING "btree" ("sso_provider_id");


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "sso_providers_resource_id_idx" ON "auth"."sso_providers" USING "btree" ("lower"("resource_id"));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "sso_providers_resource_id_pattern_idx" ON "auth"."sso_providers" USING "btree" ("resource_id" "text_pattern_ops");


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "unique_phone_factor_per_user" ON "auth"."mfa_factors" USING "btree" ("user_id", "phone");


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "user_id_created_at_idx" ON "auth"."sessions" USING "btree" ("user_id", "created_at");


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "users_email_partial_key" ON "auth"."users" USING "btree" ("email") WHERE ("is_sso_user" = false);


--
-- Name: INDEX "users_email_partial_key"; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX "auth"."users_email_partial_key" IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "users_instance_id_email_idx" ON "auth"."users" USING "btree" ("instance_id", "lower"(("email")::"text"));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "users_instance_id_idx" ON "auth"."users" USING "btree" ("instance_id");


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "users_is_anonymous_idx" ON "auth"."users" USING "btree" ("is_anonymous");


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "webauthn_challenges_expires_at_idx" ON "auth"."webauthn_challenges" USING "btree" ("expires_at");


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "webauthn_challenges_user_id_idx" ON "auth"."webauthn_challenges" USING "btree" ("user_id");


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX "webauthn_credentials_credential_id_key" ON "auth"."webauthn_credentials" USING "btree" ("credential_id");


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX "webauthn_credentials_user_id_idx" ON "auth"."webauthn_credentials" USING "btree" ("user_id");


--
-- Name: idx_agents_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_agents_email" ON "public"."agents" USING "btree" ("email");


--
-- Name: idx_agents_search; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_agents_search" ON "public"."agents" USING "gin" ("search_vector");


--
-- Name: idx_featured_properties_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_featured_properties_order" ON "public"."featured_properties" USING "btree" ("display_order");


--
-- Name: idx_form_configs_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_form_configs_key" ON "public"."form_configs" USING "btree" ("form_key");


--
-- Name: idx_form_submissions_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_form_submissions_created" ON "public"."form_submissions" USING "btree" ("created_at");


--
-- Name: idx_form_submissions_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_form_submissions_status" ON "public"."form_submissions" USING "btree" ("status");


--
-- Name: idx_form_submissions_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_form_submissions_type" ON "public"."form_submissions" USING "btree" ("form_type");


--
-- Name: idx_media_library_tags; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_media_library_tags" ON "public"."media_library" USING "gin" ("tags");


--
-- Name: idx_media_library_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_media_library_type" ON "public"."media_library" USING "btree" ("media_type");


--
-- Name: idx_navigation_has_dropdown; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_navigation_has_dropdown" ON "public"."navigation_items" USING "btree" ("has_dropdown") WHERE ("has_dropdown" = true);


--
-- Name: idx_navigation_items_location; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_navigation_items_location" ON "public"."navigation_items" USING "btree" ("menu_location");


--
-- Name: idx_navigation_items_parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_navigation_items_parent" ON "public"."navigation_items" USING "btree" ("parent_id");


--
-- Name: idx_newsletter_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_newsletter_email" ON "public"."newsletter_subscribers" USING "btree" ("email");


--
-- Name: idx_page_meta_path; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_page_meta_path" ON "public"."page_meta" USING "btree" ("page_path");


--
-- Name: idx_page_sections_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_page_sections_active" ON "public"."page_sections" USING "btree" ("is_active");


--
-- Name: idx_page_sections_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_page_sections_order" ON "public"."page_sections" USING "btree" ("order_index");


--
-- Name: idx_page_sections_page; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_page_sections_page" ON "public"."page_sections" USING "btree" ("page");


--
-- Name: idx_properties_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_category" ON "public"."properties" USING "btree" ("category");


--
-- Name: idx_properties_city; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_city" ON "public"."properties" USING "btree" ("city");


--
-- Name: idx_properties_is_featured; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_is_featured" ON "public"."properties" USING "btree" ("is_featured");


--
-- Name: idx_properties_listing_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_listing_type" ON "public"."properties" USING "btree" ("listing_type");


--
-- Name: idx_properties_price; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_price" ON "public"."properties" USING "btree" ("price");


--
-- Name: idx_properties_search; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_search" ON "public"."properties" USING "gin" ("search_vector");


--
-- Name: idx_properties_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_slug" ON "public"."properties" USING "btree" ("slug");


--
-- Name: idx_properties_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_properties_status" ON "public"."properties" USING "btree" ("status");


--
-- Name: idx_site_config_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_site_config_category" ON "public"."site_config" USING "btree" ("category");


--
-- Name: idx_site_config_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_site_config_key" ON "public"."site_config" USING "btree" ("key");


--
-- Name: idx_site_statistics_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_site_statistics_active" ON "public"."site_statistics" USING "btree" ("is_active");


--
-- Name: idx_site_statistics_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_site_statistics_category" ON "public"."site_statistics" USING "btree" ("category");


--
-- Name: idx_tabs_items_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_tabs_items_order" ON "public"."tabs_items" USING "btree" ("order_index");


--
-- Name: idx_tabs_items_section; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "idx_tabs_items_section" ON "public"."tabs_items" USING "btree" ("section_id");


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX "ix_realtime_subscription_entity" ON "realtime"."subscription" USING "btree" ("entity");


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX "messages_inserted_at_topic_index" ON ONLY "realtime"."messages" USING "btree" ("inserted_at" DESC, "topic") WHERE (("extension" = 'broadcast'::"text") AND ("private" IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_key; Type: INDEX; Schema: realtime; Owner: -
--

CREATE UNIQUE INDEX "subscription_subscription_id_entity_filters_action_filter_key" ON "realtime"."subscription" USING "btree" ("subscription_id", "entity", "filters", "action_filter");


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX "bname" ON "storage"."buckets" USING "btree" ("name");


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX "bucketid_objname" ON "storage"."objects" USING "btree" ("bucket_id", "name");


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX "buckets_analytics_unique_name_idx" ON "storage"."buckets_analytics" USING "btree" ("name") WHERE ("deleted_at" IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX "idx_multipart_uploads_list" ON "storage"."s3_multipart_uploads" USING "btree" ("bucket_id", "key", "created_at");


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX "idx_objects_bucket_id_name" ON "storage"."objects" USING "btree" ("bucket_id", "name" COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX "idx_objects_bucket_id_name_lower" ON "storage"."objects" USING "btree" ("bucket_id", "lower"("name") COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX "name_prefix_search" ON "storage"."objects" USING "btree" ("name" "text_pattern_ops");


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX "vector_indexes_name_bucket_id_idx" ON "storage"."vector_indexes" USING "btree" ("name", "bucket_id");


--
-- Name: agents agents_search_vector_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "agents_search_vector_trigger" BEFORE INSERT OR UPDATE ON "public"."agents" FOR EACH ROW EXECUTE FUNCTION "public"."agents_search_vector_update"();


--
-- Name: properties properties_search_vector_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "properties_search_vector_trigger" BEFORE INSERT OR UPDATE ON "public"."properties" FOR EACH ROW EXECUTE FUNCTION "public"."properties_search_vector_update"();


--
-- Name: agents update_agents_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "update_agents_updated_at" BEFORE UPDATE ON "public"."agents" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();


--
-- Name: page_sections update_page_sections_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "update_page_sections_updated_at" BEFORE UPDATE ON "public"."page_sections" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();


--
-- Name: properties update_properties_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "update_properties_updated_at" BEFORE UPDATE ON "public"."properties" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: -
--

CREATE TRIGGER "tr_check_filters" BEFORE INSERT OR UPDATE ON "realtime"."subscription" FOR EACH ROW EXECUTE FUNCTION "realtime"."subscription_check_filters"();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER "enforce_bucket_name_length_trigger" BEFORE INSERT OR UPDATE OF "name" ON "storage"."buckets" FOR EACH ROW EXECUTE FUNCTION "storage"."enforce_bucket_name_length"();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER "protect_buckets_delete" BEFORE DELETE ON "storage"."buckets" FOR EACH STATEMENT EXECUTE FUNCTION "storage"."protect_delete"();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER "protect_objects_delete" BEFORE DELETE ON "storage"."objects" FOR EACH STATEMENT EXECUTE FUNCTION "storage"."protect_delete"();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER "update_objects_updated_at" BEFORE UPDATE ON "storage"."objects" FOR EACH ROW EXECUTE FUNCTION "storage"."update_updated_at_column"();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."identities"
    ADD CONSTRAINT "identities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_amr_claims"
    ADD CONSTRAINT "mfa_amr_claims_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "auth"."sessions"("id") ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_challenges"
    ADD CONSTRAINT "mfa_challenges_auth_factor_id_fkey" FOREIGN KEY ("factor_id") REFERENCES "auth"."mfa_factors"("id") ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."mfa_factors"
    ADD CONSTRAINT "mfa_factors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_authorizations"
    ADD CONSTRAINT "oauth_authorizations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "auth"."oauth_clients"("id") ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_authorizations"
    ADD CONSTRAINT "oauth_authorizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_consents"
    ADD CONSTRAINT "oauth_consents_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "auth"."oauth_clients"("id") ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."oauth_consents"
    ADD CONSTRAINT "oauth_consents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."one_time_tokens"
    ADD CONSTRAINT "one_time_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "auth"."sessions"("id") ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."saml_providers"
    ADD CONSTRAINT "saml_providers_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."saml_relay_states"
    ADD CONSTRAINT "saml_relay_states_flow_state_id_fkey" FOREIGN KEY ("flow_state_id") REFERENCES "auth"."flow_state"("id") ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."saml_relay_states"
    ADD CONSTRAINT "saml_relay_states_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."sessions"
    ADD CONSTRAINT "sessions_oauth_client_id_fkey" FOREIGN KEY ("oauth_client_id") REFERENCES "auth"."oauth_clients"("id") ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."sessions"
    ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."sso_domains"
    ADD CONSTRAINT "sso_domains_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."webauthn_challenges"
    ADD CONSTRAINT "webauthn_challenges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY "auth"."webauthn_credentials"
    ADD CONSTRAINT "webauthn_credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: admin_users admin_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: featured_properties featured_properties_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."featured_properties"
    ADD CONSTRAINT "featured_properties_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE CASCADE;


--
-- Name: media_library media_library_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."media_library"
    ADD CONSTRAINT "media_library_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "auth"."users"("id");


--
-- Name: navigation_items navigation_items_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."navigation_items"
    ADD CONSTRAINT "navigation_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE CASCADE;


--
-- Name: page_sections page_sections_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page_sections"
    ADD CONSTRAINT "page_sections_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."component_templates"("id");


--
-- Name: stories_items stories_items_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."stories_items"
    ADD CONSTRAINT "stories_items_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."page_sections"("id") ON DELETE CASCADE;


--
-- Name: tabs_items tabs_items_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."tabs_items"
    ADD CONSTRAINT "tabs_items_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."page_sections"("id") ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."objects"
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets"("id");


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads"
    ADD CONSTRAINT "s3_multipart_uploads_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets"("id");


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads_parts"
    ADD CONSTRAINT "s3_multipart_uploads_parts_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets"("id");


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads_parts"
    ADD CONSTRAINT "s3_multipart_uploads_parts_upload_id_fkey" FOREIGN KEY ("upload_id") REFERENCES "storage"."s3_multipart_uploads"("id") ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY "storage"."vector_indexes"
    ADD CONSTRAINT "vector_indexes_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets_vectors"("id");


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."audit_log_entries" ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."flow_state" ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."identities" ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."instances" ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."mfa_amr_claims" ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."mfa_challenges" ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."mfa_factors" ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."one_time_tokens" ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."refresh_tokens" ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."saml_providers" ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."saml_relay_states" ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."schema_migrations" ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."sessions" ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."sso_domains" ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."sso_providers" ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE "auth"."users" ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletters Admin write access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admin write access" ON "public"."newsletters" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: stories_items Admin write access stories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admin write access stories" ON "public"."stories_items" USING (("auth"."role"() = 'authenticated'::"text"));


--
-- Name: form_configs Admins access form_configs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins access form_configs" ON "public"."form_configs" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: media_library Admins access media_library; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins access media_library" ON "public"."media_library" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: navigation_items Admins access navigation_items; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins access navigation_items" ON "public"."navigation_items" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: page_meta Admins access page_meta; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins access page_meta" ON "public"."page_meta" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: site_config Admins access site_config; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins access site_config" ON "public"."site_config" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: site_statistics Admins access site_statistics; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins access site_statistics" ON "public"."site_statistics" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: properties Admins can do everything with properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can do everything with properties" ON "public"."properties" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: agents Admins can manage agents; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage agents" ON "public"."agents" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: featured_properties Admins can manage featured properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage featured properties" ON "public"."featured_properties" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: page_sections Admins can manage page sections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage page sections" ON "public"."page_sections" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: tabs_items Admins can manage tabs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage tabs" ON "public"."tabs_items" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: component_templates Admins can manage templates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage templates" ON "public"."component_templates" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: newsletter_subscribers Admins can view and manage subscribers; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view and manage subscribers" ON "public"."newsletter_subscribers" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"()))));


--
-- Name: newsletter_subscribers Anyone can subscribe to newsletter; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can subscribe to newsletter" ON "public"."newsletter_subscribers" FOR INSERT WITH CHECK (true);


--
-- Name: admin_users Authenticated users can manage admin users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can manage admin users" ON "public"."admin_users" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));


--
-- Name: admin_users Authenticated users can view admin users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view admin users" ON "public"."admin_users" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));


--
-- Name: form_submissions Public can submit forms; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can submit forms" ON "public"."form_submissions" FOR INSERT WITH CHECK (true);


--
-- Name: agents Public can view active agents; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active agents" ON "public"."agents" FOR SELECT USING (("is_active" = true));


--
-- Name: page_sections Public can view active page sections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active page sections" ON "public"."page_sections" FOR SELECT USING (("is_active" = true));


--
-- Name: properties Public can view active properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active properties" ON "public"."properties" FOR SELECT USING (("status" = 'active'::"text"));


--
-- Name: tabs_items Public can view active tabs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active tabs" ON "public"."tabs_items" FOR SELECT USING (("is_active" = true));


--
-- Name: component_templates Public can view active templates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active templates" ON "public"."component_templates" FOR SELECT USING (("is_active" = true));


--
-- Name: featured_properties Public can view featured properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view featured properties" ON "public"."featured_properties" FOR SELECT USING (true);


--
-- Name: newsletters Public read access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access" ON "public"."newsletters" FOR SELECT USING (true);


--
-- Name: media_library Public read access media_library; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access media_library" ON "public"."media_library" FOR SELECT USING (true);


--
-- Name: navigation_items Public read access navigation_items; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access navigation_items" ON "public"."navigation_items" FOR SELECT USING (("is_active" = true));


--
-- Name: page_meta Public read access page_meta; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access page_meta" ON "public"."page_meta" FOR SELECT USING (true);


--
-- Name: site_config Public read access site_config; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access site_config" ON "public"."site_config" FOR SELECT USING (true);


--
-- Name: site_statistics Public read access site_statistics; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access site_statistics" ON "public"."site_statistics" FOR SELECT USING (("is_active" = true));


--
-- Name: stories_items Public read access stories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read access stories" ON "public"."stories_items" FOR SELECT USING (true);


--
-- Name: admin_users Users can view their own admin record; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own admin record" ON "public"."admin_users" FOR SELECT USING (("auth"."uid"() = "id"));


--
-- Name: admin_users; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."admin_users" ENABLE ROW LEVEL SECURITY;

--
-- Name: agents; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."agents" ENABLE ROW LEVEL SECURITY;

--
-- Name: component_templates; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."component_templates" ENABLE ROW LEVEL SECURITY;

--
-- Name: featured_properties; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."featured_properties" ENABLE ROW LEVEL SECURITY;

--
-- Name: form_configs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."form_configs" ENABLE ROW LEVEL SECURITY;

--
-- Name: form_submissions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."form_submissions" ENABLE ROW LEVEL SECURITY;

--
-- Name: media_library; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."media_library" ENABLE ROW LEVEL SECURITY;

--
-- Name: navigation_items; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."navigation_items" ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletter_subscribers; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."newsletter_subscribers" ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletters; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."newsletters" ENABLE ROW LEVEL SECURITY;

--
-- Name: page_meta; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."page_meta" ENABLE ROW LEVEL SECURITY;

--
-- Name: page_sections; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."page_sections" ENABLE ROW LEVEL SECURITY;

--
-- Name: properties; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."properties" ENABLE ROW LEVEL SECURITY;

--
-- Name: site_config; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."site_config" ENABLE ROW LEVEL SECURITY;

--
-- Name: site_statistics; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."site_statistics" ENABLE ROW LEVEL SECURITY;

--
-- Name: stories_items; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."stories_items" ENABLE ROW LEVEL SECURITY;

--
-- Name: tabs_items; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE "public"."tabs_items" ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: -
--

ALTER TABLE "realtime"."messages" ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Admin Delete Agent Photos; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Admin Delete Agent Photos" ON "storage"."objects" FOR DELETE USING ((("bucket_id" = 'agent-photos'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"())))));


--
-- Name: objects Admin Delete Property Images; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Admin Delete Property Images" ON "storage"."objects" FOR DELETE USING ((("bucket_id" = 'property-images'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"())))));


--
-- Name: objects Admin Delete Videos; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Admin Delete Videos" ON "storage"."objects" FOR DELETE USING ((("bucket_id" = 'videos'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"())))));


--
-- Name: objects Admin Upload Agent Photos; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Admin Upload Agent Photos" ON "storage"."objects" FOR INSERT WITH CHECK ((("bucket_id" = 'agent-photos'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"())))));


--
-- Name: objects Admin Upload Property Images; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Admin Upload Property Images" ON "storage"."objects" FOR INSERT WITH CHECK ((("bucket_id" = 'property-images'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"())))));


--
-- Name: objects Admin Upload Videos; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Admin Upload Videos" ON "storage"."objects" FOR INSERT WITH CHECK ((("bucket_id" = 'videos'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."id" = "auth"."uid"())))));


--
-- Name: objects Public Access; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Public Access" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'property-images'::"text"));


--
-- Name: objects Public Access Agent Photos; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Public Access Agent Photos" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'agent-photos'::"text"));


--
-- Name: objects Public Access Agents; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Public Access Agents" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'agent-photos'::"text"));


--
-- Name: objects Public Access Property Images; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Public Access Property Images" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'property-images'::"text"));


--
-- Name: objects Public Access Videos; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Public Access Videos" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'videos'::"text"));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."buckets" ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."buckets_analytics" ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."buckets_vectors" ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."migrations" ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."objects" ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."s3_multipart_uploads" ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."s3_multipart_uploads_parts" ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE "storage"."vector_indexes" ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION "supabase_realtime" WITH (publish = 'insert, update, delete, truncate');


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER "issue_graphql_placeholder" ON "sql_drop"
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION "extensions"."set_graphql_placeholder"();


--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER "issue_pg_cron_access" ON "ddl_command_end"
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION "extensions"."grant_pg_cron_access"();


--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER "issue_pg_graphql_access" ON "ddl_command_end"
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION "extensions"."grant_pg_graphql_access"();


--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER "issue_pg_net_access" ON "ddl_command_end"
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION "extensions"."grant_pg_net_access"();


--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER "pgrst_ddl_watch" ON "ddl_command_end"
   EXECUTE FUNCTION "extensions"."pgrst_ddl_watch"();


--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER "pgrst_drop_watch" ON "sql_drop"
   EXECUTE FUNCTION "extensions"."pgrst_drop_watch"();


--
-- PostgreSQL database dump complete
--

\unrestrict N0gZUEU8d02k8U5KQVlmeSSljqZW6jRLDsk9rOPNa0nCzlbAGOb2WNMIQmkkBSa

