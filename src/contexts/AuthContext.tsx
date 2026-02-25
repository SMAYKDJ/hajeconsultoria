import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import { useNotifications } from './NotificationContext';
import { supabase } from '../lib/supabase';

interface AuthContextData {
    isAuthenticated: boolean;
    currentUser: User | null;
    userXp: number;
    userLevel: number;
    handleLogin: (user: User) => void;
    handleLogout: () => void;
    addXp: (amount: number) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userXp, setUserXp] = useState(0);
    const [userLevel, setUserLevel] = useState(1);
    const { pushNotification } = useNotifications();

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
            if (error) {
                console.error('Error fetching profile:', error);
                return;
            }
            if (data) {
                const user: User = {
                    id: data.id,
                    name: data.name,
                    email: '', // Get from auth session if needed, but not strictly necessary here
                    role: data.role as any,
                    avatar: data.avatar,
                    level: data.level,
                    xp: data.xp,
                    status: data.status,
                    branch: data.branch,
                    storeId: data.store_id,
                    registrationDate: data.registration_date,
                    averageAccessTime: '45min',
                    accessStats: { daily: 4, weekly: 28, monthly: 120 }
                };
                setCurrentUser(user);
                setUserXp(user.xp);
                setUserLevel(user.level);
                setIsAuthenticated(true);
            }
        } catch (e) {
            console.error('Exception fetching profile', e);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                fetchUserProfile(session.user.id).then(() => setIsLoading(false));
            } else {
                setIsLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                await fetchUserProfile(session.user.id);
            } else {
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
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
            addXp,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
