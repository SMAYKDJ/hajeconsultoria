
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const MetricsView: React.FC = () => {
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
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="font-display text-2xl font-black dark:text-white uppercase tracking-tighter">
              Business <span className="text-primary">Intelligence.</span>
           </h1>
           <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Haje Consultoria • Analítico</div>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleExport}
             className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm font-black uppercase flex items-center gap-2"
             aria-label="Exportar dados de métricas"
           >
              <span className="material-icons-outlined text-base" aria-hidden="true">download</span> Exportar
           </button>
           <button 
             onClick={handleSyncAI}
             className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-black uppercase flex items-center gap-2 shadow-lg shadow-primary/20"
             aria-label="Sincronizar IA para atualizar métricas"
           >
              <span className="material-icons-outlined text-base" aria-hidden="true">bolt</span> Sincronizar IA
           </button>
        </div>
      </header>

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
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
           <h3 className="text-base font-black uppercase tracking-widest mb-6 flex items-center gap-2 dark:text-white">
              <span className="material-icons-outlined text-primary text-lg" aria-hidden="true">bar_chart</span>
              Acessos por Dia
           </h3>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                    <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="accesses" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
           <h3 className="text-base font-black uppercase tracking-widest mb-6 dark:text-white">Distribuição Setor</h3>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                       {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 space-y-2">
              {pieData.map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} aria-hidden="true" />
                       {item.name}
                    </span>
                    <span className="dark:text-white">{item.value}%</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <section className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20 relative overflow-hidden">
         <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white" aria-hidden="true"><span className="material-icons-outlined text-xl">smart_toy</span></div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight dark:text-white">Predição de Engajamento <span className="text-primary bg-primary/20 px-2 py-0.5 rounded ml-2">IA</span></h2>
         </div>
         <p className="text-base text-slate-500 dark:text-slate-300 leading-relaxed max-w-3xl">
            Nossa IA projeta um crescimento de <span className="font-black text-slate-900 dark:text-white">15% no engajamento</span> para o próximo mês. Recomendamos antecipar a liberação da trilha avançada para a filial Matriz.
         </p>
         <button 
            onClick={handleGenerateReport}
            className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-lg text-sm uppercase shadow-lg shadow-primary/20"
            aria-label="Gerar relatório de predição de engajamento"
         >
            Gerar Relatório
         </button>
      </section>
    </div>
  );
};
