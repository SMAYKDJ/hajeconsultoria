import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmunxyfmrtrqvxabonsi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdW54eWZtcnRycXZ4YWJvbnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODE0OTgsImV4cCI6MjA4NzA1NzQ5OH0.YcjuINADrHlMonAnzzstqoHClqwexkMcfSQJ1UUE5f0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const users = [
        { email: 'especialistahaje@haje.com', password: 'password123', meta: { name: 'ESPECIALISTA', role: 'ESPECIALISTA', level: 10, xp: 50000, branch: 'Consultoria Live', store_id: 'store_001' } },
        { email: 'admhaje@haje.com', password: 'password123', meta: { name: 'ADM', role: 'ADM', level: 99, xp: 999999, branch: 'Sede Neural', store_id: 'store_001' } }
    ];

    for (const u of users) {
        const { data, error } = await supabase.auth.signUp({
            email: u.email,
            password: u.password,
            options: {
                data: u.meta
            }
        });
        console.log(`Signed up ${u.email}:`, error ? error.message : 'Success');
    }
}

main();
