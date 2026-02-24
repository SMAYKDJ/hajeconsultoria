import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hmunxyfmrtrqvxabonsi.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdW54eWZtcnRycXZ4YWJvbnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODE0OTgsImV4cCI6MjA4NzA1NzQ5OH0.YcjuINADrHlMonAnzzstqoHClqwexkMcfSQJ1UUE5f0';

export const supabase = createClient(supabaseUrl, supabaseKey);
