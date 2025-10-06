import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rtrbdqgtonbcuhuqxhlv.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cmJkcWd0b25iY3VodXF4aGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MjMzNzQsImV4cCI6MjA3NTI5OTM3NH0.Kvf9HpVP0PhABpFJgmj4LnjWdCvBXVC6dLelGj83p1A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
