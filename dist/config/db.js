// src/db.ts
import { createClient } from '@supabase/supabase-js';
// Replace these values with your own Supabase project details
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qsmreturqldqiwoudjdi.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbXJldHVycWxkcWl3b3VkamRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTU5MDg0MiwiZXhwIjoyMDQ1MTY2ODQyfQ.B_lRvcxxXzwjBjflcMNw5XOBD6e3E6XqKm1iymwMmE8';
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