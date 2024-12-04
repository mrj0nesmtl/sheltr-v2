import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://oinjrlzucizztdstagqg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbmpybHp1Y2l6enRkc3RhZ3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4ODkwODcsImV4cCI6MjA0NDQ2NTA4N30.XPKa2Zhse4_KZRSuHfwaqBo0A9QezPhWdPLezI67zdk';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);