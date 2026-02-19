
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User } from '../types';

interface MetricsViewProps {
   user: User | null;
}

export const MetricsView: React.FC<MetricsViewProps> = ({ user }) => {
   const isGestor = user?.role === 'GESTOR';

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

   const data = [
      { name: 'SEG', accesses: 400 },
      { name: 'TER', accesses: 300 },
      { name: 'QUA', accesses: 500 },
      { name: 'QUI', accesses: 280 },
      { name: 'SEX', accesses: 590 },
      { name: 'SAB', accesses: 180 },
      { name: 'DOM', accesses: 120 },
   ];

   const pieData = [
      { name: 'Adm', value: 45, color: '#F59E0B' },
      { name: 'Fin', value: 30, color: '#3B82F6' },
      { name: 'Ops', value: 25, color: '#10B981' },
   ];

   const handleExport = () => alert('Exportando dados...');
   const handleSyncAI = () => alert('Sincronizando IA para atualização de métricas...');
   const handleGenerateReport = () => alert('Gerando relatório de predição de engajamento...');

   return (
      <div className="p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
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
                  onClick={handleSyncAI}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-black uppercase flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all active:scale-95"
               >
                  <span className="material-icons-outlined text-base">bolt</span> Sincronizar IA
               </button>
            </div>
         </header>

         {isGestor ? (
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Engajamento Semanal</p>
                     <p className="text-3xl font-display font-black text-primary">+84%</p>
                     <p className="text-xs font-bold text-green-500 mt-2">↑ 12% em relação à última semana</p>
                  </div>
                  <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tempo Médio de Estudo</p>
                     <p className="text-3xl font-display font-black dark:text-white">32min</p>
                     <p className="text-xs font-bold text-slate-400 mt-2">Meta: 45min por dia</p>
                  </div>
                  <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Evolução dos Funcionários</p>
                     <p className="text-3xl font-display font-black dark:text-white">68%</p>
                     <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-primary w-[68%]" />
                     </div>
                  </div>
               </div>

               <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                     <h3 className="text-sm font-black uppercase tracking-widest dark:text-white">Acompanhamento de Talentos</h3>
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
                                       <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
                                 <td className="px-6 py-4">
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
                  {['ROI ESTIMADO', 'RETENÇÃO', 'VIBE', 'CHAMADOS'].map((label, i) => (
                     <div key={i} className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-sm font-black text-slate-400 tracking-widest uppercase mb-1">{label}</p>
                        <p className={`text-xl font-display font-black ${i === 2 ? 'text-primary' : i === 0 ? 'text-green-500' : 'dark:text-white'}`}>
                           {i === 0 ? 'R$ 42.5k' : i === 1 ? '98.2%' : i === 2 ? 'ALTA' : '14'}
                        </p>
                     </div>
                  ))}
               </div>

               <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-8 bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <h3 className="text-base font-black uppercase tracking-widest mb-6 flex items-center gap-2 dark:text-white">
                        <span className="material-icons-outlined text-primary text-lg">bar_chart</span>
                        Acessos Gerais por Dia
                     </h3>
                     <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} />
                              <Tooltip cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                              <Bar dataKey="accesses" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                           </BarChart>
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

         <section className="bg-primary/5 dark:bg-primary/10 p-8 rounded-[32px] border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <span className="material-icons-round text-9xl text-primary">analytics</span>
            </div>
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30"><span className="material-icons-outlined text-2xl">smart_toy</span></div>
                  <h2 className="font-display text-xl font-black uppercase tracking-tight dark:text-white">Insights Neural <span className="text-primary bg-primary/20 px-3 py-1 rounded-full ml-2 text-xs">Prediction Engine</span></h2>
               </div>
               <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-bold">
                  {isGestor
                     ? "Sua filial apresenta um desempenho 15% superior à média regional. Recomendamos incentivar o funcionário João Silva para o módulo de liderança."
                     : "Nossa IA projeta um crescimento de 15% no engajamento para o próximo mês. Recomendamos antecipar a liberação da trilha avançada."
                  }
               </p>
               <button
                  onClick={handleGenerateReport}
                  className="mt-6 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black py-3 px-8 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
               >
                  Gerar Relatório Estratégico
               </button>
            </div>
         </section>
      </div>
   );
};
