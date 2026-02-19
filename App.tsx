
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { SupportView } from './views/SupportView';
import { TrainingView } from './views/TrainingView';
import { UsersView } from './views/UsersView';
import { MetricsView } from './views/MetricsView';
import { StudioIAView } from './views/StudioIAView';
import { RewardsView } from './views/RewardsView';
import { LiveConsultancyView } from './views/LiveConsultancyView';
import { LoginView } from './views/LoginView';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('SMAYK HAJE');

  const [userXp, setUserXp] = useState(3250);
  const [userLevel, setUserLevel] = useState(4);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (userName: string) => {
    setCurrentUser(userName);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const addXp = (amount: number) => {
    setUserXp(prev => {
      const newXp = Math.max(0, prev + amount);
      const nextLevelThreshold = userLevel * 5000;
      if (newXp >= nextLevelThreshold) {
        setUserLevel(l => l + 1);
      }
      return newXp;
    });
  };

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

  const renderView = () => {
    const props = { setView: setCurrentView, userXp, addXp, userLevel };
    switch (currentView) {
      case 'dashboard': return <DashboardView {...props} />;
      case 'support': return <SupportView />;
      case 'training': return <TrainingView {...props} />;
      case 'rewards': return <RewardsView {...props} />;
      case 'users': return <UsersView />;
      case 'metrics': return <MetricsView />;
      case 'studio-ia': return <StudioIAView />;
      case 'live-consultancy': return <LiveConsultancyView />;
      default: return <DashboardView {...props} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500">
      <Sidebar
        currentView={currentView}
        setView={setCurrentView}
        userXp={userXp}
        userLevel={userLevel}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div>
            <h1 className="text-xl font-display font-black tracking-tight dark:text-white uppercase">
              {getTranslatedViewTitle(currentView)}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Haje Ecosystem</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label={darkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              <span className="material-icons-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>

            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black dark:text-white tracking-tight uppercase">{currentUser}</p>
                <p className="text-[10px] text-primary font-black uppercase tracking-widest">Master Consultant</p>
              </div>
              <div
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-[2px] cursor-pointer group hover:scale-105 transition-transform"
                onClick={() => setCurrentView('users')}
              >
                <div className="w-full h-full rounded-[14px] overflow-hidden border-2 border-white dark:border-background-dark">
                  <img src="https://picsum.photos/seed/smayk/100/100" className="w-full h-full object-cover" alt="Avatar" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
