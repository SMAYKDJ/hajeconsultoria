
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
      <section className="w-full lg:flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50 min-h-[600px] lg:min-h-0 lg:overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-800 transition-colors" aria-label="Voltar">
              <span className="material-icons-round text-3xl">chevron_left</span>
            </button>
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-white ${currentTicketObj?.avatarColor || 'bg-primary'}`}>
                {userInitials}
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-surface-dark flex-shrink-0" aria-hidden="true"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm sm:text-base font-black dark:text-white uppercase tracking-tight">Ticket #{selectedTicket}</h2>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" aria-hidden="true"></div>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-widest">Ativo Agora</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleEndTicket}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-[10px] sm:text-xs font-black uppercase text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition tracking-wider shrink-0"
            aria-label={`Encerrar Ticket ${selectedTicket}`}
          >
            Encerrar Ticket
          </button>
        </header>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col space-y-6 bg-slate-50 dark:bg-transparent">
          {messages.map((m) => (
            m.isSystem ? (
              <div key={m.id} className="flex justify-center my-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{m.text}</span>
              </div>
            ) : (
              <div key={m.id} className={`flex ${m.isCustomer ? 'justify-start' : 'justify-end'} items-end space-x-2 w-full`}>
                {m.isCustomer && (
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${currentTicketObj?.avatarColor || 'bg-primary'} flex items-center justify-center text-xs sm:text-sm font-black text-white shrink-0 mb-1`}>{m.initial}</div>
                )}
                <div className={`rounded-2xl px-4 sm:px-5 py-3 shadow-sm flex flex-col max-w-[75%] sm:max-w-[65%] ${m.isCustomer
                  ? 'bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 rounded-bl-sm'
                  : m.isInternal
                    ? 'bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800/50 rounded-br-sm'
                    : 'bg-primary text-white rounded-br-sm shadow-primary/20'
                  }`}>
                  {m.isInternal && <div className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 mb-1 tracking-widest">⚠️ Nota Interna</div>}
                  <p className={`text-[14px] sm:text-[15px] leading-relaxed break-words ${m.isCustomer || m.isInternal ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}>{m.text}</p>
                  <span className={`text-[10px] font-bold mt-1.5 text-right self-end ${m.isCustomer || m.isInternal ? 'text-slate-400' : 'text-white/80'}`}>{m.time}</span>
                </div>
                {!m.isCustomer && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs sm:text-sm font-black text-white shrink-0 mb-1">{m.initial}</div>
                )}
              </div>
            )
          ))}
        </div>

        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-transparent">
          {/* AI Quick Response Suggestions */}
          <div className="mb-6 flex flex-col items-start gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Sugestões (IA):</span>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAISuggestion(suggestion)}
                  className="px-4 py-2.5 rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-[10px] sm:text-[11px] font-black text-slate-600 dark:text-slate-300 shadow-sm hover:border-primary hover:text-primary transition uppercase tracking-wider"
                  aria-label={`Usar sugestão: ${suggestion}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden relative">
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
              className="w-full bg-transparent border-none resize-none p-5 text-[15px] sm:text-base text-slate-700 dark:text-slate-200 focus:ring-0 font-medium"
              placeholder="Escreva sua resposta de elite..."
              rows={2}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              aria-label="Campo para escrever a resposta do chat"
            />
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-6 py-3 border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-transparent">
              <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <button onClick={handleFileAttach} className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors" aria-label="Anexar arquivo"><span className="material-icons-outlined text-2xl">attachment</span></button>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${showEmojiPicker ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`} aria-label="Selecionar emoji"><span className="material-icons-outlined text-xl">sentiment_satisfied_alt</span></button>
                <button onClick={handleImageUpload} className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors" aria-label="Upload de imagem"><span className="material-icons-outlined text-xl">image</span></button>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" aria-hidden="true" />
                <label className="flex items-center space-x-2 cursor-pointer group shrink-0">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isInternalMessage} onChange={() => setIsInternalMessage(!isInternalMessage)} aria-label="Marcar como interna" />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-amber-500"></div>
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-colors ${isInternalMessage ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'}`}>Interna</span>
                </label>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`mt-2 sm:mt-0 w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 shadow-xl ${!messageInput.trim()
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50'
                  : 'bg-slate-900 dark:bg-black text-white hover:bg-slate-800'
                  }`}
                aria-label="Enviar mensagem"
              >
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest sm:tracking-[0.15em]">Lançar Resposta</span>
                <span className="material-icons-round text-sm" aria-hidden="true">send</span>
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
