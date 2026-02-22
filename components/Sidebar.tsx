
import React from 'react';
import { ViewType, User } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  user: User | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user, onLogout }) => {
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['ESPECIALISTA', 'GESTOR', 'ALUNO', 'ADM'] },
    { id: 'live-consultancy', label: 'Consultoria Live', icon: 'record_voice_over', badge: 'NOVO', roles: ['ESPECIALISTA', 'ADM'] },
    { id: 'studio-ia', label: 'Studio Neural', icon: 'auto_awesome', roles: ['ESPECIALISTA', 'ADM'] },
    { id: 'training', label: 'Academia', icon: 'school', roles: ['ESPECIALISTA', 'GESTOR', 'ALUNO', 'ADM'] },
    { id: 'support', label: 'Suporte', icon: 'support_agent', roles: ['ESPECIALISTA', 'GESTOR', 'ALUNO', 'ADM'] },
    { id: 'users', label: 'Talentos', icon: 'group', roles: ['ESPECIALISTA', 'GESTOR', 'ADM'] },
    { id: 'metrics', label: 'Métricas', icon: 'analytics', roles: ['ESPECIALISTA', 'GESTOR', 'ADM'] },
    { id: 'rewards', label: 'Conquistas', icon: 'military_tech', roles: ['ESPECIALISTA', 'GESTOR', 'ALUNO', 'ADM'] },
  ];

  const filteredNavItems = allNavItems.filter(item =>
    user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-background-dark z-40 shrink-0">
      <div className="p-8 flex flex-col items-center">
        <div className="mb-10 group cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="text-primary font-display font-black text-3xl tracking-tighter group-hover:scale-110 transition-transform">HAJE</div>
          <div className="h-1 w-full bg-primary/20 mt-1 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/2 group-hover:w-full transition-all duration-700"></div>
          </div>
        </div>

        <nav className="w-full space-y-1.5">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewType)}
              className={`w-full flex items-center space-x-3 p-3.5 rounded-2xl transition-all duration-300 group relative ${currentView === item.id
                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark'
                }`}
            >
              <span className={`material-icons-round text-xl ${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
                {item.icon}
              </span>
              <span className="text-xs uppercase tracking-[0.1em] font-black text-left flex-1">
                {item.label}
              </span>
              {item.badge && (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${currentView === item.id ? 'bg-white text-primary' : 'bg-primary text-white animate-pulse'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-3">
        {user && (
          <div className="p-4 bg-slate-50 dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase">Nível {user.level}</span>
              <span className="text-[10px] font-black text-primary">{user.xp} XP</span>
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${(user.xp % 5000) / 50}%` }}></div>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition group"
        >
          <span className="material-icons-round text-lg">logout</span>
          <span className="text-[10px] uppercase font-black tracking-widest">Encerrar Sessão</span>
        </button>

        <button
          onClick={() => alert('Sistema Haje Cloud v2.4 Ativo')}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-slate-400 hover:text-primary transition group"
        >
          <span className="material-icons-round text-lg">settings</span>
          <span className="text-[10px] uppercase font-black tracking-widest">Sistemas</span>
        </button>
      </div>
    </aside>
  );
};
