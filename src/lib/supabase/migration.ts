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
  supabase, 
  auth, 
  db, 
  getUserProfile, 
  getCurrentSession, 
  validateUserRole 
} from './index'; 