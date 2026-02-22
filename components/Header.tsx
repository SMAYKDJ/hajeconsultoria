import React from 'react';
import { ViewType, User, Notification } from '../types';
import { NotificationCenter } from './NotificationCenter';
import { ProgressBar } from './ProgressBar';

interface HeaderProps {
    currentView: ViewType;
    currentUser: User | null;
    userXp: number;
    userLevel: number;
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
    notifications: Notification[];
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
    simulateNeuralAlert: () => void;
    markAsRead: (id: string) => void;
    clearAllNotifications: () => void;
    setCurrentView: (view: ViewType) => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
    currentView,
    currentUser,
    userXp,
    userLevel,
    darkMode,
    setDarkMode,
    notifications,
    showNotifications,
    setShowNotifications,
    simulateNeuralAlert,
    markAsRead,
    clearAllNotifications,
    setCurrentView,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}) => {
    const getTranslatedViewTitle = (view: ViewType): string => {
        switch (view) {
            case 'dashboard': return 'Dashboard Estratégico';
            case 'support': return 'Central de Atendimento';
            case 'training': return 'Academia Haje';
            case 'rewards': return 'Arsenal de Conquistas';
            case 'users': return 'Gestão de Talentos';
            case 'metrics': return 'Haje Intelligence';
            case 'studio-ia': return 'Studio Neural';
            case 'live-consultancy': return 'Consultoria em Tempo Real';
            default: return 'Haje Consultoria';
        }
    };

    const xpProgress = (userXp % (userLevel * 5000)) / (userLevel * 5000) * 100;

    return (
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
            <div className="flex items-center space-x-4 lg:space-x-8">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                    aria-label="Menu"
                >
                    <span className="material-icons-round text-2xl">menu</span>
                </button>
                <div>
                    <h1 className="text-xl lg:text-2xl font-display font-black tracking-tight dark:text-white uppercase truncate max-w-[150px] sm:max-w-none">
                        {getTranslatedViewTitle(currentView)}
                    </h1>
                    <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Haje Ecosystem</span>
                    </div>
                </div>

                {/* XP PROGRESS BAR */}
                <div className="hidden lg:flex items-center space-x-4 bg-slate-50 dark:bg-surface-dark px-6 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black text-primary uppercase overflow-hidden">Exp Neural: {userXp}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase ml-4">Lvl {userLevel}</span>
                        </div>
                        <ProgressBar value={userXp % (userLevel * 5000)} max={userLevel * 5000} />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <NotificationCenter
                    notifications={notifications}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                    simulateNeuralAlert={simulateNeuralAlert}
                    markAsRead={markAsRead}
                    clearAllNotifications={clearAllNotifications}
                />

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label={darkMode ? 'Modo Claro' : 'Modo Escuro'}
                >
                    <span className="material-icons-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>

                <div className="flex items-center space-x-3 pl-6 border-l border-slate-200 dark:border-slate-800">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black dark:text-white tracking-tight uppercase text-glow">{currentUser?.name}</p>
                        <div className="flex items-center justify-end space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 border-2 border-white dark:border-background-dark"></div>
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">
                                {currentUser?.role === 'ESPECIALISTA' ? 'Neural Master' : currentUser?.role === 'GESTOR' ? 'Hub Manager' : 'Elite Talent'}
                            </p>
                        </div>
                    </div>
                    <div
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-[2px] cursor-pointer group hover:rotate-3 transition-all"
                        onClick={() => setCurrentView('users')}
                    >
                        <div className="w-full h-full rounded-[14px] overflow-hidden border-2 border-white dark:border-background-dark relative">
                            <img src={currentUser?.avatar || "https://picsum.photos/seed/smayk/100/100"} className="w-full h-full object-cover" alt="Avatar" />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="material-icons-round text-white text-base">edit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
