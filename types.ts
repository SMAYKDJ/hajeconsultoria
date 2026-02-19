
export type ViewType = 
  | 'dashboard' 
  | 'support' 
  | 'training' 
  | 'rewards' 
  | 'users' 
  | 'metrics' 
  | 'studio-ia'
  | 'live-consultancy';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  level: number;
  xp: number;
  status: 'active' | 'inactive';
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
