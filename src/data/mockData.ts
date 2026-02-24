import { Ticket, User } from '../types';

export const INITIAL_NOTIFICATIONS = [
    {
        id: '1',
        title: 'Alerta de Engajamento',
        message: 'A Unidade Matriz SP teve queda de 12% em acessos matinais.',
        type: 'alert' as const,
        time: 'Agora',
        read: false
    },
    {
        id: '2',
        title: 'Oportunidade de Mentoria',
        message: 'João Silva concluiu o módulo Avançado. Sugestão: Mentoria de Elite.',
        type: 'insight' as const,
        time: '15min',
        read: false
    },
    {
        id: '3',
        title: 'IA Conectada',
        message: 'O Oráculo Neural foi atualizado para a versão 4.2.',
        type: 'success' as const,
        time: '1h',
        read: true
    }
];

export const MOCK_TICKETS: Ticket[] = [
    {
        id: '7429',
        user: 'FILIPE BALCÃO',
        company: 'Rápido Autopeças',
        department: 'Matriz | Administrativo',
        message: 'Olá, gostaria de validar minha atividade do módulo de faturamento.',
        time: '10 min',
        status: 'waiting',
        urgency: 'urgent',
        avatarColor: 'bg-red-500'
    },
    {
        id: '7430',
        user: 'CARLA FINANCEIRO',
        company: 'Bella Home Móveis',
        department: 'Sede | Financeiro',
        message: 'Como faço para emitir nota conjugada no Shop9?',
        time: '18 min',
        status: 'waiting',
        avatarColor: 'bg-slate-300'
    },
    {
        id: '7442',
        user: 'MARCOS GERENTE',
        company: 'Auto Peças Central',
        department: 'Filial 02 | Gerência',
        message: 'Preciso de ajuda com o fechamento do caixa.',
        time: '2 min',
        status: 'in-progress',
        avatarColor: 'bg-blue-500'
    }
];

export const AI_SUGGESTIONS = [
    'Entendido! Posso te ajudar com isso.',
    'Aguarde um momento, por favor.',
    'Já estou verificando seu caso, Filipe.',
];

export const INITIAL_CHAT_MESSAGES = [
    {
        id: 1,
        user: 'FILIPE BALCÃO',
        initial: 'F',
        text: 'Olá, gostaria de validar minha atividade do módulo de faturamento.',
        time: '19:52',
        isCustomer: true
    },
    {
        id: 2,
        user: 'SISTEMA',
        initial: 'S',
        text: 'Smayk entrou no chat...',
        time: '19:53',
        isSystem: true
    }
];

export const MOCK_DASHBOARD_METRICS = [
    { label: 'Unidades Ativas', value: '18', change: '+2', icon: 'business', color: 'bg-blue-500' },
    { label: 'Engajamento Médio', value: '84%', change: '+5%', icon: 'bolt', color: 'bg-primary' },
    { label: 'Mentoria Realizada', value: '124', change: '+12', icon: 'psychology', color: 'bg-purple-500' },
    { label: 'Nível Médio Equipe', value: 'Lv. 6', change: '+1', icon: 'trending_up', color: 'bg-green-500' }
];

export const RECENT_ACTIVITIES = [
    { user: 'João Silva', action: 'Completou módulo de Vendas', time: '2 min atrás', avatar: 'https://picsum.photos/seed/1/100/100' },
    { user: 'Maria Souza', action: 'Alcançou Nível 10', time: '15 min atrás', avatar: 'https://picsum.photos/seed/2/100/100' },
    { user: 'Carlos Lima', action: 'Iniciou novo treinamento', time: '1h atrás', avatar: 'https://picsum.photos/seed/3/100/100' }
];
