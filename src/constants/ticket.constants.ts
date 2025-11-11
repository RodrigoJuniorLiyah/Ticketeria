import { Ticket } from '../types/ticket.types';

export const TICKET_CATEGORIES = ['Suporte Técnico', 'Bug', 'Melhoria', 'Dúvida', 'Outro'] as const;

export const TICKET_PRIORITIES: { label: string; value: Ticket['priority'] }[] = [
  { label: 'Baixa', value: 'low' },
  { label: 'Média', value: 'medium' },
  { label: 'Alta', value: 'high' },
  { label: 'Crítica', value: 'critical' },
];

export const TICKET_STATUS_FILTERS: { label: string; value: 'all' | Ticket['status'] }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Aberto', value: 'open' },
  { label: 'Em Andamento', value: 'in_progress' },
  { label: 'Resolvido', value: 'resolved' },
  { label: 'Fechado', value: 'closed' },
];

export const TICKET_VALIDATION_RULES = {
  title: {
    minLength: 5,
    required: true,
  },
  description: {
    minLength: 10,
    required: true,
  },
  category: {
    required: true,
  },
} as const;
