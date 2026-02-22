import React from 'react';
import { ViewType } from '../types';
import { ProgressBar } from '../components/ProgressBar';

interface DashboardProps {
  setView: (view: ViewType) => void;
  userXp: number;
}

export const DashboardView: React.FC<DashboardProps> = ({ setView, userXp }) => {
  const stats = [
    { label: 'ROI Estimado', value: '12.4x', trend: '↑ 0.8', trendColor: 'text-green-500' },
    { label: 'Taxa de Retenção', value: '94.2%', trend: 'Estável', trendColor: 'text-blue-500' },
    { label: 'Vibe Acadêmica', value: 'Excelente', trend: '3/3', trendColor: 'text-primary' },
    { label: 'Chamados Ativos', value: '14', trend: 'Alta', trendColor: 'text-red-500' },
    { label: 'XP Total', value: userXp.toLocaleString(), trend: 'acumulado', trendColor: 'text-slate-400' },
    { label: 'Projetos Atrasados', value: '03', trend: 'Atenção', trendColor: 'text-red-500', alert: true },
  ];

  const aiRecommendations = [
    { type: 'training', text: 'Conclua o Módulo de Excelência no Atendimento para ganhar 150 XP.', icon: 'school', action: 'Ir para Treinamento', navigateTo: 'training' },
    { type: 'support', text: 'Verifique o Ticket Urgente #7429 de Filipe Balcão.', icon: 'support_agent', action: 'Ver Ticket', navigateTo: 'support' },
    { type: 'user', text: 'Engajamento do usuário "Ana Caixa" em declínio. Considere um contato.', icon: 'group', action: 'Ver Perfil', navigateTo: 'users' },
  ];

  const proactiveAlerts = [
    { type: 'critical', text: 'Taxa de conclusão do Módulo Financeiro abaixo da meta: 60%.', icon: 'warning', color: 'text-red-500', action: 'Ver Módulo', navigateTo: 'training' },
    { type: 'info', text: 'Novo material de apoio disponível para Gestão Estratégica.', icon: 'info', color: 'text-blue-500', action: 'Acessar Material', navigateTo: 'training' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto">
      {/* Ações Rápidas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="material-icons-outlined text-base text-slate-400" aria-hidden="true">bolt</span>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Ações Rápidas</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setView('users')}
            className="bg-primary text-white flex-1 sm:flex-none justify-center px-4 py-3 rounded-xl font-black text-xs uppercase tracking-tight shadow-sm hover:bg-orange-600 transition flex items-center space-x-2"
          >
            <span className="material-icons-outlined text-base">person_add</span>
            <span>Novo</span>
          </button>
          <button
            onClick={() => setView('support')}
            className="bg-primary text-white flex-1 sm:flex-none justify-center px-4 py-3 rounded-xl font-black text-xs uppercase tracking-tight shadow-sm hover:bg-orange-600 transition flex items-center space-x-2"
          >
            <span className="material-icons-outlined text-base">confirmation_number</span>
            <span>Chamado</span>
          </button>
          <button
            onClick={() => setView('metrics')}
            className="bg-primary text-white flex-1 sm:flex-none justify-center px-4 py-3 rounded-xl font-black text-xs uppercase tracking-tight shadow-sm hover:bg-orange-600 transition flex items-center space-x-2"
          >
            <span className="material-icons-outlined text-base">analytics</span>
            <span className="hidden sm:inline">Relatórios</span>
          </button>
        </div>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white dark:bg-card-dark p-4 rounded-2xl border ${stat.alert ? 'border-red-500/30 bg-red-50/5' : 'border-slate-200 dark:border-slate-800'} shadow-sm`}>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-display font-black ${stat.alert ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{stat.value}</span>
              <span className="text-xs font-bold text-slate-400">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recomendações da IA */}
      <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h2 className="text-base font-display font-black text-primary uppercase tracking-wider mb-6 flex items-center">
          <span className="material-icons-outlined mr-2" aria-hidden="true">psychology</span>
          Insights Estratégicos da IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-primary/50 transition">
              <div className="flex items-center space-x-3 mb-3">
                <span className="material-icons-outlined text-lg text-primary">{rec.icon}</span>
                <p className="text-sm font-bold dark:text-white leading-tight">{rec.text}</p>
              </div>
              <button
                onClick={() => setView(rec.navigateTo as ViewType)}
                className="text-sm font-black text-primary hover:underline uppercase text-right"
              >
                {rec.action} <span className="material-icons-outlined text-sm align-bottom">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Status Suporte */}
        <div className="col-span-12 lg:col-span-5 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-display font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
              <span className="material-icons-outlined text-primary mr-2">support_agent</span>
              Fluxo de Suporte
            </h2>
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase">Operando</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs font-black text-slate-400 uppercase mb-1">Fila</p>
              <p className="text-2xl font-display font-black text-primary">06</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs font-black text-slate-400 uppercase mb-1">Ativos</p>
              <p className="text-2xl font-display font-black text-slate-800 dark:text-slate-200">08</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary/20">
                  <img src="https://picsum.photos/seed/vitor/100/100" className="w-full h-full object-cover" alt="Especialista" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase dark:text-white">Victor Consultor</p>
                  <p className="text-xs text-slate-400 font-bold uppercase">Meta Batida</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-primary">98.5%</p>
                <p className="text-xs text-slate-400 font-bold uppercase">CSAT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progresso de Estudo */}
        <div className="col-span-12 lg:col-span-7 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-display font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
              <span className="material-icons-outlined text-primary mr-2">school</span>
              Trilhas de Aprendizado
            </h2>
            <span className="text-xs font-bold text-slate-400">Meta Semanal: 15/12</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5 uppercase">
                <span className="text-slate-500">Módulo Financeiro</span>
                <span className="text-primary">82%</span>
              </div>
              <ProgressBar value={82} height="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5 uppercase">
                <span className="text-slate-500">Gestão Operacional</span>
                <span className="text-primary">64%</span>
              </div>
              <ProgressBar value={64} height="h-2" />
            </div>
            <button
              onClick={() => setView('training')}
              className="w-full bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between mt-6 hover:bg-primary/10 transition group"
            >
              <div>
                <p className="text-xs font-black text-primary uppercase tracking-widest text-left">Resumo Consolidado</p>
                <p className="text-lg font-display font-black dark:text-white">Acessar Academia Haje</p>
              </div>
              <span className="material-icons-outlined text-primary group-hover:translate-x-1 transition">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alertas IA */}
      <div className="bg-red-500/5 dark:bg-red-900/10 border border-red-500/20 rounded-2xl p-6">
        <h2 className="text-base font-display font-black text-red-500 uppercase tracking-wider mb-4 flex items-center">
          <span className="material-icons-outlined mr-2">notifications_active</span>
          Alertas Neural Insight
        </h2>
        <div className="space-y-3">
          {proactiveAlerts.map((alert, idx) => (
            <div key={idx} className="flex items-start justify-between space-x-3">
              <div className="flex items-start space-x-3">
                <span className={`material-icons-outlined text-lg ${alert.color}`}>{alert.icon}</span>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">{alert.text}</p>
              </div>
              <button
                onClick={() => setView(alert.navigateTo as ViewType)}
                className="text-xs font-black text-slate-500 dark:text-slate-400 hover:text-red-500 hover:underline uppercase shrink-0"
              >
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
