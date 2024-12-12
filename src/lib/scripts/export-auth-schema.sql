-- Export Auth and Public Schema Tables
WITH RECURSIVE tables AS (
    SELECT 
        n.nspname as schema_name,
        c.relname as table_name,
        a.attname as column_name,
        pg_catalog.format_type(a.atttypid, a.atttypmod) as data_type,
        a.attnotnull as is_notnull
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_attribute a ON a.attrelid = c.oid
    WHERE n.nspname IN ('auth', 'public')
    AND c.relkind = 'r'
    AND a.attnum > 0 
    AND NOT a.attisdropped
    AND (
        n.nspname = 'auth' 
        OR (
            n.nspname = 'public' 
            AND c.relname IN (
                'profiles',
                'donor_profiles',
                'shelter_profiles',
                'user_roles',
                'auth_sessions'
            )
        )
    )
)
SELECT format(
    E'-- Schema: %I\n\nCREATE SCHEMA IF NOT EXISTS %I;\n\nCREATE TABLE IF NOT EXISTS %I.%I (\n%s\n);',
    schema_name,
    schema_name,
    schema_name,
    table_name,
    string_agg(
        format(
            '    %I %s%s',
            column_name,
            data_type,
            CASE WHEN is_notnull THEN ' NOT NULL' ELSE '' END
        ),
        E',\n'
        ORDER BY column_name
    )
)
FROM tables
GROUP BY schema_name, table_name;

-- Export Constraints
WITH constraint_columns AS (
    SELECT 
        tc.constraint_schema,
        tc.constraint_name,
        tc.table_schema,
        tc.table_name,
        tc.constraint_type,
        string_agg(kcu.column_name, ', ' ORDER BY kcu.ordinal_position) as columns,
        ccu.table_schema as foreign_table_schema,
        ccu.table_name as foreign_table_name,
        string_agg(ccu.column_name, ', ' ORDER BY kcu.ordinal_position) as foreign_columns
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_schema = kcu.constraint_schema
        AND tc.constraint_name = kcu.constraint_name
    LEFT JOIN information_schema.constraint_column_usage ccu
        ON tc.constraint_schema = ccu.constraint_schema
        AND tc.constraint_name = ccu.constraint_name
    WHERE tc.table_schema IN ('auth', 'public')
    AND (
        tc.table_schema = 'auth'
        OR (
            tc.table_schema = 'public'
            AND tc.table_name IN (
                'profiles',
                'donor_profiles',
                'shelter_profiles',
                'user_roles',
                'auth_sessions'
            )
        )
    )
    GROUP BY 
        tc.constraint_schema,
        tc.constraint_name,
        tc.table_schema,
        tc.table_name,
        tc.constraint_type,
        ccu.table_schema,
        ccu.table_name
)
SELECT format(
    E'\n-- Constraints for %I.%I\n%s',
    table_schema,
    table_name,
    string_agg(
        CASE constraint_type
            WHEN 'PRIMARY KEY' THEN
                format(
                    'ALTER TABLE %I.%I ADD PRIMARY KEY (%s);',
                    table_schema,
                    table_name,
                    columns
                )
            WHEN 'FOREIGN KEY' THEN
                format(
                    'ALTER TABLE %I.%I ADD CONSTRAINT %I FOREIGN KEY (%s) REFERENCES %I.%I (%s);',
                    table_schema,
                    table_name,
                    constraint_name,
                    columns,
                    foreign_table_schema,
                    foreign_table_name,
                    foreign_columns
                )
            ELSE NULL
        END,
        E'\n'
    )
)
FROM constraint_columns
GROUP BY table_schema, table_name;

-- Export RLS Policies
SELECT format(
    E'\n-- RLS Policies for %I.%I\nALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY;\n%s',
    n.nspname,
    c.relname,
    n.nspname,
    c.relname,
    string_agg(
        format(
            'CREATE POLICY %I ON %I.%I FOR %s TO %s USING (%s)%s;',
            pol.polname,
            n.nspname,
            c.relname,
            CASE pol.polcmd
                WHEN 'r' THEN 'SELECT'
                WHEN 'a' THEN 'INSERT'
                WHEN 'w' THEN 'UPDATE'
                WHEN 'd' THEN 'DELETE'
                ELSE 'ALL'
            END,
            CASE 
                WHEN pol.polroles = '{0}' THEN 'public'
                ELSE array_to_string(ARRAY(
                    SELECT rolname 
                    FROM pg_roles 
                    WHERE oid = ANY(pol.polroles)
                ), ', ')
            END,
            pg_get_expr(pol.polqual, pol.polrelid),
            CASE 
                WHEN pol.polwithcheck IS NOT NULL 
                THEN E' WITH CHECK (' || pg_get_expr(pol.polwithcheck, pol.polrelid) || ')'
                ELSE ''
            END
        ),
        E'\n'
    )
)
FROM pg_policy pol
JOIN pg_class c ON c.oid = pol.polrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname IN ('auth', 'public')
GROUP BY n.nspname, c.relname; 