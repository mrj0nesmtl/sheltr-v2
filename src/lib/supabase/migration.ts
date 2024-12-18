/**
 * MIGRATION GUIDE
 * 
 * Replace:
 * import { supabase } from '@/lib/supabase'
 * 
 * With:
 * import { supabase, auth, db } from '@/lib/supabase'
 * 
 * Additional utilities available:
 * - getUserProfile
 * - getCurrentSession
 * - validateUserRole
 */

export {
    auth,
    db, getCurrentSession, getUserProfile, supabase, validateUserRole
} from './index';
