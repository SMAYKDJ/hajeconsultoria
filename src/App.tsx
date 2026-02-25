import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { DashboardView } from './views/DashboardView';
import { SupportView } from './views/SupportView';
import { TrainingView } from './views/TrainingView';
import { UsersView } from './views/UsersView';
import { MetricsView } from './views/MetricsView';
import { StudioIAView } from './views/StudioIAView';
import { RewardsView } from './views/RewardsView';
import { LiveConsultancyView } from './views/LiveConsultancyView';
import { LoginView } from './views/LoginView';
import { Layout } from './components/Layout';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, handleLogin, handleLogout } = useAuth();
  const [aiContext, setAiContext] = useState<string | null>(null);
  const navigate = useNavigate();

  // Timer de Inatividade
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
  }, [isAuthenticated, handleLogout]);

  const handleAIAnalysis = (context: string) => {
    setAiContext(context);
    navigate('/studio-ia');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-light dark:bg-background-dark">
        <span className="material-icons-round text-primary animate-spin text-4xl">sync</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/support" element={<SupportView />} />
        <Route path="/training" element={<TrainingView />} />
        <Route path="/rewards" element={<RewardsView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/metrics" element={<MetricsView onAIAnalysis={handleAIAnalysis} />} />
        <Route path="/studio-ia" element={<StudioIAView initialContext={aiContext} onClearContext={() => setAiContext(null)} />} />
        <Route path="/live-consultancy" element={<LiveConsultancyView />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
