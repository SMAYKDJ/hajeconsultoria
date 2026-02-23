
import React, { useState } from 'react';
import { Ticket } from '../types';
import { MOCK_TICKETS, AI_SUGGESTIONS, INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { ProgressBar } from '../components/ProgressBar';

export const SupportView: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>('7429');
  const [currentTab, setCurrentTab] = useState<'inbox' | 'service'>('inbox');
  const [messageInput, setMessageInput] = useState('');
  const [isInternalMessage, setIsInternalMessage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES);

  // Auto-select first ticket of the tab if current is not in list
  React.useEffect(() => {
    const tabTickets = MOCK_TICKETS.filter(t =>
      currentTab === 'inbox' ? t.status === 'waiting' : t.status === 'in-progress'
    );
    if (tabTickets.length > 0 && !tabTickets.find(t => t.id === selectedTicket)) {
      setSelectedTicket(tabTickets[0].id);
    }
  }, [currentTab]);

  // Simulate loading different messages for different tickets
  React.useEffect(() => {
    if (selectedTicket === '7442') {
      setMessages([
        { id: 1, user: 'MARCOS GERENTE', initial: 'M', text: 'Preciso de ajuda com o fechamento do caixa.', time: '14:20', isCustomer: true },
        { id: 2, user: 'SISTEMA', initial: 'S', text: 'Smayk entrou no chat...', time: '14:21', isSystem: true },
        { id: 3, user: 'SMAYK', initial: 'S', text: 'Olá Marcos, qual o problema exatamente?', time: '14:22', isCustomer: false }
      ]);
    } else {
      setMessages(INITIAL_CHAT_MESSAGES);
    }
  }, [selectedTicket]);

  const emojis = ['😊', '👍', '🔥', '🚀', '⭐', '💎', '💡', '✅', '⚠️', '🎯', '📊', '💪', '🤝', '💰', '✨', '🧠'];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'SMAYK',
        initial: 'S',
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCustomer: false,
        isInternal: isInternalMessage
      };

      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
      setIsInternalMessage(false);
      setShowEmojiPicker(false);
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleEndTicket = () => {
    alert(`Ticket #${selectedTicket} encerrado.`);
    setSelectedTicket(null);
  };

  const handleFileAttach = () => alert('Recurso de Anexo será liberado na versão Pro.');
  const handleImageUpload = () => alert('Recurso de Imagem será liberado na versão Pro.');
  const handleContactClient = () => alert('Iniciando chamada VoIP com o cliente...');


  const tickets: Ticket[] = MOCK_TICKETS.filter(t =>
    currentTab === 'inbox' ? t.status === 'waiting' : t.status === 'in-progress'
  );

  const aiSuggestions = AI_SUGGESTIONS;

  const handleAISuggestion = (suggestion: string) => {
    setMessageInput(suggestion);
  };

  const currentTicketObj = tickets.find(t => t.id === selectedTicket);
  const userInitials = currentTicketObj ? currentTicketObj.user.charAt(0) : 'F';

  return (
    <div className="flex flex-col lg:flex-row lg:h-full w-full bg-background-light dark:bg-background-dark">
      {/* Ticket List */}
      <section className="w-full lg:w-80 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark/30 shrink-0 min-h-[400px] lg:min-h-0">
        <div className="p-4 lg:p-4 space-y-4">
          <h2 className="text-sm lg:text-base font-display font-black dark:text-white uppercase tracking-wider">
            Suporte <span className="text-primary">Gestão</span>
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
              onClick={() => setCurrentTab('inbox')}
              className={`pb-2 text-sm font-bold border-b-2 transition-colors uppercase tracking-wider ${currentTab === 'inbox' ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
              aria-label="Ver caixa de entrada de tickets"
            >
              Inbox ({MOCK_TICKETS.filter(t => t.status === 'waiting').length})
            </button>
            <button
              onClick={() => setCurrentTab('service')}
              className={`pb-2 text-sm font-bold border-b-2 transition-colors uppercase tracking-wider ${currentTab === 'service' ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
              aria-label="Ver tickets em atendimento"
            >
              Atendimento ({MOCK_TICKETS.filter(t => t.status === 'in-progress').length})
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${selectedTicket === ticket.id
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
      <section className="w-full lg:flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50 min-h-[600px] lg:min-h-0 lg:overflow-hidden relative">
        <header className="h-[72px] sm:h-20 flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
          <div className="flex items-center space-x-3">
            <button className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Voltar">
              <span className="material-icons-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white ${currentTicketObj?.avatarColor || 'bg-primary'} shadow-lg border border-slate-200 dark:border-slate-800`}>
                {userInitials}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full animate-pulse shadow-[0_0_0_0_rgba(34,197,94,0.7)]"></div>
            </div>
            <div>
              <h1 className="text-[13px] font-bold tracking-tight text-slate-800 dark:text-white uppercase">{currentTicketObj?.user || 'Cliente Extra'}</h1>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide">Ticket #{selectedTicket} • <span className="text-green-500 font-bold">Ativo</span></span>
              </div>
            </div>
          </div>
          <button
            onClick={handleEndTicket}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-wider"
            aria-label={`Encerrar Ticket ${selectedTicket}`}
          >
            Encerrar
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-slate-200/50 dark:bg-surface-dark border border-slate-300/50 dark:border-slate-800 rounded-full text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.05em]">Hoje</span>
          </div>
          {messages.map((m) => (
            m.isSystem ? (
              <div key={m.id} className="flex justify-center py-2">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">{m.text}</span>
              </div>
            ) : (
              <div key={m.id} className={`flex ${m.isCustomer ? 'items-end space-x-2 max-w-[85%]' : 'flex-row-reverse space-x-reverse space-x-2 self-end ml-auto max-w-[85%]'}`}>
                <div className={`flex flex-col space-y-1 ${!m.isCustomer ? 'items-end' : ''}`}>
                  <div className={`p-3.5 shadow-sm relative ${m.isCustomer
                      ? 'bg-white dark:bg-card-dark text-slate-800 dark:text-slate-200 rounded-2xl rounded-bl-sm border border-slate-200 dark:border-slate-800/60'
                      : m.isInternal
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 rounded-2xl rounded-br-sm border border-amber-200 dark:border-amber-800/50'
                        : 'bg-primary text-white rounded-2xl rounded-br-sm shadow-[0_4px_15px_-3px_rgba(234,88,12,0.3)]'
                    }`}>
                    {m.isInternal && <div className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 mb-1 tracking-widest">⚠️ Nota Interna</div>}
                    <p className={`text-[14px] leading-[1.5] font-medium ${m.isCustomer ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}>{m.text}</p>
                    <div className="flex items-center justify-end space-x-1 mt-1 opacity-70">
                      <span className="text-[9px] font-bold uppercase">{m.time}</span>
                      {!m.isCustomer && <span className="material-icons-outlined text-[14px] font-bold text-white/90">done_all</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
          <div className="flex items-center space-x-2 ml-1 opacity-50">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 italic">O usuário está digitando...</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pt-4 pb-4 space-y-4 shrink-0">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 ml-1">
              <span className="material-icons-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Sugestões IA</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {aiSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAISuggestion(suggestion)}
                  className="flex-shrink-0 px-4 py-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-full text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 shadow-[0_2px_10px_-4px_rgba(234,88,12,0.15)] ring-1 ring-primary/10"
                >
                  <span className="material-icons-outlined text-[12px] text-primary">stars</span>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className={`bg-slate-100 dark:bg-background-dark border ${isInternalMessage ? 'border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-200 dark:border-slate-700'} rounded-[28px] p-2 shadow-sm transition-colors duration-300 relative`}>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-4 mb-2 p-3 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-slideUp">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map(e => (
                    <button
                      key={e}
                      onClick={() => handleAddEmoji(e)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-transform transform hover:scale-125 text-lg"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-[15px] p-3 text-slate-800 dark:text-white placeholder-slate-400 resize-none max-h-32"
              placeholder="Escreva sua resposta de elite..."
              rows={1}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              aria-label="Campo para escrever a resposta do chat"
            />
            <div className="flex items-center justify-between mt-1 px-1 pb-1">
              <div className="flex items-center space-x-0.5">
                <button onClick={handleFileAttach} className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                  <span className="material-icons-outlined text-[22px]">add_circle</span>
                </button>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${showEmojiPicker ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                  <span className="material-icons-outlined text-[22px]">sentiment_satisfied</span>
                </button>
                <button onClick={handleImageUpload} className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                  <span className="material-icons-outlined text-[22px]">image</span>
                </button>
                <div className="w-[1px] h-5 bg-slate-300 dark:bg-slate-700 mx-2"></div>
                <label className="flex items-center cursor-pointer group px-2.5 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-transparent active:scale-95">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={isInternalMessage} onChange={() => setIsInternalMessage(!isInternalMessage)} aria-label="Nota interna" />
                    <div className="w-8 h-4 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-amber-500 transition-colors mt-[2px]"></div>
                    <div className="absolute left-[2px] top-[4px] bg-white w-3 h-3 rounded-full transition-transform peer-checked:translate-x-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)] border border-slate-200"></div>
                  </div>
                  <span className={`ml-2 text-[10px] font-extrabold uppercase tracking-tighter transition-colors ${isInternalMessage ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`}>Interna</span>
                </label>
              </div>
              <button onClick={handleSendMessage} disabled={!messageInput.trim()} className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-md ${!messageInput.trim() ? 'bg-slate-200 dark:bg-slate-800 text-slate-400' : 'bg-primary text-white shadow-primary/30'}`} aria-label="Enviar mensagem">
                <span className="material-icons-outlined text-[20px] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* User Info Analysis */}
      <section className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark/30 p-4 lg:p-4 shrink-0 lg:overflow-y-auto">
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
              <ProgressBar value={78} height="h-1" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-black mb-1 uppercase">
                <span className="dark:text-slate-400">Saúde (Churn Risk)</span>
                <span className="text-green-500">50%</span>
              </div>
              <ProgressBar value={50} color="bg-green-500" height="h-1" />
            </div>
            {/* AI-driven Retention Score */}
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex justify-between text-xs font-black mb-1 uppercase">
                <span className="dark:text-slate-400">Score de Retenção (IA)</span>
                <span className="text-red-500">25% (Risco Alto)</span>
              </div>
              <ProgressBar value={25} color="bg-red-500" height="h-1" />
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
