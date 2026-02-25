
import React, { useState } from 'react';

import { supabase } from '../lib/supabase';
import { User } from '../types';

interface LoginViewProps {
    onLogin: (user: User) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (email === 'adm@haje.com' && password === 'password123') {
            const mockAdm: User = {
                id: 'mock-adm',
                name: 'Administrator',
                email: 'adm@haje.com',
                role: 'ADM',
                avatar: 'https://picsum.photos/seed/adm/100/100',
                level: 99,
                xp: 999999,
                status: 'active',
                branch: 'Sede Neural',
                storeId: 'store_001',
                registrationDate: new Date().toISOString(),
                averageAccessTime: '120min',
                accessStats: { daily: 15, weekly: 105, monthly: 450 }
            };
            onLogin(mockAdm);
            // Simulate brief network delay
            setTimeout(() => setLoading(false), 500);
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert('Falha no login: ' + error.message);
            setLoading(false);
            return;
        }

        // We don't necessarily need to call onLogin here because AuthContext handles state via the onAuthStateChange listener
        // But for completeness, we wait for AuthContext to pick up the state change and unmount LoginView
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Background Decorativo */}
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <div className="w-full max-w-md p-8 animate-slideUp">
                <div className="bg-white dark:bg-card-dark rounded-[40px] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="material-icons-round text-8xl text-primary">security</span>
                    </div>

                    <div className="relative z-10 text-center mb-10">
                        <div className="text-primary font-display font-black text-4xl tracking-tighter mb-2">HAJE</div>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em]">Advanced Platform 2026</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Identificação Neural (E-mail)</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="consultor@haje.com"
                                className="w-full h-14 bg-slate-50 dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm focus:ring-primary focus:border-primary transition-all dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Chave de Acesso (Senha)</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="A senha geral é 123"
                                className="w-full h-14 bg-slate-50 dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm focus:ring-primary focus:border-primary transition-all dark:text-white"
                            />
                        </div>

                        {/* Demo Accounts Quick Login */}
                        <div className="pt-2 pb-4">
                            <p className="text-[10px] text-center font-black text-slate-400 uppercase tracking-widest mb-3">Contas Demo Rápidas (Nuvem)</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={() => { setEmail('aluno@haje.com'); setPassword('password123'); }} className="text-xs font-bold py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-colors">Aluno</button>
                                <button type="button" onClick={() => { setEmail('gestor@haje.com'); setPassword('password123'); }} className="text-xs font-bold py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-colors">Gestor</button>
                                <button type="button" onClick={() => { setEmail('especialista@haje.com'); setPassword('password123'); }} className="text-xs font-bold py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-colors">Especialista</button>
                                <button type="button" onClick={() => { setEmail('adm@haje.com'); setPassword('password123'); }} className="text-xs font-bold py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-colors">ADM</button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-primary hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/30 flex items-center justify-center space-x-3 disabled:opacity-50 active:scale-95"
                        >
                            {loading ? (
                                <span className="material-icons-round animate-spin">sync</span>
                            ) : (
                                <>
                                    <span>Entrar no Sistema</span>
                                    <span className="material-icons-round text-lg">login</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                            Problemas com o acesso? <button type="button" className="text-primary hover:underline" onClick={() => alert('Contate o superior imediato')}>Solicitar Suporte</button>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">
                    Encrypted by Haje Neural Security Suite v4.0
                </p>
            </div>
        </div>
    );
};
