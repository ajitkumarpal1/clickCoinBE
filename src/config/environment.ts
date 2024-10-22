
interface Environment {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    // Add other environment variables as needed
  }
  
  const environment: Environment = {
    SUPABASE_URL: process.env.SUPABASE_URL || 'https://qsmreturqldqiwoudjdi.supabase.co',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbXJldHVycWxkcWl3b3VkamRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTU5MDg0MiwiZXhwIjoyMDQ1MTY2ODQyfQ.B_lRvcxxXzwjBjflcMNw5XOBD6e3E6XqKm1iymwMmE8',
  };
  
  export default environment;
  