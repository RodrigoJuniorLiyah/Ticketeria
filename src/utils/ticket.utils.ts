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

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileIcon = (type: string): string => {
  if (type.includes('image')) return 'image-outline';
  if (type.includes('pdf')) return 'document-text-outline';
  if (type.includes('word') || type.includes('document')) return 'document-outline';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'grid-outline';
  if (type.includes('zip') || type.includes('rar')) return 'archive-outline';
  return 'attach-outline';
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

