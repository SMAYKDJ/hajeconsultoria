
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
import { Header } from './components/Header';
import { ViewType, User, Notification } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [userXp, setUserXp] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [aiContext, setAiContext] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Alerta de Engajamento',
      message: 'A Unidade Matriz SP teve queda de 12% em acessos matinais.',
      type: 'alert',
      time: 'Agora',
      read: false
    },
    {
      id: '2',
      title: 'Oportunidade de Mentoria',
      message: 'João Silva concluiu o módulo Avançado. Sugestão: Mentoria de Elite.',
      type: 'insight',
      time: '15min',
      read: false
    },
    {
      id: '3',
      title: 'IA Conectada',
      message: 'O Oráculo Neural foi atualizado para a versão 4.2.',
      type: 'success',
      time: '1h',
      read: true
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  // --- PERSISTÊNCIA E LOGOUT POR INATIVIDADE ---

  // 1. Carregar sessão ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('haje_session');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserXp(user.xp);
      setUserLevel(user.level);
      setIsAuthenticated(true);
    }
  }, []);

  // 2. Timer de Inatividade (30 minutos)
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      if (isAuthenticated) {
        timeout = setTimeout(() => {
          handleLogout();
          alert("Sessão expirada por inatividade para sua segurança.");
        }, 30 * 60 * 1000);
      }
    };

    if (isAuthenticated) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keypress', resetTimer);
      window.addEventListener('scroll', resetTimer);
      window.addEventListener('click', resetTimer);
      resetTimer();
    }

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
      if (timeout) clearTimeout(timeout);
    };
  }, [isAuthenticated]);

  const simulateNeuralAlert = () => {
    const alerts = [
      { title: 'Pico de Acesso', message: 'Aumento de 20% no tráfego da Academia Haje.', type: 'success' },
      { title: 'Inatividade Detectada', message: 'Equipe de Vendas não acessa há 24h.', type: 'alert' },
      { title: 'Insight de Mercado', message: 'Novo concorrente identificado na região Sul.', type: 'insight' }
    ];
    const random = alerts[Math.floor(Math.random() * alerts.length)];
    const newNotif: Notification = {
      id: Math.random().toString(),
      title: random.title,
      message: random.message,
      type: random.type as any,
      time: 'Agora',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (user: User) => {
    localStorage.setItem('haje_session', JSON.stringify(user));
    setCurrentUser(user);
    setUserXp(user.xp);
    setUserLevel(user.level);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('haje_session');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const addXp = (amount: number) => {
    setUserXp(prevXp => {
      const newXp = Math.max(0, prevXp + amount);
      const nextLevelThreshold = userLevel * 5000;
      let newLevel = userLevel;

      if (newXp >= nextLevelThreshold) {
        newLevel = userLevel + 1;
        setUserLevel(newLevel);

        setNotifications(prev => [{
          id: Math.random().toString(),
          title: 'Explosão Neural!',
          message: `Você evoluiu para o Nível ${newLevel}!`,
          type: 'success',
          time: 'Agora',
          read: false
        }, ...prev]);
      }

      const updatedUser = currentUser ? { ...currentUser, xp: newXp, level: newLevel } : null;
      if (updatedUser) {
        setCurrentUser(updatedUser);
        localStorage.setItem('haje_session', JSON.stringify(updatedUser));
      }

      return newXp;
    });
  };

  const handleAIAnalysis = (context: string) => {
    setAiContext(context);
    setCurrentView('studio-ia');
  };

  const renderView = () => {
    const props = { setView: setCurrentView, userXp, addXp, userLevel };
    switch (currentView) {
      case 'dashboard': return <DashboardView {...props} />;
      case 'support': return <SupportView />;
      case 'training': return <TrainingView {...props} />;
      case 'rewards': return <RewardsView {...props} />;
      case 'users': return <UsersView />;
      case 'metrics': return <MetricsView user={currentUser} onAIAnalysis={handleAIAnalysis} />;
      case 'studio-ia': return <StudioIAView initialContext={aiContext} onClearContext={() => setAiContext(null)} />;
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
        user={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          currentView={currentView}
          currentUser={currentUser}
          userXp={userXp}
          userLevel={userLevel}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          simulateNeuralAlert={simulateNeuralAlert}
          markAsRead={markAsRead}
          clearAllNotifications={clearAllNotifications}
          setCurrentView={setCurrentView}
        />

        <main className="flex-1 overflow-auto p-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
