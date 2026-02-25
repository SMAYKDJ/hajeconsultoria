import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmunxyfmrtrqvxabonsi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdW54eWZtcnRycXZ4YWJvbnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODE0OTgsImV4cCI6MjA4NzA1NzQ5OH0.YcjuINADrHlMonAnzzstqoHClqwexkMcfSQJ1UUE5f0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSign() {
    const { data, error } = await supabase.auth.signUp({
        email: 'adm4000@haje.com',
        password: 'password123',
        options: {
            data: { name: 'ADM', role: 'ADM', level: 99, xp: 999999, branch: 'Sede Neural', store_id: 'store_001' }
        }
    });
    console.log("Signup Result ADM:", error ? error.message : "SUCCESS!");
}
testSign();
