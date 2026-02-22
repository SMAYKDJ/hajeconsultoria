import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
import { ProgressBar } from '../components/ProgressBar';
import { User } from '../types';

interface MetricsViewProps {
   user: User | null;
   onAIAnalysis?: (context: string) => void;
}

export const MetricsView: React.FC<MetricsViewProps> = ({ user, onAIAnalysis }) => {
   const isGestor = user?.role === 'GESTOR';

   // Dados mockados com predição neural
   const data = [
      { name: 'SEG', accesses: 400, trend: 400 },
      { name: 'TER', accesses: 300, trend: 350 },
      { name: 'QUA', accesses: 500, trend: 420 },
      { name: 'QUI', accesses: 280, trend: 380 },
      { name: 'SEX', accesses: 590, trend: 500 },
      { name: 'SAB', accesses: 180, trend: 450 },
      { name: 'DOM', accesses: 120, trend: 480 },
      // Predição futura (48h)
      { name: 'SEG*', trend: 520 },
      { name: 'TER*', trend: 550 },
   ];

   const pieData = [
      { name: 'Adm', value: 45, color: '#F59E0B' },
      { name: 'Fin', value: 30, color: '#3B82F6' },
      { name: 'Ops', value: 25, color: '#10B981' },
   ];

   // Dados mockados para funcionários da loja do gestor
   const employees = [
      {
         id: '1',
         name: 'João Silva',
         role: 'Atendente',
         filial: 'Matriz SP',
         progress: 85,
         module: 'Vendas Avançadas',
         dailyAccess: 5,
         weeklyAccess: 32,
         monthlyAccess: 140,
         avgTime: '42min',
         joined: '12/01/2026'
      },
      {
         id: '2',
         name: 'Maria Santos',
         role: 'Vendedora',
         filial: 'Matriz SP',
         progress: 42,
         module: 'Atendimento Neural',
         dailyAccess: 3,
         weeklyAccess: 15,
         monthlyAccess: 58,
         avgTime: '28min',
         joined: '05/02/2026'
      },
      {
         id: '3',
         name: 'Pedro Costa',
         role: 'Estoquista',
         filial: 'Matriz SP',
         progress: 100,
         module: 'Concluído',
         dailyAccess: 2,
         weeklyAccess: 10,
         monthlyAccess: 40,
         avgTime: '15min',
         joined: '20/12/2025'
      },
   ];

   const handleAIAnalysisClick = () => {
      if (!onAIAnalysis) return;

      const context = `Análise de Unidade Haje 2026:
      - Filial: ${user?.branch || 'Geral'}
      - Engajamento: 84% (Meta 90%)
      - Funcionários Pendentes: Maria Santos (42% progresso)
      - Destaque: João Silva (85% progresso, 140 acessos mensais)
      - Tendência: Crescimento de 12% semana passsada.
      Solicitação: Crie um plano de incentivo personalizado para Maria Santos e um roteiro de mentoria para João Silva baseado nesses dados.`;

      onAIAnalysis(context);
   };

   const handleExport = () => alert('Exportando dados...');
   const handleSyncAI = () => alert('Sincronizando IA para atualização de métricas...');
   const handleGenerateReport = () => alert('Gerando relatório de predição de engajamento...');

   return (
      <div className="p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn pb-20">
         <header className="flex justify-between items-center">
            <div>
               <h1 className="font-display text-2xl font-black dark:text-white uppercase tracking-tighter">
                  {isGestor ? 'Controle da' : 'Business'} <span className="text-primary">{isGestor ? 'UNIDADE.' : 'Intelligence.'}</span>
               </h1>
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {isGestor ? `Filial: ${user?.branch || 'Sua Loja'}` : 'Haje Consultoria • Analítico'}
               </div>
            </div>
            <div className="flex gap-2">
               <button
                  onClick={handleExport}
                  className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm font-black uppercase flex items-center gap-2 dark:text-white hover:bg-slate-50 transition-colors shadow-sm"
               >
                  <span className="material-icons-outlined text-base">download</span> Exportar
               </button>
               <button
                  onClick={handleAIAnalysisClick}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-black uppercase flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all active:scale-95 animate-pulse"
               >
                  <span className="material-icons-outlined text-base">psychology</span> Diagnóstico Neural
               </button>
            </div>
         </header>

         {isGestor ? (
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Engajamento Semanal</p>
                     <p className="text-3xl font-display font-black text-primary group-hover:scale-105 transition-transform">+84%</p>
                     <p className="text-xs font-bold text-green-500 mt-2 flex items-center gap-1">
                        <span className="material-icons-round text-sm">trending_up</span> ↑ 12% em relação à última semana
                     </p>
                  </div>
                  <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tempo Médio de Estudo</p>
                     <p className="text-3xl font-display font-black dark:text-white">32min</p>
                     <p className="text-xs font-bold text-slate-400 mt-2">Meta: 45min por dia</p>
                  </div>
                  <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Evolução dos Funcionários</p>
                        <span className="text-[10px] font-black text-primary">68%</span>
                     </div>
                     <ProgressBar value={68} />
                  </div>
               </div>

               <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                     <h3 className="text-sm font-black uppercase tracking-widest dark:text-white flex items-center gap-2">
                        <span className="material-icons-round text-primary">people_alt</span> Acompanhamento de Talentos
                     </h3>
                     <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">Filial Automática</span>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50 dark:bg-surface-dark border-b border-slate-100 dark:border-slate-800">
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Funcionário</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargo/Filial</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Acessos (D/S/M)</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Média/Dia</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cadastro</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                           {employees.map(emp => (
                              <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-primary/5 transition-colors">
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                                          <img src={`https://picsum.photos/seed/${emp.id}/100/100`} alt="" className="w-full h-full object-cover" />
                                       </div>
                                       <div>
                                          <p className="text-sm font-black dark:text-white tracking-tight uppercase">{emp.name}</p>
                                          <p className="text-[10px] text-slate-400 font-bold">{emp.module}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <p className="text-xs font-bold dark:text-slate-300">{emp.role}</p>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-tighter">{emp.filial}</p>
                                 </td>
                                 <td className="px-6 py-4 min-w-[150px]">
                                    <div className="flex items-center gap-2">
                                       <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                          <div className="h-full bg-primary" style={{ width: `${emp.progress}%` }} />
                                       </div>
                                       <span className="text-[10px] font-black text-slate-500">{emp.progress}%</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                       <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 p-1 rounded min-w-[20px] text-center dark:text-white">{emp.dailyAccess}</span>
                                       <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 p-1 rounded min-w-[20px] text-center dark:text-white">{emp.weeklyAccess}</span>
                                       <span className="text-[10px] font-black bg-primary/20 text-primary p-1 rounded min-w-[20px] text-center">{emp.monthlyAccess}</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className="text-xs font-black dark:text-white">{emp.avgTime}</span>
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className="text-[10px] font-black text-slate-400 group-hover:text-primary transition-colors">{emp.joined}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                     { label: 'ROI ESTIMADO', value: 'R$ 42.5k', color: 'text-green-500' },
                     { label: 'RETENÇÃO', value: '98.2%', color: 'dark:text-white' },
                     { label: 'VIBE DA EQUIPE', value: 'ALTA', color: 'text-primary' },
                     { label: 'CHAMADOS IA', value: '14', color: 'dark:text-white' }
                  ].map((stat, i) => (
                     <div key={i} className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">{stat.label}</p>
                        <p className={`text-xl font-display font-black ${stat.color}`}>
                           {stat.value}
                        </p>
                     </div>
                  ))}
               </div>

               <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-8 bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base font-black uppercase tracking-widest flex items-center gap-2 dark:text-white">
                           <span className="material-icons-outlined text-primary text-lg">bar_chart</span>
                           Fluxo Neural de Acessos
                        </h3>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                              <span className="text-[8px] font-black text-slate-400 uppercase">Real</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                              <span className="text-[8px] font-black text-slate-400 uppercase">Predição 2026</span>
                           </div>
                        </div>
                     </div>
                     <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} />
                              <Tooltip
                                 cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }}
                                 contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#1C2128', color: '#fff' }}
                              />
                              <Bar dataKey="accesses" fill="#F59E0B" radius={[6, 6, 0, 0]} barSize={40} />
                              <Line type="monotone" dataKey="trend" stroke="#64748B" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#64748B', r: 4 }} />
                           </ComposedChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="col-span-12 lg:col-span-4 bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <h3 className="text-sm font-black uppercase tracking-widest mb-6 dark:text-white">Distribuição por Setor</h3>
                     <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                                 {pieData.map((entry, index) => <Cell key={index} fill={entry.color} stroke="none" />)}
                              </Pie>
                              <Tooltip />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-4 space-y-3">
                        {pieData.map((item, i) => (
                           <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-slate-500 flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                 {item.name}
                              </span>
                              <span className="dark:text-white">{item.value}%</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </>
         )}

         <section className="bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-[32px] border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <span className="material-icons-round text-9xl text-primary">analytics</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30"><span className="material-icons-outlined text-2xl">smart_toy</span></div>
                     <h2 className="font-display text-xl font-black uppercase tracking-tight dark:text-white">Neural Prediction <span className="text-primary bg-primary/20 px-3 py-1 rounded-full ml-2 text-[10px]">Active Engine</span></h2>
                  </div>
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                     {isGestor
                        ? "Sua filial apresenta um desempenho 15% superior à média regional. A IA projeta que você atingirá a meta de 90% de engajamento em 12 dias se mantiver o ritmo atual."
                        : "Nossa IA projeta um crescimento de 15% no engajamento para o próximo mês. O pico de acesso previsto para amanhã é às 14:00."
                     }
                  </p>
               </div>
               <button
                  onClick={handleGenerateReport}
                  className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black py-4 px-10 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95 whitespace-nowrap"
               >
                  Explodir Relatório Strategista
               </button>
            </div>
         </section>
      </div>
   );
};
