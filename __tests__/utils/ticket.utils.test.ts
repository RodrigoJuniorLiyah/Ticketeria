import {
  formatDate,
  formatFileSize,
  getFileIcon,
  getPriorityLabel,
  getStatusLabel,
} from '../../src/utils/ticket.utils';

describe('ticket.utils', () => {
  describe('formatDate', () => {
    it('deve formatar data corretamente', () => {
      const date = '2024-01-15T10:30:00Z';
      const formatted = formatDate(date);
      expect(formatted).toBe('15/01/2024');
    });

    it('deve lidar com diferentes formatos de data', () => {
      const date = '2024-12-25';
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d{2}\/\d{2}\/2024/);
    });
  });

  describe('getStatusLabel', () => {
    it('deve retornar label correto para status "open"', () => {
      expect(getStatusLabel('open')).toBe('Aberto');
    });

    it('deve retornar label correto para status "in_progress"', () => {
      expect(getStatusLabel('in_progress')).toBe('Em Andamento');
    });

    it('deve retornar label correto para status "resolved"', () => {
      expect(getStatusLabel('resolved')).toBe('Resolvido');
    });

    it('deve retornar label correto para status "closed"', () => {
      expect(getStatusLabel('closed')).toBe('Fechado');
    });
  });

  describe('formatFileSize', () => {
    it('deve formatar 0 bytes corretamente', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
    });

    it('deve formatar bytes corretamente', () => {
      expect(formatFileSize(500)).toBe('500 Bytes');
    });

    it('deve formatar KB corretamente', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(2048)).toBe('2 KB');
    });

    it('deve formatar MB corretamente', () => {
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(2097152)).toBe('2 MB');
    });

    it('deve formatar GB corretamente', () => {
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('getFileIcon', () => {
    it('deve retornar ícone correto para imagens', () => {
      expect(getFileIcon('image/png')).toBe('image-outline');
      expect(getFileIcon('image/jpeg')).toBe('image-outline');
    });

    it('deve retornar ícone correto para PDF', () => {
      expect(getFileIcon('application/pdf')).toBe('document-text-outline');
    });

    it('deve retornar ícone correto para documentos Word', () => {
      expect(getFileIcon('application/msword')).toBe('document-outline');
      expect(
        getFileIcon('application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
      ).toBe('document-outline');
    });

    it('deve retornar ícone correto para planilhas Excel', () => {
      expect(getFileIcon('application/vnd.ms-excel')).toBe('grid-outline');
    });

    it('deve retornar ícone correto para arquivos compactados', () => {
      expect(getFileIcon('application/zip')).toBe('archive-outline');
      expect(getFileIcon('application/x-rar-compressed')).toBe('archive-outline');
    });

    it('deve retornar ícone padrão para tipos desconhecidos', () => {
      expect(getFileIcon('application/octet-stream')).toBe('attach-outline');
    });
  });

  describe('getPriorityLabel', () => {
    it('deve retornar label correto para prioridade "low"', () => {
      expect(getPriorityLabel('low')).toBe('Baixa');
    });

    it('deve retornar label correto para prioridade "medium"', () => {
      expect(getPriorityLabel('medium')).toBe('Média');
    });

    it('deve retornar label correto para prioridade "high"', () => {
      expect(getPriorityLabel('high')).toBe('Alta');
    });

    it('deve retornar label correto para prioridade "critical"', () => {
      expect(getPriorityLabel('critical')).toBe('Crítica');
    });
  });
});
