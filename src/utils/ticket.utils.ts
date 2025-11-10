import { Ticket } from '../types/ticket.types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getStatusLabel = (status: Ticket['status']): string => {
  const labels: Record<Ticket['status'], string> = {
    open: 'Aberto',
    in_progress: 'Em Andamento',
    resolved: 'Resolvido',
    closed: 'Fechado',
  };
  return labels[status] || status;
};

export const getPriorityLabel = (priority: Ticket['priority']): string => {
  const labels: Record<Ticket['priority'], string> = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    critical: 'Crítica',
  };
  return labels[priority] || priority;
};

