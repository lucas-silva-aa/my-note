import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rtrbdqgtonbcuhuqxhlv.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cmJkcWd0b25iY3VodXF4aGx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTcyMzM3NCwiZXhwIjoyMDc1Mjk5Mzc0fQ.qFf4xM5ipWg-8o673EjM6fKHcvjIq1sLS4KYCOxLJ-A";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default supabaseAdmin;
