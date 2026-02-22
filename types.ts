
export type ViewType =
  | 'dashboard'
  | 'support'
  | 'training'
  | 'rewards'
  | 'users'
  | 'metrics'
  | 'studio-ia'
  | 'live-consultancy';

export type UserRole = 'ESPECIALISTA' | 'GESTOR' | 'FUNCIONARIO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  level: number;
  xp: number;
  status: 'active' | 'inactive';
  branch?: string; // Filial
  registrationDate?: string;
  averageAccessTime?: string; // Tempo médio de acesso
  accessStats?: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  storeId?: string; // Para vincular Gestor à sua loja
}

export interface Ticket {
  id: string;
  user: string;
  company: string;
  department: string;
  message: string;
  time: string;
  status: 'waiting' | 'in-progress';
  urgency?: 'urgent';
  avatarColor: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'insight' | 'success';
  time: string;
  read: boolean;
}
