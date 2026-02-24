import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import { useNotifications } from './NotificationContext';

interface AuthContextData {
    isAuthenticated: boolean;
    currentUser: User | null;
    userXp: number;
    userLevel: number;
    handleLogin: (user: User) => void;
    handleLogout: () => void;
    addXp: (amount: number) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userXp, setUserXp] = useState(0);
    const [userLevel, setUserLevel] = useState(1);
    const { pushNotification } = useNotifications();

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
    };

    const addXp = (amount: number) => {
        setUserXp(prevXp => {
            const newXp = Math.max(0, prevXp + amount);
            const nextLevelThreshold = userLevel * 5000;
            let newLevel = userLevel;

            if (newXp >= nextLevelThreshold) {
                newLevel = userLevel + 1;
                setUserLevel(newLevel);
                pushNotification({
                    title: 'Explosão Neural!',
                    message: `Você evoluiu para o Nível ${newLevel}!`,
                    type: 'success'
                });
            }

            const updatedUser = currentUser ? { ...currentUser, xp: newXp, level: newLevel } : null;
            if (updatedUser) {
                setCurrentUser(updatedUser);
                localStorage.setItem('haje_session', JSON.stringify(updatedUser));
            }

            return newXp;
        });
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            currentUser,
            userXp,
            userLevel,
            handleLogin,
            handleLogout,
            addXp
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
