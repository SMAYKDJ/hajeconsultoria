
import React, { useState } from 'react';
import { Ticket } from '../types';

export const SupportView: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>('7429');
  const [messageInput, setMessageInput] = useState('');
  const [isInternalMessage, setIsInternalMessage] = useState(false);

  const tickets: Ticket[] = [
    { 
      id: '7429', 
      user: 'FILIPE BALCÃO', 
      company: 'Rápido Autopeças', 
      department: 'Matriz | Administrativo',
      message: 'Olá, gostaria de validar minha atividade do módulo de faturamento.',
      time: '10 min',
      status: 'waiting',
      urgency: 'urgent',
      avatarColor: 'bg-red-500'
    },
    { 
      id: '7430', 
      user: 'CARLA FINANCEIRO', 
      company: 'Bella Home Móveis', 
      department: 'Sede | Financeiro',
      message: 'Como faço para emitir nota conjugada no Shop9?',
      time: '18 min',
      status: 'waiting',
      avatarColor: 'bg-slate-300'
    }
  ];

  const aiSuggestions = [
    'Entendido! Posso te ajudar com isso.',
    'Aguarde um momento, por favor.',
    'Já estou verificando seu caso, Filipe.',
  ];

  const handleAISuggestion = (suggestion: string) => {
    setMessageInput(suggestion);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log(`Mensagem enviada (Interna: ${isInternalMessage ? 'Sim' : 'Não'}): "${messageInput}"`);
      alert(`Mensagem enviada (Interna: ${isInternalMessage ? 'Sim' : 'Não'}): "${messageInput}"`);
      setMessageInput('');
      setIsInternalMessage(false);
    }
  };

  const handleEndTicket = () => {
    console.log(`Ticket #${selectedTicket} encerrado.`);
    alert(`Ticket #${selectedTicket} encerrado.`);
    setSelectedTicket(null); // Clear selected ticket
  };

  const handleFileAttach = () => alert('Anexar arquivo...');
  const handleEmojiSelect = () => alert('Selecionar emoji...');
  const handleImageUpload = () => alert('Upload de imagem...');
  const handleContactClient = () => alert('Contatando cliente...');


  return (
    <div className="flex h-full overflow-hidden">
      {/* Ticket List */}
      <section className="w-80 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark/30 overflow-hidden shrink-0">
        <div className="p-4 space-y-4">
          <h2 className="text-base font-display font-black dark:text-white uppercase tracking-wider">
            Suporte <span className="text-primary">Gestão Operacional</span>
          </h2>
          <div className="relative">
            <span className="material-icons-outlined absolute left-3 top-2.5 text-base text-slate-400" aria-hidden="true">search</span>
            <input 
              className="w-full bg-slate-100 dark:bg-card-dark border-none rounded-xl pl-10 text-sm py-2.5 focus:ring-1 focus:ring-primary transition" 
              placeholder="Filtrar..." 
              type="text"
              aria-label="Filtrar tickets"
            />
          </div>
          <div className="flex space-x-4 border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => alert('Ver Caixa de Entrada')} 
              className="pb-2 text-sm font-bold border-b-2 border-primary text-primary uppercase tracking-wider"
              aria-label="Ver caixa de entrada de tickets"
            >
              Caixa de Entrada (2)
            </button>
            <button 
              onClick={() => alert('Ver Em Atendimento')} 
              className="pb-2 text-sm font-bold text-slate-400 uppercase tracking-wider"
              aria-label="Ver tickets em atendimento"
            >
              Em Atendimento
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-6">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedTicket === ticket.id 
                  ? 'bg-slate-100 dark:bg-card-dark border-2 border-primary ring-4 ring-primary/10' 
                  : 'bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Selecionar ticket ${ticket.id} de ${ticket.user}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${ticket.avatarColor} flex items-center justify-center text-xs font-black`} aria-hidden="true">
                    {ticket.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold dark:text-white leading-tight uppercase">{ticket.user}</h3>
                    <p className="text-xs text-slate-400 uppercase font-black">{ticket.company}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-bold">{ticket.time}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300 line-clamp-2 mb-3">{ticket.message}</p>
              <div className="flex space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-black bg-primary/20 text-primary border border-primary/20 uppercase">Aguardando</span>
                {ticket.urgency && (
                  <span className="px-2 py-0.5 rounded text-xs font-black bg-red-500/20 text-red-500 border border-red-500/20 uppercase tracking-tighter">Urgente</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50">
        <header className="h-14 flex items-center justify-between px-6 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-card-dark flex items-center justify-center text-xs font-black" aria-hidden="true">
              <span className="text-xs font-black">#</span>
            </div>
            <div>
              <h2 className="text-base font-bold dark:text-white uppercase tracking-tight">Ticket #{selectedTicket}</h2>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true"></div>
                <span className="text-xs text-slate-400 uppercase font-black tracking-widest">Aberto hoje às 19:52</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleEndTicket}
            className="px-4 py-1.5 bg-slate-900 dark:bg-card-dark text-xs font-black uppercase text-white rounded-lg hover:bg-slate-800 transition"
            aria-label={`Encerrar Ticket ${selectedTicket}`}
          >
            Encerrar Ticket
          </button>
        </header>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-6">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-xs font-black text-slate-500 dark:text-slate-400 uppercase rounded-full tracking-widest">Hoje, 24 de Outubro</span>
          </div>
          
          <div className="flex justify-start items-end space-x-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">F</div>
            <div className="bg-primary/10 dark:bg-primary/5 border border-primary/20 rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">Olá, gostaria de validar minha atividade do módulo de faturamento.</p>
              <span className="block text-xs text-primary/60 font-bold mt-2 text-right">19:52</span>
            </div>
          </div>

          <div className="flex justify-center">
             <p className="text-sm text-slate-400 dark:text-slate-500 italic">Smayk entrou no chat...</p>
          </div>
        </div>

        <div className="p-6">
          {/* AI Quick Response Suggestions */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sugestões (IA):</span>
            {aiSuggestions.map((suggestion, idx) => (
              <button 
                key={idx}
                onClick={() => handleAISuggestion(suggestion)}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition"
                aria-label={`Usar sugestão: ${suggestion}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <textarea 
              className="w-full bg-transparent border-none resize-none p-4 text-base text-slate-600 dark:text-slate-200 focus:ring-0" 
              placeholder="Escreva sua resposta..." 
              rows={3}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              aria-label="Campo para escrever a resposta do chat"
            />
            <div className="flex items-center justify-between p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-card-dark/30">
              <div className="flex items-center space-x-1">
                <button onClick={handleFileAttach} className="p-2 text-slate-400 hover:text-primary transition" aria-label="Anexar arquivo"><span className="material-icons-outlined text-lg">attach_file</span></button>
                <button onClick={handleEmojiSelect} className="p-2 text-slate-400 hover:text-primary transition" aria-label="Selecionar emoji"><span className="material-icons-outlined text-lg">sentiment_satisfied</span></button>
                <button onClick={handleImageUpload} className="p-2 text-slate-400 hover:text-primary transition" aria-label="Upload de imagem"><span className="material-icons-outlined text-lg">image</span></button>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" aria-hidden="true" />
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border ${isInternalMessage ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-600'} flex items-center justify-center group-hover:border-primary transition`} aria-hidden="true">
                    {isInternalMessage && <span className="material-icons-outlined text-sm text-white">check</span>}
                  </div>
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={isInternalMessage} 
                    onChange={() => setIsInternalMessage(!isInternalMessage)} 
                    aria-label="Marcar como mensagem interna"
                  />
                  <span className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-primary">Interna</span>
                </label>
              </div>
              <button 
                onClick={handleSendMessage}
                className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition shadow-lg shadow-primary/20 flex items-center space-x-2"
                aria-label="Enviar mensagem"
              >
                <span className="text-sm font-black uppercase tracking-widest">Enviar</span>
                <span className="material-icons-outlined text-base" aria-hidden="true">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* User Info Analysis */}
      <section className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark/30 p-4 overflow-y-auto shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></div>
            <h2 className="text-sm font-display font-black dark:text-white uppercase tracking-widest">Perfil Analítico 360°</h2>
          </div>
          <button onClick={() => alert('Fechar Perfil Analítico')} className="text-slate-400" aria-label="Fechar perfil analítico"><span className="material-icons-outlined text-lg">close</span></button>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-card-dark dark:to-surface-dark p-4 rounded-2xl border border-white dark:border-slate-700 shadow-xl mb-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full p-1 bg-white dark:bg-background-dark border-2 border-primary mb-3">
              <img src="https://picsum.photos/seed/filipe/100/100" className="w-full h-full rounded-full object-cover" alt="Avatar de Filipe Balcão" />
            </div>
            <h3 className="text-base font-display font-extrabold dark:text-white uppercase">FILIPE BALCÃO</h3>
            <p className="text-xs text-primary font-black uppercase mb-1">Rápido Auto Center</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Filial: Matriz | Setor: Administrativo</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-4">
             <div>
                <div className="flex justify-between text-xs font-black mb-1 uppercase">
                   <span className="dark:text-slate-400">Engajamento IA</span>
                   <span className="text-primary">78%</span>
                </div>
                <div className="h-1 w-full bg-slate-200/50 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-primary" style={{width: '78%'}}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-xs font-black mb-1 uppercase">
                   <span className="dark:text-slate-400">Saúde (Churn Risk)</span>
                   <span className="text-green-500">50%</span>
                </div>
                <div className="h-1 w-full bg-slate-200/50 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500" style={{width: '50%'}}></div>
                </div>
             </div>
             {/* AI-driven Retention Score */}
             <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
               <div className="flex justify-between text-xs font-black mb-1 uppercase">
                  <span className="dark:text-slate-400">Score de Retenção (IA)</span>
                  <span className="text-red-500">25% (Risco Alto)</span>
               </div>
               <div className="h-1 w-full bg-slate-200/50 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{width: '25%'}}></div>
               </div>
               <p className="text-xs text-slate-400 font-bold italic mt-2">Recomendação: Enviar mensagem personalizada ou oferecer suporte proativo.</p>
               <button 
                  onClick={handleContactClient}
                  className="mt-3 w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition"
                  aria-label="Contatar cliente para retenção"
               >
                 Contatar Cliente
               </button>
             </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-black dark:text-white uppercase tracking-widest mb-3">Histórico Acadêmico</h4>
            <div className="bg-white/5 p-3 rounded-lg border border-slate-200/20 dark:border-slate-700/50">
               <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black text-slate-400 uppercase">Curso Atual</span>
                  <span className="text-sm font-black text-primary">65%</span>
               </div>
               <p className="text-sm font-bold dark:text-slate-200 uppercase truncate">Gestão Estratégica</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
