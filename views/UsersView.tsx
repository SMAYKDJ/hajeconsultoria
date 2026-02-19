
import React, { useState } from 'react';
import { User } from '../types';

export const UsersView: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUserName, setEditingUserName] = useState('');
  const [editingUserEmail, setEditingUserEmail] = useState('');

  const users: User[] = [
    { 
      id: '1', 
      name: 'ANA CAIXA DE OLIVEIRA', 
      email: 'ana@lojao.com.br', 
      role: 'ALUNO', 
      avatar: 'https://picsum.photos/seed/ana/100/100', 
      level: 3, 
      xp: 2500, 
      status: 'active' 
    },
    { 
      id: '2', 
      name: 'CARLOS VENDEDOR', 
      email: 'carlos@lojao.com.br', 
      role: 'ALUNO', 
      avatar: 'https://picsum.photos/seed/carlos/100/100', 
      level: 2, 
      xp: 1800, 
      status: 'active' 
    },
  ];

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditingUserName(user.name);
    setEditingUserEmail(user.email);
    setIsDrawerOpen(true);
  };

  const handleSaveChanges = () => {
    console.log(`Alterações salvas para: ${editingUserName} (${editingUserEmail})`);
    alert(`Alterações salvas para: ${editingUserName} (${editingUserEmail})`);
    setIsDrawerOpen(false);
    // In a real app, this would dispatch an action to update user data
  };

  const handleCancelChanges = () => {
    setIsDrawerOpen(false);
    // No changes, just close the drawer
  };

  const handleUpdatePhoto = () => {
    alert('Atualizando foto do usuário...');
  };

  const handleViewRecommendedModule = (moduleName: string) => {
    alert(`Navegando para o módulo de treinamento: ${moduleName}`);
    // In a real app, this would use setView to navigate to the training page with specific module
  };

  const handleNewUser = () => {
    alert('Abrindo formulário para novo usuário...');
  };

  return (
    <div className="flex h-full relative overflow-hidden">
      <div className={`flex-1 overflow-auto p-8 transition-all duration-300 ${isDrawerOpen ? 'mr-[480px]' : ''}`}>
        <div className="mb-8 flex items-center justify-between">
           <div className="relative w-full max-w-xl">
             <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" aria-hidden="true">search</span>
             <input 
               className="w-full bg-white dark:bg-card-dark border-slate-200 dark:border-slate-800 rounded-full pl-10 pr-4 py-2.5 text-base shadow-sm focus:ring-primary focus:border-primary transition-all" 
               placeholder="Filtrar por nome, empresa ou CPF..." 
               aria-label="Filtrar usuários"
             />
           </div>
           <button 
             onClick={handleNewUser}
             className="bg-primary hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20"
             aria-label="Adicionar novo usuário"
           >
             <span className="material-icons-round text-lg" aria-hidden="true">add</span>
             <span className="text-sm uppercase tracking-widest">Novo Usuário</span>
           </button>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4">Identificação Acadêmica</th>
                <th className="px-6 py-4">Lotação</th>
                <th className="px-6 py-4">Engajamento</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={user.avatar} className="w-12 h-12 rounded-lg object-cover" alt={`Avatar de ${user.name}`} />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-bold text-base dark:text-white">{user.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-slate-100 dark:bg-slate-800 text-xs px-1.5 py-0.5 rounded font-bold text-slate-500 uppercase">{user.role}</span>
                          <span className="text-sm text-slate-400">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-sm dark:text-slate-200 uppercase">Lojão dos Plásticos</p>
                    <p className="text-sm text-slate-400 mt-0.5 uppercase">Filial Central • Operacional</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-between mb-1.5">
                       <span className="text-sm font-bold text-primary uppercase">NV.{user.level} • {user.xp} XP</span>
                       <span className="text-sm text-slate-400 uppercase">78%</span>
                    </div>
                    <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" aria-hidden="true">
                       <div className="bg-primary h-full rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                      aria-label={`Editar usuário ${user.name}`}
                    >
                      <span className="material-icons-round text-lg" aria-hidden="true">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <aside className={`fixed right-0 top-0 h-full w-[480px] bg-white dark:bg-card-dark border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-primary text-xl" aria-hidden="true">edit</span>
            <h3 className="text-lg font-display font-black dark:text-white uppercase tracking-tight">Editar Usuário</h3>
          </div>
          <button onClick={handleCancelChanges} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors" aria-label="Fechar painel de edição">
            <span className="material-icons-round text-xl" aria-hidden="true">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
           <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer w-24 h-24" onClick={handleUpdatePhoto} role="button" tabIndex={0} aria-label="Atualizar foto do usuário">
                <img src={selectedUser?.avatar} className="w-full h-full rounded-full object-cover border-2 border-primary shadow-md" alt={`Foto de perfil de ${selectedUser?.name}`} />
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all" aria-hidden="true">
                  <span className="material-icons-round text-xl text-white">photo_camera</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-black text-slate-400 uppercase tracking-widest">Atualizar Foto</p>
           </div>

           <section className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-primary/10 p-2 rounded-lg" aria-hidden="true"><span className="material-icons-round text-primary text-xl">school</span></div>
                 <div>
                    <p className="text-sm font-bold text-slate-400 uppercase">Curso em Andamento</p>
                    <h4 className="text-base font-bold dark:text-white uppercase">Excelência no Atendimento V4</h4>
                 </div>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" aria-hidden="true">
                 <div className="bg-primary h-full rounded-full" style={{width: '78%'}}></div>
              </div>
           </section>

           {/* AI-driven Personalized Learning Recommendation */}
           <section className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-blue-500/10 p-2 rounded-lg" aria-hidden="true"><span className="material-icons-round text-blue-500 text-xl">auto_awesome</span></div>
                 <div>
                    <p className="text-sm font-bold text-slate-400 uppercase">Recomendação de Aprendizado (IA)</p>
                    <h4 className="text-base font-bold dark:text-white uppercase">Módulo: Liderança de Equipes</h4>
                 </div>
              </div>
              <p className="text-base text-slate-500 dark:text-slate-300 leading-relaxed">
                Com base no desempenho atual de {selectedUser?.name}, a IA sugere o módulo de **Liderança de Equipes** para desenvolvimento de soft skills.
              </p>
              <button 
                 onClick={() => handleViewRecommendedModule('Liderança de Equipes')}
                 className="mt-4 text-sm font-black text-blue-500 hover:underline uppercase flex items-center gap-1"
                 aria-label="Ver módulo de Liderança de Equipes recomendado pela IA"
              >
                Ver Módulo <span className="material-icons-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </button>
           </section>

           <section className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-bold text-slate-500 uppercase mb-1.5">Nome Completo</label>
                <input 
                  id="userName"
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-base" 
                  type="text" 
                  value={editingUserName} 
                  onChange={(e) => setEditingUserName(e.target.value)} 
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="userEmail" className="block text-sm font-bold text-slate-500 uppercase mb-1.5">E-mail</label>
                <input 
                  id="userEmail"
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-base" 
                  type="email" 
                  value={editingUserEmail} 
                  onChange={(e) => setEditingUserEmail(e.target.value)} 
                  aria-required="true"
                />
              </div>
           </section>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark grid grid-cols-2 gap-4">
          <button 
            onClick={handleCancelChanges}
            className="py-3 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold uppercase rounded-lg transition-colors"
            aria-label="Cancelar alterações do usuário"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSaveChanges}
            className="py-3 px-4 bg-primary hover:bg-orange-600 text-white text-sm font-bold uppercase rounded-lg transition-all shadow-lg shadow-primary/20"
            aria-label="Salvar alterações do usuário"
          >
            Salvar Alterações
          </button>
        </div>
      </aside>
    </div>
  );
};
