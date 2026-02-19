
import React, { useState } from 'react';

interface RewardsProps {
  userXp: number;
  userLevel: number;
  addXp: (amount: number) => void;
}

export const RewardsView: React.FC<RewardsProps> = ({ userXp, userLevel, addXp }) => {
  const [redeemed, setRedeemed] = useState<string[]>(['Módulo Bônus: Soft Skills']);

  const rewards = [
    { name: 'Módulo Bônus: Soft Skills', xpCost: 1000, icon: 'military_tech' },
    { name: 'Certificado Gold', xpCost: 2500, icon: 'workspace_premium' },
    { name: 'Acesso Antecipado: IA v3', xpCost: 1500, icon: 'lock_open' },
    { name: 'Mentoria Exclusiva (30 min)', xpCost: 5000, icon: 'person_add' },
  ];

  const handleRedeem = (reward: { name: string, xpCost: number }) => {
    if (userXp < reward.xpCost) {
      alert(`Você precisa de mais ${reward.xpCost - userXp} XP para resgatar esta recompensa!`);
      return;
    }
    if (redeemed.includes(reward.name)) return;

    if (confirm(`Deseja trocar ${reward.xpCost} XP por ${reward.name}?`)) {
      addXp(-reward.xpCost);
      setRedeemed([...redeemed, reward.name]);
      alert(`Parabéns! Você adquiriu: ${reward.name}`);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
           <h1 className="text-2xl font-display font-black tracking-tighter dark:text-white uppercase">
              Arsenal de <span className="text-primary">Conquistas</span>
           </h1>
           <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Troque seu empenho por vantagens reais</div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="bg-primary/10 px-6 py-3 rounded-2xl border-2 border-primary/20 flex flex-col items-center">
                <span className="text-2xl font-black text-primary">{userXp.toLocaleString()}</span>
                <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">XP Disponível</span>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-end mb-3">
             <h2 className="text-base font-black uppercase tracking-widest dark:text-white">Escalão Atual: <span className="text-primary">{userLevel}</span></h2>
             <span className="text-sm font-bold text-slate-400 uppercase">{userXp % 5000} / 5000 XP p/ próximo nível</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-primary" style={{width: `${(userXp % 5000) / 50}%`}}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-base font-black uppercase tracking-widest dark:text-white mb-2">Histórico de Resgate</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">Você já utilizou XP para {redeemed.length} itens da loja.</p>
          </div>
          <div className="bg-green-500/10 p-3 rounded-full">
            <span className="material-icons-outlined text-green-500 text-3xl">local_mall</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-base font-display font-black dark:text-white uppercase tracking-wider mb-6 flex items-center">
          <span className="material-icons-outlined text-primary mr-2">storefront</span>
          Loja de Vantagens Haje
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward, idx) => {
            const isRedeemed = redeemed.includes(reward.name);
            const canAfford = userXp >= reward.xpCost;

            return (
              <div key={idx} className={`p-5 rounded-2xl border transition-all ${isRedeemed ? 'border-green-500/30 bg-green-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/50'}`}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-14 h-14 rounded-2xl ${isRedeemed ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'} flex items-center justify-center shadow-sm`}>
                    <span className="material-icons-outlined text-3xl">{reward.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black dark:text-white uppercase leading-tight">{reward.name}</h3>
                    <p className={`text-sm font-bold mt-1 ${canAfford || isRedeemed ? 'text-primary' : 'text-red-500'}`}>
                      {isRedeemed ? 'Adquirido' : `${reward.xpCost.toLocaleString()} XP`}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleRedeem(reward)}
                    disabled={isRedeemed}
                    className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-md ${isRedeemed ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-orange-600 text-white shadow-primary/20'}`}
                  >
                    {isRedeemed ? 'Resgatado' : 'Resgatar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
