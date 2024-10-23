
interface Environment {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    // Add other environment variables as needed
  }
  
  const environment: Environment = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
  };
  
  export default environment;
  