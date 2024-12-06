-- Create the verify_super_admin_role function
CREATE OR REPLACE FUNCTION public.verify_super_admin_role(user_id UUID)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    is_super_admin BOOLEAN;
BEGIN
    -- Check if the user exists and is a super admin
    SELECT EXISTS (
        SELECT 1
        FROM user_profiles
        WHERE id = user_id
        AND role = 'super_admin'
        AND id IN (
            -- Verify against authorized super admin list
            SELECT id FROM user_profiles
            WHERE email IN (
                'joel@arcanaconcept.com',
                'alex@arcanaconcept.com',
                'morgan@arcanaconcept.com'
            )
            AND role = 'super_admin'
        )
    ) INTO is_super_admin;

    RETURN is_super_admin;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.verify_super_admin_role(UUID) TO authenticated;

-- Add RLS policy for super admin verification
CREATE POLICY "Allow users to verify their own super admin status"
    ON user_profiles
    FOR SELECT
    TO authenticated
    USING (
        auth.uid() = id
        AND role = 'super_admin'
    ); 