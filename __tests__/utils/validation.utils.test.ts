import {
  validateTicketCategory,
  validateTicketDescription,
  validateTicketTitle,
} from '../../src/utils/validation.utils';

describe('validation.utils', () => {
  describe('validateTicketTitle', () => {
    it('deve retornar erro quando título está vazio', () => {
      const result = validateTicketTitle('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Título é obrigatório');
    });

    it('deve retornar erro quando título tem apenas espaços', () => {
      const result = validateTicketTitle('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Título é obrigatório');
    });

    it('deve retornar erro quando título tem menos de 5 caracteres', () => {
      const result = validateTicketTitle('1234');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Título deve ter no mínimo 5 caracteres');
    });

    it('deve retornar válido quando título tem exatamente 5 caracteres', () => {
      const result = validateTicketTitle('12345');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('deve retornar válido quando título tem mais de 5 caracteres', () => {
      const result = validateTicketTitle('Título do ticket');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('validateTicketDescription', () => {
    it('deve retornar erro quando descrição está vazia', () => {
      const result = validateTicketDescription('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Descrição é obrigatória');
    });

    it('deve retornar erro quando descrição tem apenas espaços', () => {
      const result = validateTicketDescription('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Descrição é obrigatória');
    });

    it('deve retornar erro quando descrição tem menos de 10 caracteres', () => {
      const result = validateTicketDescription('123456789');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Descrição deve ter no mínimo 10 caracteres');
    });

    it('deve retornar válido quando descrição tem exatamente 10 caracteres', () => {
      const result = validateTicketDescription('1234567890');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('deve retornar válido quando descrição tem mais de 10 caracteres', () => {
      const result = validateTicketDescription('Esta é uma descrição válida do ticket');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('validateTicketCategory', () => {
    it('deve retornar erro quando categoria está vazia', () => {
      const result = validateTicketCategory('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Categoria é obrigatória');
    });

    it('deve retornar erro quando categoria tem apenas espaços', () => {
      const result = validateTicketCategory('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Categoria é obrigatória');
    });

    it('deve retornar válido quando categoria está preenchida', () => {
      const result = validateTicketCategory('Suporte Técnico');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
