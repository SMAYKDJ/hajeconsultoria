import React from 'react';
import { Notification } from '../types';

interface NotificationCenterProps {
    notifications: Notification[];
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
    simulateNeuralAlert: () => void;
    markAsRead: (id: string) => void;
    clearAllNotifications: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
    notifications,
    showNotifications,
    setShowNotifications,
    simulateNeuralAlert,
    markAsRead,
    clearAllNotifications,
}) => {
    return (
        <div className="relative">
            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative ${showNotifications ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-primary hover:bg-primary/10'}`}
                aria-label="Notificações"
            >
                <span className="material-icons-outlined">notifications</span>
                {notifications.some(n => !n.read) && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-background-dark animate-bounce"></span>
                )}
            </button>

            {showNotifications && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-96 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] z-50 overflow-hidden animate-slideUp">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-surface-dark/50">
                            <div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Insights Neurais</span>
                                <p className="text-[9px] font-bold text-primary uppercase mt-0.5">Haje Intelligence Center</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={simulateNeuralAlert}
                                    className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                                    title="Simular Alerta"
                                >
                                    <span className="material-icons-round text-sm">bolt</span>
                                </button>
                                <button className="text-[10px] text-slate-400 hover:text-red-500 font-black uppercase transition-colors" onClick={clearAllNotifications}>Limpar</button>
                            </div>
                        </div>

                        <div className="max-h-[450px] overflow-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                notifications.map(n => (
                                    <div
                                        key={n.id}
                                        onClick={() => markAsRead(n.id)}
                                        className={`p-5 border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-primary/5 transition-all group relative ${!n.read ? 'bg-primary/[0.02]' : 'opacity-80'}`}
                                    >
                                        {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                                        <div className="flex gap-4">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${n.type === 'alert' ? 'bg-red-50 text-red-500 dark:bg-red-500/10' :
                                                n.type === 'insight' ? 'bg-blue-50 text-blue-500 dark:bg-blue-500/10' : 'bg-green-50 text-green-500 dark:bg-green-500/10'
                                                }`}>
                                                <span className="material-icons-round text-lg">{n.type === 'alert' ? 'warning' : n.type === 'insight' ? 'psychology' : 'check_circle'}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="text-[11px] font-black uppercase tracking-tight dark:text-white leading-none">{n.title}</p>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase">{n.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed pr-4">{n.message}</p>
                                                {!n.read && (
                                                    <div className="mt-3 flex gap-2">
                                                        <button className="text-[9px] font-black uppercase text-primary bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">Ver Detalhes</button>
                                                        <button className="text-[9px] font-black uppercase text-slate-400 hover:text-slate-600 px-3 py-1 rounded-full transition-colors">Ignorar</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center">
                                    <span className="material-icons-round text-5xl text-slate-200 dark:text-slate-800 mb-4 inline-block">visibility_off</span>
                                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Nenhuma atividade neural detectada</p>
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-4 bg-slate-50/50 dark:bg-surface-dark/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Ver Histórico Completo</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
