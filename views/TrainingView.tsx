
import React, { useState } from 'react';
import { ViewType } from '../types';

interface TrainingProps {
   addXp: (amount: number) => void;
   userXp: number;
   setView: (view: ViewType) => void;
}

export const TrainingView: React.FC<TrainingProps> = ({ addXp, userXp, setView }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmitActivity = () => {
      setIsSubmitting(true);
      // Simula upload
      setTimeout(() => {
         setIsSubmitting(false);
         addXp(250); // Recompensa real de XP
         alert('Atividade enviada com sucesso! Você ganhou 250 XP.');
      }, 1500);
   };

   const handleModuleClick = (moduleName: string) => {
      alert(`Carregando aula: ${moduleName}`);
   };

   return (
      <div className="flex h-full overflow-hidden bg-background-light dark:bg-background-dark">
         <section className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Cabeçalho de Progresso */}
            <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="flex-1 max-w-xl">
                  <div className="flex justify-between items-end mb-2">
                     <h2 className="text-sm font-black uppercase tracking-widest text-primary">Status Acadêmico: Ativo</h2>
                     <span className="text-xs font-bold text-slate-400 uppercase">Total: {userXp} XP</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[45%]"></div>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <button
                     onClick={() => setView('rewards')}
                     className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 flex items-center space-x-2 hover:bg-primary/20 transition"
                  >
                     <span className="material-icons-outlined text-lg text-primary">workspace_premium</span>
                     <span className="text-sm font-black text-primary">Ver Conquistas</span>
                  </button>
               </div>
            </div>

            {/* Player de Vídeo */}
            <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800 flex items-center justify-center group transition-all duration-500">
               <video
                  controls
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1280&auto=format&fit=crop"
               >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Seu navegador não suporta a tag de vídeo.
               </video>
            </div>

            {/* Detalhes da Aula */}
            <div className="space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                     <div className="flex items-center space-x-3 mb-1">
                        <span className="text-sm font-black text-primary uppercase tracking-widest">Módulo 04: Estratégia</span>
                        <span className="bg-green-500/10 text-green-500 text-xs font-black px-2 py-0.5 rounded-full border border-green-500/20">+250 XP</span>
                     </div>
                     <h1 className="text-2xl font-display font-black text-slate-800 dark:text-white uppercase tracking-tight">Otimização de Processos e Fluxos</h1>
                  </div>
                  <div className="flex items-center space-x-2 bg-white dark:bg-card-dark px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <span className="material-icons-outlined text-base text-slate-400">schedule</span>
                     <span className="text-sm font-bold text-slate-500">10 min</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-5 rounded-2xl hover:border-primary/50 transition duration-300">
                     <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                           <span className="material-icons-outlined">description</span>
                        </div>
                        <h3 className="text-base font-black dark:text-white uppercase tracking-wider">Apoio</h3>
                     </div>
                     <p className="text-sm text-slate-500 mb-4 leading-relaxed">Baixe o resumo estratégico desta aula.</p>
                     <button
                        onClick={() => alert('Download do PDF iniciado...')}
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-black uppercase tracking-widest hover:bg-slate-100 transition"
                     >
                        Baixar PDF
                     </button>
                  </div>

                  <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-5 rounded-2xl hover:border-primary/50 transition duration-300">
                     <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <span className="material-icons-outlined">account_tree</span>
                        </div>
                        <h3 className="text-base font-black dark:text-white uppercase tracking-wider">Fluxograma</h3>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <span className="material-icons-outlined text-blue-500 mb-2">schema</span>
                        <button
                           onClick={() => alert('Visualizando fluxograma em tela cheia...')}
                           className="text-sm font-black text-blue-500 hover:underline uppercase"
                        >
                           Ampliar Mapa
                        </button>
                     </div>
                  </div>

                  <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-5 rounded-2xl hover:border-primary/50 transition duration-300">
                     <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                           <span className="material-icons-outlined">cloud_upload</span>
                        </div>
                        <h3 className="text-base font-black dark:text-white uppercase tracking-wider">Atividade</h3>
                     </div>
                     <button
                        onClick={handleSubmitActivity}
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-orange-600 text-white py-3 rounded-xl transition text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 disabled:opacity-50"
                     >
                        {isSubmitting ? 'Enviando...' : 'Enviar Evidência'}
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* Sidebar de Currículo */}
         <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-background-dark/50 flex flex-col shrink-0">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark">
               <h2 className="text-sm font-display font-black dark:text-white uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  Próximas Etapas
               </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
               <div
                  className="p-4 rounded-2xl bg-white dark:bg-card-dark border-2 border-primary ring-4 ring-primary/5 cursor-pointer"
                  onClick={() => handleModuleClick('Otimização de Processos')}
               >
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Aula 04 • Atual</span>
                  <h4 className="text-sm font-bold dark:text-white uppercase leading-tight mt-1">Otimização de Processos e Fluxos</h4>
               </div>
               {[
                  { id: 5, name: 'Gestão de Crises' },
                  { id: 6, name: 'Liderança Eficaz' },
                  { id: 7, name: 'Análise de KPIs' }
               ].map((module) => (
                  <div
                     key={module.id}
                     className="p-4 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100 transition cursor-pointer"
                     onClick={() => handleModuleClick(module.name)}
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 uppercase">Aula 0{module.id}</span>
                        <span className="material-icons-outlined text-base text-slate-400">lock</span>
                     </div>
                     <h4 className="text-sm font-bold text-slate-500 uppercase leading-tight mt-1">{module.name}</h4>
                  </div>
               ))}
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark">
               <h2 className="text-sm font-display font-black dark:text-white uppercase tracking-widest flex items-center mb-4">
                  <span className="material-icons-outlined text-primary mr-2">insights</span>
                  Dica Neural
               </h2>
               <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal italic">
                  "Foque em métricas de produtividade para desbloquear a próxima recompensa."
               </p>
            </div>
         </aside>
      </div>
   );
};
