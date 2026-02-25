import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmunxyfmrtrqvxabonsi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdW54eWZtcnRycXZ4YWJvbnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODE0OTgsImV4cCI6MjA4NzA1NzQ5OH0.YcjuINADrHlMonAnzzstqoHClqwexkMcfSQJ1UUE5f0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const users = [
        { email: 'aluno@haje.com', password: 'password123', meta: { name: 'ALUNO', role: 'ALUNO', level: 4, xp: 3250 } },
        { email: 'gestor@haje.com', password: 'password123', meta: { name: 'GESTOR', role: 'GESTOR', level: 5, xp: 8000, branch: 'Matriz São Paulo' } },
        { email: 'especialista@haje.com', password: 'password123', meta: { name: 'ESPECIALISTA', role: 'ESPECIALISTA', level: 10, xp: 50000 } },
        { email: 'adm@haje.com', password: 'password123', meta: { name: 'ADM', role: 'ADM', level: 99, xp: 999999, branch: 'Sede Neural' } }
    ];

    for (const u of users) {
        // Sign up creates the user. If they already exist, it will just fail or return an error
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
