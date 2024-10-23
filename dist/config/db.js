// src/db.ts
import { createClient } from '@supabase/supabase-js';
// Replace these values with your own Supabase project details
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Please define the SUPABASE_URL and SUPABASE_KEY environment variables');
}
else {
    console.log("okokok");
}
// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Export the Supabase client for use in your application
export default supabase;
//# sourceMappingURL=db.js.map