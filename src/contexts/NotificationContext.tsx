import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Notification } from '../types';

interface NotificationContextData {
    notifications: Notification[];
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
    simulateNeuralAlert: () => void;
    pushNotification: (notif: Omit<Notification, 'id' | 'read' | 'time'>) => void;
    markAsRead: (id: string) => void;
    clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

    const pushNotification = (notif: Omit<Notification, 'id' | 'read' | 'time'>) => {
        setNotifications(prev => [{
            id: Math.random().toString(),
            time: 'Agora',
            read: false,
            ...notif,
        }, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            showNotifications,
            setShowNotifications,
            simulateNeuralAlert,
            pushNotification,
            markAsRead,
            clearAllNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
