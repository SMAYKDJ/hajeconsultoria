import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmunxyfmrtrqvxabonsi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdW54eWZtcnRycXZ4YWJvbnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODE0OTgsImV4cCI6MjA4NzA1NzQ5OH0.YcjuINADrHlMonAnzzstqoHClqwexkMcfSQJ1UUE5f0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'gestor@haje.com',
        password: 'password123'
    });
    console.log("Login Result:", error ? error.message : "SUCCESS!");
}

testLogin();
