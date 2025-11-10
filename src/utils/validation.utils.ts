import { TICKET_VALIDATION_RULES } from '../constants/ticket.constants';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateTicketTitle = (title: string): ValidationResult => {
  if (!title.trim()) {
    return { isValid: false, error: 'Título é obrigatório' };
  }
  if (title.trim().length < TICKET_VALIDATION_RULES.title.minLength) {
    return {
      isValid: false,
      error: `Título deve ter no mínimo ${TICKET_VALIDATION_RULES.title.minLength} caracteres`,
    };
  }
  return { isValid: true };
};

export const validateTicketDescription = (description: string): ValidationResult => {
  if (!description.trim()) {
    return { isValid: false, error: 'Descrição é obrigatória' };
  }
  if (description.trim().length < TICKET_VALIDATION_RULES.description.minLength) {
    return {
      isValid: false,
      error: `Descrição deve ter no mínimo ${TICKET_VALIDATION_RULES.description.minLength} caracteres`,
    };
  }
  return { isValid: true };
};

export const validateTicketCategory = (category: string): ValidationResult => {
  if (!category.trim()) {
    return { isValid: false, error: 'Categoria é obrigatória' };
  }
  return { isValid: true };
};

